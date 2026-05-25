"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useState, useTransition, useEffect, Suspense } from "react";
import {
  markBackNavigation,
  markForwardNavigation,
} from "@/lib/navigation-transition";
import { setAppState } from "@/lib/storage";
import { useSearchParams } from "next/navigation";

type AddressType = "home" | "friend" | "other";

type AddressTypeOption = {
  iconHeight: number;
  iconWidth: number;
  label: string;
  value: AddressType;
};

type AddressTextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
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
    label: "Friend",
    value: "friend",
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
  value,
  onChange,
}: AddressTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloatLabel = isFocused || value.length > 0;

  return (
    <div className="relative rounded-2xl border border-[#D9D9D9] bg-white px-2 sm:px-2">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute transition-all duration-200 ease-out ${
          shouldFloatLabel
            ? "-top-[0.625rem] left-3 sm:left-4 bg-[#ffffff] px-2 text-[2.75vw] sm:text-[3vw] text-[#9E9E9E]" /* ↓ was -top-[10px]/text-[11px]/text-[12px] → -top-[0.625rem]/text-[2.75vw]/text-[3vw] */
            : "left-4 sm:left-5 top-1/2 -translate-y-1/2 px-0 text-sm sm:text-base text-[#7E7E7E]"
        }`}
      >
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="h-[3.25rem] sm:h-[3.625rem] w-full bg-transparent text-sm sm:text-base text-black outline-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
      />
    </div>
  );
}

function AddressDetailsContent() {
  const t = useTranslations('Address');
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get('action') || 'add';
  const id = searchParams.get('id') || '';

  const [flatFloor, setFlatFloor] = useState("");
  const [building, setBuilding] = useState("");
  const [selectedType, setSelectedType] = useState<AddressType>("home");
  const [areaText, setAreaText] = useState("Genex Exotica, Grand Trunk Road, Kumarpur, Asansol, West Bengal, 713304, near Bhagat Singh More");

  useEffect(() => {
    if (action === 'edit' && id) {
      const stored = localStorage.getItem('user_addresses');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const addressToEdit = parsed.find((a: any) => a.id === id);
          if (addressToEdit) {
            setFlatFloor(addressToEdit.flatFloor || "");
            setBuilding(addressToEdit.building || "");
            setSelectedType((addressToEdit.type || "home").toLowerCase() as AddressType);
            if (addressToEdit.areaText) {
              setAreaText(addressToEdit.areaText);
            }
          }
        } catch (e) {
          console.error("Failed to parse user addresses", e);
        }
      }
    } else {
      // Adding new address: load confirmed text from map if it exists
      const storedText = localStorage.getItem('confirmed_address_text');
      if (storedText) {
        setAreaText(storedText);
      }
    }
  }, [action, id]);

  const handleBack = () => {
    markBackNavigation();
    router.back();
  };

  const handleSelectType = (type: AddressType) => {
    setSelectedType(type);
    console.log("[address] selected type:", type);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isButtonLoading = isLoading || isPending;

  const handleFinish = async () => {
    if (isButtonLoading) return;
    
    setIsLoading(true);

    // Simulate API call to save address
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Construct details string
    const detailsList = [];
    if (flatFloor) detailsList.push(flatFloor);
    if (building) detailsList.push(building);
    detailsList.push(areaText);
    const details = detailsList.join(', ');

    // Map selectedType to capitalized string
    const typeMap: Record<AddressType, string> = {
      home: 'Home',
      friend: 'Friend',
      other: 'Other'
    };
    const capitalizedType = typeMap[selectedType] || 'Home';

    // Retrieve, update and store addresses list
    const INITIAL_ADDRESSES = [
      { id: '1', type: 'Home', details: 'Genex Exotica, Asansol WB' },
      { id: '2', type: 'Work', details: 'Tech Park, Bangalore KA' },
    ];

    const stored = localStorage.getItem('user_addresses');
    let addressesList = [];
    if (stored) {
      try {
        addressesList = JSON.parse(stored);
      } catch {
        addressesList = [...INITIAL_ADDRESSES];
      }
    } else {
      addressesList = [...INITIAL_ADDRESSES];
    }

    if (action === 'edit' && id) {
      addressesList = addressesList.map((addr: any) => {
        if (addr.id === id) {
          return {
            ...addr,
            type: capitalizedType,
            details,
            flatFloor,
            building,
            areaText,
          };
        }
        return addr;
      });
    } else {
      const newAddress = {
        id: Date.now().toString(),
        type: capitalizedType,
        details,
        flatFloor,
        building,
        areaText,
      };
      addressesList.push(newAddress);
      // Select the new address
      localStorage.setItem('selected_address_id', newAddress.id);
    }

    localStorage.setItem('user_addresses', JSON.stringify(addressesList));
    if (action === 'edit' && id) {
      localStorage.setItem('selected_address_id', id);
    }

    setAppState({
      addressCompleted: true,
    });
    markForwardNavigation();
    
    setIsLoading(false);
    
    startTransition(() => {
      router.replace("/home");
    });
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
            <h1 className="text-lg sm:text-[5.5vw] font-semibold tracking-[-0.3px] text-black leading-tight"> {/* ↓ was sm:text-[22px] → sm:text-[5.5vw] */}
              {action === 'edit' ? "Edit address" : t('title')}
            </h1>

            <p className="mt-0.5 text-xs sm:text-sm text-[#8B8B8B]">
              {action === 'edit' ? "Update details for better accuracy" : t('subtitle')}
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
            value={flatFloor}
            onChange={setFlatFloor}
          />

          <AddressTextField
            id="building"
            label={t('building')}
            value={building}
            onChange={setBuilding}
          />

          {/* Area Card */}
          <div className="relative rounded-[1.125rem] border border-[#D9D9D9] bg-white p-3 sm:p-4">
            {/* Floating Label */}
            <div className="absolute -top-[0.875rem] left-4 bg-[#ffffff] px-1">
              <span className="text-[2.75vw] sm:text-[3vw] text-[#9E9E9E]"> {/* ↓ was text-[11px]/text-[12px] → text-[2.75vw]/text-[3vw] */}
                {t('area')}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Address text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-[3.75vw] leading-[1.55] text-[#4B4B4B]"> {/* ↓ was sm:text-[15px] → sm:text-[3.75vw] */}
                  {areaText}
                </p>
              </div>

              {/* Map Preview */}
              <div className="relative h-20 w-20 sm:h-[5.75rem] sm:w-[5.75rem] shrink-0 overflow-hidden rounded-2xl sm:rounded-[1.125rem]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#eee9f7]"
                >
                  <div className="absolute -left-[0.625rem] top-6 h-1 w-28 rotate-[-16deg] rounded-full bg-white/80" />
                  <div className="absolute left-8 -top-2 h-28 w-1 rotate-[10deg] rounded-full bg-white/70" />
                  <div className="absolute bottom-5 -right-3 h-1 w-24 rotate-[24deg] rounded-full bg-white/75" />
                  <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C35FF]/20" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6C35FF]" />
                </div>

                <Link
                  href={`/location/map?action=${action}${id ? `&id=${id}` : ''}`}
                  className="absolute left-1/2 top-1/2 z-10 flex h-[1.625rem] sm:h-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black px-2.5 sm:px-3 text-[2.25vw] sm:text-[2.5vw] font-semibold text-white whitespace-nowrap"
                  /* ↓ was text-[9px]/text-[10px] → text-[2.25vw]/text-[2.5vw] */
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {t('change')}
                </Link>
              </div>
            </div>
          </div>

          {/* Save As */}
          <div className="pt-1">
            <p className="text-sm sm:text-base font-medium text-[#6C35FF]">
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
                      minHeight: "2.75rem", // was 44px (iOS minimum tap target)
                      WebkitTapHighlightColor: "transparent",
                    }}
                    className={`flex h-12 sm:h-[3.25rem] flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border text-sm sm:text-[3.75vw] font-medium transition-all active:scale-95 ${ /* ↓ was sm:text-[15px] → sm:text-[3.75vw] */
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
            disabled={isButtonLoading}
            className="flex gap-2 h-13 sm:h-14.5 w-full items-center justify-center rounded-2xl bg-[#6C35FF] text-base sm:text-lg font-semibold text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-80 disabled:active:scale-100"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isButtonLoading ? (
              <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {action === 'edit' ? "Save Address" : t('confirm')}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function AddressDetailsPage() {
  return (
    <Suspense fallback={null}>
      <AddressDetailsContent />
    </Suspense>
  );
}

