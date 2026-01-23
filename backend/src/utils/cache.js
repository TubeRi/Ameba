export function isFresh(updatedAt, ttlMinutes) {
  if (!updatedAt) return false;
  const ageMs = Date.now() - new Date(updatedAt).getTime();
  return ageMs < ttlMinutes * 60 * 1000;
}
