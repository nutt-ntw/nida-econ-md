import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return <div className="surface grid min-h-[60vh] place-items-center p-8 text-center"><div><SearchX className="mx-auto mb-5 text-[var(--brand)]" size={42} /><p className="eyebrow">404</p><h1 className="section-title mt-2">ไม่พบหน้าที่กำลังหา</h1><p className="mt-2 muted">ลิงก์อาจถูกย้ายหรือหัวข้อนี้ยังไม่ได้เพิ่มเข้าระบบ</p><Link href="/" className="button-primary mt-6">กลับหน้าแรก</Link></div></div>;
}
