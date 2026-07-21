
import Link from "next/link";
import { ArrowLeft, Backpack, Headphones, Watch, Glasses } from "lucide-react";

export default function Hero() {
  const icons = [Backpack, Headphones, Watch, Glasses];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--auth-panel-gradient)" }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <span
            className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            کالکشن جدید رسید
          </span>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white lg:text-5xl">
            استایلت رو با کیفیت
            <br />
            تعریف کن
          </h1>
          <p className="mb-8 max-w-md text-white/80">
            هزاران محصول اورجینال از برندهای معتبر، با ارسال سریع و ضمانت اصالت کالا.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition hover:opacity-90"
            style={{ backgroundColor: "var(--auth-accent)", color: "var(--auth-text)" }}
          >
            مشاهده محصولات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="hidden grid-cols-2 gap-4 lg:grid">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl backdrop-blur"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              <Icon className="h-12 w-12 text-white" strokeWidth={1.5} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}