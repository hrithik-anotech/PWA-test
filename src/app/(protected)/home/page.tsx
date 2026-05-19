import type { Viewport } from "next";
import { PageContainer } from "@/components/ui/page-container";
import Image from "next/image";

export const viewport: Viewport = {
  themeColor: "transparent",
  viewportFit: "cover",
};

export default function HomePage() {
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
        {/* Home Screen */}
        <section className="overflow-hidden rounded-[2.25rem] bg-[#ffffff] shadow-[0_8px_1.875rem_rgba(0,0,0,0.06)]">
          <div className="rounded-b-[2.5rem] bg-gradient-to-br from-[#5F30CA] to-[#7C3AED] px-5 pb-8 pt-6 text-white">
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
                  <div className="relative h-36 w-full">
                    <Image
                      fill
                      sizes="(max-width: 640px) 50vw, 240px"
                      src={service.image}
                      alt={service.title}
                      className="object-cover"
                    />
                  </div>

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

        </section>
    </PageContainer>
  );
}

