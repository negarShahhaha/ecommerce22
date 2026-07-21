
import { Truck, ShieldCheck, Headset, RotateCcw } from "lucide-react";

const items = [
  { icon: Truck, title: "ارسال سریع", desc: "تحویل ۲۴ تا ۴۸ ساعته" },
  { icon: ShieldCheck, title: "ضمانت اصالت", desc: "۱۰۰٪ کالای اورجینال" },
  { icon: RotateCcw, title: "مرجوعی آسان", desc: "تا ۷ روز ضمانت بازگشت" },
  { icon: Headset, title: "پشتیبانی ۲۴ساعته", desc: "همیشه در کنار شما" },
];

export default function TrustBar() {
  return (
    <section
      className="border-y py-12"
      style={{ borderColor: "var(--auth-border)", backgroundColor: "var(--auth-accent)" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 lg:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--auth-primary)" }}
            >
              <item.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--auth-text)" }}>
                {item.title}
              </p>
              <p className="text-xs" style={{ color: "var(--auth-muted)" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}