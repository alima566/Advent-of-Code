//@ts-check
import fs from "fs/promises";

const LOST = 0;
const DRAW = 3;
const WIN = 6;

let obj = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
};

const formatData = async () => {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });
  return data.split("\n").map((d) => d);
};
(async () => {
  try {
    const game = await formatData();
    let score = 0;
    for (let g of game) {
      let [opp, choice] = g.split(" ");
      opp = obj[opp];

      if (choice === "Y") score += DRAW + +opp;
      if (choice === "Z") score += WIN + (+opp + 1 === 4 ? 1 : +opp + 1);
      if (choice === "X") score += +opp - 1 === 0 ? DRAW : +opp - 1;
    }
    console.log(score);
  } catch (e) {
    console.error(e);
  }
})();
