export const SYMBOLS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export function createDeck(random = Math.random) {
  const symbols = [...SYMBOLS, ...SYMBOLS];
  for (let i = symbols.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
  }
  return symbols.map((symbol, id) => ({ id, symbol, matched: false }));
}

export function formatTime(seconds) {
  const n = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
}
