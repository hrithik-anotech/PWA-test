'use client';

import { cn } from '@/lib/cn';
import { UPIPaymentFooter } from '@/components/payments';
import { useState, useSyncExternalStore, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

type DurationOption =
  | '60'
  | '90'
  | '120'
  | '150'
  | '180'
  | '210'
  | '240'
  | '270'
  | '300'
  | '330'
  | '360'
  | '420';

type DurationPrice = {
  amount: string;
  available: boolean;
  originalPrice: string;
};

type InstantBookingDrawerProps = {
  open: boolean;
  onClose: () => void;
  serviceLabel?: string;
};

const durationPrices: Record<DurationOption, DurationPrice> = {
  '60': { amount: '70.00', originalPrice: '\u20B999', available: true },
  '90': { amount: '130.00', originalPrice: '\u20B9199', available: true },
  '120': { amount: '179.00', originalPrice: '\u20B9299', available: true },
  '150': { amount: '229.00', originalPrice: '\u20B9399', available: true },
  '180': { amount: '230.00', originalPrice: '\u20B9399', available: false },
  '210': { amount: '280.00', originalPrice: '\u20B9499', available: true },
  '240': { amount: '320.00', originalPrice: '\u20B9599', available: true },
  '270': { amount: '370.00', originalPrice: '\u20B9699', available: false },
  '300': { amount: '420.00', originalPrice: '\u20B9799', available: true },
  '330': { amount: '460.00', originalPrice: '\u20B9899', available: true },
  '360': { amount: '510.00', originalPrice: '\u20B9999', available: false },
  '420': { amount: '590.00', originalPrice: '\u20B91199', available: true },
};

const getVisibleDurationCount = () => {
  if (typeof window === 'undefined') {
    return 9;
  }

  if (window.matchMedia('(min-width: 64rem)').matches) {
    return 12;
  }

  if (window.matchMedia('(min-width: 40rem)').matches) {
    return 9;
  }

  return 6;
};

const subscribeToViewportChanges = (onChange: () => void) => {
  window.addEventListener('resize', onChange);

  return () => {
    window.removeEventListener('resize', onChange);
  };
};

const getServerVisibleDurationCount = () => 9;

const subscribeToPortalTarget = () => {
  return () => {};
};

const getPortalTargetSnapshot = () => {
  return typeof document !== 'undefined';
};

const getServerPortalTargetSnapshot = () => false;

export default function InstantBookingDrawer({
  open,
  onClose,
  serviceLabel = 'Instant booking',
}: InstantBookingDrawerProps) {
  const t = useTranslations('Instant');
  const tCommon = useTranslations('Common');
  const tHome = useTranslations('Home');

  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('60');
  const [showAll, setShowAll] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const visibleDurationCount = useSyncExternalStore(
    subscribeToViewportChanges,
    getVisibleDurationCount,
    getServerVisibleDurationCount
  );
  const hasPortalTarget = useSyncExternalStore(
    subscribeToPortalTarget,
    getPortalTargetSnapshot,
    getServerPortalTargetSnapshot
  );

  // Lock body scroll while open and handle entrance animation
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 30);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      setAnimateIn(false);
      document.body.style.overflow = '';
    }
  }, [open]);

  const durationOptions = Object.entries(durationPrices).map(([key, value]) => ({
    value: key as DurationOption,
    ...value,
  }));

  const availableDurationOptions = durationOptions.filter(
    (option) => option.available
  );

  const visibleOptions = showAll
    ? availableDurationOptions
    : availableDurationOptions.slice(0, visibleDurationCount);

  const currentPrice = durationPrices[selectedDuration];
  const hasMoreOptions = availableDurationOptions.length > visibleDurationCount;

  if (!hasPortalTarget) {
    return null;
  }

  // Helper to format duration labels
  const getDurationLabel = (option: string) => {
    const mins = parseInt(option);
    if (mins < 120) return `${mins} ${tCommon('mins')}`;
    const hrs = mins / 60;
    return `${hrs} ${tCommon('hrs')}`;
  };

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[80] bg-black/50 transition-opacity duration-300',
          (open && animateIn) ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
        className={cn(
          'fixed inset-x-0 bottom-0 z-[80] mx-auto flex max-h-[92dvh] w-full max-w-[36rem] flex-col rounded-t-[1.25rem] bg-white transition-transform duration-300 ease-out',
          (open && animateIn) ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0rem)' }}
      >
        <div className="flex shrink-0 justify-center pb-1 pt-3">
          <div className="h-1 w-10 rounded-full bg-[#E0E0E0]" />
        </div>

        <div className="shrink-0 px-4 pb-3 pt-2">
          <h2 className="text-lg font-bold leading-snug text-black">
            {tHome('quickActions.instant.title')}
          </h2>
          <p className="mt-0.5 text-sm text-[#6F6F6F]">
            {serviceLabel}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-[calc(5rem+env(safe-area-inset-bottom,0rem))]">
          <section className="rounded-xl border border-[#F0F0F0] bg-white p-3">
            <h3 className="mb-3 text-sm font-normal text-black sm:text-base">
              {t('duration')}
            </h3>

            <div className="grid grid-cols-3 gap-2 min-[24rem]:gap-3 sm:gap-4 lg:grid-cols-4">
              {visibleOptions.map((option) => {
                const isSelected = selectedDuration === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedDuration(option.value)}
                    className={cn(
                      'flex aspect-square min-h-[4.25rem] min-w-0 flex-col items-start justify-between rounded-[0.625rem] border p-2 text-left transition-all min-[24rem]:p-2.5 sm:p-3',
                      isSelected
                        ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE] active:scale-[0.98]'
                        : 'border-transparent bg-[#EFEFEF] text-[#555555] active:scale-[0.98]'
                    )}
                  >
                    <span className="w-full min-w-0 whitespace-normal break-words text-[2.5vw] font-semibold leading-tight min-[24rem]:text-xs sm:text-sm"> {/* ↓ was text-[0.625rem] → text-[2.5vw] */}
                      {getDurationLabel(option.value)}
                    </span>

                    <span className="flex w-full min-w-0 flex-wrap items-baseline gap-x-1 gap-y-0.5 text-[2.5vw] font-semibold leading-tight min-[24rem]:text-xs sm:text-sm"> {/* ↓ was text-[0.625rem] → text-[2.5vw] */}
                      <span>
                        {'\u20B9'}
                        {parseFloat(option.amount).toFixed(0)}
                      </span>
                      <span className="text-[2vw] font-normal leading-tight line-through min-[24rem]:text-[2.5vw] sm:text-xs text-[#777777]">
                        {option.originalPrice}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {hasMoreOptions ? (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="mt-3 flex items-center gap-0.5 text-[2.5vw] font-semibold text-[#6C35DE] active:scale-[0.98] min-[24rem]:text-xs sm:text-sm"
                /* ↓ was text-[0.625rem] → text-[2.5vw] */
              >
                {showAll ? tCommon('viewLess') : tCommon('viewAll')}
                <svg
                  className={cn(
                    'transition-transform duration-200',
                    showAll ? 'rotate-180' : ''
                  )}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </button>
            ) : null}
          </section>
        </div>

        <div className="shrink-0 border-t border-[#F0F0F0] px-4 py-4">
          <UPIPaymentFooter
            amount={currentPrice.amount}
            transactionNote={`${tHome('quickActions.instant.title')} - ${getDurationLabel(selectedDuration)}`}
            buttonLabel={tCommon('payNow')}
          />
        </div>
      </div>
    </>,
    document.body
  );
}
