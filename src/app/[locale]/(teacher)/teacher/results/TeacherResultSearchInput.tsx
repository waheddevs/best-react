"use client";

import { useEffect, useRef, useState } from "react";

type TeacherResultSearchInputProps = {
  initialValue: string;
  label: string;
  onSearch: (value: string) => void;
};

const SEARCH_DEBOUNCE_MS = 300;

export function TeacherResultSearchInput({
  initialValue,
  label,
  onSearch,
}: TeacherResultSearchInputProps) {
  const timeoutReference = useRef<number | null>(null);
  const [value, setValue] = useState(initialValue);

  useEffect(
    () => () => {
      if (timeoutReference.current !== null) window.clearTimeout(timeoutReference.current);
    },
    [],
  );

  return (
    <label className="teacherResults__searchField">
      <span>{label}</span>
      <input
        maxLength={80}
        name="search"
        onChange={(event) => {
          if (timeoutReference.current !== null) window.clearTimeout(timeoutReference.current);
          const nextValue = event.currentTarget.value;
          setValue(nextValue);
          timeoutReference.current = window.setTimeout(() => {
            timeoutReference.current = null;
            onSearch(nextValue);
          }, SEARCH_DEBOUNCE_MS);
        }}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          if (timeoutReference.current !== null) window.clearTimeout(timeoutReference.current);
          timeoutReference.current = null;
          onSearch(event.currentTarget.value);
        }}
        type="search"
        value={value}
      />
    </label>
  );
}
