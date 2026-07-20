import { Mail, ShoppingBag, Sparkles, Award, Heart, Star } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import FeatureCard from "@/components/auth/FeatureCard";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthFooterLink from "@/components/auth/AuthFooterLink";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <BrandPanel
        icon={<ShoppingBag className="h-9 w-9" />}
        title="خرید با استایل"
        subtitle="هزاران محصول از برندهای برتر رو کشف کن"
      >
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard icon={<Sparkles className="h-5 w-5" />} label="پیشنهادهای ویژه" />
          <FeatureCard icon={<Award className="h-5 w-5" />} label="بهترین کیفیت" />
          <FeatureCard icon={<Heart className="h-5 w-5" />} label="لیست علاقه‌مندی" />
          <FeatureCard icon={<Star className="h-5 w-5" />} label="امتیازها" />
        </div>
      </BrandPanel>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h2 className="mb-1 text-2xl font-bold" style={{ color: "var(--auth-text)" }}>
            خوش برگشتی
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--auth-muted)" }}>
            برای ادامه وارد حسابت شو
          </p>

          <form>
            <AuthInput label="ایمیل" name="email" type="email" icon={<Mail className="h-4 w-4" />} />
            <PasswordInput label="رمز عبور" name="password" />

            <div className="mb-6 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2" style={{ color: "var(--auth-text)" }}>
                <input type="checkbox" className="rounded" />
                منو به خاطر بسپار
              </label>
              <a href="#" style={{ color: "var(--auth-secondary)" }}>
                رمز رو فراموش کردی؟
              </a>
            </div>

            <AuthButton>ورود</AuthButton>
          </form>

          <AuthDivider />
          <SocialAuthButtons />
          <AuthFooterLink text="حساب نداری؟" linkText="ثبت‌نام کن" href="/signup" />
        </div>
      </div>
    </div>
  );
}