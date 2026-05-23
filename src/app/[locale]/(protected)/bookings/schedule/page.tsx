'use client';

import { useState } from 'react';
import { UPIPaymentFooter } from '@/components/payments';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type DateOption = 'today' | 'tomorrow' | 'custom';
type DurationOption = '60' | '90';
type TimeOption = 'morning' | 'afternoon' | 'evening';

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const unavailableTimeTabs = new Set<TimeOption>(['afternoon']);

const timeSlotRows = [
  ['09:00 AM', '09:15 AM', '09:30 AM'],
  ['09:45 AM', '10:15 AM', '10:30 AM'],
  ['10:45 AM', '11:00 AM', '11:15 AM'],
  ['11:30 AM', '11:45 AM', '12:00 PM'],
];

const unavailableSlots = new Set(['09:30 AM', '10:15 AM', '10:30 AM', '11:15 AM']);

const durationPrices: Record<
  DurationOption,
  { amount: string; originalLabel: string; priceLabel: string }
> = {
  '60': { amount: '70.00', originalLabel: '\u20B999', priceLabel: '\u20B970' },
  '90': { amount: '130.00', originalLabel: '\u20B9199', priceLabel: '\u20B9130' },
};

export default function SchedulePage() {
  const t = useTranslations('Schedule');
  const tCommon = useTranslations('Common');
  
  const [selectedDate, setSelectedDate] = useState<DateOption>('today');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('60');
  const [selectedTime, setSelectedTime] = useState<TimeOption>('morning');
  const [selectedSlot, setSelectedSlot] = useState<string>('09:00 AM');
  const currentPrice = durationPrices[selectedDuration];

  const timeTabs: { label: string; value: TimeOption }[] = [
    { label: t('morning'), value: 'morning' },
    { label: t('afternoon'), value: 'afternoon' },
    { label: t('evening'), value: 'evening' },
  ];

  return (
    <div className="min-h-full bg-[#F6F6F6] text-text">
      <header className="sticky top-0 z-40 border-b border-[#DCDCDC] bg-white pt-[env(safe-area-inset-top)]">
        <div className="px-4 pb-3 pt-3">
          <div className="flex items-center gap-2">
            <Link
              href="/home"
              className="-ml-1 flex h-8 w-8 items-center justify-center text-black active:scale-95"
              aria-label={tCommon('back')}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>

            <div className="min-w-0">
              <h1 className="text-base font-normal leading-none text-black">{t('title')}</h1>
              <div className="mt-1 flex items-center gap-1 text-[0.6rem] leading-none text-[#6F6F6F]">
                <span className="truncate">Genex Exotica, Asansol WB</span>
                <svg className="h-2 w-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main
        className="space-y-3 px-4 py-4 min-h-full"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7.5rem)',
        }}
      >
        {/* Select Date */}
        <section className="rounded-xl border border-[#D8D8D8] bg-white px-3 py-3 shadow-[0_0.0625rem_0.3125rem_rgba(0,0,0,0.18)]">
          <h2 className="mb-3 text-sm font-normal text-black">{t('selectDate')}</h2>
          <div className="grid grid-cols-3 gap-3 py-3">
            {[
              { label: t('today'), value: 'today' as const },
              { label: t('tomorrow'), value: 'tomorrow' as const },
              { label: t('custom'), value: 'custom' as const },
            ].map((option) => {
              const isSelected = selectedDate === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDate(option.value)}
                  style={{ fontWeight: isSelected ? 800 : 400 }}
                  className={cn(
                    'h-10 rounded-[0.625rem] border text-sm transition-all active:scale-[0.98]',
                    isSelected
                      ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE] font-bold'
                      : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#646464] font-normal'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Duration */}
        <section className="rounded-xl border border-[#D8D8D8] bg-white px-3 py-3 shadow-[0_0.0625rem_0.3125rem_rgba(0,0,0,0.18)]">
          <h2 className="mb-3 text-sm font-normal text-black">{t('duration')}</h2>
          <div className="flex gap-3 py-2">
            {[
              { value: '60' as const },
              { value: '90' as const },
            ].map((option) => {
              const isSelected = selectedDuration === option.value;
              const price = durationPrices[option.value];

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDuration(option.value)}
                  style={{ fontWeight: isSelected ? 800 : 400 }}
                  className={cn(
                    'flex w-[6.35rem] aspect-square flex-col items-start justify-between rounded-[0.625rem] border px-3 py-3 text-left transition-all active:scale-[0.98]',
                    isSelected
                      ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE] font-bold'
                      : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#555555] font-normal'
                  )}
                >
                  <span className="text-sm">{option.value} {tCommon('mins')}</span>
                  <span className="text-sm">
                    {price.priceLabel}{' '}
                    <span className="text-[0.6rem] font-normal text-[#777777] line-through">
                      {price.originalLabel}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Timing */}
        <section className="rounded-xl border border-[#D8D8D8] bg-white px-3 py-3 shadow-[0_0.0625rem_0.3125rem_rgba(0,0,0,0.18)]">
          <h2 className="mb-3 text-sm font-normal text-black">{t('timings')}</h2>

          <div className="mb-4 grid grid-cols-3 gap-3 py-3">
            {timeTabs.map((tab) => {
              const isUnavailable = unavailableTimeTabs.has(tab.value);
              const isSelected = selectedTime === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => {
                    if (!isUnavailable) {
                      setSelectedTime(tab.value);
                    }
                  }}
                  style={{ fontWeight: isSelected ? 800 : 400 }}
                  className={cn(
                    'h-10 rounded-full border text-sm transition-all',
                    isUnavailable
                      ? 'cursor-not-allowed border-[#D7D7D7] bg-[#EFEFEF] font-normal text-[#B9B9B9]'
                      : isSelected
                      ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE] font-bold'
                      : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#646464] font-normal active:scale-[0.98]'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 pb-4">
            {timeSlotRows.flat().map((slot) => {
              const isUnavailable = unavailableSlots.has(slot);
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => {
                    if (!isUnavailable) {
                      setSelectedSlot(slot);
                    }
                  }}
                  style={{ fontWeight: isSelected ? 800 : 400 }}
                  className={cn(
                    'h-10 rounded-[0.625rem] border text-xs transition-all',
                    isUnavailable
                      ? 'cursor-not-allowed border-[#E0E0E0] bg-[#F3F3F3] font-normal text-[#C9C9C9]'
                      : isSelected
                        ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE] font-bold'
                        : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#666666] font-normal active:scale-[0.98]'
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <UPIPaymentFooter
        amount={currentPrice.amount}
        transactionNote={`Snibto booking - ${selectedDuration} ${tCommon('mins')}, ${t(selectedDate)}, ${selectedSlot}`}
        buttonLabel={tCommon('payNow')}
      />
    </div>
  );
}
