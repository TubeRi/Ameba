import express from "express";
import { pool } from "../db.js";
import { isFresh } from "../utils/cache.js";
import { rawgFetchGames } from "../services/rawg.js";

export const listRouter = express.Router();
const TTL_MIN = Number(process.env.CACHE_TTL_MINUTES || 60);

function shapeRow(row) {
  return {
    provider_game_id: row.provider_game_id,
    name: row.name,
    released: row.released,
    rating: row.rating,
    image_url: row.image_url
  };
}

function shapeRawg(g) {
  return {
    provider_game_id: g.id,
    name: g.name,
    released: g.released ?? null,
    rating: g.rating ?? null,
    image_url: g.background_image ?? null
  };
}

async function upsertGameFromRawg(g) {
  const sql = `
    INSERT INTO games_cache
      (provider, provider_game_id, name, released, rating, image_url, raw_json)
    VALUES
      ('rawg', ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      released = VALUES(released),
      rating = VALUES(rating),
      image_url = VALUES(image_url),
      raw_json = VALUES(raw_json),
      updated_at = CURRENT_TIMESTAMP
  `;

  await pool.execute(sql, [
    g.id,
    g.name,
    g.released ?? null,
    g.rating ?? null,
    g.background_image ?? null,
    JSON.stringify(g)
  ]);
}

listRouter.get("/", async (req, res) => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const normalized = search.toLowerCase();

    if (normalized) {
      const [scRows] = await pool.execute(
        `SELECT result_provider_game_ids, updated_at
         FROM search_cache
         WHERE query = ?`,
        [normalized]
      );

      const sc = scRows[0];

      if (sc && isFresh(sc.updated_at, TTL_MIN)) {
        const ids = JSON.parse(sc.result_provider_game_ids || "[]");
        if (!Array.isArray(ids) || ids.length === 0) {
          return res.json({ source: "sql-cache", results: [] });
        }

        const placeholders = ids.map(() => "?").join(",");
        const [gameRows] = await pool.execute(
          `SELECT provider_game_id, name, released, rating, image_url
           FROM games_cache
           WHERE provider='rawg' AND provider_game_id IN (${placeholders})
           LIMIT 20`,
          ids
        );

        return res.json({ source: "sql-cache", results: gameRows.map(shapeRow) });
      }

      const data = await rawgFetchGames({ search: normalized });

      const ids = [];
      for (const g of data.results) {
        ids.push(g.id);
        await upsertGameFromRawg(g);
      }

      await pool.execute(
        `
        INSERT INTO search_cache (query, result_provider_game_ids)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
          result_provider_game_ids = VALUES(result_provider_game_ids),
          updated_at = CURRENT_TIMESTAMP
        `,
        [normalized, JSON.stringify(ids)]
      );

      return res.json({ source: "rawg", results: data.results.map(shapeRawg) });
    }

    const [cachedRows] = await pool.execute(
      `SELECT provider_game_id, name, released, rating, image_url, updated_at
       FROM games_cache
       WHERE provider='rawg'
       ORDER BY updated_at DESC
       LIMIT 20`
    );

    if (cachedRows.length > 0 && isFresh(cachedRows[0].updated_at, TTL_MIN)) {
      return res.json({ source: "sql-cache", results: cachedRows.map(shapeRow) });
    }

    const data = await rawgFetchGames({ search: null });
    for (const g of data.results) {
      await upsertGameFromRawg(g);
    }

    return res.json({ source: "rawg", results: data.results.map(shapeRawg) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Backend error" });
  }
});
