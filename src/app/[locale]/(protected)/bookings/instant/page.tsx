'use client';

import { useState } from 'react';
import { UPIPaymentFooter } from '@/components/payments';

type DurationOption = '60' | '90' | '120' | '150' | '180' | '210' | '240' | '300';

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const durationPrices: Record<
  DurationOption,
  { label: string; amount: string; originalPrice: string }
> = {
  '60': { label: '60 min', amount: '70.00', originalPrice: '₹99' },
  '90': { label: '90 min', amount: '130.00', originalPrice: '₹199' },
  '120': { label: '2 hrs', amount: '179.00', originalPrice: '₹299' },
  '150': { label: '2.5 hrs', amount: '219.00', originalPrice: '₹399' },
  '180': { label: '3 hrs', amount: '230.00', originalPrice: '₹399' },
  '210': { label: '3.5 hrs', amount: '280.00', originalPrice: '₹499' },
  '240': { label: '4 hrs', amount: '320.00', originalPrice: '₹599' },
  '300': { label: '5 hrs', amount: '420.00', originalPrice: '₹799' },
};

const initialVisibleCount = 6;

export default function InstantPage() {
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('60');
  const [showAll, setShowAll] = useState(false);

  const durationOptions = Object.entries(durationPrices).map(([key, value]) => ({
    value: key as DurationOption,
    ...value,
  }));

  const visibleOptions = showAll
    ? durationOptions
    : durationOptions.slice(0, initialVisibleCount);

  const currentPrice = durationPrices[selectedDuration];
  const hasMoreOptions = durationOptions.length > initialVisibleCount;

  return (
    <div className="min-h-full bg-gradient-to-br from-[#F6F6F6] to-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#DCDCDC] bg-white/95 backdrop-blur-sm pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg text-black transition-colors hover:bg-gray-100 active:scale-95 sm:h-8 sm:w-8"
              aria-label="Go back"
            >
              <svg
                className="h-6 w-6 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold leading-tight text-black sm:text-base">
                Instant
              </h1>
              <div className="mt-1 flex items-center gap-1 text-xs leading-tight text-[#6F6F6F] sm:text-[0.65rem]">
                <span className="truncate">Genex Exotica, Asansol WB</span>
                <svg
                  className="h-3 w-3 shrink-0 sm:h-2 sm:w-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Duration Section */}
        <section className="overflow-hidden rounded-2xl border border-[#D8D8D8] bg-white shadow-sm">
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="text-base font-semibold text-black sm:text-lg">Duration</h2>

            {/* Duration Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
              {visibleOptions.map((option) => {
                const isSelected = selectedDuration === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedDuration(option.value)}
                    className={cn(
                      'group relative flex flex-col items-start justify-between gap-3 rounded-xl border-2 px-4 py-4 text-left transition-all active:scale-[0.98] sm:px-5 sm:py-5 sm:gap-4',
                      isSelected
                        ? 'border-[#6C35DE] bg-[#F7F2FF] shadow-md'
                        : 'border-[#D7D7D7] bg-[#FAFAFA] hover:border-[#B0B0B0] hover:bg-white'
                    )}
                  >
                    {/* Label */}
                    <span
                      className={cn(
                        'text-sm font-semibold sm:text-base',
                        isSelected ? 'text-[#6C35DE]' : 'text-[#333333]'
                      )}
                    >
                      {option.label}
                    </span>

                    {/* Price */}
                    <div className="flex flex-col gap-1">
                      <span
                        className={cn(
                          'text-base font-bold sm:text-lg',
                          isSelected ? 'text-[#6C35DE]' : 'text-[#000000]'
                        )}
                      >
                        ₹{parseFloat(option.amount).toFixed(0)}
                      </span>
                      <span className="text-xs font-normal text-[#999999] line-through sm:text-sm">
                        {option.originalPrice}
                      </span>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#6C35DE] sm:h-6 sm:w-6">
                        <svg
                          className="h-3 w-3 text-white sm:h-4 sm:w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* Selected Summary Card */}
        <div className="mt-6 hidden rounded-xl border border-[#D8D8D8] bg-white px-5 py-4 shadow-sm sm:block">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#6F6F6F] sm:text-sm">Selected Duration</p>
              <p className="mt-2 text-lg font-bold text-black sm:text-xl">
                {durationPrices[selectedDuration].label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-[#6F6F6F] sm:text-sm">Price</p>
              <p className="mt-2 text-lg font-bold text-[#6C35DE] sm:text-xl">
                ₹{parseFloat(durationPrices[selectedDuration].amount).toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-3">
          <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-xs font-medium text-blue-900 sm:text-sm">
              💡 All sessions include a 5-minute buffer for transitions
            </p>
          </div>
        </div>
      </main>

      {/* UPI Payment Footer */}
      <UPIPaymentFooter
        amount={currentPrice.amount}
        transactionNote={`Snibto booking - ${durationPrices[selectedDuration].label}`}
        buttonLabel="Pay Now"
      />
    </div>
  );
}