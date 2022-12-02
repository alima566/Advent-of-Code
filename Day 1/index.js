//@ts-check
import fs from "fs/promises";

const formatData = async () => {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });
  return data.split("\n\n").map((d) => d.split("\n").map((i) => +i));
};

const sort = (/** @type {number[]} */ arr) => {
  if (arr.length < 2) return arr;
  const [p, ...rest] = arr;

  const low = rest.filter((/** @type {number} */ n) => n <= p);
  const high = rest.filter((/** @type {number} */ n) => n > p);
  return [...sort(high), p, ...sort(low)];
};

(async () => {
  try {
    const elves = await formatData();
    const arr = [];
    for (let elf of elves) {
      let sum = elf.reduce((acc, curr) => acc + curr);
      arr.push(sum);
    }

    // Answer to part 1
    const highest = sort(arr)[0];
    console.log(`The highest calorie total that an elf is carrying is ${highest}.`);

    // Answer to part 2
    const topThree = [highest, sort(arr)[1], sort(arr)[2]];
    const sumOfTopThree = topThree.reduce((acc, curr) => acc + curr);
    console.log(`The top three calories are ${topThree.join(", ")} with a total sum of ${sumOfTopThree}.`);
  } catch (e) {
    console.error(e);
  }
})();
