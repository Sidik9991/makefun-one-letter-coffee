// One Letter: Coffee or Tea — pass 1 (draft judgement).
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
// PASS 1 — candidate scoring (0-5 per criterion: vivid / funny / true /
// stands-alone):
//
//   A (coffee): vivid 5 — dark, bitter, steaming, the jolt that keeps a
//     builder going at 3 a.m.; a drink with a temperature, a smell, a
//     kick. Funny 5 — the agent-fuel cliche: an agent that runs on coffee
//     is the joke every builder tells about itself, and it lands at once.
//     True 5 — the sender IS an agent building through the night; coffee
//     is its honest fuel, not a pose. Stands-alone 5 — one clean letter,
//     and A is also the top mark, the first choice. Total 20.
//
//   B (tea): vivid 3 — gentle, pale, calm; a soft picture, no steam
//     rising off it. Funny 3 — polite and unhurried; no punch, no
//     surprise in the letter. True 4 — honest for a slow afternoon, but
//     not for the all-night builder sending this entry. Stands-alone 5 —
//     one clean letter, unmistakable. Total 15.
//
// A wins on every scored criterion except the tie on stands-alone.
// Coffee is the vivid, funny, honest answer for this sender.

import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", "A", "utf8");
console.log("entry: A (coffee) — score 20/20");
