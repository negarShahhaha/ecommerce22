export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ backgroundColor: "var(--auth-bg)" }}>{children}</div>;
}