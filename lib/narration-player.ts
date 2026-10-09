export type NarrationState = {
  status: "idle" | "playing" | "paused" | "ended" | "error";
  segmentIndex: number;
  chunkIndex: number;
  message: string;
};
type Chunk = { segmentIndex: number; text: string };
type SpeechService = Pick<SpeechSynthesis, "cancel" | "resume" | "speak">;

// Preserve complete authored sentences so Thai prosody is not reset mid-sentence.
// Only oversized sentences fall back to bounded word-aligned chunks.
export function splitSpokenText(text: string, maxLength = 400): string[] {
  const chunks: string[] = [];
  for (const sentence of text.split(/\n+|(?<=[.!?。！？])\s+/u)) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    if (trimmed.length <= maxLength) {
      chunks.push(trimmed);
      continue;
    }
    const words = typeof Intl.Segmenter === "function"
      ? Array.from(new Intl.Segmenter("th", { granularity: "word" }).segment(trimmed), (part) => part.segment)
      : Array.from(trimmed);
    // A long unbroken Latin token can exceed the bound even with word segmentation.
    const parts = words.flatMap((word) => word.length > maxLength ? Array.from(word) : [word]);
    let current = "";
    for (const part of parts) {
      if (current && current.length + part.length > maxLength) {
        if (current.trim()) chunks.push(current.trim());
        current = "";
      }
      current += part;
    }
    if (current.trim()) chunks.push(current.trim());
  }
  return chunks;
}

export class NarrationPlayer {
  private chunks: Chunk[] = [];
  private generation = 0;
  private cursor = 0;
  private utterance: SpeechSynthesisUtterance | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private voice: SpeechSynthesisVoice | null = null;
  private rate = 0.9;
  private state: NarrationState = { status: "idle", segmentIndex: 0, chunkIndex: 0, message: "" };

  constructor(
    private readonly synth: SpeechService,
    private readonly createUtterance: (text: string) => SpeechSynthesisUtterance,
    private readonly onChange: (state: NarrationState) => void,
  ) {}

  private emit(patch: Partial<NarrationState>) {
    this.state = { ...this.state, ...patch };
    this.onChange(this.state);
  }

  private cancel() {
    this.generation += 1;
    clearTimeout(this.timer);
    if (this.utterance) {
      this.utterance.onend = null;
      this.utterance.onerror = null;
      this.utterance.onstart = null;
      this.utterance = null;
    }
    this.synth.cancel();
  }

  load(segments: { title: string; text: string }[]) {
    this.cancel();
    this.chunks = segments.flatMap((segment, segmentIndex) =>
      splitSpokenText(`${segment.title} ${segment.text}`).map((text) => ({ segmentIndex, text })),
    );
    this.cursor = 0;
    this.emit({ status: "idle", segmentIndex: 0, chunkIndex: 0, message: "" });
  }

  configure(voice: SpeechSynthesisVoice | null, rate: number) {
    if (this.voice === voice && this.rate === rate) return;
    const wasPlaying = this.state.status === "playing";
    this.voice = voice;
    this.rate = rate;
    if (wasPlaying) {
      this.cancel();
      this.speak();
    }
  }

  play(segmentIndex?: number) {
    if (!this.chunks.length) return;
    this.cancel();
    if (segmentIndex !== undefined) {
      const position = this.chunks.findIndex((chunk) => chunk.segmentIndex === segmentIndex);
      if (position < 0) return;
      this.cursor = position;
    } else if (this.state.status === "ended") {
      this.cursor = 0;
    }
    this.speak();
  }

  pause() {
    if (this.state.status !== "playing") return;
    this.cancel();
    this.emit({ status: "paused" });
  }

  stop() {
    this.cancel();
    this.cursor = 0;
    this.emit({ status: "idle", segmentIndex: 0, chunkIndex: 0, message: "" });
  }

  private fail(message: string) {
    this.cancel();
    this.emit({ status: "error", message });
  }

  private speak() {
    const chunk = this.chunks[this.cursor];
    if (!chunk) return;
    const generation = this.generation;
    const utterance = this.createUtterance(chunk.text);
    this.utterance = utterance;
    utterance.lang = "th-TH";
    utterance.rate = this.rate;
    if (this.voice) utterance.voice = this.voice;
    this.emit({ status: "playing", segmentIndex: chunk.segmentIndex, chunkIndex: this.cursor, message: "" });
    utterance.onstart = () => {
      if (generation === this.generation) clearTimeout(this.timer);
    };
    utterance.onend = () => {
      if (generation !== this.generation) return;
      clearTimeout(this.timer);
      if (this.cursor + 1 === this.chunks.length) {
        this.emit({ status: "ended" });
        return;
      }
      this.cursor += 1;
      this.timer = setTimeout(() => {
        if (generation === this.generation) this.speak();
      }, 80);
    };
    utterance.onerror = (event) => {
      if (generation !== this.generation) return;
      this.fail(event.error === "not-allowed"
        ? "เบราว์เซอร์ยังไม่อนุญาตให้เล่นเสียง ลองกดเล่นอีกครั้ง"
        : "เล่นเสียงไม่ได้ ลองเลือกเสียงภาษาไทยอื่น หรือหยุดแล้วกดเล่นใหม่");
    };
    this.timer = setTimeout(() => {
      if (generation === this.generation) this.fail("เสียงยังไม่เริ่ม ลองเลือกเสียงภาษาไทยอื่นหรือเปิดด้วยเบราว์เซอร์อื่น");
    }, 10000);
    try {
      this.synth.resume();
      this.synth.speak(utterance);
    } catch {
      this.fail("เครื่องนี้ไม่สามารถเริ่มอ่านออกเสียงได้ ลองเปิดด้วยเบราว์เซอร์อื่น");
    }
  }

  dispose() { this.cancel(); }
}
