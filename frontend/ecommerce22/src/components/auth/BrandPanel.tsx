
export default function BrandPanel({
  icon,
  title,
  subtitle,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="hidden flex-col justify-center px-12 py-16 text-white lg:flex"
      style={{ background: "var(--auth-panel-gradient)" }}
    >
      {icon && (
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
          {icon}
        </div>
      )}
      <h1 className="mb-3 text-3xl font-bold">{title}</h1>
      <p className="mb-10 text-base text-white/80">{subtitle}</p>
      {children}
    </div>
  );
}