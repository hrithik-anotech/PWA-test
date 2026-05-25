'use client';

import { useEffect, useSyncExternalStore, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
    defaultUserProfile,
    type UserProfile,
} from "@/lib/storage";

type Gender = "Male" | "Female" | "Other";

const PROFILE_EXTRA_STORAGE_KEYS = {
    email: "profileEmail",
    gender: "profileGender",
} as const;

const GENDER_OPTIONS: Gender[] = ["Male", "Female", "Other"];

interface EditProfileDrawerProps {
    open: boolean;
    profile: UserProfile;
    onClose: () => void;
    onSave: (updates: UserProfile) => void;
}

const subscribeToPortalTarget = () => {
    return () => {};
};

const getPortalTargetSnapshot = () => {
    return typeof document !== "undefined";
};

const getServerPortalTargetSnapshot = () => false;

export default function EditProfileDrawer({
    open,
    profile,
    onClose,
    onSave,
}: EditProfileDrawerProps) {
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(profile.phone);
    const [gender, setGender] = useState<Gender>("Male");

    const hasPortalTarget = useSyncExternalStore(
        subscribeToPortalTarget,
        getPortalTargetSnapshot,
        getServerPortalTargetSnapshot
    );

    useEffect(() => {
        if (!open) {
            return;
        }

        const timer = setTimeout(() => {
            setName(profile.name);
            setPhone(profile.phone);
            setEmail(localStorage.getItem(PROFILE_EXTRA_STORAGE_KEYS.email) || "");

            const storedGender = localStorage.getItem(PROFILE_EXTRA_STORAGE_KEYS.gender);
            setGender(GENDER_OPTIONS.includes(storedGender as Gender) ? storedGender as Gender : "Male");
        }, 0);

        return () => clearTimeout(timer);
    }, [open, profile]);

    useEffect(() => {
        if (!open) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    if (!hasPortalTarget) {
        return null;
    }

    const handleSave = () => {
        const nextName = name.trim() || defaultUserProfile.name;
        const nextPhone = phone.replace(/\D/g, "").slice(-10);

        localStorage.setItem(PROFILE_EXTRA_STORAGE_KEYS.email, email.trim());
        localStorage.setItem(PROFILE_EXTRA_STORAGE_KEYS.gender, gender);

        onSave({
            name: nextName,
            phone: nextPhone,
        });
    };

    return createPortal(
        <>
            <div
                aria-hidden="true"
                onClick={onClose}
                className={`fixed inset-0 z-[120] bg-black/55 transition-opacity duration-300 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />
            <section
                role="dialog"
                aria-modal="true"
                aria-label="Edit profile"
                className={`fixed inset-x-0 bottom-0 z-[121] mx-auto flex max-h-[88dvh] w-full max-w-[36rem] flex-col rounded-t-[2rem] bg-white px-[clamp(1.25rem,5vw,2rem)] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[clamp(1.25rem,4dvh,2rem)] shadow-[0_-1.5rem_5rem_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out ${
                    open ? "translate-y-0" : "translate-y-full"
                }`}
            >
                <div className="relative flex shrink-0 items-center justify-center">
                    <h2 className="text-[clamp(1.625rem,7vw,2rem)] font-[800] tracking-tight text-[#2D2D31]">
                        Edit profile
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close edit profile"
                        className="absolute right-0 flex h-[clamp(3rem,13vw,3.5rem)] w-[clamp(3rem,13vw,3.5rem)] items-center justify-center rounded-full bg-[#FAFAFA] text-[#8A8A8A] active:scale-95"
                    >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6 6 18" />
                        </svg>
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto pt-[clamp(1.5rem,4dvh,2.25rem)]">
                    <div className="mx-auto mb-[clamp(1.5rem,4dvh,2rem)] flex h-[clamp(7rem,30vw,8.25rem)] w-[clamp(7rem,30vw,8.25rem)] items-center justify-center rounded-full border-[0.35rem] border-white bg-[#F5E9FF] shadow-[0_0_0_0.5rem_rgba(124,58,237,0.06)]">
                        <div className="relative h-[80%] w-[80%] overflow-hidden rounded-full">
                            <Image
                                src="/images/login/profile-placeholder.png"
                                alt={profile.name}
                                fill
                                sizes="8rem"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-[clamp(1rem,3dvh,1.5rem)]">
                        <label className="block">
                            <span className="mb-2 block text-[clamp(1rem,4vw,1.125rem)] font-medium text-[#A5A5AA]">
                                Name
                            </span>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="h-[clamp(3.5rem,13vw,4rem)] w-full rounded-2xl border border-[#ECECF0] bg-white px-5 text-[clamp(1rem,4vw,1.125rem)] font-[800] text-[#2D2D31] outline-none transition-colors focus:border-[#7B5CF5]"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[clamp(1rem,4vw,1.125rem)] font-medium text-[#A5A5AA]">
                                E-mail (Optional)
                            </span>
                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                inputMode="email"
                                className="h-[clamp(3.5rem,13vw,4rem)] w-full rounded-2xl border border-[#ECECF0] bg-white px-5 text-[clamp(1rem,4vw,1.125rem)] font-semibold text-[#2D2D31] outline-none transition-colors focus:border-[#7B5CF5]"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-[clamp(1rem,4vw,1.125rem)] font-medium text-[#A5A5AA]">
                                Phone number
                            </span>
                            <input
                                value={phone ? `+91 ${phone}` : ""}
                                onChange={(event) => setPhone(event.target.value)}
                                inputMode="tel"
                                className="h-[clamp(3.5rem,13vw,4rem)] w-full rounded-2xl border border-[#ECECF0] bg-white px-5 text-[clamp(1rem,4vw,1.125rem)] font-[800] text-[#2D2D31] outline-none transition-colors focus:border-[#7B5CF5]"
                            />
                        </label>

                        <div>
                            <span className="mb-3 block text-[clamp(1rem,4vw,1.125rem)] font-medium text-[#A5A5AA]">
                                Gender
                            </span>
                            <div className="grid grid-cols-3 gap-3">
                                {GENDER_OPTIONS.map((option) => {
                                    const isSelected = gender === option;

                                    return (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setGender(option)}
                                            className={`h-[clamp(3rem,11vw,3.5rem)] rounded-2xl border text-[clamp(0.9375rem,3.8vw,1.0625rem)] font-[800] transition-all active:scale-[0.98] ${
                                                isSelected
                                                    ? "border-[#7B5CF5] bg-[#F5EFFF] text-[#2D2D31]"
                                                    : "border-[#ECECF0] bg-white text-[#2D2D31]"
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    className="mt-[clamp(1.5rem,4dvh,2rem)] h-[clamp(3.75rem,14vw,4.25rem)] shrink-0 rounded-2xl bg-[#7B5CF5] text-[clamp(1.125rem,4.8vw,1.375rem)] font-[800] text-white shadow-[0_1rem_2rem_rgba(123,92,245,0.24)] active:scale-[0.98]"
                >
                    Update
                </button>
            </section>
        </>,
        document.body
    );
}
