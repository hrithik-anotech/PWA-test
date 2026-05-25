'use client';

import { useMemo, useSyncExternalStore, useState } from "react";
import Image from "next/image";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
    defaultUserProfile,
    getUserProfile,
} from "@/lib/storage";
import LanguageDrawer from "@/components/system/language-drawer";

function subscribeToProfileStorage() {
    return () => {};
}

function getProfileSnapshot() {
    const profile = getUserProfile();

    return `${profile.name}\u0000${profile.phone}`;
}

function getDefaultProfileSnapshot() {
    return `${defaultUserProfile.name}\u0000${defaultUserProfile.phone}`;
}

export default function ProfilePage() {
    const t = useTranslations('Profile');
    const tCommon = useTranslations('Common');
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const profileSnapshot = useSyncExternalStore(
        subscribeToProfileStorage,
        getProfileSnapshot,
        getDefaultProfileSnapshot
    );

    const profile = useMemo(() => {
        const [name, phone] = profileSnapshot.split("\u0000");

        return {
            name,
            phone,
        };
    }, [profileSnapshot]);

    const formattedPhone = profile.phone
        ? `+91 ${profile.phone}`
        : t('phoneNotAdded');

    return (
        <div className="min-h-dvh bg-[#F9F8FD] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex w-full max-w-[36rem] flex-col px-[clamp(0.875rem,4vw,1.5rem)] pt-[max(0.5rem,env(safe-area-inset-top))]">
            {/* ── HEADER ── */}
            <div className="flex items-center gap-[clamp(0.5rem,2vw,0.75rem)] py-[clamp(0.75rem,2.5dvh,1rem)]">
                <Link
                    href="/home"
                    className="-ml-[0.5rem] flex h-[clamp(2.25rem,10vw,2.75rem)] w-[clamp(2.25rem,10vw,2.75rem)] items-center justify-center rounded-full transition-transform active:scale-95"
                    aria-label={tCommon('back')}
                >
                    <Image
                        src="/images/icons/back-black.svg"
                        alt="back"
                        width={8}
                        height={8}
                        className="h-[clamp(0.5rem,2vw,0.625rem)] w-auto"
                    />
                </Link>
                <h1 className="text-[clamp(1.25rem,5.4vw,1.5rem)] font-bold text-black tracking-tight">{t('title')}</h1>
            </div>

            {/* ── USER CARD ── */}
            <div className="flex items-center gap-[clamp(0.75rem,3vw,1.125rem)] px-[clamp(0.25rem,1vw,0.75rem)] py-[clamp(0.75rem,2.5dvh,1.125rem)]">
                <div className="relative h-[clamp(3.75rem,15vw,4.5rem)] w-[clamp(3.75rem,15vw,4.5rem)] flex-shrink-0 overflow-hidden rounded-full border-2 border-[#EDE8FF]">
                    <OptimizedImage
                        src="/profile/avatars/user.png"
                        ikPath={true}
                        fallbackSrc="/images/login/profile-placeholder.png"
                        alt={profile.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-[clamp(1.375rem,6vw,1.75rem)] font-bold leading-tight text-black">
                        {profile.name}
                    </p>
                    <p className="mt-0.5 truncate text-[clamp(0.875rem,3.8vw,1rem)] text-gray-400">
                        {formattedPhone}
                    </p>
                    <Link
                        href="/profile/edit"
                        className="mt-0.5 inline-block text-[clamp(0.8125rem,3.3vw,0.9375rem)] font-semibold text-[#7B5CF5]"
                    >
                        {t('viewEdit')} &gt;
                    </Link>
                </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div className="mt-[clamp(0.625rem,2dvh,1rem)] rounded-[clamp(1rem,4vw,1.25rem)] bg-white px-[clamp(0.5rem,2vw,0.75rem)] py-[clamp(0.875rem,2.5dvh,1.125rem)] shadow-sm">
                <div className="grid grid-cols-4 gap-[clamp(0.25rem,2vw,0.75rem)]">
                    {[
                        { icon: "/images/icons/calender-outline.svg", label: t('myBookings'), key: 'myBookings' },
                        { icon: "/images/icons/wallet.svg", label: t('wallet'), key: 'wallet' },
                        { icon: "/images/icons/offers.svg", label: t('offers'), key: 'offers' },
                        { icon: "/images/icons/headset.svg", label: t('support'), key: 'support' },
                    ].map(({ icon, label, key }) => (
                        <button key={key} className="flex min-w-0 flex-col items-center gap-[clamp(0.375rem,1.6vw,0.5rem)]">
                            <div className="flex h-[clamp(2.75rem,11vw,3.25rem)] w-[clamp(2.75rem,11vw,3.25rem)] items-center justify-center rounded-full bg-[#F4F0FF]">
                                <Image src={icon} alt={label} width={24} height={24} className="h-[clamp(1.25rem,5vw,1.5rem)] w-auto" />
                            </div>
                            <span className="text-center text-[clamp(0.625rem,2.6vw,0.75rem)] font-medium leading-tight text-gray-500">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── SUBSCRIPTION BANNER ── */}
            <div className="relative mt-[clamp(0.625rem,2dvh,1rem)] flex min-h-[clamp(6.25rem,24vw,7.5rem)] items-center justify-between overflow-hidden rounded-[clamp(1rem,4vw,1.25rem)] bg-[#EDE8FF] px-[clamp(1rem,4vw,1.5rem)] py-[clamp(0.875rem,2.5dvh,1.125rem)]">
                <div className="z-10 max-w-[62%]">
                    <p className="text-[clamp(0.875rem,3.4vw,1rem)] font-bold leading-snug text-gray-800">
                        {t('subscribeTitle')}
                    </p>
                    <p className="mt-0.5 text-[clamp(0.6875rem,2.8vw,0.8125rem)] text-gray-500">
                        {t('subscribeSub')}
                    </p>
                    <button className="mt-[clamp(0.625rem,2dvh,0.875rem)] rounded-full bg-[#7B5CF5] px-[clamp(1rem,4vw,1.375rem)] py-[clamp(0.45rem,1.6vw,0.625rem)] text-[clamp(0.75rem,3vw,0.875rem)] font-semibold text-white">
                        {t('subscribeButton')}
                    </button>
                </div>
                {/* Illustration */}
                <div className="absolute bottom-0 right-[clamp(0.5rem,3vw,1rem)] h-[clamp(5.75rem,23vw,7.25rem)] w-[clamp(6.25rem,26vw,8rem)]">
                    <Image
                        src="/assets/images/subscription-illustration.png"
                        alt="Subscribe"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>
            </div>

            {/* ── REFERRAL BANNER ── */}
            <div className="relative mt-[clamp(0.625rem,2dvh,1rem)] flex min-h-[clamp(6.25rem,24vw,7.5rem)] items-center justify-between overflow-hidden rounded-[clamp(1rem,4vw,1.25rem)] bg-[#EDE8FF] px-[clamp(1rem,4vw,1.5rem)] py-[clamp(0.875rem,2.5dvh,1.125rem)]">
                <div className="z-10 max-w-[62%]">
                    <p className="text-[clamp(0.875rem,3.4vw,1rem)] font-bold leading-snug text-gray-800">
                        {t('referTitle')}
                    </p>
                    <p className="mt-0.5 text-[clamp(0.6875rem,2.8vw,0.8125rem)] text-gray-500">
                        {t('referSub')}
                    </p>
                    <button className="mt-[clamp(0.625rem,2dvh,0.875rem)] flex items-center gap-[clamp(0.2rem,1vw,0.375rem)] text-[clamp(0.75rem,3vw,0.875rem)] font-semibold text-[#7B5CF5]">
                        {t('referButton')}
                        <Image src="/assets/icons/arrow-right-grey-purple.svg" alt="" width={14} height={14} className="h-[clamp(0.75rem,3vw,0.875rem)] w-auto" />
                    </button>
                </div>
                {/* Illustration */}
                <div className="absolute bottom-0 right-[clamp(0.5rem,3vw,1rem)] h-[clamp(5.75rem,23vw,7.25rem)] w-[clamp(5.75rem,24vw,7.25rem)]">
                    <Image
                        src="/assets/images/referral-illustration.png"
                        alt="Referral"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>
            </div>

            {/* ── LIST ITEMS ── */}
            <div className="mt-[clamp(0.625rem,2dvh,1rem)] divide-y divide-gray-100 rounded-[clamp(1rem,4vw,1.25rem)] bg-white shadow-sm">
                <Link
                    href="/profile/addresses"
                    className="flex items-center justify-between px-[clamp(1rem,4vw,1.375rem)] py-[clamp(0.875rem,2.6dvh,1.125rem)]"
                >
                    <div className="flex min-w-0 items-center gap-[clamp(0.75rem,3vw,1rem)]">
                        <div className="rounded-full bg-[#F7F3FD] p-[clamp(0.625rem,2.5vw,0.75rem)]">
                            <Image src="/images/icons/location-pin.svg" alt={t('savedAddresses')} width={20} height={20} className="h-[clamp(1.125rem,4.5vw,1.25rem)] w-auto" />
                        </div>
                        <span className="truncate text-[clamp(0.875rem,3.4vw,0.96875rem)] font-medium text-gray-700">{t('savedAddresses')}</span>
                    </div>
                    <Image
                        src="/images/icons/arrow-right-grey.svg"
                        alt=">"
                        width={6}
                        height={6}
                        className="mr-[clamp(0.25rem,1.5vw,0.5rem)] h-[clamp(0.375rem,1.5vw,0.5rem)] w-auto"
                    />
                </Link>

                <Link
                    href="/profile/manage"
                    className="flex items-center justify-between px-[clamp(1rem,4vw,1.375rem)] py-[clamp(0.875rem,2.6dvh,1.125rem)]"
                >
                    <div className="flex min-w-0 items-center gap-[clamp(0.75rem,3vw,1rem)]">
                        <div className="rounded-full bg-[#F7F3FD] p-[clamp(0.625rem,2.5vw,0.75rem)]">
                            <Image src="/images/icons/manage-account.svg" alt={t('manageAccount')} width={20} height={20} className="h-[clamp(1.125rem,4.5vw,1.25rem)] w-auto" />
                        </div>
                        <span className="truncate text-[clamp(0.875rem,3.4vw,0.96875rem)] font-medium text-gray-700">{t('manageAccount')}</span>
                    </div>
                    <Image
                        src="/images/icons/arrow-right-grey.svg"
                        alt=">"
                        width={6}
                        height={6}
                        className="mr-[clamp(0.25rem,1.5vw,0.5rem)] h-[clamp(0.375rem,1.5vw,0.5rem)] w-auto"
                    />
                </Link>

                <button
                    onClick={() => setIsLanguageOpen(true)}
                    className="flex w-full items-center justify-between px-[clamp(1rem,4vw,1.375rem)] py-[clamp(0.875rem,2.6dvh,1.125rem)] text-left"
                >
                    <div className="flex min-w-0 items-center gap-[clamp(0.75rem,3vw,1rem)]">
                        <div className="rounded-full bg-[#F7F3FD] p-[clamp(0.625rem,2.5vw,0.75rem)]">
                            <Image src="/images/icons/manage-account.svg" alt={t('manageAccount')} width={20} height={20} className="h-[clamp(1.125rem,4.5vw,1.25rem)] w-auto" />
                        </div>
                        <span className="truncate text-[clamp(0.875rem,3.4vw,0.96875rem)] font-medium text-gray-700">{t('language')}</span>
                    </div>
                    <Image
                        src="/images/icons/arrow-right-grey.svg"
                        alt=">"
                        width={6}
                        height={6}
                        className="mr-[clamp(0.25rem,1.5vw,0.5rem)] h-[clamp(0.375rem,1.5vw,0.5rem)] w-auto"
                    />
                </button>
            </div>

            {/* Logout */}
            <div className="mt-[clamp(0.625rem,2dvh,1rem)] rounded-[clamp(1rem,4vw,1.25rem)] bg-white shadow-sm">
                <button className="flex w-full items-center gap-[clamp(0.75rem,3vw,1rem)] px-[clamp(1rem,4vw,1.375rem)] py-[clamp(0.875rem,2.6dvh,1.125rem)] text-[clamp(0.875rem,3.4vw,0.96875rem)] font-semibold text-red-500">
                    <svg className="h-[clamp(1.25rem,5vw,1.375rem)] w-[clamp(1.25rem,5vw,1.375rem)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    {t('logout')}
                </button>
            </div>

            </div>

            {/* Language Drawer */}
            <LanguageDrawer
                open={isLanguageOpen}
                onClose={() => setIsLanguageOpen(false)}
            />
        </div>
    );
}
