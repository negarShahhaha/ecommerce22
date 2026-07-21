
import Link from "next/link";
import { Shirt, Smartphone, ShoppingBag, Sparkles, LucideIcon } from "lucide-react";
import { categories } from "@/lib/mock/product";

const iconMap: Record<string, LucideIcon> = {
  Shirt,
  Smartphone,
  ShoppingBag,
  Sparkles,
};

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <h2 className="mb-8 text-2xl font-bold" style={{ color: "var(--auth-text)" }}>
        دسته‌بندی‌ها
      </h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon];
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition hover:shadow-md"
              style={{ borderColor: "var(--auth-border)" }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--auth-accent)" }}
              >
                <Icon className="h-6 w-6" style={{ color: "var(--auth-primary)" }} />
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--auth-text)" }}>
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}