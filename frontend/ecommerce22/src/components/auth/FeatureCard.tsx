
export default function FeatureCard({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-white/15 px-4 py-5 text-center backdrop-blur">
      <div className="text-white">{icon}</div>
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
}