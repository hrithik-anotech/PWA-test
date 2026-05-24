'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type FilterType = 'all' | 'single' | 'multiple';
type BookingStatus = 'confirmed' | 'cancelled';

interface Booking {
    id: string;
    date: string;
    time: string;
    type: 'single' | 'multiple';
    duration: string;
    status: BookingStatus;
    icon: string;
}

const cn = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(' ');
};

const bookingsData: Booking[] = [
    {
        id: '1',
        date: '14th May',
        time: '01:36 PM',
        type: 'single',
        duration: '60 Mins',
        status: 'confirmed',
        icon: '/icons/lightning.png',
    },
    {
        id: '2',
        date: '10th May',
        time: '01:36 PM',
        type: 'multiple',
        duration: '60 Mins',
        status: 'cancelled',
        icon: '/icons/calendar.png',
    },
    {
        id: '3',
        date: '14th May',
        time: '01:36 PM',
        type: 'single',
        duration: '60 Mins',
        status: 'confirmed',
        icon: '/icons/lightning.png',
    },
    {
        id: '4',
        date: '10th May',
        time: '01:36 PM',
        type: 'multiple',
        duration: '60 Mins',
        status: 'cancelled',
        icon: '/icons/calendar.png',
    },
    {
        id: '5',
        date: '10th May',
        time: '01:36 PM',
        type: 'multiple',
        duration: '60 Mins',
        status: 'cancelled',
        icon: '/icons/calendar.png',
    },
];

export default function MyBookingsPage() {
    const t = useTranslations('MyBookings');
    const tCommon = useTranslations('Common');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const filteredBookings =
        activeFilter === 'all'
            ? bookingsData
            : bookingsData.filter((booking) => booking.type === activeFilter);

    return (
        <div className="min-h-screen bg-[#F9F8FD]">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#F9F8FD] pt-[env(safe-area-inset-top)]">
                <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/home"
                            className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg text-black transition-colors hover:bg-gray-100 active:scale-95"
                            aria-label={tCommon('back')}
                        >
                            <svg
                                className="h-6 w-6"
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
                        </Link>
                        <h1 className="text-xl font-semibold text-black">{t('title')}</h1>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="px-4 py-0 sm:px-6">
                    <div className="flex gap-3 overflow-x-auto pb-2 sm:gap-4">
                        {[
                            { label: t('all'), value: 'all' as const, icon: null },
                            { label: t('single'), value: 'single' as const, icon: '/images/icons/calender-1.svg' },
                            { label: t('multiple'), value: 'multiple' as const, icon: '/images/icons/calender-1.svg' },
                        ].map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setActiveFilter(filter.value)}
                                className={cn(
                                    'flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-3 text-sm font-medium transition-all active:scale-95',
                                    activeFilter === filter.value
                                        ? 'bg-[#8B5CF6] text-white shadow-md'
                                        : 'border border-[#D7D7D7] bg-white text-[#666666] hover:bg-gray-50'
                                )}
                            >
                                {filter.icon ? (
                                    <Image
                                        src={filter.icon}
                                        alt={filter.label}
                                        width={16}
                                        height={16}
                                        className="h-4 w-4"
                                    />
                                ) : null}
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Bookings List */}
            <main className="px-4 py-4 sm:px-6 sm:py-6">
                <div className="space-y-3 sm:space-y-4">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <div
                                key={booking.id}
                                className={cn(
                                    'flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all shadow-[0px_0px_4px_1px_#000000/40] sm:px-5 sm:py-5',
                                    'border-[#595959]/33 bg-white'
                                )}
                            >
                                {/* Icon */}
                                <div className="shrink-0">
                                    <div
                                        className={cn(
                                            'flex h-16 w-16 items-center justify-center rounded-xl sm:h-24 sm:w-24 border border-gray-200',
                                            'bg-gray-100'
                                        )}
                                    >
                                        {booking.type === 'single' ? (
                                            <Image alt="flash fill" src="/images/icons/flash-fill.svg" width={40} height={40} className="h-10 w-10" priority unoptimized />
                                        ) : (
                                            <Image alt="calendar fill" src="/images/icons/calender-fill.svg" width={40} height={40} className="h-10 w-10" priority unoptimized />
                                        )}
                                    </div>
                                </div>

                                {/* Booking Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-2 sm:gap-3">
                                        <h3 className="text-sm font-semibold text-black sm:text-base">
                                            {booking.date} {booking.time}
                                        </h3>
                                    </div>

                                    <p className="mt-1 text-xs text-[#595959] sm:text-sm">
                                        {booking.type === 'single' ? t('single') : t('group')} -{' '}
                                        {booking.duration}
                                    </p>

                                    {/* Status Badge */}
                                    <div className="mt-0">
                                        <span
                                            className={cn(
                                                'inline-block rounded-full px-3 border py-1 mt-2 text-xs font-medium sm:text-sm',
                                                booking.status === 'confirmed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            )}
                                        >
                                            {booking.status === 'confirmed'
                                                ? `✓ ${t('confirmed')}`
                                                : `✕ ${t('cancelled')}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <svg
                                className="mb-4 h-16 w-16 text-gray-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="text-lg font-medium text-[#999999]">{t('noBookings')}</p>
                            <p className="mt-1 text-sm text-[#CCCCCC]">
                                {t('tryFilter')}
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}