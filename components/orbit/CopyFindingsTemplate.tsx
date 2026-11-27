"use client";

import { useState } from "react";

export function CopyFindingsTemplate({ template }: { template: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "select">("idle");

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(template);
      setStatus("copied");
    } catch {
      setStatus("select");
    }
  }

  return (
    <div className="findings-copy">
      <button className="button button-lime" type="button" onClick={copyTemplate}>
        Copy findings template
      </button>
      <span role="status">
        {status === "copied" && "Copied. Paste into a spreadsheet."}
        {status === "select" && "Select and copy the template below."}
      </span>
      {status === "select" && (
        <label>
          Findings template
          <textarea readOnly rows={5} value={template} onFocus={event => event.currentTarget.select()} />
        </label>
      )}
    </div>
  );
}
