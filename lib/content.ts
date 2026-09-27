export type SourceReference = { materialId: string; label: string; page?: number; pageEnd?: number; sectionId?: string; searchText?: string; externalUrl?: string };
export type LessonSection = { id: string; eyebrow: "แนวคิดสำคัญ" | "ขั้นตอน" | "ตัวอย่าง" | "สูตร" | "ข้อควรระวัง"; title: string; body: string; bullets?: string[]; formula?: string; reference?: SourceReference };
export type Lesson = { slug: string; subject: string; chapter: string; title: string; description: string; duration: number; keywords: string[]; sections: LessonSection[] };
const ref = (materialId: string, label: string, page: number, pageEnd?: number): SourceReference => ({ materialId, label, page, pageEnd });

export const lessons: Lesson[] = [
  {
    slug: "economic-foundations", subject: "เศรษฐศาสตร์ธุรกิจ", chapter: "01 · พื้นฐานเศรษฐศาสตร์", title: "ความขาดแคลน ประสิทธิภาพ และระบบเศรษฐกิจ", description: "ปัญหาทรัพยากรจำกัด คำถามพื้นฐานทางเศรษฐกิจ และผู้ตัดสินใจในแต่ละระบบ", duration: 12, keywords: ["scarcity", "efficiency", "capitalist", "communist", "socialist", "Adam Smith", "Karl Marx", "4P", "5C"],
    sections: [
      { id: "scarcity", eyebrow: "แนวคิดสำคัญ", title: "ทรัพยากรจำกัด แต่ความต้องการไม่จำกัด", body: "เศรษฐศาสตร์ศึกษาการจัดสรรทรัพยากรที่มีอยู่อย่างจำกัดเพื่อตอบสนองความต้องการที่ไม่จำกัด ภาวะนี้เรียกว่า Scarcity และนำไปสู่คำถามว่าจะผลิตอะไร ผลิตอย่างไร ผลิตเพื่อใคร และใครเป็นผู้ตัดสินใจ", bullets: ["What to produce", "How to produce", "For whom", "Who makes the decision"], reference: ref("set-1", "ชุดที่ 1 หน้า 5", 5) },
      { id: "efficiency", eyebrow: "แนวคิดสำคัญ", title: "ประสิทธิภาพสามมุมมอง", body: "Technical efficiency เน้นผลผลิตสูงสุดจากปัจจัยที่กำหนดหรือใช้ปัจจัยน้อยที่สุดเพื่อได้ผลผลิตตามเป้า ส่วน Allocative efficiency เน้นผลิตให้ตรงความต้องการและเวลา และ Economic efficiency มองการจัดสวัสดิการจากทรัพยากรโดยรวม", reference: ref("conclusion", "Conclusion หน้า 1", 1) },
      { id: "systems", eyebrow: "แนวคิดสำคัญ", title: "ผู้ตัดสินใจขึ้นอยู่กับระบบเศรษฐกิจ", body: "เอกสารแบ่งระบบเป็นทุนนิยม คอมมิวนิสต์ และสังคมนิยม โดยเชื่อม Adam Smith กับตลาดเสรีและกลไกราคา ส่วน Karl Marx เชื่อมกับ Communist Manifesto และบทบาทรัฐในการควบคุมกระบวนการผลิต", bullets: ["Capitalist — กลไกตลาด", "Communist — รัฐควบคุมกระบวนการ", "Socialist — รัฐควบคุมปัจจัยการผลิต"], reference: ref("set-1", "ชุดที่ 1 หน้า 6–10", 6, 10) },
    ],
  },
  {
    slug: "inflation-and-policy", subject: "เศรษฐศาสตร์มหภาค", chapter: "02 · เสถียรภาพเศรษฐกิจ", title: "เงินเฟ้อและนโยบายเศรษฐกิจ", description: "เป้าหมายรัฐบาล ประเภทและผลของเงินเฟ้อ รวมถึงนโยบายการเงินและการคลัง", duration: 15, keywords: ["inflation", "monetary policy", "fiscal policy", "demand-pull", "cost-push", "profit-push"],
    sections: [
      { id: "government-goals", eyebrow: "แนวคิดสำคัญ", title: "เป้าหมายของการจัดการเศรษฐกิจ", body: "Material ระบุการเติบโตอย่างมีเสถียรภาพ เสถียรภาพราคา การจ้างงานเต็มที่ การกระจายรายได้เป็นธรรม การใช้ทรัพยากรอย่างมีประสิทธิภาพ และสิ่งแวดล้อมที่ดี", reference: ref("set-2", "ชุดที่ 2 หน้า 1", 1) },
      { id: "inflation-types", eyebrow: "แนวคิดสำคัญ", title: "เงินเฟ้อคือระดับราคาเฉลี่ยที่สูงขึ้น", body: "เอกสารจำแนก Creeping inflation ที่ 1–3%, Double-digit inflation ที่ 10–99% และ Hyperinflation ที่ 100% ขึ้นไป พร้อมผลต่อดอกเบี้ยที่แท้จริง มูลค่าเงิน รายได้จริง และเสถียรภาพเศรษฐกิจ", reference: ref("set-2", "ชุดที่ 2 หน้า 2–3", 2, 3) },
      { id: "inflation-causes", eyebrow: "ข้อควรระวัง", title: "วิธีแก้ต้องสอดคล้องกับสาเหตุ", body: "Demand-pull เกิดจากอุปสงค์รวมสูงใกล้ Full employment, Cost-push เกิดจากต้นทุนปัจจัยสูงขึ้น และ Profit-push เชื่อมกับผู้ผลิตน้อยราย การลดอุปสงค์รวมแบบเดียวกันทุกกรณีอาจทำให้ว่างงานเมื่อปัญหามาจากต้นทุน", bullets: ["Demand-pull — ลดอุปสงค์รวม", "Cost-push — ลดต้นทุนและเพิ่มประสิทธิภาพ", "Profit-push — ส่งเสริมการแข่งขัน"], reference: ref("set-3", "ชุดที่ 3 หน้า 12–14", 12, 14) },
      { id: "inflation-exam-answer", eyebrow: "ขั้นตอน", title: "โครงตอบข้อเขียนเงินเฟ้อและกราฟ", body: "เริ่มจากนิยามชนิดเงินเฟ้อ แล้ววาดแกน P–Q และระบุเส้น Aggregate Demand หรือ Aggregate Supply ก่อนชี้จุดดุลยภาพเดิมและใหม่ Demand-pull ต้องอธิบายว่าเมื่อเข้าใกล้ Full employment ผลผลิตเพิ่มช้ากว่าราคา ส่วน Cost-push ต้องชี้ว่า Supply ลดทำให้ราคาสูงขึ้นแต่ Output ลดลง ปิดท้ายด้วยนโยบายที่ตรงกับสาเหตุ", bullets: ["Demand-pull: AD เพิ่ม → P และ Q เพิ่ม จนถึง Full employment", "Cost-push: AS ลด → P เพิ่ม แต่ Q ลด", "Profit-push: ผู้ขายน้อยราย → ส่งเสริมการแข่งขัน", "ตอบให้ครบ นิยาม → กลไก → กราฟ → ผล → วิธีแก้"], reference: ref("exam-summary", "สรุปแนวข้อสอบ หน้า 6–7", 6, 7) },
    ],
  },
  {
    slug: "national-income-and-fiscal", subject: "เศรษฐศาสตร์มหภาค", chapter: "03 · รายได้ประชาชาติ", title: "GDP รายได้ประชาชาติ และตัวทวีทางการคลัง", description: "GDP/GNP, ดัชนีราคา รายจ่ายมวลรวม MPC/MPS และผลของภาษี", duration: 18, keywords: ["GDP", "GNP", "real GDP", "price index", "CPI", "PPI", "MPC", "MPS", "multiplier"],
    sections: [
      { id: "gdp-gnp", eyebrow: "แนวคิดสำคัญ", title: "GDP ยึดพื้นที่ ส่วน GNP ยึดทรัพยากรของประเทศ", body: "ทั้งสองรวมมูลค่าสินค้าและบริการขั้นสุดท้าย ณ ราคาตลาดในช่วงเวลาหนึ่ง ความต่างหลักคือ GDP ยึดพื้นที่การผลิต ขณะที่ GNP ยึดทรัพยากรหรือปัจจัยการผลิตของประเทศ", reference: ref("set-3", "ชุดที่ 3 หน้า 2–4", 2, 4) },
      { id: "expenditure-identity", eyebrow: "สูตร", title: "สมการรายจ่ายของ GDP", body: "ผลผลิตรวมเขียนจากการบริโภค การลงทุน รายจ่ายรัฐบาล และการส่งออกสุทธิ โดย Investment รวมรายจ่ายเพื่อสินค้าที่ใช้ผลิตในอนาคตและบ้านใหม่ของครัวเรือน", formula: "Y = C + I + G + X − M", reference: ref("set-3", "ชุดที่ 3 หน้า 5–6", 5, 6) },
      { id: "multiplier", eyebrow: "สูตร", title: "การบริโภคและตัวทวี", body: "แบบจำลองใช้ C = a + bY โดย b คือ MPC และ MPC + MPS = 1 ก่อนพัฒนาสู่กรณีไม่มีภาษี Lump-sum tax, Balanced budget และ Flat-rate tax", formula: "C = a + bY   |   Multiplier = 1 ÷ (1 − b)", reference: ref("set-3", "ชุดที่ 3 หน้า 7–11", 7, 11) },
    ],
  },
  {
    slug: "money-finance-and-forex", subject: "เศรษฐศาสตร์การเงิน", chapter: "04 · เงินและภาคต่างประเทศ", title: "เงิน ตลาดการเงิน อัตราแลกเปลี่ยน และ BoP", description: "หน้าที่ของเงิน ปริมาณเงิน เครื่องมือนโยบาย ตลาด Forex และดุลการชำระเงิน", duration: 20, keywords: ["money", "cryptocurrency", "M1", "M2", "reserve", "money multiplier", "forex", "BoP"],
    sections: [
      { id: "money", eyebrow: "แนวคิดสำคัญ", title: "เงินทำหน้าที่แลกเปลี่ยน วัด และเก็บมูลค่า", body: "Material แยก Commodity money ออกจาก Fiat money และอภิปราย Cryptocurrency กับ Blockchain", bullets: ["Medium of exchange", "Unit of account", "Store of value"], reference: ref("set-4", "ชุดที่ 4 หน้า 1–6", 1, 6) },
      { id: "crypto-exam", eyebrow: "ข้อควรระวัง", title: "Crypto และ Bitcoin ที่ควรจำก่อนสอบ", body: "Cryptocurrency ใช้เครือข่ายผู้เข้าร่วมช่วยตรวจสอบและบันทึกธุรกรรมบน Blockchain ขณะที่ Bitcoin ถูกเสนอในปี 2009 ในฐานะ Peer-to-Peer Electronic Cash System และกำหนดจำนวนสูงสุด 21 ล้านเหรียญ จุดสำคัญคือต้องแยกเทคโนโลยีและประโยชน์ออกจากความเสี่ยงด้านราคา การโจรกรรม การหลอกลงทุน และการกำกับดูแล", bullets: ["Blockchain ทำให้แก้ข้อมูลย้อนหลังได้ยาก", "Bitcoin สูงสุด 21 ล้านเหรียญ", "ราคาอาจผันผวนสูง", "ไม่ได้มีรัฐบาลหรือสินทรัพย์รับรองมูลค่า"], reference: ref("exam-summary", "สรุปแนวข้อสอบ หน้า 12", 12) },
      { id: "money-supply", eyebrow: "สูตร", title: "M1 ถึง M3 และการขยายเงินฝาก", body: "M1 รวมเงินสดและเงินฝากกระแสรายวัน M2 เพิ่มเงินฝากออมทรัพย์และประจำ ส่วนแบบจำลองเงินสำรองอธิบายขีดสูงสุดทางทฤษฎีของการขยายเงินฝาก", formula: "Money multiplier = 1 ÷ rr", reference: ref("set-4", "ชุดที่ 4 หน้า 7–9", 7, 9) },
      { id: "forex-bop", eyebrow: "สูตร", title: "อัตราแลกเปลี่ยนและดุลการชำระเงิน", body: "เอกสารแบ่ง Fixed กับ Flexible exchange rate อธิบายเงินสำรองระหว่างประเทศ และสรุป BoP เป็นบัญชีเดินสะพัดกับบัญชีทุน พร้อมความเสี่ยงประเทศ ค่าเงิน และเครดิต", formula: "BoP = NX + CF   |   RER = e(P* ÷ P)", reference: ref("set-4", "ชุดที่ 4 หน้า 10–15", 10, 15) },
    ],
  },
  {
    slug: "managerial-economics-optimization", subject: "เศรษฐศาสตร์ธุรกิจ", chapter: "05 · การตัดสินใจของกิจการ", title: "กำไร ต้นทุน และการหาค่าสูงสุด", description: "กำไรทางบัญชีและเศรษฐศาสตร์ ต้นทุนส่วนเพิ่ม อนุพันธ์ และข้อจำกัด", duration: 22, keywords: ["economic profit", "opportunity cost", "marginal cost", "diminishing returns", "optimization", "Lagrange"],
    sections: [
      { id: "profit", eyebrow: "สูตร", title: "กำไรเศรษฐศาสตร์รวม Opportunity cost", body: "Business profit หัก Explicit cost ขณะที่ Economic profit หักทั้ง Explicit และ Implicit หรือ Opportunity cost", formula: "Economic profit = TR − (Explicit cost + Implicit cost)", reference: ref("set-6", "ชุดที่ 6 หน้า 1–3", 1, 3) },
      { id: "costs", eyebrow: "แนวคิดสำคัญ", title: "ต้นทุนรวมและต้นทุนต่อหน่วย", body: "Material แสดง TFC, TVC, TC และเส้น AFC, AVC, ATC, MC พร้อม Law of diminishing returns ซึ่งอัตราการเพิ่มของผลผลิตจะชะลอลงเมื่อเพิ่มปัจจัยบางชนิด", reference: ref("set-6", "ชุดที่ 6 หน้า 4–7", 4, 7) },
      { id: "optimization", eyebrow: "ขั้นตอน", title: "หา Optimum ด้วยอนุพันธ์และข้อจำกัด", body: "หาอนุพันธ์อันดับหนึ่งให้เท่ากับศูนย์ แล้วใช้อันดับสองจำแนกจุด สำหรับหลายตัวแปรใช้ Partial derivative และเมื่อมีข้อจำกัดใช้การแทนค่าหรือ Lagrangian multiplier", reference: ref("set-6", "ชุดที่ 6 หน้า 8–17", 8, 17) },
    ],
  },
  {
    slug: "demand-supply-and-consumer", subject: "เศรษฐศาสตร์จุลภาค", chapter: "06 · อุปสงค์และอุปทาน", title: "อุปสงค์ อุปทาน และทางเลือกผู้บริโภค", description: "กฎอุปสงค์–อุปทาน การเลื่อนเส้น ดุลยภาพ และ Indifference curve", duration: 16, keywords: ["demand", "supply", "equilibrium", "surplus", "shortage", "indifference curve"],
    sections: [
      { id: "demand", eyebrow: "แนวคิดสำคัญ", title: "อุปสงค์ต้องทั้งเต็มใจและสามารถซื้อ", body: "Law of demand ระบุความสัมพันธ์ทางลบระหว่างราคาและปริมาณซื้อเมื่อปัจจัยอื่นคงที่ เอกสารแยก Direct demand สำหรับสินค้าบริโภคและ Derived demand สำหรับปัจจัยการผลิต", reference: ref("set-6", "ชุดที่ 6 หน้า 18", 18) },
      { id: "consumer-choice", eyebrow: "แนวคิดสำคัญ", title: "Indifference curve กับ Budget line", body: "เส้นเดียวกันให้ความพอใจเท่ากัน เส้นสูงกว่าให้ความพอใจมากกว่า เส้นไม่ตัดกันและมีความชันลบ ส่วน Budget line แสดงข้อจำกัดจากรายได้และราคา", reference: ref("set-6", "ชุดที่ 6 หน้า 19–21", 19, 21) },
      { id: "equilibrium", eyebrow: "ข้อควรระวัง", title: "การเคลื่อนบนเส้นไม่เท่ากับการเลื่อนเส้น", body: "ราคาสินค้าเองทำให้เคลื่อนบนเส้นเดิม แต่รายได้ ต้นทุน เทคโนโลยี หรือราคาสินค้าเกี่ยวข้องทำให้เส้นเลื่อน เมื่อ Supply มากกว่า Demand เกิด Surplus และกรณีตรงข้ามเกิด Shortage", reference: ref("set-6", "ชุดที่ 6 หน้า 21–23", 21, 23) },
      { id: "price-controls", eyebrow: "ตัวอย่าง", title: "Price floor และ Price ceiling", body: "Price floor ที่กำหนดสูงกว่าราคาดุลยภาพทำให้ปริมาณเสนอขายมากกว่าปริมาณซื้อและเกิด Surplus ส่วน Price ceiling ที่กำหนดต่ำกว่าราคาดุลยภาพทำให้ปริมาณซื้อมากกว่าปริมาณเสนอขายและเกิด Shortage หากกำหนดอยู่อีกด้านของราคาดุลยภาพจะไม่ผูกมัดตลาด", formula: "Floor > Pe → Surplus   |   Ceiling < Pe → Shortage", reference: ref("exam-summary", "สรุปแนวข้อสอบ หน้า 15", 15) },
    ],
  },
  {
    slug: "elasticity-and-pricing", subject: "เศรษฐศาสตร์จุลภาค", chapter: "07 · ความยืดหยุ่น", title: "Elasticity รายรับ และการตั้งราคา", description: "Point/Arc elasticity, Income/Cross elasticity และความสัมพันธ์กับ MR และกำไร", duration: 20, keywords: ["elasticity", "point", "arc", "income elasticity", "cross-price", "marginal revenue"],
    sections: [
      { id: "point-arc", eyebrow: "สูตร", title: "Point และ Arc price elasticity", body: "Point ใช้อนุพันธ์ ณ จุดหนึ่ง ส่วน Arc ใช้การเปลี่ยนแปลงและค่าเฉลี่ยระหว่างสองจุด เอกสารแนะนำ Arc เมื่อราคาขยับมากกว่า 5%", formula: "Point Ep = (dQ ÷ dP)(P ÷ Q)   |   Arc Ep = (ΔQ ÷ ΔP)((P₁+P₂) ÷ (Q₁+Q₂))", reference: ref("set-7", "ชุดที่ 7 หน้า 1–8", 1, 8) },
      { id: "classifications", eyebrow: "แนวคิดสำคัญ", title: "ระดับความยืดหยุ่นและชนิดสินค้า", body: "|Ep|<1 คือ Inelastic, =1 คือ Unitary และ >1 คือ Elastic ส่วน Income และ Cross-price elasticity ใช้แยกสินค้าปกติ/ด้อยคุณภาพ และสินค้าประกอบ/ทดแทน", formula: "Ey = %ΔQ ÷ %ΔY   |   Exy = %ΔQx ÷ %ΔPy", reference: ref("set-7", "ชุดที่ 7 หน้า 9–12", 9, 12) },
      { id: "profit-pricing", eyebrow: "สูตร", title: "MR และเงื่อนไขกำไรสูงสุด", body: "เมื่อ P = a − bQ จะได้ TR = aQ − bQ² และ MR = a − 2bQ เอกสารเชื่อมความยืดหยุ่นกับการตั้งราคาและใช้เงื่อนไข MC = MR", formula: "MR = a − 2bQ   |   MC = MR = P(1 + 1/Ep)", reference: ref("set-7", "ชุดที่ 7 หน้า 13–18", 13, 18) },
      { id: "combined-elasticity", eyebrow: "ตัวอย่าง", title: "โจทย์ Elasticity หลายเหตุการณ์ให้คูณแล้วรวม", body: "ให้คำนวณผลของการเปลี่ยนแปลงแต่ละปัจจัยต่อ Qx แยกทีละบรรทัด โดยรักษาเครื่องหมายของ Elasticity และเปอร์เซ็นต์การเปลี่ยนแปลง แล้วจึงรวมผล ตัวอย่าง Ep = −3, Ey = 1.5, Exy = 2, Exz = −2 และตัวแปรทุกตัวลด 1% จะได้ +3 −1.5 −2 +2 = +1.5%", formula: "%ΔQx รวม = Σ(Elasticity × %Δตัวแปร)", reference: ref("exam-summary", "สรุปแนวข้อสอบ หน้า 22", 22) },
    ],
  },
  {
    slug: "demand-estimation-regression", subject: "เศรษฐศาสตร์ธุรกิจ", chapter: "08 · การประเมินอุปสงค์", title: "Demand Estimation และ Regression Analysis", description: "การสัมภาษณ์ การทดลองตลาด Regression สมมติฐาน และปัญหาที่พบบ่อย", duration: 22, keywords: ["demand estimation", "consumer interviews", "experiment", "regression", "BLUE", "R squared", "multicollinearity", "heteroskedasticity"],
    sections: [
      { id: "methods", eyebrow: "แนวคิดสำคัญ", title: "สามวิธีประเมินอุปสงค์", body: "เอกสารแบ่งเป็น Consumer interviews, Market experiments และ Regression analysis แต่ละวิธีแลกเปลี่ยนกันระหว่างความสมจริง การควบคุมปัจจัยภายนอก เวลา และงบประมาณ", reference: ref("set-8", "ชุดที่ 8 หน้า 1–4", 1, 4) },
      { id: "blue", eyebrow: "แนวคิดสำคัญ", title: "BLUE และการทดสอบโมเดล", body: "BLUE คือ Best Linear Unbiased Estimator โดย Error term ควรมีค่าคาดหมายศูนย์ ความแปรปรวนคงที่ และเป็นอิสระ R² วัดสัดส่วน Explained variation ส่วน F-statistic ใช้ทดสอบค่าสัมประสิทธิ์ร่วมกัน", formula: "R² = Explained variation ÷ Total variation", reference: ref("set-8", "ชุดที่ 8 หน้า 6–18", 6, 18) },
      { id: "problems", eyebrow: "ข้อควรระวัง", title: "ปัญหาและขั้นตอน Regression", body: "ปัญหาหลักคือ Multicollinearity, Heteroskedasticity และ Autocorrelation กระบวนการทำงานเริ่มจากเลือกตัวแปร เก็บ Time-series/Cross-section data ตั้งสมการ แปลผลสถิติ และแปลผลโมเดล", reference: ref("set-8", "ชุดที่ 8 หน้า 19–22", 19, 22) },
      { id: "regression-exam", eyebrow: "ขั้นตอน", title: "ลำดับแปลผล Regression ในข้อสอบ", body: "เริ่มจากอ่านเครื่องหมายและขนาดของสัมประสิทธิ์ แล้วทดสอบแต่ละตัวด้วย |t| เทียบ Critical t จากนั้นแปล R² และ Adjusted R² สุดท้ายใช้ F เทียบ Critical F เพื่อสรุปนัยสำคัญของสมการโดยรวม ตัวแปรที่ t ไม่ผ่านเกณฑ์ไม่ควรสรุปผลเชิงเศรษฐศาสตร์ว่าเชื่อถือได้", bullets: ["|t| > Critical t → สัมประสิทธิ์มีนัยสำคัญ", "R² → สัดส่วนที่โมเดลอธิบายได้", "Adjusted R² → ปรับด้วยขนาดตัวอย่างและจำนวนตัวแปร", "F > Critical F → Reject H₀ และโมเดลโดยรวมมีนัยสำคัญ"], reference: ref("exam-summary", "สรุปแนวข้อสอบ หน้า 23", 23) },
    ],
  },
];

