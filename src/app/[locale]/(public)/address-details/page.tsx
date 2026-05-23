"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useState } from "react";
import {
  markBackNavigation,
  markForwardNavigation,
} from "@/lib/navigation-transition";
import { setAppState } from "@/lib/storage";

type AddressType = "home" | "family" | "other";

type AddressTypeOption = {
  iconHeight: number;
  iconWidth: number;
  label: string;
  value: AddressType;
};

type AddressTextFieldProps = {
  id: string;
  label: string;
};

const ADDRESS_TYPE_OPTIONS: AddressTypeOption[] = [
  {
    iconHeight: 20,
    iconWidth: 20,
    label: "Home",
    value: "home",
  },
  {
    iconHeight: 20,
    iconWidth: 29,
    label: "Family",
    value: "family",
  },
  {
    iconHeight: 20,
    iconWidth: 18,
    label: "Other",
    value: "other",
  },
];

const getAddressTypeIcon = (
  type: AddressType,
  isSelected: boolean
) =>
  `/images/location/${type}${isSelected ? "-select" : ""}.svg`;

function AddressTextField({
  id,
  label,
}: AddressTextFieldProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloatLabel = isFocused || value.length > 0;

  return (
    <div className="relative rounded-2xl border border-[#D9D9D9] bg-white px-2 sm:px-2">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute transition-all duration-200 ease-out ${
          shouldFloatLabel
            ? "-top-[10px] left-3 sm:left-4 bg-[#ffffff] px-2 text-[11px] sm:text-[12px] text-[#9E9E9E]"
            : "left-4 sm:left-5 top-1/2 -translate-y-1/2 px-0 text-sm sm:text-[16px] text-[#7E7E7E]"
        }`}
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="h-[52px] sm:h-[58px] w-full bg-transparent text-sm sm:text-[16px] text-black outline-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      />
    </div>
  );
}

export default function AddressDetailsPage() {
  const t = useTranslations('Address');
  const router = useRouter();
  const [selectedType, setSelectedType] =
    useState<AddressType>("home");

  const handleBack = () => {
    markBackNavigation();
    router.back();
  };

  const handleSelectType = (type: AddressType) => {
    setSelectedType(type);
    console.log("[address] selected type:", type);
  };

  const handleFinish = () => {
    setAppState({
      addressCompleted: true,
    });
    markForwardNavigation();
    router.replace("/home");
  };

  return (
    <main
      className="bg-surface font-[var(--font-urbanist)]"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header — safe area top */}
      <div
        className="shrink-0 border-b border-[#E5E5E5] bg-white px-4 sm:px-6 pb-3 sm:pb-4"
        style={{
          paddingTop: `max(1.25rem, calc(env(safe-area-inset-top) + 0.75rem))`,
        }}
      >
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="mt-0.5 flex h-10 w-10 items-center justify-center -ml-2 rounded-full"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label="Go back"
          >
            <Image
              src="/images/arrow-left.svg"
              alt="back"
              width={24}
              height={24}
            />
          </button>

          <div>
            <h1 className="text-lg sm:text-[22px] font-semibold tracking-[-0.3px] text-black leading-tight">
              {t('title')}
            </h1>

            <p className="mt-0.5 text-xs sm:text-[13px] text-[#8B8B8B]">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto px-4 sm:px-6 pt-5 sm:pt-6"
        style={{
          /* bottom padding accounts for fixed button + safe area */
          paddingBottom: `calc(5rem + env(safe-area-inset-bottom) + 1.5rem)`,
        }}
      >
        <div className="mx-auto max-w-md space-y-4 sm:space-y-5">
          <AddressTextField
            id="flat-floor"
            label={t('flatFloor')}
          />

          <AddressTextField
            id="building"
            label={t('building')}
          />

          {/* Area Card */}
          <div className="relative rounded-[18px] border border-[#D9D9D9] bg-white p-3 sm:p-4">
            {/* Floating Label */}
            <div className="absolute -top-[14px] left-4 bg-[#ffffff] px-1">
              <span className="text-[11px] sm:text-[12px] text-[#9E9E9E]">
                {t('area')}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Address text */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-[15px] leading-[1.55] text-[#4B4B4B]">
                  Genex Exotica, Grand Trunk Road,
                  Kumarpur, Asansol, West Bengal,
                  713304, near Bhagat Singh More
                </p>
              </div>

              {/* Map Preview */}
              <div className="relative h-[80px] w-[80px] sm:h-[92px] sm:w-[92px] shrink-0 overflow-hidden rounded-[16px] sm:rounded-[18px]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#eee9f7]"
                >
                  <div className="absolute left-[-10px] top-6 h-1 w-28 rotate-[-16deg] rounded-full bg-white/80" />
                  <div className="absolute left-8 top-[-8px] h-28 w-1 rotate-[10deg] rounded-full bg-white/70" />
                  <div className="absolute bottom-5 right-[-12px] h-1 w-24 rotate-[24deg] rounded-full bg-white/75" />
                  <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C35FF]/20" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C35FF]" />
                </div>

                <Link
                  href="/location/map"
                  className="absolute left-1/2 top-1/2 z-10 flex h-[26px] sm:h-[28px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black px-2.5 sm:px-3 text-[9px] sm:text-[10px] font-semibold text-white whitespace-nowrap"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {t('change')}
                </Link>
              </div>
            </div>
          </div>

          {/* Save As */}
          <div className="pt-1">
            <p className="text-sm sm:text-[16px] font-medium text-[#6C35FF]">
              {t('saveAs')}
            </p>

            <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3">
              {ADDRESS_TYPE_OPTIONS.map((option) => {
                const isSelected =
                  selectedType === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleSelectType(option.value)
                    }
                    style={{
                      minHeight: "44px", // iOS minimum tap target
                      WebkitTapHighlightColor: "transparent",
                    }}
                    className={`flex h-[48px] sm:h-[52px] flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-[12px] border text-[13px] sm:text-[15px] font-medium transition-all active:scale-95 ${
                      isSelected
                        ? "border-[#6C35FF] bg-[#F5F0FF] text-[#6C35FF]"
                        : "border-transparent bg-[#EDEDED] text-[#4B4B4B]"
                    }`}
                  >
                    <Image
                      src={getAddressTypeIcon(
                        option.value,
                        isSelected
                      )}
                      alt={option.value}
                      width={option.iconWidth}
                      height={option.iconHeight}
                      className="shrink-0"
                    />
                    <span className="truncate">
                      {t(option.value)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button — safe area bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-[var(--app-background)] px-4 pt-3 sm:px-6 sm:pt-4"
        style={{
          paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 0.75rem)`,
        }}
      >
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={handleFinish}
            className="flex h-13 sm:h-14.5 w-full items-center justify-center rounded-2xl bg-[#6C35FF] text-base sm:text-[18px] font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </main>
  );
}
