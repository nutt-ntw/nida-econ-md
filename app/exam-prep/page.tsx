import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, FileText, Target } from "lucide-react";
import { examAnswerSteps, examTopics, withBasePath } from "@/lib/content";
import { Breadcrumbs, StatusPill } from "@/components/ui";

export default function ExamPrepPage() {
  return (
    <div>
      <Breadcrumbs items={[{ label: "ภาพรวม", href: "/" }, { label: "เตรียมสอบ" }]} />
      <div className="grid gap-7 xl:grid-cols-[1fr_22rem] xl:items-end">
        <div><span className="eyebrow">Exam-focused review</span><h1 className="page-title mt-2">อ่านให้ตรงแนว<br />ตอบให้ครบขั้น</h1><p className="mt-4 max-w-3xl text-lg muted">จัดลำดับจากชีทสรุปแนวข้อสอบ โดยเน้นเงินเฟ้อ คำจำกัดความ Elasticity และ Regression พร้อมทางลัดกลับไปยังบทเรียนและหน้าต้นฉบับ</p></div>
        <div className="surface p-5"><Target className="text-[var(--accent)]" /><strong className="mt-3 block text-lg">เป้าหมายก่อนเข้าห้องสอบ</strong><p className="mt-1 text-sm muted">อธิบายเหตุผลได้ วาดหรืออ่านกราฟถูก ใช้เครื่องหมายในสูตรครบ และสรุปผลจากตัวเลขเป็นภาษาเศรษฐศาสตร์</p></div>
      </div>

      <section className="mt-9"><div className="flex items-end justify-between gap-4"><div><span className="eyebrow">หัวข้อที่ต้องเก็บ</span><h2 className="section-title mt-1">แนวข้อสอบ 4 กลุ่ม</h2></div><a href={withBasePath("/materials/exam-summary.pdf#page=20")} target="_blank" rel="noreferrer" className="button-secondary"><FileText size={17} /> เปิดชีทหน้าแนวข้อสอบ</a></div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">{examTopics.map((topic) => <article key={topic.number} className="surface flex flex-col p-6"><div className="flex items-center justify-between"><span className="text-3xl font-black text-[var(--brand)]">{topic.number}</span><StatusPill tone={topic.priority === "สูงมาก" ? "accent" : "brand"}>{topic.priority}</StatusPill></div><h3 className="mt-5 text-xl font-extrabold">{topic.title}</h3><p className="mt-2 muted">{topic.description}</p><div className="mt-auto flex flex-wrap gap-2 pt-6"><Link href={topic.href} className="button-primary">อ่านจุดออกสอบ <ArrowRight size={17} /></Link><a href={withBasePath(`/materials/exam-summary.pdf#page=${topic.materialPage}`)} target="_blank" rel="noreferrer" className="button-ghost"><ExternalLink size={16} /> ชีทหน้า {topic.materialPage}</a></div></article>)}</div>
      </section>

      <section className="surface mt-8 p-6 sm:p-8"><span className="eyebrow">โครงตอบข้อเขียน</span><h2 className="section-title mt-1">จำลำดับเดียว แล้วปรับใช้กับทุกบท</h2><ol className="mt-6 grid gap-3">{examAnswerSteps.map((step, index) => <li key={step} className="soft-surface flex items-start gap-4 p-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-sm font-extrabold text-white">{index + 1}</span><span className="pt-1 font-semibold">{step}</span></li>)}</ol></section>

      <section className="mt-8 grid gap-4 md:grid-cols-3"><Link href="/flashcards" className="surface group p-6"><CheckCircle2 className="text-[var(--brand)]" /><h2 className="mt-4 text-xl font-extrabold">ท่องนิยาม</h2><p className="mt-2 text-sm muted">ใช้บัตรคำเก็บคำจำกัดความและเงื่อนไขที่ต้องตอบให้แม่น</p><span className="mt-5 flex items-center gap-1 font-bold text-[var(--brand)]">เปิดบัตรคำ <ArrowRight size={16} /></span></Link><Link href="/quiz" className="surface group p-6"><CheckCircle2 className="text-[var(--brand)]" /><h2 className="mt-4 text-xl font-extrabold">ลองทำโจทย์</h2><p className="mt-2 text-sm muted">เช็กความเข้าใจเรื่องทิศทางกราฟ เครื่องหมาย และการแปลผล</p><span className="mt-5 flex items-center gap-1 font-bold text-[var(--brand)]">เริ่มแบบฝึกหัด <ArrowRight size={16} /></span></Link><Link href="/review" className="surface group p-6"><CheckCircle2 className="text-[var(--brand)]" /><h2 className="mt-4 text-xl font-extrabold">สแกนก่อนสอบ</h2><p className="mt-2 text-sm muted">ทวนสูตรและเงื่อนไขสำคัญแบบรวดเร็วในหน้าจอเดียว</p><span className="mt-5 flex items-center gap-1 font-bold text-[var(--brand)]">เปิด Quick Review <ArrowRight size={16} /></span></Link></section>
    </div>
  );
}