export const flashcards = [
  ["f1", "Limited resources + Unlimited wants เรียกว่าอะไร?", "Scarcity หรือความขาดแคลน", "economic-foundations", "scarcity"],
  ["f2", "Creeping inflation อยู่ในช่วงใด?", "ประมาณ 1–3%", "inflation-and-policy", "inflation-types"],
  ["f3", "สมการรายจ่ายของ GDP คืออะไร?", "Y = C + I + G + X − M", "national-income-and-fiscal", "expenditure-identity"],
  ["f4", "หน้าที่หลักสามอย่างของเงินคืออะไร?", "Medium of exchange, Unit of account และ Store of value", "money-finance-and-forex", "money"],
  ["f5", "กำไรทางเศรษฐศาสตร์ต่างจากกำไรทางบัญชีอย่างไร?", "หักทั้ง Explicit และ Implicit/Opportunity cost", "managerial-economics-optimization", "profit"],
  ["f6", "Change in demand ต่างจาก Change in quantity demanded อย่างไร?", "Change in demand คือเส้นเลื่อน ส่วน Change in quantity demanded คือเคลื่อนบนเส้นเดิม", "demand-supply-and-consumer", "equilibrium"],
  ["f7", "เมื่อ |Ep| > 1 เรียกว่าอะไร?", "Elastic หรืออุปสงค์ยืดหยุ่น", "elasticity-and-pricing", "classifications"],
  ["f8", "BLUE ย่อมาจากอะไร?", "Best Linear Unbiased Estimator", "demand-estimation-regression", "blue"],
  ["f9", "Demand-pull inflation หลังถึง Full employment เกิดอะไรเด่นที่สุด?", "ระดับราคาเพิ่มเร็ว เพราะผลผลิตเพิ่มไม่ทัน Aggregate Demand", "inflation-and-policy", "inflation-exam-answer"],
  ["f10", "Price floor ที่สูงกว่าดุลยภาพทำให้เกิดอะไร?", "Surplus หรืออุปทานส่วนเกิน", "demand-supply-and-consumer", "price-controls"],
  ["f11", "Price ceiling ที่ต่ำกว่าดุลยภาพทำให้เกิดอะไร?", "Shortage หรืออุปสงค์ส่วนเกิน", "demand-supply-and-consumer", "price-controls"],
  ["f12", "Bitcoin มีจำนวนสูงสุดตามชีทเท่าไร?", "21 ล้านเหรียญ", "money-finance-and-forex", "crypto-exam"],
  ["f13", "ทดสอบสัมประสิทธิ์ Regression รายตัวด้วยอะไร?", "เปรียบเทียบ |t| กับ Critical t", "demand-estimation-regression", "regression-exam"],
  ["f14", "ทดสอบนัยสำคัญของสมการ Regression โดยรวมด้วยอะไร?", "เปรียบเทียบ F กับ Critical F", "demand-estimation-regression", "regression-exam"],
].map(([id, question, answer, lessonSlug, sectionId]) => ({ id, question, answer, lessonSlug, sectionId }));

