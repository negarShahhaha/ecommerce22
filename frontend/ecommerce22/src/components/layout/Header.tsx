
"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Heart, User, Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    { label: "دسته‌بندی‌ها", href: "/categories" },
    { label: "درباره ما", href: "/about" },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "var(--auth-bg)", borderColor: "var(--auth-border)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--auth-primary)" }}
          >
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold" style={{ color: "var(--auth-text)" }}>
            فروشگاه
          </span>
        </Link>

        {/* منوی دسکتاپ */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition hover:opacity-70"
              style={{ color: "var(--auth-text)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* آیکون‌های سمت راست */}
        <div className="flex items-center gap-4">
          <button style={{ color: "var(--auth-text)" }} aria-label="جستجو">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" style={{ color: "var(--auth-text)" }} aria-label="علاقه‌مندی‌ها">
            <Heart className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative" style={{ color: "var(--auth-text)" }} aria-label="سبد خرید">
            <ShoppingBag className="h-5 w-5" />
            <span
              className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white"
              style={{ backgroundColor: "var(--auth-secondary)" }}
            >
              0
            </span>
          </Link>
          <Link href="/login" className="hidden lg:block" style={{ color: "var(--auth-text)" }} aria-label="حساب کاربری">
            <User className="h-5 w-5" />
          </Link>

          {/* دکمه منو موبایل */}
          <button
            className="lg:hidden"
            style={{ color: "var(--auth-text)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="منو"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {menuOpen && (
        <nav
          className="flex flex-col gap-1 border-t px-4 py-4 lg:hidden"
          style={{ borderColor: "var(--auth-border)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5"
              style={{ color: "var(--auth-text)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-black/5"
            style={{ color: "var(--auth-text)" }}
            onClick={() => setMenuOpen(false)}
          >
            حساب کاربری
          </Link>
        </nav>
      )}
    </header>
  );
}