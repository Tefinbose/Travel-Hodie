
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  MapPin,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Plane,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-slate-900 text-white">
      {/* Top Header & Brand */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <Link
            href="/admin"
            className="flex items-center gap-3 transition hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-sm shadow-red-900/40">
              <Plane size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white">TravelHodie</h2>
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <ShieldCheck size={12} className="text-emerald-400" />
                Admin Portal
              </p>
            </div>
          </Link>

          {/* Close button for mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close admin menu"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 px-3 py-5">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Management
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} className={active ? "text-white" : "text-slate-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation: Live Site & Logout */}
      <div className="border-t border-slate-800 p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg px-3.5 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} className="text-slate-400" />
            View Live Website
          </span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
            Public
          </span>
        </Link>

        <div className="rounded-lg bg-slate-800/60 p-3">
          <p className="text-xs font-semibold text-slate-200 truncate">Administrator</p>
          <p className="text-[11px] text-slate-400 truncate">admin@travelhodie.com</p>
        </div>

        <button
          onClick={handleLogout}
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-red-600/90 hover:text-white"
        >
          <LogOut size={16} className="text-slate-400" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
            <Plane size={18} />
          </div>
          <div>
            <span className="font-bold text-slate-900">TravelHodie</span>
            <span className="ml-1.5 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
              Admin
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin menu"
          className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="h-full w-72 max-w-[85vw] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 lg:sticky lg:top-0 lg:block z-30 shadow-md">
        {sidebarContent}
      </aside>
    </>
  );
}

