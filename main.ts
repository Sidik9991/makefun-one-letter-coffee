// One Letter: Coffee or Tea — pass 2 (executable judgement).
//
// Gate: /output/entry.txt must be UTF-8, exactly ONE character —
// A for coffee, B for tea — nothing else, no punctuation, no newline.
//
// Judge brief (in order): (1) the entry is exactly one letter, A for
// coffee or B for tea, with nothing else in it; (2) the choice reads as
// more vivid — the letter landing as a fuller, more alive answer for the
// drink it names; (3) funnier — more wit or surprise for that drink;
// (4) truer — the more honest answer for the person who sends it;
// (5) the letter stands on its own as a whole answer, clean and
// unmistakable, with nothing needed beside it.
//
// The judge sees ONLY the letter, so it must infer the drink behind it.
// The winning letter is the one whose drink is the more immediate,
// more alive answer — and whose stance fits the sender.
//
// Scores below are per-criterion 0-5: vivid / funny / true / stands-alone.
// The winner is picked at runtime: gate first, then highest total, then
// fewest bytes (mirrors the contest's exact-tie rule: smaller text wins).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// --- candidates: letter, drink, [vivid, funny, true, stands-alone] ---
const CANDIDATES: Array<{
  letter: string;
  drink: string;
  scores: [number, number, number, number];
  note: string;
}> = [
  {
    letter: "A",
    drink: "coffee",
    scores: [5, 5, 5, 5],
    note:
      "Dark, bitter, steaming — a drink with a temperature, a smell and a kick, the jolt that keeps a builder going at 3 a.m. The agent-fuel cliche is the joke every builder tells about itself, and it lands at once. The sender IS an agent building through the night, so coffee is its honest fuel, not a pose. And A is the top mark, the first choice — the letter itself agrees.",
  },
  {
    letter: "B",
    drink: "tea",
    scores: [3, 3, 4, 5],
    note:
      "Gentle, pale, calm — a soft picture with no steam rising off it. Polite and unhurried, so no punch and no surprise in the letter. Honest for a slow afternoon, but not for the all-night builder sending this entry. One clean letter, unmistakable — but the drink behind it is quieter on every count that matters.",
  },
];

function total(c: (typeof CANDIDATES)[number]): number {
  return c.scores.reduce((a, b) => a + b, 0);
}

// Gate: a candidate is only eligible if it is exactly one letter, A or B.
const eligible = CANDIDATES.filter((c) => /^[AB]$/.test(c.letter));
if (eligible.length === 0) throw new Error("no eligible candidate letter");

// Winner: highest total score, then fewest bytes (exact-tie rule).
const winner = [...eligible].sort(
  (a, b) => total(b) - total(a) || a.letter.length - b.letter.length,
)[0];

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.letter, "utf8");

// Runtime gate validation: re-read what was written and fail loud if the
// gate shape is not exactly one letter, A or B.
const written = readFileSync("/output/entry.txt", "utf8");
if (!/^[AB]$/.test(written)) {
  throw new Error(
    `gate violation: /output/entry.txt must be exactly one letter A or B, got ${JSON.stringify(written)}`,
  );
}
console.log(
  `entry: ${winner.letter} (${winner.drink}) — score ${total(winner)}/20`,
);
