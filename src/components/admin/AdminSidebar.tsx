
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MapPin,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Plane,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Packages",
    href: "/admin/packages",
    icon: Package,
  },
  {
    name: "Destinations",
    href: "/admin/destinations",
    icon: MapPin,
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    name: "Enquiries",
    href: "/admin/enquiries",
    icon: MessageSquare,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      alert("Unable to log out. Please try again.");
    }
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-[#101827] text-white z-30">
      <div className="shrink-0 border-b border-white/10 px-6 py-6">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-sm shadow-red-950/30">
            <Plane size={22} className="text-white" />
          </div>

          <div>
            <h2 className="text-base font-bold tracking-tight text-white">TravelHodie</h2>
            <p className="text-xs text-gray-400">Admin Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Main Menu
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/admin" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} className={active ? "text-white" : "text-gray-400"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-red-600/90 hover:text-white"
        >
          <LogOut size={18} className="text-gray-400 group-hover:text-white" />
          Logout
        </button>
      </div>
    </aside>
  );
}
