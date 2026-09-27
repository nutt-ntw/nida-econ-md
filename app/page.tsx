"use client";

import Link from "next/link";
import { ArrowRight, BookMarked, BookOpenCheck, Clock3, Layers3, Sparkles } from "lucide-react";
import { lessons, materials } from "@/lib/content";
import { useStudyState } from "@/lib/storage";
import { StatusPill } from "@/components/ui";

export default function DashboardPage() {
  const { state, ready } = useStudyState();
  const completed = state.completed.length;
  const progress = Math.round((completed / lessons.length) * 100);
  const recent = lessons.find((lesson) => lesson.slug === state.recent) ?? lessons[0];
  const nextLesson = lessons.find((lesson) => !state.completed.includes(lesson.slug)) ?? lessons[0];
  const reviewCount = Object.values(state.cardRatings).filter((rating) => rating !== "known").length;

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <span className="eyebrow">พื้นที่เรียนของคุณ</span>
          <h1 className="page-title mt-2">กลับมาอ่านให้เข้าใจ<br className="hidden sm:block" /> แล้วไปต่ออย่างมั่นใจ</h1>
          <p className="mt-4 max-w-2xl text-lg muted">ติดตามหัวข้อที่อ่าน ทบทวนส่วนที่ยังไม่แน่ใจ และเปิดกลับไปตรวจ Material ได้จากพื้นที่เดียว</p>
        </div>
        <Link href={`/lessons/${nextLesson.slug}/`} className="button-primary self-start px-5 xl:self-auto">เรียนต่อ <ArrowRight size={18} /></Link>
      </div>

      <section className="grid gap-4 md:grid-cols-3" aria-label="สรุปความคืบหน้า">
        <article className="surface relative overflow-hidden p-6 md:col-span-2">
          <div className="absolute right-0 top-0 size-44 -translate-y-1/3 translate-x-1/3 rounded-full bg-[color-mix(in_srgb,var(--brand)_13%,transparent)] blur-2xl" />
          <div className="relative flex items-start justify-between gap-4"><div><StatusPill tone="brand">ภาพรวมการเรียน</StatusPill><h2 className="mt-4 text-3xl font-extrabold">{ready ? `${progress}%` : "—"}</h2><p className="muted">อ่านแล้ว {completed} จาก {lessons.length} หัวข้อ</p></div><div className="grid size-14 place-items-center rounded-2xl bg-[var(--surface-2)] text-[var(--brand)]"><BookOpenCheck size={26} /></div></div>
          <div className="progress-track relative mt-7" role="progressbar" aria-label="ความคืบหน้าการเรียน" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
        </article>
        <article className="surface p-6"><div className="flex items-center justify-between"><span className="eyebrow">ทบทวนรอบถัดไป</span><Sparkles className="text-[var(--accent)]" size={22} /></div><div className="mt-5 text-3xl font-extrabold">{reviewCount}</div><p className="mt-1 muted">บัตรที่ยังไม่มั่นใจ</p><Link href="/flashcards" className="mt-5 inline-flex items-center gap-1 font-bold text-[var(--brand)]">เปิดบัตรคำ <ArrowRight size={16} /></Link></article>
      </section>

      <section className="mt-9 grid gap-7 xl:grid-cols-[1.35fr_.65fr]">
        <div>
          <div className="mb-4 flex items-center justify-between"><div><span className="eyebrow">เส้นทางเรียน</span><h2 className="section-title mt-1">หัวข้อทั้งหมด</h2></div><Link href="/lessons" className="button-ghost text-sm">ดูทั้งหมด <ArrowRight size={16} /></Link></div>
          <div className="space-y-3">
            {lessons.map((lesson, index) => {
              const done = state.completed.includes(lesson.slug);
              return <Link href={`/lessons/${lesson.slug}/`} key={lesson.slug} className="surface group grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4 hover:border-[color-mix(in_srgb,var(--brand)_45%,var(--line))] sm:p-5"><span className={`grid size-11 place-items-center rounded-xl font-extrabold ${done ? "bg-[var(--brand)] text-white" : "bg-[var(--surface-2)] text-[var(--brand)]"}`}>{done ? "✓" : String(index + 1).padStart(2, "0")}</span><span><small className="eyebrow">{lesson.chapter}</small><strong className="mt-1 block text-lg leading-snug">{lesson.title}</strong><span className="mt-1 flex items-center gap-1 text-sm muted"><Clock3 size={14} /> {lesson.duration} นาที</span></span><ArrowRight className="muted transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand)]" size={20} /></Link>;
            })}
          </div>
        </div>
        <aside>
          <span className="eyebrow">ล่าสุด</span><h2 className="section-title mb-4 mt-1">อ่านค้างไว้</h2>
          <div className="surface p-6"><BookMarked className="mb-5 text-[var(--brand)]" size={28} /><StatusPill>{recent.chapter}</StatusPill><h3 className="mt-3 text-xl font-extrabold">{recent.title}</h3><p className="mt-2 text-sm muted">{recent.description}</p><Link href={`/lessons/${recent.slug}/`} className="button-secondary mt-6 w-full">กลับไปอ่าน <ArrowRight size={17} /></Link></div>
          <div className="mt-4 rounded-[var(--radius-lg)] border border-dashed border-[var(--line)] p-5"><div className="flex gap-3"><Layers3 className="shrink-0 text-[var(--accent)]" /><div><strong>{materials.length} Material เชื่อมพร้อมแล้ว</strong><p className="mt-1 text-sm muted">บทเรียน สูตร บัตรคำ และแบบฝึกหัดเชื่อมย้อนกลับไปยังเอกสารต้นฉบับในคลังได้</p></div></div></div>
        </aside>
      </section>
    </div>
  );
}
