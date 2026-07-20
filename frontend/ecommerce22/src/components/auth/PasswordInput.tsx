
"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
  label,
  name,
  error,
}: {
  label: string;
  name: string;
  error?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-sm font-medium" style={{ color: "var(--auth-text)" }}>
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--auth-muted)" }} />
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          className="w-full rounded-lg border py-2.5 pl-10 pr-10 outline-none transition focus:ring-2"
          style={{
            borderColor: error ? "var(--auth-secondary)" : "var(--auth-border)",
            backgroundColor: "var(--auth-bg)",
            color: "var(--auth-text)",
          }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--auth-muted)" }}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs" style={{ color: "var(--auth-secondary)" }}>{error}</p>}
    </div>
  );
}