import { expect, test } from "bun:test";
import { states } from "./india-data";
import { ideaCatalogue } from "./grambiz-data";

test("each state and union territory offers at least five places", () => {
  expect(states).toHaveLength(36);
  for (const state of states) {
    expect(state.villages.length).toBeGreaterThanOrEqual(5);
  }
});

test("business ideas have unique ids and the catalog has expanded", () => {
  const ids = ideaCatalogue.map((idea) => idea.id);
  expect(new Set(ids).size).toBe(ids.length);
  expect(ideaCatalogue.length).toBeGreaterThan(23);
});