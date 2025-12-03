import fs from "fs";

const parseInput = (type: "input" | "sample") => {
  const result = fs
    .readFileSync(`${__dirname}/${type}.txt`)
    .toString()
    .trim()
    .split(",")
    .map((x) => x.split("-"))
    .map(([a, b]) => ({ firstId: Number(a), lastId: Number(b) }));
  return result;
};

const isInvalid = (id: number): boolean => {
  const idString = String(id);
  if (idString.length % 2 !== 0) {
    return false;
  }
  const midPoint = idString.length / 2;
  // console.log({ idString, midPoint });
  const a = Number(idString.slice(0, midPoint));
  const b = Number(idString.slice(midPoint, idString.length));
  const invalid = a === b;
  // console.log({ a, b, invalid });
  return invalid;
};

const part1 = (input: { firstId: number; lastId: number }[]) => {
  let total = 0;
  input.forEach(({ firstId, lastId }) => {
    console.log({ firstId, lastId });
    for (let id = firstId; id <= lastId; id++) {
      if (isInvalid(id)) {
        total += id;
      }
    }
  });
  return total;
};

const part2 = (input: number[]) => {};

const input = parseInput("input");
console.log("part1", part1(input));
// console.log("part2", part2(input));
