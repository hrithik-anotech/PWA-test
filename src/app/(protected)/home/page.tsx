import { PageContainer } from "@/components/ui/page-container";
import Image from "next/image";

export default function SnibtoUIShowcase() {
  const services = [
    {
      title: "Cleaning",
      subtitle: "Keep your space fresh & clean",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Bathroom",
      subtitle: "Sparkling clean bathrooms",
      image:
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Laundry",
      subtitle: "Clean, fresh & folded",
      image:
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Utensils",
      subtitle: "Hygienic sparkling utensils",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <PageContainer>
      <div className="mx-auto flex w-full flex-col gap-12 px-5 py-6">
        {/* Splash Preview */}
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2B174D] via-[#5B2FD1] to-[#B18BFF] p-8 shadow-xl">
          <div className="flex min-h-[20rem] flex-col items-center justify-center text-center">
            <div className="space-y-3">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                <span className="text-4xl font-bold text-white">S</span>
              </div>

              <div>
                <h1 className="text-5xl font-extrabold tracking-tight text-white">
                  Snibto
                </h1>

                <p className="mt-2 text-sm font-medium tracking-wide text-white/80">
                  YOUR TRUSTED HOME ASSISTANT
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Onboarding Card */}
        <section className="overflow-hidden rounded-[2rem] bg-white shadow-[0_8px_1.875rem_rgba(0,0,0,0.06)]">
          <div className="h-[20rem] bg-gradient-to-br from-[#E9D5FF] via-white to-[#C4B5FD]" />

          <div className="rounded-t-[2rem] bg-gradient-to-br from-[#5B2FD1] to-[#9F7AEA] p-8 text-white">
            <h2 className="text-center text-3xl font-bold leading-snug">
              Book Trusted Home Helpers in Minutes
            </h2>

            <p className="mt-5 text-center text-base leading-7 text-white/85">
              From cleaning and laundry to cooking and daily assistance,
              get verified home helpers at your doorstep.
            </p>

            <div className="mt-8 flex items-center justify-between text-lg font-semibold">
              <button className="text-white/60">Skip</button>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-2 rounded-full bg-white" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
              </div>

              <button>Next</button>
            </div>
          </div>
        </section>

        {/* Login Screen */}
        <section className="rounded-[2rem] bg-white p-6 shadow-[0_8px_1.875rem_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-3 gap-3">
            <div className="h-28 rounded-[1.75rem] bg-[#EEE5FF]" />
            <div className="h-36 rounded-[1.75rem] bg-[#DDD6FE]" />
            <div className="h-28 rounded-[1.75rem] bg-[#EEE5FF]" />
          </div>

          <div className="mt-10 flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#5B2FD1] text-4xl font-bold text-white shadow-lg">
              S
            </div>

            <div className="mt-6">
              <h2 className="text-5xl font-extrabold tracking-tight text-[#5B2FD1]">
                Snibto
              </h2>

              <p className="mt-1 text-sm font-semibold text-black/70">
                YOUR TRUSTED HOME ASSISTANT
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.375rem] border border-black/10 bg-white text-xl shadow-sm">
              🇮🇳
            </div>

            <input
              placeholder="Enter Mobile"
              className="h-16 flex-1 rounded-[1.375rem] border border-black/10 px-5 text-lg outline-none"
            />
          </div>

          <button className="mt-6 h-14 w-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-lg font-semibold text-white shadow-lg">
            CONFIRM
          </button>

          <p className="mt-6 text-center text-sm leading-6 text-black/50">
            By proceeding, I accept the Terms of use & Privacy policy
          </p>
        </section>

        {/* Name Screen */}
        <section className="rounded-[2rem] bg-gradient-to-br from-white via-[#F5F3FF] to-[#E9D5FF] p-6 shadow-[0_8px_1.875rem_rgba(0,0,0,0.06)]">
          <div className="flex min-h-[26.25rem] flex-col justify-center">
            <div className="mx-auto h-28 w-28 rounded-full bg-[#D8B4FE]" />

            <div className="mt-10 text-center">
              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                What should we call
                <span className="text-[#7C3AED]"> you?</span>
              </h2>
            </div>

            <input
              placeholder="Enter Name"
              className="mt-8 h-16 rounded-[1.5rem] border border-black/10 bg-white px-5 text-lg outline-none"
            />

            <button className="mt-6 h-14 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-lg font-semibold text-white shadow-lg">
              CONTINUE
            </button>
          </div>
        </section>

        {/* Home Screen */}
        <section className="overflow-hidden rounded-[2.25rem] bg-white shadow-[0_8px_1.875rem_rgba(0,0,0,0.06)]">
          <div className="rounded-b-[2.5rem] bg-gradient-to-br from-[#5B2FD1] to-[#7C3AED] px-5 pb-8 pt-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/70">Snibto in</p>

                <h2 className="mt-1 text-5xl font-bold tracking-tight">
                  8 Minutes
                </h2>

                <p className="mt-3 text-base text-white/90">
                  📍 Genex Exotica, Asansol WB
                </p>
              </div>

              <div className="h-12 w-12 rounded-full bg-white/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 px-5 pt-5">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-[#5B2FD1] to-[#8B5CF6] p-5 text-white shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl">
                📅
              </div>

              <h3 className="mt-6 text-3xl font-bold">Schedule</h3>

              <p className="mt-2 text-base text-white/80">
                Pick your time
              </p>
            </div>

            <div className="rounded-[1.75rem] bg-[#F3ECFF] p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9D5FF] text-xl">
                ⚡
              </div>

              <h3 className="mt-6 text-3xl font-bold text-[#111111]">
                Instant
              </h3>

              <p className="mt-2 text-base text-black/60">
                Get help now
              </p>
            </div>
          </div>

          <div className="px-5 pt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold tracking-tight">
                Services
              </h2>

              <button className="text-lg font-semibold text-[#5B2FD1]">
                View all
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 pb-10">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-sm"
                >
                  <Image
                  width={36}
                  height={36}
                    src={service.image}
                    alt={service.title}
                    className="h-36 w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/50">
                      {service.subtitle}
                    </p>

                    <button className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#F3ECFF] text-xl text-[#5B2FD1]">
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="sticky bottom-0 flex justify-center bg-white/90 px-5 pb-6 backdrop-blur">
            <div className="flex w-full items-center justify-around rounded-full border border-black/5 bg-white px-5 py-4 shadow-[0_10px_1.875rem_rgba(0,0,0,0.08)]">
              <button className="flex flex-col items-center gap-1 text-[#5B2FD1]">
                <span className="text-xl">🏠</span>
                <span className="text-xs font-semibold">Home</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-black/50">
                <span className="text-xl">📅</span>
                <span className="text-xs font-medium">Bookings</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-black/50">
                <span className="text-xl">👛</span>
                <span className="text-xs font-medium">Wallet</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-black/50">
                <span className="text-xl">👤</span>
                <span className="text-xs font-medium">Profile</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

