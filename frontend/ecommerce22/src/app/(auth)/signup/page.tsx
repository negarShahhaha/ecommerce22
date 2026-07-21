"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthFooterLink from "@/components/auth/AuthFooterLink";
import { registerUser } from "@/lib/api/auth";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!agreed) {
      setError("باید قوانین و حریم خصوصی رو بپذیری");
      return;
    }
    if (password !== confirmPassword) {
      setError("رمز عبور و تکرارش یکسان نیستن");
      return;
    }

    setLoading(true);
    const res = await registerUser(email, username, password, confirmPassword);
    setLoading(false);

    if (!res.success) {
      const firstError =
        res.errors?.email?.[0] ||
        res.errors?.username?.[0] ||
        res.errors?.password?.[0] ||
        res.errors?.non_field_errors?.[0] ||
        "خطایی پیش اومد، دوباره امتحان کن";
      setError(firstError);
      return;
    }

    router.push(`/verify?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <BrandPanel
        title="فقط یه قدم تا شروع"
        subtitle="بساز، بچین، لذت ببر — حساب کاربریت رو همین الان بساز"
      />

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h2 className="mb-1 text-2xl font-bold" style={{ color: "var(--auth-text)" }}>
            ساخت حساب کاربری
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--auth-muted)" }}>
            چند ثانیه‌ای عضو شو و شروع کن
          </p>

          <form onSubmit={handleSubmit}>
            <AuthInput
              label="نام کاربری"
              name="username"
              icon={<User className="h-4 w-4" />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <AuthInput
              label="ایمیل"
              name="email"
              type="email"
              icon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              label="رمز عبور"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordInput
              label="تکرار رمز عبور"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <label className="mb-6 flex items-start gap-2 text-sm" style={{ color: "var(--auth-text)" }}>
              <input
                type="checkbox"
                className="mt-1 rounded"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                قوانین و{" "}
                <a href="#" style={{ color: "var(--auth-secondary)" }}>
                  حریم خصوصی
                </a>{" "}
                رو مطالعه کردم و می‌پذیرم
              </span>
            </label>

            {error && (
              <p className="mb-4 text-sm" style={{ color: "var(--auth-secondary)" }}>
                {error}
              </p>
            )}

            <AuthButton loading={loading}>ساخت حساب</AuthButton>
          </form>

          <AuthDivider />
          <SocialAuthButtons />
          <AuthFooterLink text="حساب داری؟" linkText="وارد شو" href="/login" />
        </div>
      </div>
    </div>
  );
}