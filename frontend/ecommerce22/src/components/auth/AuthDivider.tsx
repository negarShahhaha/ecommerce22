
export default function AuthDivider({ text = "یا ادامه بده با" }: { text?: string }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1" style={{ backgroundColor: "var(--auth-border)" }} />
      <span className="text-xs" style={{ color: "var(--auth-muted)" }}>{text}</span>
      <span className="h-px flex-1" style={{ backgroundColor: "var(--auth-border)" }} />
    </div>
  );
}