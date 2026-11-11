"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageCircle,
  Plane,
  MapPin,
  Hotel,
  Globe,
  Users,
  Landmark,
  FileText,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type DropdownItem = { label: string; href: string; icon: LucideIcon };
type NavLink = { label: string; href: string; dropdown?: DropdownItem[] };

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Holidays",
    href: "/holidays",
    dropdown: [
      { label: "All Holiday Packages", href: "/holidays", icon: Globe },
      { label: "Destinations", href: "/destinations", icon: MapPin },
      { label: "Group Travel", href: "/group-travel", icon: Users },
      { label: "Umrah Packages", href: "/umrah", icon: Landmark },
    ],
  },
  {
    label: "Services",
    href: "/flights",
    dropdown: [
      { label: "Flight Booking", href: "/flights", icon: Plane },
      { label: "Hotel Reservations", href: "/hotels", icon: Hotel },
      { label: "Visa Assistance", href: "/visa", icon: FileText },
      { label: "Travel Insurance", href: "/insurance", icon: ShieldCheck },
      { label: "Passport Assistance", href: "/passport", icon: BookOpen },
    ],
  },
  { label: "Enquiry", href: "/enquiry" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Tighten the floating pill once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  }, [pathname]);

  // While the mobile menu is open: lock page scroll, close on Escape, close if resized to desktop
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  // Hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Floating round navbar without black background */}
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full px-3 transition-all duration-300 motion-reduce:transition-none md:px-6 pointer-events-none ${
          scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5"
        }`}
      >
        {/* Dim backdrop behind the mobile menu */}
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 z-0 bg-[#101D35]/50 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none lg:hidden pointer-events-auto ${
            mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <div className="relative z-10 mx-auto max-w-7xl pointer-events-auto">
          {/* The pill */}
          <div
            className={`flex items-center justify-between gap-2 rounded-full px-3 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none md:px-4 lg:gap-4 ${
              scrolled
                ? "h-14 bg-white/95 shadow-xl shadow-[#101D35]/15 md:h-16"
                : "h-16 bg-white/90 shadow-xl shadow-black/10 md:h-[72px]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center rounded-full pl-1 outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#C62835]/60 md:pl-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                src="/logo/travelhodie.png"
                alt="TravelHodie"
                width={280}
                height={140}
                priority
                className={`w-auto object-contain transition-all duration-300 motion-reduce:transition-none ${
                  scrolled ? "h-9 md:h-11" : "h-10 md:h-12"
                }`}
              />
            </Link>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary"
              className="hidden h-full flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <div key={link.href} className="group relative flex h-full items-center">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup={link.dropdown ? "true" : undefined}
                      className={`flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-semibold outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-[#C62835]/60 xl:px-4 xl:text-sm ${
                        active
                          ? "bg-[#101D35] text-white shadow-md shadow-[#101D35]/20"
                          : "text-[#101D35] hover:bg-[#101D35]/5 hover:text-[#C62835]"
                      }`}
                    >
                      {link.label}

                      {link.dropdown && (
                        <ChevronDown
                          size={14}
                          className="transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
                        />
                      )}
                    </Link>

                    {link.dropdown && (
                      <div className="invisible absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 translate-y-1 scale-95 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 origin-top">
                        <div className="rounded-3xl border border-white/70 bg-white/95 p-2 shadow-2xl shadow-[#101D35]/15 ring-1 ring-black/5 backdrop-blur-xl">
                          {link.dropdown.map((item) => {
                            const Icon = item.icon;
                            const itemActive = isActive(item.href);
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                aria-current={itemActive ? "page" : undefined}
                                className={`group/item flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#C62835]/50 ${
                                  itemActive
                                    ? "bg-red-50 font-semibold text-[#C62835]"
                                    : "text-gray-700 hover:bg-red-50 hover:text-[#C62835]"
                                }`}
                              >
                                <span
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                                    itemActive
                                      ? "bg-[#C62835] text-white"
                                      : "bg-gray-100 text-[#101D35] group-hover/item:bg-[#C62835] group-hover/item:text-white"
                                  }`}
                                >
                                  <Icon size={16} />
                                </span>
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Desktop CTA */}
              <Link
                href="/contact"
                className="group hidden items-center gap-3 rounded-full bg-gradient-to-r from-[#C62835] to-[#e0505b] py-1.5 pl-5 pr-1.5 text-[13px] font-bold text-white shadow-md shadow-red-900/20 outline-none transition hover:shadow-lg hover:shadow-red-900/30 focus-visible:ring-2 focus-visible:ring-[#C62835] focus-visible:ring-offset-2 lg:inline-flex xl:text-sm"
              >
                Plan Your Trip
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-[#C62835]">
                  <Plane size={15} />
                </span>
              </Link>

              {/* Mobile / tablet quick actions */}
              <a
                href="tel:+918921083214"
                aria-label="Call us"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#101D35]/5 text-[#101D35] transition hover:bg-[#101D35]/10 md:hidden"
              >
                <Phone size={17} />
              </a>

              <Link
                href="/contact"
                className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#C62835] to-[#e0505b] px-4 py-2.5 text-[13px] font-bold text-white shadow-md shadow-red-900/20 transition hover:shadow-lg sm:inline-flex lg:hidden"
              >
                Plan Your Trip
                <Plane size={15} />
              </Link>

              <button
                type="button"
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`flex h-10 w-10 items-center justify-center rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-[#C62835]/60 lg:hidden ${
                  mobileMenuOpen
                    ? "bg-[#101D35] text-white"
                    : "bg-[#101D35]/5 text-[#101D35] hover:bg-[#101D35]/10"
                }`}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile / tablet menu: a rounded card floating under the pill */}
          <div
            id="mobile-menu"
            className={`absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-2xl shadow-[#101D35]/20 ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none lg:hidden ${
              mobileMenuOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-2 scale-[0.98] opacity-0"
            }`}
          >
            <nav
              aria-label="Mobile"
              className="max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            >
              <div className="mx-auto max-w-2xl space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  const expanded = mobileDropdown === link.label;
                  return (
                    <div key={link.href}>
                      <div
                        className={`flex items-center justify-between rounded-full pr-1 transition ${
                          active ? "bg-[#101D35] text-white" : "text-[#101D35] hover:bg-[#101D35]/5"
                        }`}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className="flex-1 px-5 py-3.5 text-[15px] font-semibold"
                        >
                          {link.label}
                        </Link>

                        {link.dropdown && (
                          <button
                            type="button"
                            aria-label={`Toggle ${link.label} menu`}
                            aria-expanded={expanded}
                            onClick={() => setMobileDropdown(expanded ? null : link.label)}
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                              active ? "hover:bg-white/10" : "hover:bg-[#101D35]/10"
                            }`}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>

                      {link.dropdown && (
                        <div
                          className={`grid transition-all duration-300 motion-reduce:transition-none ${
                            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className={`overflow-hidden ${expanded ? "" : "invisible"}`}>
                            <div className="space-y-1 px-1 pb-2 pt-1">
                              {link.dropdown.map((item) => {
                                const Icon = item.icon;
                                const itemActive = isActive(item.href);
                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 rounded-full py-2 pl-2 pr-4 text-sm transition ${
                                      itemActive
                                        ? "bg-red-50 font-semibold text-[#C62835]"
                                        : "text-gray-700 hover:bg-red-50 hover:text-[#C62835]"
                                    }`}
                                  >
                                    <span
                                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                        itemActive ? "bg-[#C62835] text-white" : "bg-gray-100 text-[#101D35]"
                                      }`}
                                    >
                                      <Icon size={16} />
                                    </span>
                                    {item.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Mobile contact options */}
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <a
                    href="tel:+918921083214"
                    className="flex items-center justify-center gap-2 rounded-full border border-[#101D35]/80 px-3 py-3 text-sm font-semibold text-[#101D35] transition hover:bg-[#101D35] hover:text-white"
                  >
                    <Phone size={16} />
                    Call Us
                  </a>

                  <a
                    href="https://wa.me/918921083214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-green-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C62835] to-[#e0505b] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-red-900/20 transition hover:shadow-lg"
                >
                  Plan Your Trip
                  <Plane size={16} />
                </Link>

                <p className="flex items-center justify-center gap-1.5 pt-2 text-xs text-gray-500">
                  <MapPin size={13} className="text-[#C62835]" />
                  Kochi, Kerala, India
                </p>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}