"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { markBackNavigation } from "@/lib/navigation-transition";

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
    <div className="relative rounded-[16px] border border-[#D9D9D9] bg-white px-5">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute transition-all duration-200 ease-out ${
          shouldFloatLabel
            ? "-top-[10px] left-4 bg-[#f8f8f8] px-2 text-[12px] text-[#9E9E9E]"
            : "left-5 top-1/2 -translate-y-1/2 px-0 text-[16px] text-[#7E7E7E]"
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
        className="h-[58px] w-full bg-transparent text-[16px] text-black outline-none"
      />
    </div>
  );
}

export default function AddressDetailsPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] =
    useState<AddressType>("home");

  const handleBack = () => {
    markBackNavigation();
    router.push("/location/map");
  };

  const handleSelectType = (type: AddressType) => {
    setSelectedType(type);
    console.log("[address] selected type:", type);
  };

  const handleFinish = () => {
    localStorage.setItem("hasAddress", "true");
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] font-[var(--font-urbanist)]">
      {/* Header */}
      <div className="border-b border-[#E5E5E5] bg-white px-6 pb-4 pt-5">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="mt-0.5"
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
            <h1 className="text-[22px] font-semibold tracking-[-0.3px] text-black">
              Address details
            </h1>

            <p className="mt-0.5 text-[13px] text-[#8B8B8B]">
              Fill in the details for better accuracy
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6">
        <AddressTextField
          id="flat-floor"
          label="Flat no. / Floor no."
        />

        <div className="mt-5">
          <AddressTextField
            id="building"
            label="Building no. / Building name."
          />
        </div>

        {/* Area Card */}
        <div className="relative mt-5 rounded-[18px] border border-[#D9D9D9] bg-white p-4">
          {/* Floating Label */}
          <div className="absolute -top-[10px] left-4 bg-[#f8f8f8] px-2">
            <span className="text-[12px] text-[#9E9E9E]">
              Area
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Address */}
            <div className="flex-1">
              <p className="text-[16px] leading-[25px] text-[#4B4B4B]">
                Genex Exotica, Grand Trunk Road,
                Kumarpur, Asansol, West Bengal,
                713304, near Bhagat Singh More
              </p>
            </div>

            {/* Map Preview */}
            <div className="relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-[18px]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[#eee9f7]"
              >
                <div className="absolute left-[-10px] top-6 h-1 w-28 rotate-[-16deg] rounded-full bg-white/80" />
                <div className="absolute left-8 top-[-8px] h-28 w-1 rotate-[10deg] rounded-full bg-white/70" />
                <div className="absolute bottom-5 right-[-12px] h-1 w-24 rotate-[24deg] rounded-full bg-white/75" />
                <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C35FF]/20" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C35FF]" />
              </div>

              <Link
                href="/location/map"
                className="absolute left-1/2 top-1/2 z-10 flex h-[28px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black px-3 text-[10px] font-semibold text-white"
              >
                Change
              </Link>
            </div>
          </div>
        </div>

        {/* Save As */}
        <div className="mt-6">
          <p className="text-[16px] font-medium text-[#6C35FF]">
            Save As
          </p>

          <div className="mt-4 flex gap-3">
            {ADDRESS_TYPE_OPTIONS.map((option) => {
              const isSelected =
                selectedType === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() =>
                    handleSelectType(option.value)
                  }
                  className={`flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[12px] border text-[15px] font-medium transition-all ${
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
                  />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f8f8] px-6 pb-8 pt-4">
        <div className="mx-auto max-w-md">
          <Link
            href="/home"
            onClick={handleFinish}
            className="flex h-[58px] w-full items-center justify-center rounded-[16px] bg-[#6C35FF] text-[18px] font-semibold text-white shadow-sm transition-all active:scale-[0.98]"
          >
            Confirm Address
          </Link>
        </div>
      </div>
    </main>
  );
}
