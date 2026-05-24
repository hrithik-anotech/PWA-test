'use client';

import { useMemo, useSyncExternalStore, useState } from "react";
import Image from "next/image";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Link, useRouter } from "@/i18n/routing";
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
    const router = useRouter();
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
        <div className="flex flex-col min-h-screen bg-gray-200">
            {/* ── HEADER ── */}
            <div className="flex items-center gap-2 px-4 pt-2 pb-4">
                <Link
                    href="/home"
                    className="flex h-10 w-10 items-center justify-center -ml-2 rounded-full transition-transform active:scale-95"
                    aria-label={tCommon('back')}
                >
                    <Image
                        src="/images/arrow-left.svg"
                        alt="back"
                        width={24}
                        height={24}
                    />
                </Link>
                <h1 className="text-[22px] font-bold text-black tracking-tight">{t('title')}</h1>
            </div>

            {/* ── USER CARD ── */}
            <div className="mx-4 bg-white rounded-2xl px-4 py-4 flex items-center gap-3 shadow-sm">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#EDE8FF]">
                    <OptimizedImage
                        src="/profile/avatars/user.png"
                        ikPath={true}
                        fallbackSrc="/images/login/profile-placeholder.png"
                        alt={profile.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[17px] font-bold text-black leading-tight">
                        {profile.name}
                    </p>
                    <p className="text-[13px] text-gray-400 mt-0.5">
                        {formattedPhone}
                    </p>
                    <Link
                        href="/profile/edit"
                        className="text-[13px] font-semibold text-[#7B5CF5] mt-0.5 inline-block"
                    >
                        {t('viewEdit')} &gt;
                    </Link>
                </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div className="mx-4 mt-3 bg-white rounded-2xl px-2 py-4 shadow-sm">
                <div className="flex justify-around">
                    {[
                        { icon: "/assets/icons/bookings.svg", label: t('myBookings'), key: 'myBookings' },
                        { icon: "/assets/icons/wallet.svg", label: t('wallet'), key: 'wallet' },
                        { icon: "/assets/icons/offers.svg", label: t('offers'), key: 'offers' },
                        { icon: "/assets/icons/support.svg", label: t('support'), key: 'support' },
                    ].map(({ icon, label, key }) => (
                        <button key={key} className="flex flex-col items-center gap-2 w-[72px]">
                            <div className="w-12 h-12 rounded-full bg-[#F4F0FF] flex items-center justify-center">
                                <Image src={icon} alt={label} width={24} height={24} />
                            </div>
                            <span className="text-[11px] text-gray-500 text-center leading-tight font-medium">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── SUBSCRIPTION BANNER ── */}
            <div className="mx-4 mt-3 bg-[#EDE8FF] rounded-2xl px-5 py-4 flex items-center justify-between overflow-hidden relative">
                <div className="z-10">
                    <p className="text-[15px] font-bold text-gray-800 leading-snug">
                        {t('subscribeTitle')}
                    </p>
                    <p className="text-[11.5px] text-gray-500 mt-0.5">
                        {t('subscribeSub')}
                    </p>
                    <button className="mt-3 bg-[#7B5CF5] text-white text-[13px] font-semibold px-5 py-2 rounded-full">
                        {t('subscribeButton')}
                    </button>
                </div>
                {/* Illustration */}
                <div className="absolute right-3 bottom-0 w-[120px] h-[110px]">
                    <Image
                        src="/assets/images/subscription-illustration.png"
                        alt="Subscribe"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>
            </div>

            {/* ── REFERRAL BANNER ── */}
            <div className="mx-4 mt-3 bg-[#EDE8FF] rounded-2xl px-5 py-4 flex items-center justify-between overflow-hidden relative">
                <div className="z-10">
                    <p className="text-[15px] font-bold text-gray-800 leading-snug">
                        {t('referTitle')}
                    </p>
                    <p className="text-[11.5px] text-gray-500 mt-0.5">
                        {t('referSub')}
                    </p>
                    <button className="mt-3 flex items-center gap-1 text-[#7B5CF5] text-[13px] font-semibold">
                        {t('referButton')}
                        <Image src="/assets/icons/chevron-right-purple.svg" alt="" width={14} height={14} />
                    </button>
                </div>
                {/* Illustration */}
                <div className="absolute right-3 bottom-0 w-[110px] h-[110px]">
                    <Image
                        src="/assets/images/referral-illustration.png"
                        alt="Referral"
                        fill
                        className="object-contain object-bottom"
                    />
                </div>
            </div>

            {/* ── LIST ITEMS ── */}
            <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
                <Link
                    href="/profile/addresses"
                    className="flex items-center justify-between px-5 py-4"
                >
                    <div className="flex items-center gap-4">
                        <Image src="/assets/icons/saved-address.svg" alt={t('savedAddresses')} width={22} height={22} />
                        <span className="text-[14.5px] font-medium text-gray-700">{t('savedAddresses')}</span>
                    </div>
                    <Image
                        src="/assets/icons/chevron-right.svg"
                        alt=">"
                        width={16}
                        height={16}
                        className="opacity-40"
                    />
                </Link>

                <Link
                    href="/profile/manage"
                    className="flex items-center justify-between px-5 py-4"
                >
                    <div className="flex items-center gap-4">
                        <Image src="/assets/icons/manage-account.svg" alt={t('manageAccount')} width={22} height={22} />
                        <span className="text-[14.5px] font-medium text-gray-700">{t('manageAccount')}</span>
                    </div>
                    <Image
                        src="/assets/icons/chevron-right.svg"
                        alt=">"
                        width={16}
                        height={16}
                        className="opacity-40"
                    />
                </Link>

                <button
                    onClick={() => setIsLanguageOpen(true)}
                    className="w-full flex items-center justify-between px-5 py-4"
                >
                    <div className="flex items-center gap-4">
                        <Image src="/assets/icons/manage-account.svg" alt={t('language')} width={22} height={22} />
                        <span className="text-[14.5px] font-medium text-gray-700">{t('language')}</span>
                    </div>
                    <Image
                        src="/assets/icons/chevron-right.svg"
                        alt=">"
                        width={16}
                        height={16}
                        className="opacity-40"
                    />
                </button>
            </div>
            
            {/* Logout */}
            <div className="mx-4 mt-3 mb-8 bg-white rounded-2xl shadow-sm">
                <button className="w-full flex items-center gap-4 px-5 py-4 text-red-500 font-semibold text-[14.5px]">
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                     </svg>
                     {t('logout')}
                </button>
            </div>

            {/* Language Drawer */}
            <LanguageDrawer 
                open={isLanguageOpen} 
                onClose={() => setIsLanguageOpen(false)} 
            />
        </div>
    );
}
