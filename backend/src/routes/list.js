import express from "express";

export const listRouter = express.Router();

listRouter.get("/", (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search.trim().toLowerCase() : "";
  const games = [
    { id: 1, title: "FIFA 23" },
    { id: 2, title: "Red Dead Redemption 2" },
    { id: 3, title: "Split Fiction" }
  ];

  if (search) {
    return res.json(games.filter(g => g.title.toLowerCase().includes(search)));
  }
  res.json(games);
});
