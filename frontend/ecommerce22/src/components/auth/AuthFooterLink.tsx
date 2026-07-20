
import Link from "next/link";

export default function AuthFooterLink({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="mt-6 text-center text-sm" style={{ color: "var(--auth-muted)" }}>
      {text}{" "}
      <Link href={href} className="font-semibold" style={{ color: "var(--auth-secondary)" }}>
        {linkText}
      </Link>
    </p>
  );
}