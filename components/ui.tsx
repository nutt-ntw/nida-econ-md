import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm muted">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          {item.href ? <Link href={item.href} className="hover:text-[var(--brand)]">{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          {index < items.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
        </span>
      ))}
    </nav>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: React.ReactNode; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="surface grid min-h-80 place-items-center p-8 text-center">
      <div className="max-w-lg"><div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-[var(--surface-2)] text-[var(--brand)]">{icon}</div><h2 className="section-title">{title}</h2><p className="mt-2 muted">{description}</p>{action && <div className="mt-6">{action}</div>}</div>
    </div>
  );
}

export function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "brand" | "accent" }) {
  const styles = tone === "brand" ? "bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-[var(--brand)]" : tone === "accent" ? "bg-[var(--accent-soft)] text-[color-mix(in_srgb,var(--accent)_68%,var(--ink))]" : "bg-[var(--surface-2)] muted";
  return <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 text-xs font-bold ${styles}`}>{children}</span>;
}
