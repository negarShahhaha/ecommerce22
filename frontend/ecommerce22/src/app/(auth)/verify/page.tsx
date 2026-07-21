
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandPanel from "@/components/auth/BrandPanel";
import AuthButton from "@/components/auth/AuthButton";
import { verifyOtp } from "@/lib/api/auth";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await verifyOtp(email, code);
    setLoading(false);

    if (!res.success) {
      setError(
        res.errors?.message ||
        res.errors?.code?.[0] ||
        res.errors?.non_field_errors?.[0] ||
        "کد وارد شده اشتباهه یا منقضی شده"
      );
      return;
    }

    router.push("/login");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <BrandPanel
        title="یه قدم مونده"
        subtitle="کد ارسال‌شده به ایمیلت رو وارد کن"
      />

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h2 className="mb-1 text-2xl font-bold" style={{ color: "var(--auth-text)" }}>
            تایید ایمیل
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--auth-muted)" }}>
            کد ۵ رقمی که به {email || "ایمیلت"} فرستادیم رو وارد کن
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="code"
                className="mb-1 block text-sm font-medium"
                style={{ color: "var(--auth-text)" }}
              >
                کد تایید
              </label>
              <input
                id="code"
                name="code"
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-lg border px-4 py-2.5 text-center text-lg tracking-widest outline-none transition focus:ring-2"
                style={{
                  borderColor: "var(--auth-border)",
                  backgroundColor: "var(--auth-bg)",
                  color: "var(--auth-text)",
                }}
              />
            </div>

            {error && (
              <p className="mb-4 text-sm" style={{ color: "var(--auth-secondary)" }}>
                {error}
              </p>
            )}

            <AuthButton loading={loading}>تایید کد</AuthButton>
          </form>
        </div>
      </div>
    </div>
  );
}