export const quizQuestions = [
  { id: "q1", type: "choice" as const, question: "ข้อใดไม่ใช่คำถามพื้นฐานจาก Scarcity?", choices: ["ผลิตอะไร", "ผลิตอย่างไร", "ผลิตเพื่อใคร", "กำไรไตรมาสหน้าเท่าไร"], answer: 3, explanation: "Material ระบุ What, How, For whom และ Who makes the decision", lessonSlug: "economic-foundations", sectionId: "scarcity" },
  { id: "q2", type: "choice" as const, question: "เงินเฟ้อจากต้นทุนปัจจัยสูงขึ้นเรียกว่าอะไร?", choices: ["Demand-pull", "Cost-push", "Profit-push"], answer: 1, explanation: "Cost-push inflation เกิดจากราคาปัจจัยการผลิตสูงขึ้น", lessonSlug: "inflation-and-policy", sectionId: "inflation-causes" },
  { id: "q3", type: "choice" as const, question: "ตัวแปรใดถูกหักใน Y = C + I + G + X − M?", choices: ["C", "I", "X", "M"], answer: 3, explanation: "M คือ Import", lessonSlug: "national-income-and-fiscal", sectionId: "expenditure-identity" },
  { id: "q4", type: "choice" as const, question: "Money multiplier ตามแบบจำลองคือข้อใด?", choices: ["rr", "1/rr", "1−rr", "rr²"], answer: 1, explanation: "แบบจำลองขยายเงินฝากใช้ 1 หารด้วยอัตราเงินสำรอง", lessonSlug: "money-finance-and-forex", sectionId: "money-supply" },
  { id: "q5", type: "choice" as const, question: "กำไรทางเศรษฐศาสตร์หักต้นทุนใดเพิ่ม?", choices: ["Implicit cost", "Marginal revenue", "Fixed revenue"], answer: 0, explanation: "Economic profit หักทั้ง Explicit และ Implicit cost", lessonSlug: "managerial-economics-optimization", sectionId: "profit" },
  { id: "q6", type: "choice" as const, question: "หาก |Ep| = 1 อุปสงค์เรียกว่าอะไร?", choices: ["Inelastic", "Unitary elastic", "Inferior"], answer: 1, explanation: "ค่าสัมบูรณ์เท่ากับหนึ่งคือ Unitary elastic", lessonSlug: "elasticity-and-pricing", sectionId: "classifications" },
  { id: "q7", type: "choice" as const, question: "ตัวแปรอิสระสัมพันธ์กันสูงคือปัญหาใด?", choices: ["Autocorrelation", "Heteroskedasticity", "Multicollinearity"], answer: 2, explanation: "Multicollinearity คือ correlation ระหว่าง Independent variables", lessonSlug: "demand-estimation-regression", sectionId: "problems" },
  { id: "q8", type: "choice" as const, question: "Price floor ที่สูงกว่าราคาดุลยภาพทำให้เกิดอะไร?", choices: ["Shortage", "Surplus", "ดุลยภาพใหม่โดยไม่มีส่วนเกิน"], answer: 1, explanation: "ราคาขั้นต่ำที่ผูกมัดทำให้ Qs มากกว่า Qd จึงเกิด Surplus", lessonSlug: "demand-supply-and-consumer", sectionId: "price-controls" },
  { id: "q9", type: "choice" as const, question: "Cost-push inflation ทำให้ราคาและผลผลิตเปลี่ยนอย่างไร?", choices: ["ราคาเพิ่ม ผลผลิตลด", "ราคาลด ผลผลิตเพิ่ม", "ราคาและผลผลิตเพิ่ม"], answer: 0, explanation: "Aggregate Supply ลดลงทำให้ P สูงขึ้นและ Q ลดลง", lessonSlug: "inflation-and-policy", sectionId: "inflation-exam-answer" },
  { id: "q10", type: "choice" as const, question: "กำหนด Ep = −3 และราคา X ลดลง 1% ปริมาณซื้อ X เปลี่ยนเท่าไร?", choices: ["ลด 3%", "เพิ่ม 3%", "เพิ่ม 1%"], answer: 1, explanation: "%ΔQ = (−3)(−1%) = +3%", lessonSlug: "elasticity-and-pricing", sectionId: "combined-elasticity" },
  { id: "q11", type: "choice" as const, question: "ถ้า |t| = 1.5 และ Critical t = 2.0 ควรสรุปอย่างไร?", choices: ["มีนัยสำคัญ", "ไม่มีนัยสำคัญ", "ต้องดู R² เท่านั้น"], answer: 1, explanation: "|t| ยังไม่มากกว่า Critical t จึงไม่ผ่านเกณฑ์นัยสำคัญรายตัว", lessonSlug: "demand-estimation-regression", sectionId: "regression-exam" },
  { id: "q12", type: "choice" as const, question: "ข้อใดอธิบาย Bitcoin ตามชีทสรุปได้ถูกต้อง?", choices: ["มีเหรียญได้ไม่จำกัด", "เป็น Peer-to-Peer Electronic Cash System และจำกัด 21 ล้านเหรียญ", "มีรัฐบาลรับรองมูลค่า"], answer: 1, explanation: "ชีทสรุประบุแนวคิด Peer-to-Peer และจำนวนสูงสุด 21 ล้านเหรียญ", lessonSlug: "money-finance-and-forex", sectionId: "crypto-exam" },
];

