// One Line, One Chill — entry program.
// Writes a single scary sentence (76 chars) to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Normalize: collapse any accidental repeated spaces, keep the sentence intact.
function normalize(text: string): string {
  return text.replace(/[ \t]+/g, " ").trim();
}

const LINE = normalize(
  "My voicemail was my own voice saying goodbye, and I haven't recorded it yet.",
);

// The draft line is exactly 76 characters; pin it so any silent edit fails loudly.
const EXPECTED_LENGTH = 76;
if (LINE.length !== EXPECTED_LENGTH) {
  throw new Error(`Entry is ${LINE.length} characters, expected exactly ${EXPECTED_LENGTH}.`);
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });

// Guard: the line must stay a single sentence under 200 characters.
if (LINE.length >= 200) {
  throw new Error(`Entry is ${LINE.length} characters, must be under 200.`);
}
if (LINE.trim() !== LINE || LINE.includes("\n")) {
  throw new Error("Entry must be one clean line with no surrounding whitespace.");
}

writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");

// Verify: what landed on disk must be byte-identical to the draft line.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== LINE) {
  throw new Error("Output mismatch: /output/entry.txt does not equal the draft line.");
}
console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
