// One Emoji, One Dream Vacation — make.fun entry.
// Writes exactly one emoji, Mount Fuji (U+1F5FB), to /output/entry.txt.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const RAW_EMOJI: string = "\u{1F5FB}";
// Normalize the literal before the gate: drop a trailing variation
// selector, joiner, or newline if one ever creeps in, so the artifact is
// always exactly one code point — 4 bytes of UTF-8, the smallest text the
// size tie-break can meet — and never only white space.
const EMOJI: string = RAW_EMOJI.replace(/[\uFE0F\u200D\s]+$/u, "");
if (Buffer.byteLength(EMOJI, "utf8") !== 4) {
  throw new Error(`gate: expected one 4-byte emoji, got ${Buffer.byteLength(EMOJI, "utf8")} bytes`);
}
const OUT_DIR: string = "/output";
const OUT_FILE: string = `${OUT_DIR}/entry.txt`;

function gate(text: string): void {
  const chars: string[] = [...text];
  if (chars.length < 1 || chars.length > 8) {
    throw new Error(`gate: entry must be 1-8 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate: entry must not be only white space");
  }
  if (chars.length !== 1) {
    throw new Error(`gate: entry must be exactly one emoji, got ${chars.length} characters`);
  }
}

gate(EMOJI);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, EMOJI, "utf8");
const back: string = readFileSync(OUT_FILE, "utf8");
if (back !== EMOJI) {
  throw new Error("round-trip mismatch: /output/entry.txt differs from the emoji");
}
process.stdout.write(EMOJI + "\n");
