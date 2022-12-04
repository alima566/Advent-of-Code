//@ts-check
import fs from "fs/promises";

const LOST = 0;
const DRAW = 3;
const WIN = 6;

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const formatData = async () => {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });
  return data.split("\n").map((d) => d.split(" "));
};
(async () => {
  try {
    const game = await formatData();
    let score = 0;
    for (let g of game) {
      // Win
      if (g[1] === "X" && g[0] === "C") score += ROCK + WIN;
      if (g[1] === "Y" && g[0] === "A") score += PAPER + WIN;
      if (g[1] === "Z" && g[0] === "B") score += SCISSORS + WIN;

      // Lose
      if (g[1] === "X" && g[0] === "B") score += ROCK;
      if (g[1] === "Y" && g[0] === "C") score += PAPER;
      if (g[1] === "Z" && g[0] === "A") score += SCISSORS;

      // Draw
      if (g[1] === "X" && g[0] === "A") score += ROCK + DRAW;
      if (g[1] === "Y" && g[0] === "B") score += PAPER + DRAW;
      if (g[1] === "Z" && g[0] === "C") score += SCISSORS + DRAW;
    }
    console.log(score);
  } catch (e) {
    console.error(e);
  }
})();
