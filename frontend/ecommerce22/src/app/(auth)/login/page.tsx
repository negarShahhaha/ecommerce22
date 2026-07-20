"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ShoppingBag, Sparkles, Award, Heart, Star } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import FeatureCard from "@/components/auth/FeatureCard";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthFooterLink from "@/components/auth/AuthFooterLink";
import { loginUser } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await loginUser(username, password);
    setLoading(false);

    if (!res.success) {
      setError(
        res.errors?.non_field_errors?.[0] || "نام کاربری یا رمز عبور اشتباهه"
      );
      return;
    }

    localStorage.setItem("token", res.token);
    router.push("/");
  }

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

          <form onSubmit={handleSubmit}>
            <AuthInput
              label="نام کاربری"
              name="username"
              icon={<User className="h-4 w-4" />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordInput
              label="رمز عبور"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="mb-4 text-sm" style={{ color: "var(--auth-secondary)" }}>
                {error}
              </p>
            )}

            <AuthButton loading={loading}>ورود</AuthButton>
          </form>

          <AuthDivider />
          <SocialAuthButtons />
          <AuthFooterLink text="حساب نداری؟" linkText="ثبت‌نام کن" href="/signup" />
        </div>
      </div>
    </div>
  );
}