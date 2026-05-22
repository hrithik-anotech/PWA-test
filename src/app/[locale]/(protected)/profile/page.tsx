// app/profile/page.tsx  (or pages/profile.tsx)
"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()
    return (
        <div className="flex flex-col min-h-screen bg-gray-200">


            {/* ── HEADER ── */}
            <div className="flex items-center gap-2 px-4 pt-2 pb-4">
                <button className="p-1 -ml-1" onClick={() => router.back()}>
                    <Image src="/assets/icons/chevron-left.svg" alt="back" width={20} height={20} />
                </button>
                <h1 className="text-[22px] font-bold text-black tracking-tight">Profile</h1>
            </div>

            {/* ── USER CARD ── */}
            <div className="mx-4 bg-white rounded-2xl px-4 py-4 flex items-center gap-3 shadow-sm">
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#EDE8FF]">
                    <Image
                        src="/assets/images/avatar.png"
                        alt="Sadique"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[17px] font-bold text-black leading-tight">Sadique</p>
                    <p className="text-[13px] text-gray-400 mt-0.5">+91 98765 43210</p>
                    <Link
                        href="/profile/edit"
                        className="text-[13px] font-semibold text-[#7B5CF5] mt-0.5 inline-block"
                    >
                        View &amp; edit profile &gt;
                    </Link>
                </div>
            </div>

            {/* ── QUICK ACTIONS ── */}
            <div className="mx-4 mt-3 bg-white rounded-2xl px-2 py-4 shadow-sm">
                <div className="flex justify-around">
                    {[
                        { icon: "/assets/icons/bookings.svg", label: "My Bookings" },
                        { icon: "/assets/icons/wallet.svg", label: "Wallet" },
                        { icon: "/assets/icons/offers.svg", label: "Offers" },
                        { icon: "/assets/icons/support.svg", label: "Help & Support" },
                    ].map(({ icon, label }) => (
                        <button key={label} className="flex flex-col items-center gap-2 w-[72px]">
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
                        Subscribe for more benefits
                    </p>
                    <p className="text-[11.5px] text-gray-500 mt-0.5">
                        Faster bookings &amp; many more
                    </p>
                    <button className="mt-3 bg-[#7B5CF5] text-white text-[13px] font-semibold px-5 py-2 rounded-full">
                        Up to 20% off
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
                        Invite friends &amp; earn
                    </p>
                    <p className="text-[11.5px] text-gray-500 mt-0.5">
                        Refer your friends and get rewards
                    </p>
                    <button className="mt-3 flex items-center gap-1 text-[#7B5CF5] text-[13px] font-semibold">
                        Earn up to ₹100
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
                {[
                    {
                        icon: "/assets/icons/saved-address.svg",
                        label: "Saved Addresses",
                        href: "/profile/addresses",
                    },
                    {
                        icon: "/assets/icons/manage-account.svg",
                        label: "Manage Account",
                        href: "/profile/manage",
                    },
                    {
                        icon: "/assets/icons/manage-account.svg",
                        label: "Language",
                        href: "/profile/language",
                    },
                ].map(({ icon, label, href }) => (
                    <Link
                        key={label}
                        href={href}
                        className="flex items-center justify-between px-5 py-4"
                    >
                        <div className="flex items-center gap-4">
                            <Image src={icon} alt={label} width={22} height={22} />
                            <span className="text-[14.5px] font-medium text-gray-700">{label}</span>
                        </div>
                        <Image
                            src="/assets/icons/chevron-right.svg"
                            alt=">"
                            width={16}
                            height={16}
                            className="opacity-40"
                        />
                    </Link>
                ))}
            </div>

            {/* ── LOG OUT ── */}
            <div className="mx-4 mt-4">
                <button className="w-full flex items-center justify-center gap-2 border border-[#7B5CF5] rounded-full py-3.5 text-[14.5px] font-semibold text-[#7B5CF5] bg-white">
                    <Image src="/assets/icons/logout.svg" alt="logout" width={18} height={18} />
                    Log out
                </button>
            </div>

        </div>
    );
}