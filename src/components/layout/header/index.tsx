"use client";

import Header from "./header";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";

const navigation = [
  { label: "New", href: "/category/winter-essentials" },
  { label: "Men", href: "/category/winter-essentials" },
  { label: "Women", href: "/category/winter-essentials" },
  { label: "Sale", href: "/category/winter-essentials" }
];

export default function HeaderContainer() {
  const { user, loading, signOut } = useAuth();

  const rightContent = () => {
    if (loading) return null;
    if (!user) return <Link href="/login">Login</Link>;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span>{user.displayName || user.email}</span>
        <button onClick={signOut}>Logout</button>
      </div>
    );
  };

  return <Header navigation={navigation} rightContent={rightContent()} />;
}
