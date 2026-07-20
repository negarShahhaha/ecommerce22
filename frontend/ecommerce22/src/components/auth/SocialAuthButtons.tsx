
export default function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition hover:bg-black/5"
        style={{ borderColor: "var(--auth-border)", color: "var(--auth-text)" }}
      >
        Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition hover:bg-black/5"
        style={{ borderColor: "var(--auth-border)", color: "var(--auth-text)" }}
      >
        Facebook
      </button>
    </div>
  );
}