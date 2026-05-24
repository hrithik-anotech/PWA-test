'use client';

import { cn } from '@/lib/cn';
import Image from 'next/image';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

// ── Types ─────────────────────────────────────────────────────────────────────

type Service = {
  id: string;
  label: string;
  img: string;
  fallbackImg: string;
  includedItems: { text: string; icon: string }[];
  notIncludedItems: { text: string; icon: string }[];
};

type ServiceDrawerProps = {
  open: boolean;
  onClose: () => void;
  services: Service[];
  onSchedule?: () => void;
  onBookInstant?: () => void;
};

const subscribeToPortalTarget = () => {
  return () => {};
};

const getPortalTargetSnapshot = () => {
  return typeof document !== 'undefined';
};

const getServerPortalTargetSnapshot = () => false;

// ── Drawer ────────────────────────────────────────────────────────────────────

export default function ServiceDrawer({
  open,
  onClose,
  services,
  onSchedule,
  onBookInstant,
}: ServiceDrawerProps) {
  const t = useTranslations('Home');
  const tHome = useTranslations('Home');
  
  const [activeId, setActiveId] = useState(services[0]?.id ?? '');
  const hasPortalTarget = useSyncExternalStore(
    subscribeToPortalTarget,
    getPortalTargetSnapshot,
    getServerPortalTargetSnapshot
  );

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const active = services.find((s) => s.id === activeId) ?? services[0];

  if (!hasPortalTarget) {
    return null;
  }

  return createPortal(
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[70] bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden="true"
      />

      {/* ── Sheet ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="What's included"
        className={cn(
          'fixed inset-x-0 bottom-0 z-[70] flex flex-col bg-white',
          'rounded-t-[1.25rem] transition-transform duration-300 ease-out',
          'max-h-[92dvh]',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0rem)' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-[#E0E0E0]" />
        </div>

        {/* ── Header ── */}
        <div className="px-4 pt-2 pb-3 shrink-0">
          <h2 className="text-[1.125rem] font-bold leading-snug text-black">
            {t('services.drawer.title')}
          </h2>
          <p className="mt-0.5 text-[0.8125rem] text-[#6F6F6F]">
             {t('services.drawer.subtitle')}
          </p>
        </div>

        {/* ── Service Tabs ── */}
        <div className="px-4 pb-3 shrink-0">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {services.map((service) => {
              const isActive = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5',
                    'text-sm font-semibold transition-colors active:scale-[0.97]',
                    isActive
                      ? 'bg-[#6C35DE] text-white'
                      : 'bg-[#F5F5F5] text-[#595959]',
                  )}
                >
                  {/* Tab image */}
                  <div
                    className={cn(
                      'h-7 w-7 shrink-0 overflow-hidden rounded-lg',
                      isActive ? 'opacity-100' : 'opacity-60',
                    )}
                  >
                    <OptimizedImage
                      src={service.img}
                      fallbackSrc={service.fallbackImg}
                      alt=""
                      width={28}
                      height={28}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {service.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">

          {/* Included section */}
          <IncludedSection
            title={t('services.drawer.includedTitle')}
            items={active.includedItems}
            variant="included"
          />

          <div className="mt-4">
            <IncludedSection
              title={t('services.drawer.notIncludedTitle')}
              items={active.notIncludedItems}
              variant="excluded"
            />
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-[#F0F0F0] bg-white px-4 py-3">
          <div className="flex gap-3">
            {/* Schedule */}
            <button
              type="button"
              onClick={onSchedule}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#6C35DE]',
                'py-3 text-sm font-semibold text-[#6C35DE] active:scale-[0.98] transition-transform',
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {tHome('quickActions.schedule.title')}
            </button>

            {/* Book Instant */}
            <button
              type="button"
              onClick={onBookInstant}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6C35DE]',
                'py-3 text-sm font-semibold text-white active:scale-[0.98] transition-transform',
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"/>
              </svg>
              {tHome('quickActions.instant.title')}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

type SectionProps = {
  title: string;
  items: { text: string; icon: string }[];
  variant: 'included' | 'excluded';
};

function IncludedSection({ title, items, variant }: SectionProps) {
  const isIncluded = variant === 'included';

  return (
    <div className="rounded-xl bg-white border border-[#F0F0F0] overflow-hidden">
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-[#F5F5F5]">
        {isIncluded ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6C35DE]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
        ) : (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF4B4B]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </span>
        )}
        <span className="text-[0.8125rem] font-semibold text-[#1A1A1A]">{title}</span>
      </div>

      {/* Items */}
      <ul className="divide-y divide-[#F5F5F5]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                isIncluded ? 'bg-[#6C35DE]/10' : 'bg-[#FF4B4B]/10',
              )}>
                {isIncluded ? (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={isIncluded ? '#6C35DE' : '#FF4B4B'} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FF4B4B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                )}
              </span>
              <span className="text-[0.8125rem] text-[#3A3A3A] leading-snug">{item.text}</span>
            </div>
            <div className="h-8 w-8 shrink-0 opacity-60">
              <Image
                src={item.icon}
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
