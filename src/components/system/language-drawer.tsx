'use client';

import { cn } from '@/lib/cn';
import { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

type LanguageDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const subscribeToPortalTarget = () => {
  return () => {};
};

const getPortalTargetSnapshot = () => {
  return typeof document !== 'undefined';
};

const getServerPortalTargetSnapshot = () => false;

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

export default function LanguageDrawer({ open, onClose }: LanguageDrawerProps) {
  const t = useTranslations('Profile');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const hasPortalTarget = useSyncExternalStore(
    subscribeToPortalTarget,
    getPortalTargetSnapshot,
    getServerPortalTargetSnapshot
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLanguageChange = (locale: string) => {
    if (locale === currentLocale) {
      onClose();
      return;
    }
    
    // Set cookie for middleware persistence
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Set localStorage for client-side persistence (used by AppRouteGuard)
    localStorage.setItem('NEXT_LOCALE', locale);
    
    // Use router.replace for a smooth transition without full page reload
    router.replace(pathname, { locale: locale as any });
    
    onClose();
  };

  if (!hasPortalTarget) {
    return null;
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('language')}
        className={cn(
          'fixed inset-x-0 bottom-0 z-[100] flex flex-col bg-white',
          'rounded-t-[1.5rem] transition-transform duration-300 ease-out',
          'max-h-[80dvh]',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 shrink-0">
          <div className="h-1.5 w-12 rounded-full bg-[#E5E5E5]" />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-6 shrink-0 border-b border-gray-50">
          <h2 className="text-[20px] font-bold text-black tracking-tight">
            {t('language')}
          </h2>
          <p className="mt-1 text-[14px] text-gray-500">
            Select your preferred language
          </p>
        </div>

        {/* Language List */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-2">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLocale;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    'w-full flex items-center justify-between px-5 py-5 rounded-2xl transition-all',
                    isSelected
                      ? 'bg-[#F4F0FF] border-2 border-[#7B5CF5]'
                      : 'bg-white border-2 border-transparent hover:bg-gray-50'
                  )}
                >
                  <div className="flex flex-col items-start">
                    <span
                      className={cn(
                        'text-[16px] font-bold leading-none',
                        isSelected ? 'text-[#7B5CF5]' : 'text-gray-800'
                      )}
                    >
                      {lang.native}
                    </span>
                    <span className="text-[13px] text-gray-400 mt-1.5">
                      {lang.label}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="h-6 w-6 rounded-full bg-[#7B5CF5] flex items-center justify-center shadow-lg shadow-[#7B5CF5]/20">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
