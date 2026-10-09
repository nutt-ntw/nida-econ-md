"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Headphones, Pause, Play, RotateCcw, SkipBack, SkipForward, Square } from "lucide-react";
import { lessons, sourceHref } from "@/lib/content";
import { listeningEpisodes } from "@/lib/listening";
import { NarrationPlayer, type NarrationState } from "@/lib/narration-player";
import { Breadcrumbs, StatusPill } from "@/components/ui";

const initialState: NarrationState = { status: "idle", segmentIndex: 0, chunkIndex: 0, message: "" };

export default function ListenPage() {
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [playback, setPlayback] = useState(initialState);
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceId, setVoiceId] = useState("");
  const [rate, setRate] = useState(0.9);
  const player = useRef<NarrationPlayer | null>(null);
  const episode = listeningEpisodes[episodeIndex];
  const lesson = lessons.find((item) => item.slug === episode.slug)!;
  const playing = playback.status === "playing";
  const canPlay = ready && supported && voices.length > 0;
  const activeSegment = episode.segments[playback.segmentIndex];

  const refreshVoices = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    const available = window.speechSynthesis.getVoices().filter((voice) => /^th(?:[-_]|$)/i.test(voice.lang));
    setVoices(available);
    setVoiceId((current) => available.some((voice) => voice.voiceURI === current)
      ? current : (available.find((voice) => voice.default)?.voiceURI ?? available[0]?.voiceURI ?? ""));
  }, []);

  useEffect(() => {
    const hasSpeech = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
    const frame = window.requestAnimationFrame(() => {
      setSupported(hasSpeech);
      setReady(true);
      const slug = window.location.hash.slice(1);
      const index = Math.max(0, listeningEpisodes.findIndex((item) => item.slug === slug));
      setEpisodeIndex(index);
      if (!hasSpeech) return;
      player.current = new NarrationPlayer(window.speechSynthesis, (text) => new SpeechSynthesisUtterance(text), setPlayback);
      player.current.load(listeningEpisodes[index].segments);
      refreshVoices();
    });
    if (hasSpeech) window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
    const retry = window.setTimeout(refreshVoices, 1500);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retry);
      if (hasSpeech) window.speechSynthesis.removeEventListener("voiceschanged", refreshVoices);
      player.current?.dispose();
      player.current = null;
    };
  }, [refreshVoices]);

  const selectEpisode = (index: number) => {
    setEpisodeIndex(index);
    player.current?.load(listeningEpisodes[index].segments);
    setPlayback(initialState);
    window.history.replaceState(null, "", `#${listeningEpisodes[index].slug}`);
  };

  const play = (segmentIndex?: number) => {
    if (!canPlay) return;
    player.current?.configure(voices.find((voice) => voice.voiceURI === voiceId) ?? voices[0], rate);
    player.current?.play(segmentIndex);
  };

  const changeVoice = (value: string) => {
    setVoiceId(value);
    player.current?.configure(voices.find((voice) => voice.voiceURI === value) ?? voices[0], rate);
  };

  const changeRate = (value: number) => {
    setRate(value);
    player.current?.configure(voices.find((voice) => voice.voiceURI === voiceId) ?? voices[0], value);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "ฟังบทเรียน" }]} />
      <div className="flex items-start gap-4">
        <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-[var(--brand)] text-white sm:grid"><Headphones size={27} /></span>
        <div><span className="eyebrow">เริ่มจากศูนย์ ค่อย ๆ เข้าใจ</span><h1 className="page-title mt-2">ให้เศรษฐศาสตร์<br />เป็นเรื่องใกล้ตัว</h1><p className="mt-4 max-w-2xl text-lg muted">ฟังคำอธิบายภาษาง่ายทีละช่วง เริ่มจากตัวอย่างในชีวิตประจำวัน แล้วค่อยเชื่อมศัพท์และแนวข้อสอบ ไม่ต้องมีพื้นฐานมาก่อน</p></div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[19rem_minmax(0,1fr)]">
        <aside><span className="eyebrow">ฟังตามลำดับ หรือเลือกเรื่องที่สนใจ</span><label className="mt-3 block xl:hidden" htmlFor="listen-episode"><span className="sr-only">เลือกตอนที่ต้องการฟัง</span><select id="listen-episode" value={episodeIndex} onChange={(event) => selectEpisode(Number(event.target.value))} className="min-h-12 w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 text-[var(--ink)]">{listeningEpisodes.map((item, index) => <option key={item.slug} value={index}>{index + 1}. {item.title}</option>)}</select></label><nav className="mt-3 hidden space-y-2 xl:block" aria-label="เลือกบทสำหรับฟัง">{listeningEpisodes.map((item, index) => <button key={item.slug} onClick={() => selectEpisode(index)} aria-current={index === episodeIndex ? "true" : undefined} className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left ${index === episodeIndex ? "border-[var(--brand)] bg-[var(--surface-2)]" : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)]"}`}><span className="mt-0.5 text-sm font-extrabold text-[var(--brand)]">{String(index + 1).padStart(2, "0")}</span><span><strong className="block leading-snug">{item.title}</strong><small className="mt-1 block muted">{item.segments.length} ช่วงสั้น ๆ</small></span></button>)}</nav><p className="mt-4 text-sm muted">ตัวอย่างสมมติช่วยอธิบายแนวคิด แต่ละช่วงมีลิงก์ไปยังบทเรียนและชีทที่เกี่ยวข้อง</p></aside>

        <article className="min-w-0">
          <header className="surface p-6 sm:p-8"><StatusPill tone="brand">ตอนที่ {episodeIndex + 1} / {listeningEpisodes.length} · ไม่ต้องมีพื้นฐาน</StatusPill><h2 className="section-title mt-4">{episode.title}</h2><p className="mt-2 muted">{episode.description}</p></header>

          <section className="surface sticky top-20 z-20 mt-4 p-4 sm:p-5" aria-label="เครื่องเล่นเสียงบทเรียน">
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => playing ? player.current?.pause() : play()} disabled={!canPlay} className="button-primary disabled:cursor-not-allowed disabled:opacity-50">{playing ? <Pause size={19} /> : <Play size={19} />}{playing ? "พักเสียง" : playback.status === "paused" ? "ฟังต่อ" : playback.status === "ended" ? "ฟังอีกครั้ง" : "เริ่มฟัง"}</button>
              <button onClick={() => player.current?.stop()} disabled={!supported || playback.status === "idle"} className="button-secondary disabled:opacity-40"><Square size={16} /> หยุด</button>
              <button onClick={() => play(Math.max(0, playback.segmentIndex - 1))} disabled={!canPlay || playback.segmentIndex === 0} className="button-ghost !px-2 disabled:opacity-40" aria-label="ฟังช่วงก่อนหน้า"><SkipBack size={20} /></button>
              <button onClick={() => play(playback.segmentIndex + 1)} disabled={!canPlay || playback.segmentIndex >= episode.segments.length - 1} className="button-ghost !px-2 disabled:opacity-40" aria-label="ฟังช่วงถัดไป"><SkipForward size={20} /></button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="flex min-w-0 flex-col gap-1 text-sm font-semibold" htmlFor="narration-voice">เสียงภาษาไทย<select id="narration-voice" className="min-h-11 w-full min-w-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 text-[var(--ink)]" value={voiceId} onChange={(event) => changeVoice(event.target.value)} disabled={!voices.length}>{voices.length ? voices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name}</option>) : <option value="">{ready ? "ยังไม่พบเสียงภาษาไทย" : "กำลังค้นหาเสียง…"}</option>}</select></label>
              <label className="flex flex-col gap-1 text-sm font-semibold" htmlFor="narration-speed">ความเร็ว<select id="narration-speed" className="min-h-11 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 text-[var(--ink)]" value={rate} onChange={(event) => changeRate(Number(event.target.value))}><option value={0.75}>ช้า · 0.75×</option><option value={0.9}>ฟังสบาย · 0.9×</option><option value={1}>ปกติ · 1×</option><option value={1.2}>เร็ว · 1.2×</option></select></label>
            </div>
            <p role="status" aria-live="polite" className="mt-3 text-sm muted">{!ready ? "กำลังเตรียมเสียง…" : !supported ? "เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง อ่านบทเล่าด้านล่างได้ หรือเปิดด้วยเบราว์เซอร์อื่น" : !voices.length ? "ยังไม่พบเสียงภาษาไทยในเครื่อง เพิ่มเสียงภาษาไทยในการตั้งค่าเสียงของอุปกรณ์ แล้วกดค้นหาเสียงใหม่" : playback.status === "error" ? playback.message : playback.status === "ended" ? "ฟังจบตอนแล้ว ลองตอบคำถามท้ายตอนก่อนฟังเรื่องถัดไป" : playback.status === "paused" ? "พักเสียงแล้ว เมื่อฟังต่อจะทวนวลีที่ค้างไว้" : playing ? `กำลังอ่านช่วง ${playback.segmentIndex + 1}: ${activeSegment.title}` : "กดเริ่มฟัง แล้วอ่านตามบทเล่าด้านล่างได้"}</p>
            {supported && !voices.length && <button onClick={refreshVoices} className="button-ghost mt-2 text-sm"><RotateCcw size={16} /> ค้นหาเสียงใหม่</button>}
            <details className="mt-2 text-xs muted"><summary className="cursor-pointer">เกี่ยวกับเสียงอ่าน</summary><p className="mt-1">ใช้เสียงสังเคราะห์ภาษาไทยของอุปกรณ์ คุณภาพเสียงและการฟังขณะล็อกหน้าจอขึ้นกับเครื่องและเบราว์เซอร์ที่ใช้</p></details>
          </section>

          <div className="mt-6 flex items-center justify-between"><h3 className="text-lg font-extrabold">บทเล่าสำหรับอ่านตาม</h3><span className="text-sm muted">{episode.segments.length} ช่วง</span></div>
          <div className="mt-3 space-y-4">{episode.segments.map((segment, index) => {
            const active = playback.status !== "idle" && playback.segmentIndex === index;
            const reference = lesson.sections.find((section) => section.id === segment.sectionId)?.reference;
            return <section key={segment.title} className={`surface p-5 sm:p-7 ${active ? "!border-[var(--brand)] ring-2 ring-[color-mix(in_srgb,var(--brand)_15%,transparent)]" : ""}`}>
              <div className="flex items-start justify-between gap-3"><div><span className="eyebrow">ช่วงที่ {index + 1}{active && playing ? " · กำลังอ่าน" : ""}</span><h4 className="mt-1 text-xl font-extrabold">{segment.title}</h4></div><button onClick={() => play(index)} disabled={!canPlay} className="button-ghost shrink-0 !px-2 disabled:opacity-40" aria-label={`ฟังช่วง ${segment.title}`}><Play size={19} /></button></div>
              <p className="mt-4 text-[1.05rem] leading-9">{segment.text}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[var(--brand)]"><Link href={`/lessons/${episode.slug}/#${segment.sectionId}`}>อ่านบทเรียนที่เกี่ยวข้อง</Link>{reference && <a href={sourceHref(reference)} target="_blank" rel="noreferrer">{reference.label}</a>}</div>
            </section>;
          })}</div>

          <section className="surface mt-5 p-6"><h3 className="text-xl font-extrabold">ศัพท์ที่เพิ่งได้ยิน</h3><dl className="mt-4 space-y-3">{episode.vocabulary.map((item) => <div key={item.term}><dt className="font-bold text-[var(--brand)]">{item.term}</dt><dd className="muted">{item.meaning}</dd></div>)}</dl></section>
          <section key={episode.slug} className="surface mt-5 p-6"><CheckCircle2 className="text-[var(--brand)]" /><h3 className="mt-3 text-xl font-extrabold">จำแก่นเรื่องนี้ให้ได้</h3><p className="mt-2">{episode.takeaway}</p><div className="mt-5 border-t border-[var(--line)] pt-5"><p className="font-bold">ลองตอบเอง: {episode.check.question}</p><details className="mt-3"><summary className="cursor-pointer font-bold text-[var(--brand)]">เปิดคำตอบ</summary><p className="mt-2 muted">{episode.check.answer}</p></details></div></section>
          <div className="mt-5 flex flex-wrap gap-3"><Link href={`/lessons/${episode.slug}/`} className="button-secondary"><BookOpen size={18} /> ไปบทเรียนเต็ม</Link>{episodeIndex < listeningEpisodes.length - 1 ? <button onClick={() => selectEpisode(episodeIndex + 1)} className="button-primary">ตอนถัดไป <ArrowRight size={18} /></button> : <Link href="/exam-prep" className="button-primary">พร้อมแล้ว ไปเตรียมสอบ <ArrowRight size={18} /></Link>}</div>
        </article>
      </div>
    </div>
  );
}
