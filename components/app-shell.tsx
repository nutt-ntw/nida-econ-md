"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Files, Gauge, GraduationCap, Layers3, ListChecks, Menu, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import { WebMcpTools } from "@/components/webmcp-tools";

const items = [
  { href: "/", label: "ภาพรวม", icon: Gauge },
  { href: "/lessons", label: "บทเรียน", icon: BookOpen },
  { href: "/materials", label: "Material", icon: Files },
  { href: "/flashcards", label: "บัตรคำ", icon: Layers3 },
  { href: "/quiz", label: "แบบฝึกหัด", icon: ListChecks },
  { href: "/exam-prep", label: "เตรียมสอบ", icon: GraduationCap },
  { href: "/review", label: "ทบทวนด่วน", icon: Sparkles },
];

function ThemeButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nida-econ-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", next);
    window.requestAnimationFrame(() => setDark(next));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nida-econ-theme", next ? "dark" : "light");
  };

  return (
    <button className="button-ghost size-11 !p-0" onClick={toggle} aria-label={dark ? "ใช้โหมดสว่าง" : "ใช้โหมดมืด"}>
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <WebMcpTools />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[17rem] border-r border-[var(--line)] bg-[var(--surface)] px-5 py-6 lg:flex lg:flex-col">
        <Link href="/" className="mb-10 flex items-center gap-3 px-2" aria-label="ECON Study Hub หน้าแรก">
          <span className="grid size-11 place-items-center rounded-2xl bg-[var(--brand)] text-white"><BookOpen size={22} /></span>
          <span><strong className="block text-lg leading-5">ECON Study Hub</strong><small className="muted">NIDA learning space</small></span>
        </Link>
        <nav aria-label="เมนูหลัก" className="space-y-1.5">
          {items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold ${active ? "bg-[var(--surface-2)] text-[var(--brand)]" : "muted hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"}`}>
                <Icon size={20} /><span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-[var(--surface-2)] p-4 text-sm">
          <span className="eyebrow">Local first</span>
          <p className="mt-2 muted">ความคืบหน้าและผลทบทวนเก็บอยู่ในเบราว์เซอร์เครื่องนี้</p>
        </div>
      </aside>

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--canvas)_88%,transparent)] px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="flex items-center gap-3">
            <button className="nav-mobile-toggle button-ghost size-11 !p-0" onClick={() => setOpen(true)} aria-label="เปิดเมนู"><Menu /></button>
            <div className="lg:hidden"><strong className="block leading-5">ECON Study Hub</strong><small className="muted">พื้นที่อ่านและทบทวน</small></div>
            <Link href="/lessons" className="nav-search button-secondary min-w-72 justify-start text-sm font-normal muted"><Search size={18} />ค้นหาเนื้อหาและ Material <kbd className="ml-auto text-xs">⌘ K</kbd></Link>
          </div>
          <ThemeButton />
        </header>
        <main id="main-content" className="mx-auto w-full max-w-[94rem] px-4 pb-28 pt-7 sm:px-7 lg:px-10 lg:pb-12 lg:pt-10">{children}</main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="เมนูหลัก">
          <button aria-label="ปิดเมนู" className="absolute inset-0 bg-black/45" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[min(20rem,88vw)] bg-[var(--surface)] p-5 shadow-2xl">
            <div className="mb-7 flex items-center justify-between"><strong className="text-lg">ECON Study Hub</strong><button className="button-ghost size-11 !p-0" onClick={() => setOpen(false)} aria-label="ปิดเมนู"><X /></button></div>
            <nav className="space-y-1.5">
              {items.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold hover:bg-[var(--surface-2)]"><item.icon size={20} />{item.label}</Link>)}
            </nav>
          </div>
        </div>
      )}

      <nav aria-label="เมนูมือถือ" className="mobile-bottom-nav fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] p-1.5 shadow-2xl backdrop-blur-xl lg:hidden">
        {items.filter((_, index) => [0, 1, 3, 4, 5].includes(index)).map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return <Link key={item.href} href={item.href} className={`flex min-h-13 flex-col items-center justify-center rounded-xl text-[.68rem] font-semibold ${active ? "bg-[var(--surface-2)] text-[var(--brand)]" : "muted"}`}><item.icon size={19} /><span>{item.label}</span></Link>;
        })}
      </nav>
    </div>
  );
}
