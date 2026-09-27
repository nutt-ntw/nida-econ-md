"use client";

import { useCallback, useEffect, useState } from "react";

export type StudyState = {
  completed: string[];
  bookmarks: string[];
  recent: string | null;
  cardRatings: Record<string, "known" | "unsure" | "review">;
  lastQuizScore: number | null;
};

const initialState: StudyState = {
  completed: [],
  bookmarks: [],
  recent: null,
  cardRatings: {},
  lastQuizScore: null,
};

const key = "nida-econ-study-state-v1";

export function useStudyState() {
  const [state, setState] = useState<StudyState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const saved = localStorage.getItem(key);
        setState(saved ? { ...initialState, ...JSON.parse(saved) } : initialState);
      } catch {
        setState(initialState);
      }
    };
    const sync = () => read();
    try {
      const saved = localStorage.getItem(key);
      if (saved) window.requestAnimationFrame(() => setState({ ...initialState, ...JSON.parse(saved) }));
    } catch {
      // Fall back to an empty, usable state if browser storage is unavailable.
    }
    window.requestAnimationFrame(() => setReady(true));
    window.addEventListener("nida-econ-state", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("nida-econ-state", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((recipe: (current: StudyState) => StudyState) => {
    setState((current) => {
      const next = recipe(current);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // The UI remains usable even when storage is full or disabled.
      }
      return next;
    });
  }, []);

  return { state, update, ready };
}
