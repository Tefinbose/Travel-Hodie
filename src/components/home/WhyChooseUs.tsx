import {
  Compass,
  Wallet,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-8 sm:py-10 md:py-12">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-5 mb-5 sm:mb-6 md:mb-7">
          <div className="max-w-lg">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 sm:text-[11px]">
              Why TravelHodie
            </span>
            <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-[#101c32] sm:text-2xl md:text-[1.85rem] md:leading-tight">
              More Than Just a Travel
              <br className="hidden sm:inline" />
              Booking
            </h2>
          </div>

          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-slate-500 md:pb-1">
            We believe every journey deserves thoughtful planning, dependable
            service and memorable experiences.
          </p>
        </div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
          {/* Card 1: Personalised Journeys (Dark Bento Card) */}
          <div className="lg:col-span-4 relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-[24px] bg-gradient-to-b from-[#141d2e] via-[#0f1726] to-[#090f1a] p-5 sm:p-6 md:p-6 text-white shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/20 transition-all duration-300 min-h-[250px] lg:min-h-0">
            {/* Glowing red accent flares */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-red-600/25 blur-2xl" />
            <div className="pointer-events-none absolute top-3 left-3 h-20 w-20 rounded-full bg-rose-500/20 blur-xl" />

            {/* Concentric circular lines decoration */}
            <svg
              className="pointer-events-none absolute right-[-30px] top-[15%] h-[260px] w-[260px] opacity-15"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="100" cy="100" r="35" stroke="white" strokeWidth="0.75" />
              <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="0.75" />
              <circle cx="100" cy="100" r="85" stroke="white" strokeWidth="0.75" />
              <circle cx="100" cy="100" r="110" stroke="white" strokeWidth="0.75" />
              <circle cx="100" cy="100" r="135" stroke="white" strokeWidth="0.75" />
            </svg>

            {/* Top: Glowing Compass Icon */}
            <div className="relative z-10">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-500/40 ring-2 sm:ring-4 ring-red-500/20">
                <Compass size={20} strokeWidth={2} />
              </div>
            </div>

            {/* Bottom: Title & Description */}
            <div className="relative z-10 mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl md:text-[1.35rem] font-extrabold text-white tracking-tight leading-snug">
                Personalised
                <br />
                Journeys
              </h3>
              <p className="mt-1.5 text-xs text-slate-300/90 leading-relaxed max-w-xs line-clamp-2">
                Travel plans designed around your interests and budget.
              </p>
            </div>
          </div>

          {/* Right Section: Cards 2, 3, and 4 */}
          <div className="lg:col-span-8 flex flex-col gap-3.5 sm:gap-4 justify-between">
            {/* Card 2: Competitive Prices (Wide Top Card with Bar Chart) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-[24px] bg-white p-4 sm:p-5 md:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
              {/* Top Row: Icon + 'Best value' Pill */}
              <div className="flex items-center justify-between">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                  <Wallet size={16} />
                </div>
                <span className="rounded-full bg-[#101c32] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  Best value
                </span>
              </div>

              {/* Bottom Row: Text + 5-bar ascending visualization */}
              <div className="mt-4 sm:mt-5 flex flex-wrap items-end justify-between gap-3">
                <div className="max-w-sm">
                  <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#101c32]">
                    Competitive Prices
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                    Explore travel options that offer excellent value.
                  </p>
                </div>

                {/* 5-bar ascending visualization */}
                <div className="flex items-end gap-1.5 sm:gap-2 shrink-0 pb-0.5" aria-hidden="true">
                  <span className="h-4 w-2.5 sm:w-3 rounded-full bg-rose-200/70" />
                  <span className="h-6 w-2.5 sm:w-3 rounded-full bg-rose-300/80" />
                  <span className="h-9 w-2.5 sm:w-3 rounded-full bg-rose-400/80" />
                  <span className="h-12 w-2.5 sm:w-3 rounded-full bg-rose-500/80" />
                  <span className="h-16 w-3 sm:w-3.5 rounded-full bg-gradient-to-t from-red-600 to-rose-500 shadow-sm shadow-red-500/30" />
                </div>
              </div>
            </div>

            {/* Bottom Row: Cards 3 & 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Card 3: Reliable Assistance */}
              <div className="flex flex-col justify-between rounded-2xl md:rounded-[24px] bg-white p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-300">
                    03
                  </span>
                </div>

                <div className="mt-4 sm:mt-5">
                  <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-[#101c32]">
                    Reliable Assistance
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                    Support and guidance throughout your travel planning.
                  </p>
                </div>
              </div>

              {/* Card 4: Customer Support */}
              <div className="flex flex-col justify-between rounded-2xl md:rounded-[24px] bg-white p-4 sm:p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-red-50 text-red-600 border border-red-100/60 shadow-sm">
                    <Headphones size={16} />
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-300">
                    04
                  </span>
                </div>

                <div className="mt-4 sm:mt-5">
                  <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-[#101c32]">
                    Customer Support
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                    Our team is here to help you plan with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