export type Material = { id: string; title: string; type: "PDF" | "DOCX"; href: string; downloadHref?: string; description: string; relatedLessons: string[]; pageCount?: number };
export const materials: Material[] = [
  { id: "exam-summary", title: "สรุปแนวข้อสอบ ECON ฉบับพร้อมอ่าน", type: "DOCX", href: "/materials/exam-summary.pdf", downloadHref: "/materials/exam-summary.docx", pageCount: 23, description: "สรุปชุดที่ 1–8 พร้อมแนวข้อสอบ ลำดับตอบ และเฉลย Elasticity กับ Regression", relatedLessons: ["inflation-and-policy", "money-finance-and-forex", "managerial-economics-optimization", "demand-supply-and-consumer", "elasticity-and-pricing", "demand-estimation-regression"] },
  { id: "conclusion", title: "Conclusion — สรุปรวมทั้งวิชา", type: "DOCX", href: "/materials/conclusion.pdf", downloadHref: "/materials/conclusion.docx", pageCount: 27, description: "สรุปรวม พร้อม PDF สำหรับ preview และ DOCX ต้นฉบับ", relatedLessons: lessons.map((l) => l.slug) },
  { id: "set-1", title: "ชุดที่ 1 — พื้นฐานเศรษฐศาสตร์", type: "PDF", href: "/materials/set-1.pdf", pageCount: 11, description: "Scarcity ระบบเศรษฐกิจ 4P, 5C และเป้าหมายรัฐบาล", relatedLessons: ["economic-foundations"] },
  { id: "set-2", title: "ชุดที่ 2 — เงินเฟ้อและนโยบาย", type: "PDF", href: "/materials/set-2.pdf", pageCount: 10, description: "เป้าหมายเศรษฐกิจ เงินเฟ้อ นโยบาย และ GDP", relatedLessons: ["inflation-and-policy", "national-income-and-fiscal"] },
  { id: "set-3", title: "ชุดที่ 3 — รายได้ประชาชาติและตัวทวี", type: "PDF", href: "/materials/set-3.pdf", pageCount: 14, description: "GDP/GNP, MPC/MPS, Fiscal multiplier และสาเหตุเงินเฟ้อ", relatedLessons: ["inflation-and-policy", "national-income-and-fiscal"] },
  { id: "set-4", title: "ชุดที่ 4 — เงิน การเงิน และต่างประเทศ", type: "PDF", href: "/materials/set-4.pdf", pageCount: 15, description: "เงิน Cryptocurrency, Money supply, Forex และ BoP", relatedLessons: ["money-finance-and-forex"] },
  { id: "set-5", title: "ชุดที่ 5 — เอกสารมหภาคฉบับรายงาน", type: "PDF", href: "/materials/set-5.pdf", pageCount: 20, description: "Circular flow, GDP/GNP, นโยบาย และ Business cycle", relatedLessons: ["inflation-and-policy", "national-income-and-fiscal", "money-finance-and-forex"] },
  { id: "set-6", title: "ชุดที่ 6 — เศรษฐศาสตร์ธุรกิจและอุปสงค์", type: "PDF", href: "/materials/set-6.pdf", pageCount: 27, description: "กำไร ต้นทุน Optimization, Demand–Supply และ Indifference curve", relatedLessons: ["managerial-economics-optimization", "demand-supply-and-consumer"] },
  { id: "set-7", title: "ชุดที่ 7 — Elasticity และการตั้งราคา", type: "PDF", href: "/materials/set-7.pdf", pageCount: 18, description: "Point/Arc elasticity, TR, MR และกำไรสูงสุด", relatedLessons: ["elasticity-and-pricing"] },
  { id: "set-8", title: "ชุดที่ 8 — Demand Estimation", type: "PDF", href: "/materials/set-8.pdf", pageCount: 22, description: "Interviews, Experiments, Regression และปัญหาโมเดล", relatedLessons: ["demand-estimation-regression"] },
];

