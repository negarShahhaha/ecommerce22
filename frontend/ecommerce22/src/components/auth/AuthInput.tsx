
type Props = {
  label: string;
  type?: string;
  name: string;
  error?: string;
  register?: any; // بذار خودت با react-hook-form وصلش کنی
};

export default function AuthInput({
  label,
  type = "text",
  name,
  icon,
  error,
}: {
  label: string;
  type?: string;
  name: string;
  icon?: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-sm font-medium" style={{ color: "var(--auth-text)" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--auth-muted)" }}>
            {icon}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          className={`w-full rounded-lg border py-2.5 ${icon ? "pl-10" : "pl-4"} pr-4 outline-none transition focus:ring-2`}
          style={{
            borderColor: error ? "var(--auth-secondary)" : "var(--auth-border)",
            backgroundColor: "var(--auth-bg)",
            color: "var(--auth-text)",
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs" style={{ color: "var(--auth-secondary)" }}>{error}</p>}
    </div>
  );
}