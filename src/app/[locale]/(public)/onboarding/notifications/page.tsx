'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { OnboardingContent } from '@/components/onboarding/onboarding-content';
import { OnboardingFooter } from '@/components/onboarding/onboarding-footer';
import { setAppState } from '@/lib/storage';
import { cn } from '@/lib/cn';
import { markForwardNavigation } from '@/lib/navigation-transition';

export default function NotificationsOnboardingPage() {
  const t = useTranslations('Onboarding');
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Standard client check for push notification permission
    if (typeof window !== 'undefined') {
      const hasPermission = 'Notification' in window && Notification.permission === 'granted';
      if (hasPermission) {
        // Permission is already granted; bypass onboarding and jump straight to login
        setAppState({
          onboardingCompleted: true,
          isLoggedIn: false,
          profileCompleted: false,
          locationSelected: false,
          addressCompleted: false,
        });
        router.replace('/login');
      } else {
        setChecking(false);
      }
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleCompleteOnboarding = () => {
    setAppState({
      onboardingCompleted: true,
      isLoggedIn: false,
      profileCompleted: false,
      locationSelected: false,
      addressCompleted: false,
    });
  };

  const handleEnableNotifications = async () => {
    markForwardNavigation();
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    }
    handleCompleteOnboarding();
    router.replace('/login');
  };

  const handleSkipNotifications = () => {
    markForwardNavigation();
    handleCompleteOnboarding();
    router.replace('/login');
  };

  if (checking) {
    return (
      <main className="flex h-screen items-center justify-center bg-[#FCFCFF]">
        <div className="flex flex-col items-center gap-3">
          {/* Subtle loading spinner */}
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#5B2FD1] border-t-transparent" />
        </div>
      </main>
    );
  }

  return (
    <OnboardingLayout>
      {/* STYLE TAG FOR DETAILED GLASSMORPHIC & FLOATING KEYFRAMES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-bubble-1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-bubble-2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bell-giggle {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-6deg); }
          35% { transform: rotate(5deg); }
          40% { transform: rotate(-5deg); }
          45% { transform: rotate(4deg); }
          50% { transform: rotate(0deg); }
        }
        @keyframes ring-glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.12; }
          50% { transform: scale(1.08); opacity: 0.22; }
        }

        .anim-float-1 {
          animation: float-bubble-1 5s ease-in-out infinite;
        }
        .anim-float-2 {
          animation: float-bubble-2 6.5s ease-in-out infinite;
        }
        .anim-bell {
          animation: bell-giggle 4.5s ease-in-out infinite;
          transform-origin: top center;
        }
        .anim-ring-glow {
          animation: ring-glow-pulse 4s ease-in-out infinite;
        }
      ` }} />

      <OnboardingContent>
        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
          
          {/* Concentric Glow Ripples */}
          <div className="anim-ring-glow absolute h-64 w-64 rounded-full border border-[#5B2FD1]/10 bg-[#5B2FD1]/[0.02]" />
          <div className="anim-ring-glow absolute h-48 w-48 rounded-full border border-[#5B2FD1]/15 bg-[#5B2FD1]/[0.03]" style={{ animationDelay: '-1.5s' }} />
          <div className="anim-ring-glow absolute h-32 w-32 rounded-full border border-[#5B2FD1]/20 bg-[#5B2FD1]/[0.04]" style={{ animationDelay: '-3s' }} />

          {/* Central Golden Glassmorphic Bell */}
          <div className="anim-bell relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/80 bg-white/40 shadow-xl backdrop-blur-md">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EAB308"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_12px_rgba(234,179,8,0.4)]"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>

          {/* Floating Bubble 1 (Left side) */}
          <div className="anim-float-1 absolute left-[8%] top-[15%] z-20 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/50 px-3.5 py-2 shadow-lg backdrop-blur-sm sm:left-[15%]">
            <span className="text-sm">🏡</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-[#5B2FD1]/80 uppercase tracking-wide">Helper Arriving</span>
              <span className="text-[11px] font-medium text-gray-800">Your helper is 2 mins away!</span>
            </div>
          </div>

          {/* Floating Bubble 2 (Right side) */}
          <div className="anim-float-2 absolute right-[5%] bottom-[15%] z-20 flex items-center gap-2 rounded-2xl border border-white/60 bg-white/50 px-3.5 py-2 shadow-lg backdrop-blur-sm sm:right-[12%]">
            <span className="text-sm">🎉</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-[#5B2FD1]/80 uppercase tracking-wide">Booking Confirmed</span>
              <span className="text-[11px] font-medium text-gray-800">Utensils cleaning scheduled</span>
            </div>
          </div>

        </div>
      </OnboardingContent>

      <OnboardingFooter>
        <div className="mx-auto flex h-full w-full max-w-md flex-col justify-between gap-2">
          
          {/* 4 DOTS INDICATOR */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  item === 4 ? 'w-7 bg-white' : 'w-1.5 bg-white/35'
                )}
              />
            ))}
          </div>

          {/* TITLE & DESCRIPTION */}
          <div className="mx-auto w-full max-w-md px-2 pb-[clamp(0.75rem,2dvh,1.25rem)] text-center">
            <h1 className="text-[clamp(1.45rem,6vw,2.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#ffffff]">
              {t('notifications.title')}
            </h1>

            <p className="mt-[clamp(0.375rem,1.1dvh,0.75rem)] text-[clamp(0.875rem,3.4vw,1.0625rem)] font-medium leading-[1.4] text-white/65">
              {t('notifications.description')}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSkipNotifications}
              className="text-[clamp(0.9375rem,3.6vw,1.125rem)] font-semibold text-white/55 transition-opacity active:opacity-60"
            >
              {t('notifications.notNow')}
            </button>

            <button
              type="button"
              onClick={handleEnableNotifications}
              className={cn(
                'flex',
                'h-[clamp(2.375rem,6dvh,2.875rem)]',
                'min-w-[clamp(6rem,28vw,8.125rem)]',
                'items-center',
                'justify-center',
                'rounded-full',
                'bg-white',
                'px-[clamp(1rem,4vw,2rem)]',
                'text-[clamp(0.9375rem,3.6vw,1.125rem)]',
                'font-bold',
                'text-[#5B2FD1]',
                'shadow-[0_10px_30px_rgba(255,255,255,0.18)]',
                'transition-transform',
                'active:scale-[0.98]'
              )}
            >
              {t('notifications.allow')}
            </button>
          </div>

        </div>
      </OnboardingFooter>
    </OnboardingLayout>
  );
}
