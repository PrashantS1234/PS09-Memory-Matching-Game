import test from "node:test";
import assert from "node:assert/strict";
import { createDeck, formatTime } from "../src/game.js";

test("deck contains 16 cards and eight pairs", () => {
  const deck = createDeck(() => 0.5);
  assert.equal(deck.length, 16);
  for (const symbol of "ABCDEFGH") {
    assert.equal(deck.filter(card => card.symbol === symbol).length, 2);
  }
});

test("all cards begin unmatched", () => {
  assert.ok(createDeck().every(card => !card.matched));
});

test("each card has a unique id", () => {
  const ids = createDeck().map(card => card.id);
  assert.equal(new Set(ids).size, 16);
});

test("time formatting", () => {
  assert.equal(formatTime(65), "01:05");
  assert.equal(formatTime(0), "00:00");
  assert.equal(formatTime(3600), "60:00");
});
