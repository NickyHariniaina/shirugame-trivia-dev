"use client";
import { Spinner } from "../shadcn-component/spinner";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-white bg-opacity-50 z-50">
      <div className="flex flex-row justify-center items-center gap-4">
        <Spinner />
      </div>
    </div>
  );
}
