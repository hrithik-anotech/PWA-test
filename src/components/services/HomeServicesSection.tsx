'use client';

import Image from 'next/image';
import InstantBookingDrawer from '@/components/services/InstantBookingDrawer';
import ServiceDrawer from '@/components/services/ServiceDrawer';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useRouter } from '@/i18n/routing';
import { useState } from 'react';

type ServiceItem = {
  icon: string;
  id: string;
  image: string;
  fallbackImage: string;
  includedItems: { icon: string; text: string }[];
  label: string;
  notIncludedItems: { icon: string; text: string }[];
  subtitle: string;
};

type HomeServicesSectionProps = {
  services: ServiceItem[];
  title: string;
  viewAllLabel: string;
};

export default function HomeServicesSection({
  services,
  title,
  viewAllLabel,
}: HomeServicesSectionProps) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInstantDrawerOpen, setIsInstantDrawerOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? '');

  const orderedServices = [
    ...services.filter((service) => service.id === selectedServiceId),
    ...services.filter((service) => service.id !== selectedServiceId),
  ];
  const selectedService =
    services.find((service) => service.id === selectedServiceId) ?? services[0];

  const openService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const closeInstantDrawer = () => {
    setIsInstantDrawerOpen(false);
  };

  return (
    <>
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[6.5vw] font-semibold tracking-tight text-[#0D0D0D]">
            {title}
          </h2>

          <button
            type="button"
            onClick={() => openService(services[0]?.id ?? '')}
            className="flex items-center gap-0.5 text-sm font-semibold text-[#6C35DE]"
          >
            {viewAllLabel}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="#6C35DE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {services.map((service, index) => (
            <button
              key={service.id}
              type="button"
              onClick={() => openService(service.id)}
              className="overflow-hidden rounded-xl bg-white text-left active:scale-[0.98]"
              style={{ border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div className="relative aspect-3/2 w-full overflow-hidden">
                <OptimizedImage
                  fill
                  sizes="(max-width: 640px) 50vw, 200px"
                  src={service.image}
                  fallbackSrc={service.fallbackImage}
                  alt={service.label}
                  priority={index < 2}
                  className="rounded-xl object-cover"
                />

                <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                  <Image
                    src={service.icon}
                    alt={service.label}
                    width={18}
                    height={18}
                    className="h-[1.125rem] w-[1.125rem] object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3">
                <div>
                  <h3 className="text-base font-medium text-[#111]">
                    {service.label}
                  </h3>
                  <p className="mt-0.5 whitespace-pre-line text-[2.75vw] leading-tight text-[#595959]">
                    {service.subtitle}
                  </p>
                </div>

                <div className="aspect-square rounded-full bg-[#F3EDFE] p-1">
                  <Image
                    alt=""
                    src="/images/icons/arrow-left-color.svg"
                    width={26}
                    height={26}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ServiceDrawer
        key={selectedServiceId}
        open={isDrawerOpen}
        onClose={closeDrawer}
        services={orderedServices.map((service) => ({
          id: service.id,
          label: service.label,
          img: service.image,
          fallbackImg: service.fallbackImage,
          includedItems: service.includedItems,
          notIncludedItems: service.notIncludedItems,
        }))}
        onSchedule={() => {
          closeDrawer();
          router.push('/bookings/schedule');
        }}
        onBookInstant={() => {
          closeDrawer();
          setIsInstantDrawerOpen(true);
        }}
      />

      <InstantBookingDrawer
        open={isInstantDrawerOpen}
        onClose={closeInstantDrawer}
        serviceLabel={selectedService?.label}
      />
    </>
  );
}
