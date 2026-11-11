"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  ChevronRight,
} from "lucide-react";

const services = [
  { name: "Flight Booking", href: "/flights" },
  { name: "Holiday Packages", href: "/holidays" },
  { name: "Hotel Reservations", href: "/hotels" },
  { name: "Visa Assistance", href: "/visa" },
  { name: "Travel Insurance", href: "/insurance" },
  { name: "Passport Assistance", href: "/passport" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Destinations", href: "/destinations" },
  { name: "Umrah Packages", href: "/umrah" },
  { name: "Group Travel", href: "/group-travel" },
  { name: "Contact Us", href: "/contact" },
];

const socials = [
  { label: "Facebook", short: "f", href: "https://www.facebook.com/" },
  { label: "Instagram", short: "IG", href: "https://www.instagram.com/" },
];

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="flex items-center gap-3 text-base font-bold tracking-wide">
        {title}
        <span className="h-0.5 w-8 rounded-full bg-gradient-to-r from-red-500 to-transparent" />
      </h3>

      <ul className="mt-6 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-white"
            >
              <ChevronRight
                size={14}
                className="-ml-1 text-red-500 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
              />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  children,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-red-400 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-red-600 group-hover:text-white group-hover:ring-red-500">
        <Icon size={17} />
      </span>
      <span className="pt-2 text-sm leading-6 text-slate-300 transition-colors group-hover:text-white">
        {children}
      </span>
    </>
  );

  const className = "group flex items-start gap-3.5";

  return href ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

export default function Footer() {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden bg-[#06162e] text-white">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-red-600/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-[110px]" />

      {/* CTA banner */}
      {/* <div className="relative mx-auto max-w-7xl px-6 pt-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-600 to-rose-500 p-8 shadow-2xl shadow-red-950/40 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-black/10" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-100">
                Travel inspiration
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                Ready for your next adventure?
              </h2>
              <p className="mt-3 text-sm leading-6 text-red-50/90 md:text-base">
                Let us help you create memories that last a lifetime.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-red-600 shadow-xl transition hover:-translate-y-0.5 hover:bg-[#06162e] hover:text-white"
            >
              Plan Your Journey
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div> */}

      {/* Main grid */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.3fr]">
        {/* Company */}
        <div>
          <Link href="/" className="inline-block">
            <span className="text-3xl font-extrabold tracking-tight">
              Travel<span className="text-red-500">Hodie</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Your trusted travel partner for memorable journeys. We bring
            together personalised travel solutions, competitive fares and
            dependable support to make every journey special.
          </p>

          <div className="mt-7 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-bold transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/30"
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>

        <FooterLinkList title="Quick Links" links={quickLinks} />
        <FooterLinkList title="Our Services" links={services} />

        {/* Contact */}
        <div>
          <h3 className="flex items-center gap-3 text-base font-bold tracking-wide">
            Contact Us
            <span className="h-0.5 w-8 rounded-full bg-gradient-to-r from-red-500 to-transparent" />
          </h3>

          <div className="mt-6 space-y-4">
            <ContactRow icon={MapPin}>
              Door No. 4/461, 2nd Floor, Valamkoottil Towers, Judgemukku,
              Thrikkakara P.O., Kakkanad, Kochi, Kerala – 682021, India.
            </ContactRow>

            <ContactRow icon={Phone} href="tel:+918921083214">
              +91 89210 83214
            </ContactRow>

            <ContactRow icon={Mail} href="mailto:Sales@travelhodie.com">
              Sales@travelhodie.com
            </ContactRow>

            <ContactRow icon={Mail} href="mailto:Info@travelhodie.com">
              Info@travelhodie.com
            </ContactRow>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 TravelHodie. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/cancellation-policy"
              className="transition hover:text-white"
            >
              Cancellation Policy
            </Link>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:-translate-y-1 hover:border-red-500 hover:bg-red-600"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}