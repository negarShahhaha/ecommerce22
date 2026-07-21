
import Link from "next/link";

export default function Footer() {
  const columns = [
    {
      title: "فروشگاه",
      links: [
        { label: "همه محصولات", href: "/products" },
        { label: "دسته‌بندی‌ها", href: "/categories" },
        { label: "پیشنهادهای ویژه", href: "/deals" },
      ],
    },
    {
      title: "پشتیبانی",
      links: [
        { label: "تماس با ما", href: "/contact" },
        { label: "سوالات متداول", href: "/faq" },
        { label: "راهنمای خرید", href: "/guide" },
      ],
    },
    {
      title: "درباره ما",
      links: [
        { label: "معرفی فروشگاه", href: "/about" },
        { label: "حریم خصوصی", href: "/privacy" },
        { label: "قوانین و مقررات", href: "/terms" },
      ],
    },
  ];

  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "var(--auth-bg)", borderColor: "var(--auth-border)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-3 text-lg font-bold" style={{ color: "var(--auth-text)" }}>
              فروشگاه
            </h3>
            <p className="text-sm" style={{ color: "var(--auth-muted)" }}>
              خرید آسون، ارسال سریع، کیفیت تضمینی.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold" style={{ color: "var(--auth-text)" }}>
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition hover:opacity-70"
                      style={{ color: "var(--auth-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-10 border-t pt-6 text-center text-sm"
          style={{ borderColor: "var(--auth-border)", color: "var(--auth-muted)" }}
        >
          © {new Date().getFullYear()} فروشگاه. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}