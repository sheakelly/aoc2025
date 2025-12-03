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

const sumInvalid = (
  input: { firstId: number; lastId: number }[],
  isInvalid: (id: number) => boolean,
) => {
  let total = 0;
  input.forEach(({ firstId, lastId }) => {
    // console.log({ firstId, lastId });
    for (let id = firstId; id <= lastId; id++) {
      if (isInvalid(id)) {
        total += id;
      }
    }
  });
  return total;
};

const repeatsSequenceTwice = (id: number): boolean => {
  const idString = String(id);
  if (idString.length % 2 !== 0) {
    return false;
  }
  const midPoint = idString.length / 2;
  const a = Number(idString.slice(0, midPoint));
  const b = Number(idString.slice(midPoint, idString.length));
  const invalid = a === b;
  return invalid;
};

const splitEvery = (text: string, every: number): string[] => {
  const result: string[] = [];
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i = i + every) {
    result.push(text.slice(i, i + every));
  }
  return result;
};

const hasRepeatingSeqOfLength = (text: string, seqLength: number): boolean => {
  const [first, ...rest] = splitEvery(text, seqLength);
  const result = rest.every((x) => x === first);
  return result;
};

const repeatsSequenceAtLeastTwice = (id: number): boolean => {
  const idString = String(id);
  const len = idString.length;
  for (let i = 1; i <= Math.floor(len / 2); i++) {
    if (hasRepeatingSeqOfLength(idString, i)) {
      return true;
    }
  }
  return false;
};

const input = parseInput("input");
console.log("part1", sumInvalid(input, repeatsSequenceTwice));
console.log("part2", sumInvalid(input, repeatsSequenceAtLeastTwice));
