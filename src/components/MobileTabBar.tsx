"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { href: "/", label: "الرئيسية", emoji: "🏠" },
  { href: "/search", label: "البحث", emoji: "🔎" },
  { href: "/cart", label: "السلة", emoji: "🛒" },
  { href: "/profile", label: "حسابي", emoji: "👤" },
]

export function MobileTabBar() {
  const path = usePathname()
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-t"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-4">
        {tabs.map(t => (
          <li key={t.href} className="text-center">
            <Link href={t.href} className={`block py-2 ${path === t.href ? "text-emerald-700 font-semibold" : ""}`}>
              <div>{t.emoji}</div>
              <div className="text-xs">{t.label}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
