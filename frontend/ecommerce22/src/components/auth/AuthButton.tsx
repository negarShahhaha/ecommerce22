export default function AuthButton({
  children,
  loading,
  type = "submit",
}: {
  children: React.ReactNode;
  loading?: boolean;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full rounded-lg py-2.5 font-semibold text-white transition disabled:opacity-60"
      style={{ backgroundColor: "var(--auth-primary)" }}
    >
      {loading ? "..." : children}
    </button>
  );
}