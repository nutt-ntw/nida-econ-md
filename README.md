# ECON Study Hub

เว็บไซต์สำหรับอ่าน ทำความเข้าใจ จดจำ และทบทวนเนื้อหาเศรษฐศาสตร์ สร้างด้วย Next.js App Router, TypeScript และ Tailwind CSS และ export เป็น static files สำหรับ GitHub Pages

## สถานะเนื้อหาปัจจุบัน

เนื้อหาปัจจุบันสร้างจาก Material ในโฟลเดอร์วิชา ได้แก่ PDF ชุดที่ 1–8 และ `Conclusion.docx` โดยทำสำเนาไฟล์สำหรับเว็บไว้ใน `public/materials/` พร้อม PDF ของ Conclusion สำหรับ preview ใน browser

เว็บไซต์จัดเนื้อหาเป็น 8 บท ตั้งแต่พื้นฐานเศรษฐศาสตร์ เงินเฟ้อ GDP และนโยบาย ไปจนถึงเงิน/Forex, Managerial Economics, Demand–Supply, Elasticity และ Demand Estimation ทุกส่วนระบุ Material และเลขหน้าที่ตรวจสอบแล้ว

## สิ่งที่มีในเว็บไซต์

- Dashboard แสดงความคืบหน้า หัวข้อล่าสุด และรายการที่ควรทบทวน
- คลังบทเรียนพร้อมค้นหาและกรองตามสถานะอ่านแล้ว/ยังไม่อ่าน/บุ๊กมาร์ก
- หน้าอ่านพร้อมสารบัญ ลิงก์ตรง section, Previous/Next, บุ๊กมาร์ก และสถานะอ่านแล้ว
- หน้า Material ค้นหา preview ดาวน์โหลด และเชื่อมไปยังบทเรียนที่เกี่ยวข้อง
- Flashcards พร้อมพลิกบัตร สุ่ม และระดับ `จำได้` / `ยังไม่แน่ใจ` / `ต้องทบทวน`
- Quiz โหมดฝึกทีละข้อและโหมดจำลองสอบ 10 นาที พร้อมคะแนนและคำอธิบาย
- Quick Review รวมสูตร นิยาม และประเด็นสำคัญจากเนื้อหาจริง
- Light/Dark mode, responsive layout, keyboard focus และ `prefers-reduced-motion`
- เก็บความคืบหน้า บุ๊กมาร์ก ผลบัตรคำ และคะแนนล่าสุดใน `localStorage`
- Static export ไปที่ `out/` และ workflow สำหรับ GitHub Pages

## โครงสร้างสำคัญ

```text
app/
  page.tsx                 Dashboard
  lessons/                 คลังและหน้าอ่านบทเรียน
  materials/               Material ต้นฉบับ
  flashcards/              บัตรคำ
  quiz/                    แบบฝึกหัดและโหมดสอบ
  review/                  Quick Review
components/
  app-shell.tsx            navigation, mobile menu, theme
  lesson-reader.tsx        หน้าอ่านและ interaction
lib/
  content.ts               content model และข้อมูลทั้งหมด
  storage.ts               browser-local study state
public/
  materials/               ตำแหน่งแนะนำสำหรับไฟล์ต้นฉบับ
.github/workflows/
  deploy.yml               build และ deploy GitHub Pages
```

## ติดตั้งและเปิดในเครื่อง

ต้องใช้ Node.js 22 หรือใหม่กว่า

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

## เพิ่มวิชา บท และเนื้อหาสรุป

แก้ `lib/content.ts` แล้วเพิ่ม object ใน `lessons`:

- `subject`: ชื่อวิชา
- `chapter`: ชื่อ/ลำดับบท
- `slug`: URL ที่ไม่ซ้ำ
- `title`, `description`, `duration`, `keywords`
- `sections`: ส่วนย่อยที่มี `id`, `eyebrow`, `title`, `body`, `bullets` และ `reference` (ถ้ามี)

`id` ของ section ต้องไม่ซ้ำภายในบท เพราะใช้เป็น URL anchor และ bookmark key

## เพิ่ม Material และการอ้างอิง

1. วางไฟล์ที่เปิดเผยได้ใน `public/materials/` (ชุดปัจจุบันใช้ `set-1.pdf` ถึง `set-8.pdf`, `conclusion.pdf` และ `conclusion.docx`)
2. เพิ่มรายการใน `materials` ที่ `lib/content.ts`
3. กำหนด `reference` ใน section ที่เกี่ยวข้อง

```ts
reference: {
  materialId: "lecture-03",
  label: "Lecture 03, หน้า 12–14",
  page: 12,
  pageEnd: 14,
  searchText: "market structure"
}
```

กติกาสำคัญ:

- PDF ใช้ `#page=N` เฉพาะเมื่อยืนยันเลขหน้าแล้ว
- Markdown/HTML ใช้ `sectionId` ที่มีอยู่จริง
- external source ใช้ `externalUrl` และเปิดแท็บใหม่
- หากยังระบุตำแหน่งไม่ได้ ให้เว้น reference เพื่อให้ UI แสดง “ยังไม่ได้เชื่อมโยงแหล่งต้นฉบับ”
- อย่า commit Material ที่มีลิขสิทธิ์หรือข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต

## เพิ่ม Flashcards และ Quiz

เพิ่มรายการใน `flashcards` และ `quizQuestions` ที่ `lib/content.ts` โดยกำหนด `lessonSlug` และ `sectionId` เพื่อย้อนกลับไปยังเนื้อหาต้นทางได้ ทุกคำถามและคำตอบควรมาจากส่วนสรุปที่ตรวจสอบกับ Material แล้ว

## ตรวจคุณภาพและ build

```bash
npm run lint
npm run type-check
npm run build
```

`npm run build` จะสร้าง static export ใน `out/`

ทดสอบ GitHub Pages subpath ในเครื่องได้ด้วย:

```bash
NEXT_PUBLIC_BASE_PATH=/nida-econ-md npm run build
```

## Deploy ผ่าน GitHub Pages

1. Push ไปที่ branch `main`
2. ใน GitHub ไปที่ **Settings → Pages**
3. เลือก **Source: GitHub Actions**
4. workflow `.github/workflows/deploy.yml` จะ lint, type-check, build และ deploy `out/`

Workflow กำหนด `NEXT_PUBLIC_BASE_PATH` จากชื่อ repository อัตโนมัติ ทำให้ navigation และ assets ทำงานใต้ `/nida-econ-md/` ได้ ไฟล์ `.nojekyll` จะถูกคัดลอกไปใน output

หากใช้ custom domain ให้เพิ่มโดเมนใน GitHub Pages settings และสร้าง `public/CNAME` เมื่อทราบชื่อโดเมนแล้วเท่านั้น

## สมมติฐานและข้อจำกัด

- เนื้อหาและ reference อ้างจากชุดเอกสารที่ผู้ใช้ให้มา ควรทบทวนความถูกต้องทางวิชาการอีกครั้งก่อนใช้สอบหรือเผยแพร่
- ความคืบหน้าเป็นแบบ browser-local และไม่ sync ข้ามอุปกรณ์
- เวอร์ชันนี้ไม่มีระบบบัญชี ฐานข้อมูล API routes หรือ server actions
- Material preview จะขึ้นกับชนิดไฟล์และความสามารถของ browser
- ก่อนเผยแพร่เนื้อหาจริงต้องตรวจ licensing, ความถูกต้อง และ reference ทุกจุด
