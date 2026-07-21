
export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-8 shadow-lg"
      style={{
        backgroundColor: "var(--auth-accent)",
        border: "1px solid var(--auth-border)",
      }}
    >
      <h1 className="mb-1 text-2xl font-bold" style={{ color: "var(--auth-text)" }}>
        {title}
      </h1>
      {subtitle && (
        <p className="mb-6 text-sm opacity-70" style={{ color: "var(--auth-text)" }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}