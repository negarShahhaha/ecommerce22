
import Link from "next/link";
import { Backpack, Headphones, Watch, Glasses, LucideIcon } from "lucide-react";
import { featuredProducts } from "@/lib/mock/product";

const iconMap: Record<string, LucideIcon> = {
  Backpack,
  Headphones,
  Watch,
  Glasses,
};

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: "var(--auth-text)" }}>
          محصولات پیشنهادی
        </h2>
        <Link
          href="/products"
          className="text-sm font-medium"
          style={{ color: "var(--auth-secondary)" }}
        >
          مشاهده همه
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {featuredProducts.map((product) => {
          const Icon = iconMap[product.icon];
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group overflow-hidden rounded-2xl border transition hover:shadow-lg"
              style={{ borderColor: "var(--auth-border)" }}
            >
              <div
                className="relative flex aspect-square items-center justify-center"
                style={{ backgroundColor: "var(--auth-accent)" }}
              >
                {product.badge && (
                  <span
                    className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                    style={{ backgroundColor: "var(--auth-secondary)" }}
                  >
                    {product.badge}
                  </span>
                )}
                <Icon
                  className="h-16 w-16 transition group-hover:scale-110"
                  style={{ color: "var(--auth-primary)" }}
                  strokeWidth={1.5}
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-sm font-medium" style={{ color: "var(--auth-text)" }}>
                  {product.name}
                </h3>
                <p className="text-sm font-bold" style={{ color: "var(--auth-primary)" }}>
                  {product.price.toLocaleString("fa-IR")} تومان
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}