"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, ExternalLink, FileText, Search } from "lucide-react";
import { lessons, materials, withBasePath } from "@/lib/content";
import { Breadcrumbs, StatusPill } from "@/components/ui";

export default function MaterialsPage() {
  const [selectedId, setSelectedId] = useState(materials[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const selected = materials.find((item) => item.id === selectedId) ?? materials[0];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return materials;
    return materials.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "Material" }]} />
      <span className="eyebrow">แหล่งต้นฉบับ</span>
      <h1 className="page-title mt-2">อ่านสรุปแล้ว<br />ย้อนตรวจต้นฉบับได้ทันที</h1>
      <p className="mt-4 max-w-2xl text-lg muted">รวมเอกสารชุดที่ 1–8 และ Conclusion พร้อม preview, ดาวน์โหลด และลิงก์กลับไปยังบทเรียนที่เกี่ยวข้อง</p>
      <div className="mt-8 flex flex-wrap gap-2"><StatusPill tone="brand">ทั้งหมด {materials.length} ไฟล์</StatusPill><StatusPill>PDF {materials.filter((item) => item.type === "PDF").length}</StatusPill><StatusPill>DOCX {materials.filter((item) => item.type === "DOCX").length}</StatusPill></div>

      <div className="mt-7 grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
        <aside>
          <label className="surface flex items-center gap-3 px-4 py-3" htmlFor="material-search"><Search size={18} className="muted" /><input id="material-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อหรือหัวข้อ…" className="min-w-0 flex-1 bg-transparent outline-none" /></label>
          <div className="mt-3 space-y-2">
            {filtered.map((item) => <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded-[var(--radius-lg)] border p-4 text-left transition ${selected?.id === item.id ? "border-[var(--brand)] bg-[var(--surface)]" : "border-[var(--line)] bg-[var(--surface)] hover:border-[color-mix(in_srgb,var(--brand)_40%,var(--line))]"}`}><span className="flex items-start gap-3"><FileText size={19} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span><strong className="block leading-snug">{item.title}</strong><small className="mt-1 block muted">{item.type}{item.pageCount ? ` · ${item.pageCount} หน้า` : ""}</small></span></span></button>)}
            {filtered.length === 0 && <p className="rounded-xl border border-dashed border-[var(--line)] p-5 text-sm muted">ไม่พบ Material ที่ตรงกับคำค้น</p>}
          </div>
        </aside>

        {selected && <section className="surface overflow-hidden">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--line)] p-5 sm:flex-row sm:items-start sm:p-6"><div><div className="flex flex-wrap gap-2"><StatusPill tone="brand">{selected.type}</StatusPill>{selected.pageCount && <StatusPill>{selected.pageCount} หน้า</StatusPill>}</div><h2 className="section-title mt-3">{selected.title}</h2><p className="mt-2 max-w-2xl muted">{selected.description}</p></div><div className="flex shrink-0 flex-wrap gap-2"><a href={withBasePath(selected.href)} target="_blank" rel="noreferrer" className="button-secondary"><ExternalLink size={17} /> เปิดแท็บใหม่</a><a href={withBasePath(selected.downloadHref ?? selected.href)} download className="button-primary"><Download size={17} /> ดาวน์โหลด{selected.downloadHref ? " DOCX" : ""}</a></div></div>
          <iframe key={selected.href} src={withBasePath(selected.href)} title={`Preview ${selected.title}`} className="h-[68vh] min-h-[32rem] w-full bg-white" />
          <div className="border-t border-[var(--line)] p-5 sm:p-6"><span className="eyebrow">บทเรียนที่เกี่ยวข้อง</span><div className="mt-3 flex flex-wrap gap-2">{selected.relatedLessons.map((slug) => { const lesson = lessons.find((item) => item.slug === slug); return lesson ? <Link key={slug} href={`/lessons/${slug}/`} className="button-ghost border border-[var(--line)] text-sm">{lesson.title}</Link> : null; })}</div></div>
        </section>}
      </div>
    </div>
  );
}
