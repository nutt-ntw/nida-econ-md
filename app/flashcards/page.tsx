"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, RotateCcw, Shuffle } from "lucide-react";
import { flashcards } from "@/lib/content";
import { useStudyState } from "@/lib/storage";
import { Breadcrumbs } from "@/components/ui";

export default function FlashcardsPage() {
  const { state, update } = useStudyState();
  const [order, setOrder] = useState(() => flashcards.map((_, index) => index));
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = flashcards[order[position]];
  const rated = useMemo(() => Object.keys(state.cardRatings).length, [state.cardRatings]);

  const move = (direction: number) => { setPosition((current) => (current + direction + order.length) % order.length); setFlipped(false); };
  const rate = (rating: "known" | "unsure" | "review") => { update((current) => ({ ...current, cardRatings: { ...current.cardRatings, [card.id]: rating } })); move(1); };
  const shuffle = () => { setOrder((current) => [...current].sort(() => Math.random() - .5)); setPosition(0); setFlipped(false); };

  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "บัตรคำ" }]} />
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="eyebrow">Flashcards</span><h1 className="page-title mt-2">จำให้แม่น<br />ทีละใบ</h1><p className="mt-3 muted">บัตรคำสร้างจากสรุปและเชื่อมกลับไปยังบทเรียนกับ Material ที่เกี่ยวข้อง</p></div><button className="button-secondary self-start" onClick={shuffle}><Shuffle size={18} /> สุ่มลำดับ</button></div>
      <div className="mx-auto mt-8 max-w-4xl">
        <div className="mb-3 flex items-center justify-between text-sm muted"><span>ใบที่ {position + 1} จาก {order.length}</span><span>ประเมินแล้ว {rated}/{flashcards.length}</span></div><div className="progress-track mb-5"><div className="progress-fill" style={{ width: `${((position + 1) / order.length) * 100}%` }} /></div>
        <button onClick={() => setFlipped((value) => !value)} className="surface relative flex min-h-[25rem] w-full flex-col items-center justify-center overflow-hidden p-8 text-center sm:p-14" aria-label={flipped ? "แสดงคำถาม" : "แสดงคำตอบ"}>
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[var(--brand)] via-teal-300 to-[var(--accent)]" /><span className="eyebrow">{flipped ? "คำตอบ" : "คำถาม"}</span><p className="mt-7 max-w-2xl text-2xl font-extrabold leading-relaxed sm:text-3xl">{flipped ? card.answer : card.question}</p><span className="mt-9 inline-flex items-center gap-2 text-sm muted"><RotateCcw size={17} /> แตะเพื่อพลิกบัตร</span>
        </button>
        {flipped ? <div className="mt-5 grid gap-3 sm:grid-cols-3"><button onClick={() => rate("review")} className="button-secondary border-[color-mix(in_srgb,var(--danger)_40%,var(--line))]">ต้องทบทวน</button><button onClick={() => rate("unsure")} className="button-secondary border-[color-mix(in_srgb,var(--accent)_55%,var(--line))]">ยังไม่แน่ใจ</button><button onClick={() => rate("known")} className="button-primary">จำได้</button></div> : <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-3"><button onClick={() => move(-1)} className="button-secondary" aria-label="บัตรก่อนหน้า"><ArrowLeft size={19} /></button><button onClick={() => setFlipped(true)} className="button-primary">ดูเฉลย</button><button onClick={() => move(1)} className="button-secondary" aria-label="บัตรถัดไป"><ArrowRight size={19} /></button></div>}
        <Link href={`/lessons/${card.lessonSlug}/#${card.sectionId}`} className="button-ghost mx-auto mt-4 flex w-fit text-sm"><ExternalLink size={16} /> กลับไปยังเนื้อหาที่เกี่ยวข้อง</Link>
      </div>
    </div>
  );
}
