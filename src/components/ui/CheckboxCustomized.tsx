"use client";

import { useState } from "react";

type CCPropsType = {
  answer: string;
};
export function CustomCheckbox(props: CCPropsType) {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)} // update state from input
      />

      {/* Visual checkbox */}
      <div
        className={`
          w-6 h-6 border-2 rounded flex items-center justify-center transition-colors duration-200
          ${
            checked
              ? "bg-black border-black dark:bg-white dark:border-white"
              : "bg-white border-black dark:bg-black dark:border-white"
          }
        `}
      >
        {checked && (
          <svg
            className={`w-4 h-4 ${checked ? "text-white dark:text-black" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      <span className="text-black dark:text-white">{props.answer}</span>
    </label>
  );
}