export const reviewItems = [
  ["ออกสอบ", "ลำดับตอบข้อเขียน", "นิยาม → กลไก → กราฟหรือสูตร → แปลผล → วิธีแก้", "inflation-and-policy", "inflation-exam-answer"],
  ["นิยาม", "Scarcity", "Limited resources + Unlimited wants", "economic-foundations", "scarcity"],
  ["สูตร", "GDP expenditure", "Y = C + I + G + X − M", "national-income-and-fiscal", "expenditure-identity"],
  ["สูตร", "Money multiplier", "1 ÷ rr", "money-finance-and-forex", "money-supply"],
  ["นิยาม", "Economic profit", "TR − (Explicit cost + Implicit cost)", "managerial-economics-optimization", "profit"],
  ["เงื่อนไข", "Profit maximization", "MC = MR", "elasticity-and-pricing", "profit-pricing"],
  ["จำแนก", "Elasticity", "|Ep|<1 Inelastic · =1 Unitary · >1 Elastic", "elasticity-and-pricing", "classifications"],
  ["สูตร", "Balance of payment", "BoP = NX + CF", "money-finance-and-forex", "forex-bop"],
  ["สมมติฐาน", "BLUE", "Best Linear Unbiased Estimator", "demand-estimation-regression", "blue"],
  ["กลไก", "Price controls", "Floor > Pe → Surplus · Ceiling < Pe → Shortage", "demand-supply-and-consumer", "price-controls"],
  ["ทดสอบ", "Regression", "|t| เทียบ Critical t · F เทียบ Critical F", "demand-estimation-regression", "regression-exam"],
].map(([label, title, value, lessonSlug, sectionId]) => ({ label, title, value, lessonSlug, sectionId }));

