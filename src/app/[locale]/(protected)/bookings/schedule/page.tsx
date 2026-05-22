'use client';

import { useState } from 'react';
import { UPIPaymentFooter } from '@/components/payments';

type DateOption = 'today' | 'tomorrow' | 'custom';
type DurationOption = '60' | '90';
type TimeOption = 'morning' | 'afternoon' | 'evening';

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const timeTabs: { label: string; value: TimeOption }[] = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Evening', value: 'evening' },
];

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
  const [selectedDate, setSelectedDate] = useState<DateOption>('today');
  const [selectedDuration, setSelectedDuration] = useState<DurationOption>('60');
  const [selectedTime, setSelectedTime] = useState<TimeOption>('morning');
  const [selectedSlot, setSelectedSlot] = useState<string>('09:00 AM');
  const currentPrice = durationPrices[selectedDuration];

  return (
    <div className="min-h-full bg-[#F6F6F6] text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-[#DCDCDC] bg-white pt-[env(safe-area-inset-top)]">
        <div className="px-4 pb-3 pt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="-ml-1 flex h-8 w-8 items-center justify-center text-black active:scale-95"
              aria-label="Go back"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="min-w-0">
              <h1 className="text-base font-normal leading-none text-black">Schedule</h1>
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
        className="space-y-3 px-4 py-4"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 7.5rem)',
        }}
      >
        <section className="rounded-xl border border-[#D8D8D8] bg-white px-3 py-3 shadow-[0_1px_5px_rgba(0,0,0,0.18)]">
          <h2 className="mb-3 text-sm font-normal text-black">Select Date</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Today', value: 'today' as const },
              { label: 'Tomorrow', value: 'tomorrow' as const },
              { label: 'Custom', value: 'custom' as const },
            ].map((option) => {
              const isSelected = selectedDate === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDate(option.value)}
                  className={cn(
                    'h-8 rounded-[0.625rem] border text-sm font-normal transition-all active:scale-[0.98]',
                    isSelected
                      ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE]'
                      : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#646464]'
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-xl border border-[#D8D8D8] bg-white px-3 py-3 shadow-[0_1px_5px_rgba(0,0,0,0.18)]">
          <h2 className="mb-3 text-sm font-normal text-black">Duration</h2>
          <div className="flex gap-3">
            {[
              { label: '60 min', value: '60' as const },
              { label: '90 min', value: '90' as const },
            ].map((option) => {
              const isSelected = selectedDuration === option.value;
              const price = durationPrices[option.value];

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedDuration(option.value)}
                  className={cn(
                    'flex h-[6.35rem] w-[5.15rem] flex-col items-start justify-between rounded-[0.625rem] border px-3 py-3 text-left transition-all active:scale-[0.98]',
                    isSelected
                      ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE]'
                      : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#555555]'
                  )}
                >
                  <span className="text-sm font-semibold">{option.label}</span>
                  <span className="text-sm font-semibold">
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

        <section className="rounded-xl border border-[#D8D8D8] bg-white px-3 py-3 shadow-[0_1px_5px_rgba(0,0,0,0.18)]">
          <h2 className="mb-3 text-sm font-normal text-black">Timings</h2>

          <div className="mb-4 grid grid-cols-3 gap-3">
            {timeTabs.map((tab) => {
              const isSelected = selectedTime === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedTime(tab.value)}
                  className={cn(
                    'h-8 rounded-full border text-sm font-normal transition-all active:scale-[0.98]',
                    isSelected
                      ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE]'
                      : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#646464]',
                    tab.value === 'afternoon' && !isSelected ? 'text-[#B9B9B9]' : false
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {timeSlotRows.flat().map((slot) => {
              const isUnavailable = unavailableSlots.has(slot);
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => setSelectedSlot(slot)}
                  className={cn(
                    'h-8 rounded-[0.625rem] border text-xs font-normal transition-all active:scale-[0.98]',
                    isUnavailable
                      ? 'border-[#E0E0E0] bg-[#F3F3F3] text-[#C9C9C9]'
                      : isSelected
                        ? 'border-[#6C35DE] bg-[#F7F2FF] text-[#6C35DE]'
                        : 'border-[#D7D7D7] bg-[#EFEFEF] text-[#666666]'
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
        transactionNote={`Snibto booking - ${selectedDuration} min, ${selectedDate}, ${selectedSlot}`}
      />
    </div>
  );
}
