import fs from "fs"

const parseInput = (type: "input" | "sample"): number[] => {
  const result = fs
    .readFileSync(`${__dirname}/${type}.txt`)
    .toString()
    .trim()
    .split("\n")
    .map((x) => ({
      direction: x.slice(0, 1) as "L" | "R",
      value: parseInt(x.slice(1)),
    }))
    .map(({ direction, value }) => (direction === "L" ? value * -1 : value))
  return result
}

const part1 = (input: number[]) => {
  let dial = 50
  let password = 0
  input.forEach((rotation) => {
    dial += rotation % 100
    if (dial < 0) {
      dial += 100
    }
    if (dial > 100) {
      dial -= 100
    }
    if (dial === 100) {
      dial = 0
    }
    if (dial === 0) {
      password++
    }
  })
  return password
}

const part2 = (input: number[]) => {
  let dial = 50
  let password = 0
  input.forEach((rotation) => {
    const startDial = dial
    const fullRotations =
      Math.abs(rotation) > 100 ? Math.floor(Math.abs(rotation) / 100) : 0
    password += fullRotations
    dial += rotation % 100
    if (startDial !== 0 && (dial <= 0 || dial >= 100)) {
      password++
    }
    if (dial < 0) {
      dial += 100
    }
    if (dial > 100) {
      dial -= 100
    }
    if (dial === 100) {
      dial = 0
    }
  })
  return password
}

const input = parseInput("input")
console.log("part1", part1(input))
console.log("part2", part2(input))
