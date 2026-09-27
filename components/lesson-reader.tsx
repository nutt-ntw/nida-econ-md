"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bookmark, Check, CheckCircle2, Clock3, Copy, ExternalLink, FileQuestion, Link2 } from "lucide-react";
import { Lesson, lessons, sourceHref } from "@/lib/content";
import { useStudyState } from "@/lib/storage";
import { Breadcrumbs, StatusPill } from "@/components/ui";

export function LessonReader({ lesson }: { lesson: Lesson }) {
  const { state, update } = useStudyState();
  const [copied, setCopied] = useState<string | null>(null);
  const complete = state.completed.includes(lesson.slug);
  const index = lessons.findIndex((item) => item.slug === lesson.slug);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];

  useEffect(() => {
    update((current) => current.recent === lesson.slug ? current : { ...current, recent: lesson.slug });
  }, [lesson.slug, update]);

  const copySection = async (id: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "บทเรียน", href: "/lessons" }, { label: lesson.title }]} />
      <div className="grid gap-9 xl:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="min-w-0">
          <header className="surface overflow-hidden p-6 sm:p-9"><div className="flex flex-wrap items-center gap-2"><StatusPill tone="brand">{lesson.subject}</StatusPill><StatusPill>{lesson.chapter}</StatusPill><span className="ml-auto flex items-center gap-1 text-sm muted"><Clock3 size={15} /> {lesson.duration} นาที</span></div><h1 className="page-title mt-6 max-w-4xl">{lesson.title}</h1><p className="mt-4 max-w-3xl text-lg muted">{lesson.description}</p><div className="mt-7 flex flex-wrap gap-3"><button onClick={() => update((current) => ({ ...current, completed: complete ? current.completed.filter((slug) => slug !== lesson.slug) : [...current.completed, lesson.slug] }))} className={complete ? "button-secondary" : "button-primary"}>{complete ? <Check size={18} /> : <CheckCircle2 size={18} />}{complete ? "อ่านแล้ว" : "ทำเครื่องหมายว่าอ่านแล้ว"}</button><Link href="/materials" className="button-secondary"><ExternalLink size={18} /> ดู Material</Link></div></header>

          <div className="mt-7 space-y-5">
            {lesson.sections.map((section, sectionIndex) => {
              const bookmarkId = `${lesson.slug}:${section.id}`;
              const bookmarked = state.bookmarks.includes(bookmarkId);
              return <section id={section.id} key={section.id} className="surface scroll-mt-24 p-6 sm:p-9"><div className="flex items-start justify-between gap-4"><div><span className="eyebrow">{String(sectionIndex + 1).padStart(2, "0")} · {section.eyebrow}</span><h2 className="section-title mt-2">{section.title}</h2></div><div className="flex shrink-0"><button onClick={() => update((current) => ({ ...current, bookmarks: bookmarked ? current.bookmarks.filter((id) => id !== bookmarkId) : [...current.bookmarks, bookmarkId] }))} className="button-ghost size-10 !p-0" aria-label={bookmarked ? "ยกเลิกบุ๊กมาร์ก" : "บุ๊กมาร์กส่วนนี้"}><Bookmark size={19} className={bookmarked ? "fill-[var(--accent)] text-[var(--accent)]" : ""} /></button><button onClick={() => copySection(section.id)} className="button-ghost size-10 !p-0" aria-label="คัดลอกลิงก์ส่วนนี้">{copied === section.id ? <Check size={19} /> : <Link2 size={19} />}</button></div></div><p className="mt-5 max-w-3xl text-[1.05rem] leading-8">{section.body}</p>{section.formula && <div className="mt-5 overflow-x-auto rounded-xl border border-[color-mix(in_srgb,var(--brand)_30%,var(--line))] bg-[var(--surface-2)] p-4 font-mono text-base font-bold text-[var(--brand)] sm:text-lg">{section.formula}</div>}{section.bullets && <ul className="mt-5 grid gap-2 sm:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="soft-surface flex gap-2 p-3 text-sm"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--brand)]" />{bullet}</li>)}</ul>}<div className="mt-7 flex items-center gap-3 rounded-xl border border-dashed border-[var(--line)] p-4 text-sm"><FileQuestion className="shrink-0 text-[var(--accent)]" size={20} /><div><strong>{section.reference ? section.reference.label : "ยังไม่ได้เชื่อมโยงแหล่งต้นฉบับ"}</strong><p className="muted">{section.reference ? "เปิด Material ในแท็บใหม่เพื่อตรวจข้อความต้นทาง" : "ส่วนนี้ยังไม่มีตำแหน่งอ้างอิงที่ยืนยันแล้ว"}</p></div>{section.reference && <a href={sourceHref(section.reference)} target="_blank" rel="noreferrer" className="button-ghost ml-auto"><ExternalLink size={16} /> เปิด</a>}</div></section>;
            })}
          </div>

          <nav className="mt-7 grid gap-3 sm:grid-cols-2" aria-label="เปลี่ยนบทเรียน">{previous ? <Link href={`/lessons/${previous.slug}/`} className="surface flex items-center gap-3 p-5"><ArrowLeft className="text-[var(--brand)]" /><span><small className="muted">ก่อนหน้า</small><strong className="block">{previous.title}</strong></span></Link> : <div />}{next ? <Link href={`/lessons/${next.slug}/`} className="surface flex items-center justify-end gap-3 p-5 text-right"><span><small className="muted">ถัดไป</small><strong className="block">{next.title}</strong></span><ArrowRight className="text-[var(--brand)]" /></Link> : <Link href="/flashcards" className="surface flex items-center justify-end gap-3 p-5 text-right"><span><small className="muted">ทบทวนต่อ</small><strong className="block">เปิดบัตรคำ</strong></span><ArrowRight className="text-[var(--brand)]" /></Link>}</nav>
        </article>

        <aside className="hidden xl:block"><div className="sticky top-28"><span className="eyebrow">ในหัวข้อนี้</span><nav className="mt-3 border-l border-[var(--line)] pl-4">{lesson.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block py-2 text-sm font-semibold muted hover:text-[var(--brand)]">{section.title}</a>)}</nav><div className="mt-6 soft-surface p-4 text-sm"><Copy size={18} className="mb-2 text-[var(--brand)]" /><strong>แชร์ตรงประเด็น</strong><p className="mt-1 muted">ใช้ไอคอนลิงก์ในแต่ละส่วนเพื่อคัดลอก URL พร้อม anchor</p></div></div></aside>
      </div>
    </div>
  );
}
