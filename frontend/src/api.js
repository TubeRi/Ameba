const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function fetchGames(searchTerm = "") {
  const url = new URL(`${API_BASE}/list`);
  if (searchTerm) url.searchParams.set("search", searchTerm);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch games (${res.status})`);

  const data = await res.json(); // { source, results }
  return data.results ?? [];
}
