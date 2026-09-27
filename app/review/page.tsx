import Link from "next/link";
import { ArrowRight, Sigma } from "lucide-react";
import { lessons, reviewItems } from "@/lib/content";
import { Breadcrumbs, StatusPill } from "@/components/ui";

export default function ReviewPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "ทบทวนด่วน" }]} />
      <span className="eyebrow">Quick Review</span><h1 className="page-title mt-2">สูตรและนิยามสำคัญ<br />ก่อนเริ่มรอบต่อไป</h1><p className="mt-4 max-w-2xl text-lg muted">สรุปสั้นจาก Material และชีทแนวข้อสอบ พร้อมลิงก์กลับไปยังคำอธิบายในบทเรียน</p><Link href="/exam-prep" className="button-secondary mt-5 w-fit">ดูแผนอ่านสอบ <ArrowRight size={17} /></Link>
      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{reviewItems.map((item) => <Link href={`/lessons/${item.lessonSlug}/#${item.sectionId}`} key={item.title} className="surface group flex min-h-56 flex-col p-6"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-xl bg-[var(--surface-2)] text-[var(--brand)]"><Sigma size={22} /></span><StatusPill>{item.label}</StatusPill></div><h2 className="mt-6 text-xl font-extrabold">{item.title}</h2><p className="mt-2 text-lg font-semibold text-[var(--brand)]">{item.value}</p><span className="mt-auto flex items-center gap-1 pt-5 font-bold text-[var(--brand)]">อ่านคำอธิบาย <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span></Link>)}</section>
      <section className="surface mt-7 p-6 sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><span className="eyebrow">เนื้อหาครบเส้นทาง</span><h2 className="section-title mt-1">เชื่อมกับ {lessons.length} บทเรียนจริง</h2><p className="mt-1 muted">อ่านเนื้อหาเต็ม ตรวจเลขหน้าใน Material แล้วต่อด้วยบัตรคำหรือแบบฝึกหัด</p></div><Link href="/lessons" className="button-primary self-start">ดูบทเรียนทั้งหมด <ArrowRight size={17} /></Link></div></section>
    </div>
  );
}
