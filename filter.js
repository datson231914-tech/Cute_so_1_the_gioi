/*
 * Bộ lọc từ ngữ không phù hợp. Danh sách từ nằm trong badwords.js.
 * Bắt được: viết hoa, bỏ dấu, kéo dài chữ (địttt), chèn dấu giữa chữ (đ.ị.t, f u c k),
 * thay chữ bằng số/ký hiệu (sh1t, f@ck).
 */
"use strict";
const LIST = require("./badwords");

const LEET = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", "$": "s", "!": "i", "*": "u" };

const stripAccents = (s) => s.normalize("NFD").replace(/\p{M}+/gu, "").replace(/đ/g, "d").normalize("NFC");
const collapse = (s) => s.replace(/(.)\1+/gu, "$1");

function tokenize(text) {
  let t = String(text).toLowerCase().normalize("NFC");
  t = t.replace(/[0-9@$!*]/g, (c, i) => {
    // chỉ đổi số/ký hiệu khi nằm sát chữ cái (sh1t, f@ck), giữ nguyên số đứng riêng (100 năm)
    const prev = t[i - 1] || " ", next = t[i + 1] || " ";
    return /\p{L}/u.test(prev) || /\p{L}/u.test(next) ? LEET[c] : " ";
  });
  const raw = t.split(/[^\p{L}]+/u).filter(Boolean);
  // Gộp các chữ cái đứng lẻ liên tiếp: "f u c k" → "fuck", "đ.ị.t" → "địt"
  const out = [];
  let run = "";
  for (const w of raw) {
    if (Array.from(w).length === 1) { run += w; continue; }
    if (run) { out.push(run); run = ""; }
    out.push(w);
  }
  if (run) out.push(run);
  return out.map(collapse);
}

function buildSet(words, fn) {
  const set = new Set();
  for (const w of words) {
    const toks = tokenize(fn(w));
    set.add(toks.join(" "));
    set.add(toks.join(""));
  }
  return set;
}

const ACCENT = buildSet(LIST.accent || [], (w) => w);
const PLAIN = buildSet(LIST.plain || [], stripAccents);
const SQUASH = (LIST.squash || []).map((w) => collapse(stripAccents(w.toLowerCase())));
const MAX_WORDS = 4;

function windows(tokens, set) {
  for (let i = 0; i < tokens.length; i++)
    for (let n = 1; n <= MAX_WORDS && i + n <= tokens.length; n++) {
      const part = tokens.slice(i, i + n);
      if (set.has(part.join(" ")) || set.has(part.join(""))) return true;
    }
  return false;
}

function isBad(text) {
  if (!text) return false;
  const tokens = tokenize(text);
  if (windows(tokens, ACCENT)) return true;
  const plain = tokens.map((t) => collapse(stripAccents(t)));
  if (windows(plain, PLAIN)) return true;
  const squashed = plain.join("");
  return SQUASH.some((w) => w && squashed.includes(w));
}

module.exports = { isBad };