export const examTopics = [
  { number: "01", title: "เงินเฟ้อและกราฟ", priority: "สูงมาก", description: "จำชนิด สาเหตุ ผล ลำดับกราฟ Demand-pull/Cost-push และเลือกนโยบายให้ตรงสาเหตุ", href: "/lessons/inflation-and-policy/#inflation-exam-answer", materialPage: 6 },
  { number: "02", title: "คำจำกัดความสั้น", priority: "สูง", description: "Crypto, Bitcoin, Equilibrium, Surplus, Shortage, Price floor/ceiling และ Economic profit", href: "/lessons/money-finance-and-forex/#crypto-exam", materialPage: 21 },
  { number: "03", title: "Elasticity หลายเหตุการณ์", priority: "สูงมาก", description: "แยก Own-price, Income, Cross-price รักษาเครื่องหมาย คำนวณทีละผลแล้วรวม", href: "/lessons/elasticity-and-pricing/#combined-elasticity", materialPage: 22 },
  { number: "04", title: "Regression", priority: "สูงมาก", description: "แปลสัมประสิทธิ์ ตรวจ |t| อธิบาย R²/Adjusted R² และสรุป F-test", href: "/lessons/demand-estimation-regression/#regression-exam", materialPage: 23 },
];

export const examAnswerSteps = ["เริ่มด้วยคำจำกัดความหรือหลักที่โจทย์ถาม", "อธิบายกลไกเป็นลำดับเหตุและผล", "ใส่กราฟหรือสูตร พร้อมระบุแกน เส้น และจุดดุลยภาพ", "แปลผลให้ผูกกับตัวเลขหรือทิศทางที่คำนวณได้", "ปิดท้ายด้วยผลกระทบและวิธีแก้ตามชีท"];

export function getLesson(slug: string) { return lessons.find((lesson) => lesson.slug === slug); }
export function withBasePath(path: string) { const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? ""; return `${base}${path}`; }
export function sourceHref(reference: SourceReference) { const material = materials.find((item) => item.id === reference.materialId); if (!material) return reference.externalUrl ?? ""; return `${withBasePath(material.href)}${reference.page ? `#page=${reference.page}` : ""}`; }
