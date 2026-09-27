import { notFound } from "next/navigation";
import { lessons } from "@/lib/content";
import { LessonReader } from "@/components/lesson-reader";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessons.find((item) => item.slug === slug);
  if (!lesson) notFound();
  return <LessonReader lesson={lesson} />;
}
