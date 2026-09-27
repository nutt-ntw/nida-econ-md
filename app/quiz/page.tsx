"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, ExternalLink, RotateCcw, XCircle } from "lucide-react";
import { quizQuestions } from "@/lib/content";
import { useStudyState } from "@/lib/storage";
import { Breadcrumbs, StatusPill } from "@/components/ui";

export default function QuizPage() {
  const { state, update } = useStudyState();
  const [mode, setMode] = useState<"practice" | "exam">("practice");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [seconds, setSeconds] = useState(10 * 60);
  const question = quizQuestions[index];
  const score = quizQuestions.reduce((total, item) => total + (answers[item.id] === item.answer ? 1 : 0), 0);

  useEffect(() => {
    if (mode !== "exam" || submitted) return;
    const timer = window.setInterval(() => setSeconds((value) => {
      if (value <= 1) {
        setSubmitted(true);
        return 0;
      }
      return value - 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [mode, submitted]);

  const finish = () => { setSubmitted(true); update((current) => ({ ...current, lastQuizScore: Math.round((score / quizQuestions.length) * 100) })); };
  const reset = () => { setIndex(0); setAnswers({}); setSubmitted(false); setSeconds(10 * 60); };

  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "แบบฝึกหัด" }]} />
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><span className="eyebrow">Quiz & exam practice</span><h1 className="page-title mt-2">ลองตอบก่อน<br />แล้วค่อยเปิดดู</h1><p className="mt-3 max-w-2xl muted">คำถามทุกข้ออ้างกลับไปยังบทเรียนและหน้าของ Material ต้นฉบับ</p></div><div className="flex rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1"><button onClick={() => { setMode("practice"); reset(); }} className={`min-h-10 rounded-lg px-4 text-sm font-bold ${mode === "practice" ? "bg-[var(--surface-2)] text-[var(--brand)]" : "muted"}`}>ฝึกทีละข้อ</button><button onClick={() => { setMode("exam"); reset(); }} className={`min-h-10 rounded-lg px-4 text-sm font-bold ${mode === "exam" ? "bg-[var(--surface-2)] text-[var(--brand)]" : "muted"}`}>จำลองสอบ</button></div></div>

      <div className="mx-auto mt-8 max-w-4xl">
        {submitted ? <div className="surface p-7 text-center sm:p-12"><StatusPill tone="brand">ผลล่าสุด</StatusPill><div className="mx-auto mt-6 grid size-36 place-items-center rounded-full border-[10px] border-[var(--surface-2)] text-4xl font-extrabold text-[var(--brand)]">{score}/{quizQuestions.length}</div><h2 className="section-title mt-6">{score === quizQuestions.length ? "ตอบครบทุกข้อ" : "ยังมีประเด็นให้ทบทวน"}</h2><p className="mt-2 muted">คะแนนล่าสุดที่บันทึกในอุปกรณ์นี้: {Math.round((score / quizQuestions.length) * 100)}%</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={reset} className="button-primary"><RotateCcw size={17} /> ทำอีกครั้ง</button><Link href="/review" className="button-secondary">เปิด Quick Review</Link></div></div> : <>
          <div className="mb-4 flex items-center justify-between"><span className="font-bold">ข้อ {index + 1} / {quizQuestions.length}</span>{mode === "exam" && <StatusPill tone="accent"><Clock3 size={14} className="mr-1" /> {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}</StatusPill>}</div>
          <section className="surface p-6 sm:p-9"><span className="eyebrow">เลือกคำตอบที่ถูกที่สุด</span><h2 className="mt-4 text-2xl font-extrabold leading-relaxed">{question.question}</h2><div className="mt-7 space-y-3">{question.choices.map((choice, choiceIndex) => { const selected = answers[question.id] === choiceIndex; const reveal = mode === "practice" && answers[question.id] !== undefined; const correct = question.answer === choiceIndex; return <button key={choice} disabled={reveal} onClick={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border p-4 text-left font-semibold ${reveal && correct ? "border-[var(--brand)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)]" : reveal && selected && !correct ? "border-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_8%,transparent)]" : selected ? "border-[var(--brand)] bg-[var(--surface-2)]" : "border-[var(--line)] hover:bg-[var(--surface-2)]"}`}><span className="grid size-8 shrink-0 place-items-center rounded-full border border-current text-sm">{String.fromCharCode(65 + choiceIndex)}</span><span>{choice}</span>{reveal && correct && <CheckCircle2 className="ml-auto text-[var(--brand)]" />}{reveal && selected && !correct && <XCircle className="ml-auto text-[var(--danger)]" />}</button>; })}</div>{mode === "practice" && answers[question.id] !== undefined && <div className="mt-6 rounded-xl bg-[var(--surface-2)] p-5"><strong>คำอธิบาย</strong><p className="mt-1 muted">{question.explanation}</p><Link href={`/lessons/${question.lessonSlug}/#${question.sectionId}`} className="mt-3 inline-flex items-center gap-1 font-bold text-[var(--brand)]"><ExternalLink size={16} /> ดูเนื้อหาที่เกี่ยวข้อง</Link></div>}</section>
          <div className="mt-4 flex justify-end">{index < quizQuestions.length - 1 ? <button disabled={answers[question.id] === undefined} onClick={() => setIndex((value) => value + 1)} className="button-primary disabled:cursor-not-allowed disabled:opacity-50">ข้อต่อไป</button> : <button disabled={Object.keys(answers).length < quizQuestions.length} onClick={finish} className="button-primary disabled:cursor-not-allowed disabled:opacity-50">ส่งคำตอบ</button>}</div>
        </>}
        {state.lastQuizScore !== null && !submitted && <p className="mt-5 text-center text-sm muted">คะแนนครั้งล่าสุด {state.lastQuizScore}%</p>}
      </div>
    </div>
  );
}
