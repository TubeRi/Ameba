export async function rawgFetchGames({ search }) {
  const url = new URL("https://api.rawg.io/api/games");
  url.searchParams.set("key", process.env.RAWG_API_KEY);
  url.searchParams.set("page_size", "20");
  if (search) url.searchParams.set("search", search);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`RAWG error ${res.status}: ${body}`);
  }
  return res.json();
}
