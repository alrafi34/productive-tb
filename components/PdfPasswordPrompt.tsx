"use client";

import { useState } from "react";

/* Inline box asking for the open password of a locked PDF. */
export default function PdfPasswordPrompt({
  fileName,
  wrong,
  busy,
  onUnlock,
  onRemove,
}: {
  fileName: string;
  wrong: boolean;
  busy: boolean;
  onUnlock: (password: string) => void;
  onRemove?: () => void;
}) {
  const [password, setPassword] = useState("");
  const id = `pdf-pw-${fileName.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password) onUnlock(password);
      }}
      className="p-3 bg-amber-50 border border-amber-200 rounded-lg"
    >
      <label htmlFor={id} className="block text-sm text-amber-900 mb-2">
        🔒 <strong className="break-all">{fileName}</strong> is locked with a password. Enter it to open the file.
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={id}
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={busy}
          className={`min-w-0 flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#058554] ${wrong ? "border-red-400" : "border-gray-300"}`}
          placeholder="PDF password"
        />
        <button type="submit" disabled={busy || !password} className="px-4 py-2 bg-[#058554] text-white rounded-lg hover:bg-[#047045] disabled:opacity-50 font-medium text-sm">
          {busy ? "Opening…" : "Unlock"}
        </button>
        {onRemove && (
          <button type="button" onClick={onRemove} disabled={busy} className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
            Remove
          </button>
        )}
      </div>
      {wrong && <p className="mt-2 text-sm text-red-600">That password is not correct. Try again.</p>}
    </form>
  );
}
