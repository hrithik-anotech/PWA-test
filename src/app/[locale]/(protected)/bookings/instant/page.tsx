'use client';

import { useState, useSyncExternalStore, useEffect } from 'react';
import Image from 'next/image';
import { UPIPaymentFooter } from '@/components/payments';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import InstantSplash from '@/components/system/instant-splash';

// ── Types ────────────────────────────────────────────────────────────────────

type DurationOption =
  | '60' | '90' | '120' | '150' | '180' | '210'
  | '240' | '270' | '300' | '330' | '360' | '420';

type DurationPrice = {
  amount: string;
  originalPrice: string;
  available: boolean;
};

// ── Data ─────────────────────────────────────────────────────────────────────

const durationPrices: Record<DurationOption, DurationPrice> = {
  '60':  { amount: '70.00',  originalPrice: '₹99',   available: true  },
  '90':  { amount: '130.00', originalPrice: '₹199',  available: true  },
  '120': { amount: '179.00', originalPrice: '₹299',  available: true  },
  '150': { amount: '229.00', originalPrice: '₹399',  available: true  },
  '180': { amount: '230.00', originalPrice: '₹399',  available: false },
  '210': { amount: '280.00', originalPrice: '₹499',  available: true  },
  '240': { amount: '320.00', originalPrice: '₹599',  available: true  },
  '270': { amount: '370.00', originalPrice: '₹699',  available: false },
  '300': { amount: '420.00', originalPrice: '₹799',  available: true  },
  '330': { amount: '460.00', originalPrice: '₹899',  available: true  },
  '360': { amount: '510.00', originalPrice: '₹999',  available: false },
  '420': { amount: '590.00', originalPrice: '₹1199', available: true  },
};

// ── Responsive visible count ──────────────────────────────────────────────────

const getVisibleDurationCount = () => {
  if (typeof window === 'undefined') return 9;
  if (window.matchMedia('(min-width: 64rem)').matches) return 12;
  if (window.matchMedia('(min-width: 40rem)').matches) return 9;
  return 6;
};

const subscribeToViewportChanges = (onChange: () => void) => {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
};

const getServerVisibleDurationCount = () => 9;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function InstantPage() {
  const t = useTranslations('Instant');
  const tCommon = useTranslations('Common');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('60');
  const [showAll, setShowAll] = useState(false);

  // Splash screen transition states
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Play entry sequence for 2.0s, then transition out over 600ms
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const visibleDurationCount = useSyncExternalStore(
    subscribeToViewportChanges,
    getVisibleDurationCount,
    getServerVisibleDurationCount,
  );

  const durationOptions = Object.entries(durationPrices)
    .map(([key, value]) => ({
      value: key as DurationOption,
      ...value,
    }))
    .filter((option) => option.available);

  const visibleOptions = showAll
    ? durationOptions
    : durationOptions.slice(0, visibleDurationCount);

  const hasMoreOptions = durationOptions.length > visibleDurationCount;
  const currentPrice = durationPrices[selectedDuration];

  // Helper to format duration labels
  const getDurationLabel = (option: string) => {
    const mins = parseInt(option);
    if (mins < 120) return `${mins} ${tCommon('mins')}`;
    const hrs = mins / 60;
    return `${hrs} ${tCommon('hrs')}`;
  };

  return (
    <div className="min-h-dvh bg-[#F9FAF9]">
      {showSplash && <InstantSplash isExiting={isExiting} />}

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#DCDCDC] bg-white pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-5xl p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <Link
              href="/home"
              className="-ml-1 flex h-8 w-8 items-center justify-center active:scale-95"
              aria-label={tCommon('back')}
            >
              <Image src="/images/arrow-left.svg" alt="back" width={24} height={24} />
            </Link>

            <div className="min-w-0">
              <h1 className="text-base font-normal leading-none text-black sm:text-lg">
                {t('title')}
              </h1>
              <div className="mt-1 flex items-center gap-1 text-[2.5vw] leading-tight text-[#6F6F6F] sm:text-xs"> {/* ↓ was text-[0.625rem] → text-[2.5vw] */}
                <span className="truncate">Genex Exotica, Asansol WB</span>
                <svg className="h-2 w-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN ───────────────────────────────────────────────────────────── */}
      <main
        className="mx-auto w-full max-w-5xl p-4 sm:p-5 lg:p-6"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0rem) + 7.5rem)' }}
      >
        <section className="rounded-xl bg-white p-3 shadow-sm sm:p-4">
          <h2 className="mb-3 text-[3.5vw] font-normal text-black sm:text-sm">{t('duration')}</h2>

          <div className="grid grid-cols-3 gap-2 min-[24rem]:gap-3 sm:gap-4 lg:grid-cols-4">
            {visibleOptions.map((option) => {
              const isSelected = selectedDuration === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDuration(option.value)}
                  className={[
                    'flex aspect-square min-h-[4.25rem] flex-col items-start justify-between rounded-[0.625rem] p-2 text-left transition-all min-[24rem]:p-2.5 sm:p-3',
                    isSelected
                      ? 'bg-[#5F30CA]/10 border border-[#6C35DE] active:scale-[0.98]'
                      : 'bg-[#595959]/10 border border-transparent active:scale-[0.98]',
                  ].join(' ')}
                >
                  {/* Label */}
                  <span
                    className={[
                      'w-full whitespace-normal break-words text-[2.5vw] font-semibold leading-tight min-[24rem]:text-xs sm:text-sm', /* ↓ was text-[2.75vw]/text-sm → text-[2.5vw] */
                      isSelected ? 'text-[#6C35DE]' : 'text-[#595959]',
                    ].join(' ')}
                  >
                    {getDurationLabel(option.value)}
                  </span>
 
                  {/* Price row */}
                  <div className="flex w-full flex-wrap items-baseline gap-x-1 gap-y-0.5">
                    <span
                      className={[
                        'text-[2.5vw] font-bold leading-tight min-[24rem]:text-xs sm:text-sm', /* ↓ was text-[2.75vw]/sm:text-sm → text-[2.5vw] */
                        isSelected ? 'text-[#6C35DE]' : 'text-[#111]',
                      ].join(' ')}
                    >
                      ₹{parseFloat(option.amount).toFixed(0)}
                    </span>
                    <span
                      className="text-[2vw] font-normal leading-tight line-through min-[24rem]:text-[2.5vw] sm:text-xs text-[#999]"
                      /* ↓ was text-[2.25vw]/sm:text-xs → text-[2vw]/text-[2.5vw] */
                    >
                      {option.originalPrice}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* View all / View less toggle */}
          {hasMoreOptions && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="mt-3 flex items-center gap-0.5 text-[3vw] font-semibold text-[#6C35DE] active:scale-[0.98] sm:text-sm"
            >
              {showAll ? tCommon('viewLess') : tCommon('viewAll')}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                className={showAll ? 'rotate-180 transition-transform' : 'transition-transform'}
              >
                <path d="M6 9l6 6 6-6" stroke="#6C35DE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </section>
      </main>

      {/* ── PAY FOOTER ─────────────────────────────────────────────────────── */}
      <UPIPaymentFooter
        amount={currentPrice.amount}
        transactionNote={`Snibto booking - ${getDurationLabel(selectedDuration)}`}
        buttonLabel={tCommon('payNow')}
      />
    </div>
  );
}
