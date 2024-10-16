import { expect, test } from "vitest";
import { ZombieSurvival } from "./ZombieSurvival";

test("fails on invalid config", () => {
  expect(() => new ZombieSurvival([])).toThrowError("Config is empty");
  expect(() => new ZombieSurvival([[]])).toThrowError("Config is empty");

  expect(
    () =>
      new ZombieSurvival([
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
        ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", "Z", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      ]),
  ).toThrowError("Config has no player");

  expect(
    () =>
      new ZombieSurvival([
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
        [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
        ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", "Z", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      ]),
  ).toThrowError("Config contains multiple players");

  expect(
    () =>
      new ZombieSurvival([
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
        ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      ]),
  ).toThrowError("Config has no zombies");
});

test("fails on impossible to beat config", () => {
  const game = new ZombieSurvival([
    [" ", " ", " ", " ", "R", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "R", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "R", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "Z", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  expect(() => game.step()).toThrowError("Unable to solve game");
});

test("works with different boards sizes", () => {
  expect(() => new ZombieSurvival([["P", "Z"]])).not.toThrow();
  expect(() => new ZombieSurvival([["P"], ["Z"]])).not.toThrow();

  expect(
    () =>
      new ZombieSurvival([
        [" ", " ", " ", " ", " "],
        [" ", " ", "B", " ", " "],
        ["Z", " ", "B", "P", " "],
        ["R", "R", "R", " ", " "],
      ]),
  ).not.toThrow();

  expect(
    () =>
      new ZombieSurvival([["P", "B", "Z", "Z", "Z", " ", " ", " ", " ", " "]]),
  ).not.toThrow();

  expect(
    () =>
      new ZombieSurvival([
        ["P"],
        ["B"],
        ["Z"],
        ["Z"],
        ["Z"],
        [" "],
        [" "],
        [" "],
        [" "],
      ]),
  ).not.toThrow();
});

test("kills zombies", () => {
  const game = new ZombieSurvival([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "Z", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", "Z", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", "Z", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "Z", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "Z", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  expect(game.finished()).toBeTruthy();
});

test("player gets killed instantly", () => {
  const game = new ZombieSurvival([
    [" ", " ", " ", "Z", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "Z", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", "Z", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", "Z", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  expect(game.finished()).toBeTruthy();
});

test("player gets killed eventually", () => {
  const game = new ZombieSurvival([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", "B", "Z", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", "Z", " ", " ", " ", " "],
    ["R", "R", "R", "R", "Z", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", " ", "Z", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "Z", " ", " ", " ", " "],
    ["R", "R", "R", "R", "Z", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "Z", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", "Z", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "Z", "Z", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "P", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "Z", " ", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "Z", " ", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  expect(game.finished()).toBeTruthy();
});

test("player gets killed with too many zombies", () => {
  const game = new ZombieSurvival([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "Z"],
    [" ", " ", " ", "P", "B", " ", " ", " ", " ", "Z"],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", "Z"],
    ["R", "R", "R", "R", " ", " ", " ", " ", " ", "Z"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "Z"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "Z"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "Z"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "Z"],
    ["Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z"],
  ]);

  game.step();
  game.step();
  game.step();
  game.step();
  game.step();
  game.step();
  game.step();
  game.step();
  game.step();
  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "B", " ", " ", " ", " ", " "],
    [" ", " ", " ", "Z", "Z", " ", " ", " ", " ", " "],
    ["R", "R", "R", "R", "Z", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "Z", "Z", " ", " ", " ", " "],
    [" ", " ", " ", " ", "Z", "Z", " ", " ", " ", " "],
    [" ", " ", " ", " ", "Z", "Z", " ", " ", " ", " "],
    [" ", " ", " ", " ", "Z", " ", " ", " ", " ", " "],
    ["Z", "Z", " ", "Z", "Z", " ", " ", " ", " ", " "],
  ]);

  expect(game.finished()).toBeTruthy();
});

test("player gets killed behind walls", () => {
  const game = new ZombieSurvival([
    ["P", "B", "Z", " ", " ", " ", " ", " ", " ", " "],
    ["B", "B", "Z", " ", " ", " ", " ", " ", " ", " "],
    ["Z", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  game.step();
  game.step();
  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", "Z", " ", " ", " ", " ", " ", " ", " ", " "],
    ["Z", "B", " ", " ", " ", " ", " ", " ", " ", " "],
    ["Z", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  expect(game.finished()).toBeTruthy();
});

test("player kills zombie and it doesn't hit afterwards", () => {
  const game = new ZombieSurvival([
    ["P", " "],
    [" ", "Z"],
  ]);

  game.step();
  game.step();

  expect(game.getState()).toStrictEqual([
    ["P", " "],
    [" ", " "],
  ]);

  expect(game.finished()).toBeTruthy();
});

test.only("player kills closest zombie", () => {
  const game = new ZombieSurvival([
    [" ", " ", "R", " ", "Z"],
    [" ", " ", " ", " ", "B"],
    [" ", "P", " ", "R", " "],
    ["Z", " ", " ", " ", " "],
    [" ", " ", "B", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", "R", "Z", " "],
    [" ", " ", " ", " ", "B"],
    [" ", "P", " ", "R", " "],
    [" ", "Z", " ", " ", " "],
    [" ", " ", "B", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", "R", " ", " "],
    [" ", " ", " ", "Z", "B"],
    [" ", "P", " ", "R", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", "B", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", "R", " ", " "],
    [" ", " ", "Z", " ", "B"],
    [" ", "P", " ", "R", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", "B", " ", " "],
  ]);

  game.step();

  expect(game.getState()).toStrictEqual([
    [" ", " ", "R", " ", " "],
    [" ", " ", " ", " ", "B"],
    [" ", "P", " ", "R", " "],
    [" ", " ", " ", " ", " "],
    [" ", " ", "B", " ", " "],
  ]);

  expect(game.finished()).toBeTruthy();
});
