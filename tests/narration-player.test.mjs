import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";
import ts from "typescript";

async function loadTypeScript(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { NarrationPlayer, splitSpokenText } = await loadTypeScript("../lib/narration-player.ts");
const { listeningEpisodes } = await loadTypeScript("../lib/listening.ts");
const { lessons, materials } = await loadTypeScript("../lib/content.ts");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function setup(t) {
  const spoken = [];
  let state;
  const synth = {
    cancel() {},
    resume() {},
    speak(utterance) { spoken.push(utterance); utterance.onstart?.(); },
  };
  const player = new NarrationPlayer(synth, (text) => ({ text }), (value) => { state = value; });
  t.after(() => player.dispose());
  player.load([{ title: "หนึ่ง", text: "คำอธิบายแรก" }, { title: "สอง", text: "คำอธิบายถัดไป" }]);
  return { player, spoken, state: () => state };
}

test("Thai narration preserves complete authored sentences and content", () => {
  const text = listeningEpisodes[0].segments[0].text;
  const chunks = splitSpokenText(text);
  assert.ok(chunks.length > 1);
  assert.deepEqual(chunks, text.split("\n"));
  assert.ok(chunks.every((part) => part.length <= 400));
  assert.equal(chunks.join("").replace(/\s/g, ""), text.replace(/\s/g, ""));
});

test("finishing advances to the next segment and ends the episode", async (t) => {
  const f = setup(t);
  f.player.play();
  assert.equal(f.state().status, "playing");
  f.spoken[0].onend();
  await delay(110);
  assert.equal(f.state().segmentIndex, 1);
  f.spoken[1].onend();
  assert.equal(f.state().status, "ended");
  f.player.play();
  assert.equal(f.state().segmentIndex, 0);
});

test("pause preserves the phrase and ignores stale completion callbacks", async (t) => {
  const f = setup(t);
  f.player.play();
  const staleEnd = f.spoken[0].onend;
  f.player.pause();
  staleEnd();
  await delay(110);
  assert.equal(f.state().status, "paused");
  assert.equal(f.spoken.length, 1);
  f.player.play();
  assert.equal(f.spoken[1].text, f.spoken[0].text);
});

test("selecting another episode cancels queued continuation", async (t) => {
  const f = setup(t);
  f.player.play();
  f.spoken[0].onend();
  f.player.load([{ title: "ใหม่", text: "เรื่องใหม่" }]);
  await delay(110);
  assert.equal(f.state().status, "idle");
  assert.equal(f.spoken.length, 1);
});

test("voice and rate change restart only the current phrase", (t) => {
  const f = setup(t);
  f.player.play(1);
  const voice = { lang: "th-TH", voiceURI: "thai-test" };
  f.player.configure(voice, 0.75);
  assert.equal(f.spoken[1].text, f.spoken[0].text);
  assert.equal(f.spoken[1].voice, voice);
  assert.equal(f.spoken[1].rate, 0.75);
  f.player.pause();
  f.player.configure(voice, 1.2);
  assert.equal(f.spoken.length, 2);
  f.player.play();
  assert.equal(f.spoken[2].rate, 1.2);
  f.player.stop();
  assert.equal(f.state().status, "idle");
  assert.equal(f.state().segmentIndex, 0);
});

test("speech errors offer recovery without advancing the episode", (t) => {
  const f = setup(t);
  f.player.play();
  f.spoken[0].onerror({ error: "not-allowed" });
  assert.equal(f.state().status, "error");
  assert.match(f.state().message, /กดเล่นอีกครั้ง/);
  f.player.play();
  assert.equal(f.state().status, "playing");
  assert.equal(f.state().segmentIndex, 0);
});

test("all narration sources are original material sheets with valid PDF pages", () => {
  assert.equal(listeningEpisodes.length, 8);
  assert.equal(new Set(listeningEpisodes.map((item) => item.slug)).size, 8);
  for (const episode of listeningEpisodes) {
    assert.ok(lessons.some((item) => item.slug === episode.slug), episode.slug);
    for (const segment of episode.segments) {
      const lesson = lessons.find((item) => item.slug === (segment.lessonSlug ?? episode.slug));
      assert.ok(lesson?.sections.some((item) => item.id === segment.sectionId), `${episode.slug} / ${segment.sectionId}`);
      const reference = segment.reference;
      assert.match(reference.materialId, /^set-[1-8]$/, "No exam-summary-only or external sources in narration");
      assert.equal(reference.externalUrl, undefined);
      const material = materials.find((item) => item.id === reference.materialId);
      assert.ok(material);
      assert.ok(Number.isInteger(reference.page) && reference.page >= 1);
      assert.ok(reference.pageEnd >= reference.page && reference.pageEnd <= material.pageCount);
      assert.equal(reference.label, `ชุดที่ ${reference.materialId.slice(4)} หน้า ${reference.page}${reference.pageEnd === reference.page ? "" : `–${reference.pageEnd}`}`);
      assert.doesNotMatch(segment.text, /สมมติ(?:ว่า|คุณ|เดือน)|กาแฟ|สองหมื่นห้าพันบาท|ลบสองร้อย|ลบสาม/, "No prior invented or exam-summary-only examples");
    }
  }
});

test("long sentences use bounded fallback without losing Thai or unbroken Latin text", () => {
  for (const text of ["การจัดสรรทรัพยากร".repeat(50), "a".repeat(600)]) {
    const chunks = splitSpokenText(text, 160);
    assert.ok(chunks.every((part) => part.length <= 160));
    assert.equal(chunks.join(""), text);
  }
});

test("every authored sentence in all 32 segments is read whole", () => {
  const segments = listeningEpisodes.flatMap((episode) => episode.segments);
  assert.equal(segments.length, 32);
  for (const segment of segments) {
    assert.deepEqual(splitSpokenText(segment.text), segment.text.split("\n"), segment.title);
  }
});

test("decimal numbers remain intact and punctuation can mark sentence boundaries", () => {
  const text = "ค่าเท่ากับ 16.67 บาท. จบแล้วครับ! ทวนอีกครั้ง";
  assert.deepEqual(splitSpokenText(text), ["ค่าเท่ากับ 16.67 บาท.", "จบแล้วครับ!", "ทวนอีกครั้ง"]);
});

test("older browsers without Intl.Segmenter can still split and read Thai", () => {
  const original = Intl.Segmenter;
  try {
    Intl.Segmenter = undefined;
    const text = "สวัสดีครับ วันนี้เรามาเรียนเศรษฐศาสตร์ด้วยกัน 🎧";
    assert.equal(splitSpokenText(text, 20).join("").replace(/\s/g, ""), text.replace(/\s/g, ""));
  } finally {
    Intl.Segmenter = original;
  }
});
