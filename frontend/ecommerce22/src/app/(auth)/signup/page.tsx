
import { User, Mail } from "lucide-react";
import BrandPanel from "@/components/auth/BrandPanel";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import AuthFooterLink from "@/components/auth/AuthFooterLink";

export default function SignupPage() {
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

          <form>
            <AuthInput label="نام کامل" name="fullName" icon={<User className="h-4 w-4" />} />
            <AuthInput label="ایمیل" name="email" type="email" icon={<Mail className="h-4 w-4" />} />
            <PasswordInput label="رمز عبور" name="password" />
            <PasswordInput label="تکرار رمز عبور" name="confirmPassword" />

            <label className="mb-6 flex items-start gap-2 text-sm" style={{ color: "var(--auth-text)" }}>
              <input type="checkbox" className="mt-1 rounded" />
              <span>
                قوانین و{" "}
                <a href="#" style={{ color: "var(--auth-secondary)" }}>
                  حریم خصوصی
                </a>{" "}
                رو مطالعه کردم و می‌پذیرم
              </span>
            </label>

            <AuthButton>ساخت حساب</AuthButton>
          </form>

          <AuthDivider />
          <SocialAuthButtons />
          <AuthFooterLink text="حساب داری؟" linkText="وارد شو" href="/login" />
        </div>
      </div>
    </div>
  );
}