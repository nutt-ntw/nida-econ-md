"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, Check, Clock3, Search, SlidersHorizontal } from "lucide-react";
import { lessons, materials } from "@/lib/content";
import { useStudyState } from "@/lib/storage";
import { Breadcrumbs, StatusPill } from "@/components/ui";

type Filter = "all" | "unread" | "completed" | "bookmarked";

export default function LessonsPage() {
  const { state } = useStudyState();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("th");
    return lessons.filter((lesson) => {
      const relatedMaterials = materials.filter((material) => material.relatedLessons.includes(lesson.slug)).map((material) => material.title).join(" ");
      const text = [lesson.subject, lesson.chapter, lesson.title, lesson.description, lesson.keywords.join(" "), lesson.sections.map((section) => `${section.title} ${section.body}`).join(" "), relatedMaterials].join(" ").toLocaleLowerCase("th");
      const matchesSearch = !needle || text.includes(needle);
      const matchesFilter = filter === "all" || (filter === "unread" && !state.completed.includes(lesson.slug)) || (filter === "completed" && state.completed.includes(lesson.slug)) || (filter === "bookmarked" && state.bookmarks.some((id) => id.startsWith(`${lesson.slug}:`)));
      return matchesSearch && matchesFilter;
    });
  }, [filter, query, state.bookmarks, state.completed]);

  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "บทเรียน" }]} />
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><span className="eyebrow">คลังบทเรียน</span><h1 className="page-title mt-2">เรียนเป็นบท<br />ค้นเจอเป็นประเด็น</h1><p className="mt-3 max-w-2xl muted">ค้นจากชื่อวิชา บท หัวข้อ เนื้อหา คำสำคัญ และชื่อ Material ที่เชื่อมไว้</p></div><StatusPill tone="accent">{filtered.length} หัวข้อ</StatusPill></div>
      <div className="surface mt-8 p-4 sm:p-5"><label className="flex min-h-13 items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--canvas)] px-4"><Search size={20} className="muted" /><span className="sr-only">ค้นหาบทเรียน</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="ลองค้นหา “Material”, “localStorage” หรือชื่อหัวข้อ" /></label><div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1"><SlidersHorizontal size={18} className="mr-1 shrink-0 muted" />{([ ["all", "ทั้งหมด"], ["unread", "ยังไม่อ่าน"], ["completed", "เรียนแล้ว"], ["bookmarked", "บุ๊กมาร์ก"] ] as const).map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-bold ${filter === value ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--line)] bg-[var(--surface)] muted"}`}>{label}</button>)}</div></div>
      <div className="mt-7 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((lesson) => {
          const complete = state.completed.includes(lesson.slug);
          const bookmarked = state.bookmarks.some((id) => id.startsWith(`${lesson.slug}:`));
          return <Link key={lesson.slug} href={`/lessons/${lesson.slug}/`} className="surface group flex min-h-72 flex-col p-6 hover:border-[color-mix(in_srgb,var(--brand)_45%,var(--line))]"><div className="flex items-start justify-between gap-3"><StatusPill tone={complete ? "brand" : "neutral"}>{complete ? <><Check size={13} className="mr-1" /> เรียนแล้ว</> : "ยังไม่อ่าน"}</StatusPill>{bookmarked && <Bookmark size={19} className="fill-[var(--accent)] text-[var(--accent)]" aria-label="มีบุ๊กมาร์ก" />}</div><small className="eyebrow mt-7">{lesson.chapter}</small><h2 className="mt-2 text-2xl font-extrabold leading-snug">{lesson.title}</h2><p className="mt-2 text-sm muted">{lesson.description}</p><div className="mt-auto flex items-center justify-between pt-6"><span className="flex items-center gap-1 text-sm muted"><Clock3 size={15} /> {lesson.duration} นาที</span><span className="flex items-center gap-1 font-bold text-[var(--brand)]">เปิดอ่าน <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span></div></Link>;
        })}
      </div>
      {filtered.length === 0 && <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-[var(--line)] p-10 text-center"><Search className="mx-auto mb-3 muted" /><h2 className="text-xl font-bold">ไม่พบหัวข้อที่ตรงกัน</h2><p className="muted">ลองใช้คำค้นที่สั้นลงหรือเปลี่ยนตัวกรอง</p></div>}
    </div>
  );
}
