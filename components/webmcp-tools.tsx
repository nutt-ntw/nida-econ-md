"use client";

import { useEffect } from "react";
import { lessons } from "@/lib/content";

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute: (input: unknown) => unknown;
};

declare global {
  interface Document {
    modelContext?: { registerTool: (tool: ToolDefinition, options?: { signal?: AbortSignal }) => void | Promise<void> };
  }
}

const storageKey = "nida-econ-study-state-v1";

export function WebMcpTools() {
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const read = () => {
      try { return JSON.parse(localStorage.getItem(storageKey) ?? "{}"); } catch { return {}; }
    };
    const register = (tool: ToolDefinition) => {
      try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined); } catch { /* Unsupported experimental implementation. */ }
    };

    register({
      name: "read_study_progress",
      title: "อ่านความคืบหน้าการเรียน",
      description: "Read completed lessons, bookmarks, recent lesson, flashcard ratings, and the latest quiz score stored in this browser.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => ({ ...read(), lessonCount: lessons.length }),
    });
    register({
      name: "mark_lesson_complete",
      title: "ทำเครื่องหมายบทเรียนว่าอ่านแล้ว",
      description: "Mark one lesson as completed using the same browser-local state as the visible lesson reader.",
      inputSchema: { type: "object", properties: { slug: { type: "string", enum: lessons.map((lesson) => lesson.slug) } }, required: ["slug"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input) => {
        const slug = typeof input === "object" && input !== null && "slug" in input ? String((input as { slug: unknown }).slug) : "";
        if (!lessons.some((lesson) => lesson.slug === slug)) throw new Error("Unknown lesson slug");
        const current = read();
        const completed = Array.isArray(current.completed) ? current.completed.filter((value: unknown) => typeof value === "string") : [];
        const next = { ...current, completed: Array.from(new Set([...completed, slug])), recent: slug };
        localStorage.setItem(storageKey, JSON.stringify(next));
        window.dispatchEvent(new Event("nida-econ-state"));
        return { slug, completed: true };
      },
    });
    return () => lifecycle.abort();
  }, []);
  return null;
}
