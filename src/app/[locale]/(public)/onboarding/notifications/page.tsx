'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { setAppState } from '@/lib/storage';
import { markForwardNavigation } from '@/lib/navigation-transition';

export default function NotificationsOnboardingPage() {
  const t = useTranslations('Onboarding');
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [permissionError, setPermissionError] = useState('');
  const [requestingPermission, setRequestingPermission] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasPermission =
        'Notification' in window && Notification.permission === 'granted';
      if (hasPermission) {
        setAppState({ onboardingCompleted: true, isLoggedIn: false, profileCompleted: false, locationSelected: false, addressCompleted: false });
        router.replace('/login');
      } else {
        setChecking(false);
      }
    } else {
      setChecking(false);
    }
  }, [router]);

  const handleCompleteOnboarding = () => {
    setAppState({ onboardingCompleted: true, isLoggedIn: false, profileCompleted: false, locationSelected: false, addressCompleted: false });
  };

  const handleEnableNotifications = async () => {
    markForwardNavigation();
    setPermissionError('');

    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermissionError('Notifications are not supported on this browser.');
      return;
    }

    if (!window.isSecureContext) {
      setPermissionError('Notifications need a secure connection to be enabled.');
      return;
    }

    try {
      setRequestingPermission(true);
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        setPermissionError(
          permission === 'denied'
            ? 'Notifications are blocked. You can enable them from browser settings.'
            : 'Please allow notifications to continue with alerts enabled.'
        );
        return;
      }

      handleCompleteOnboarding();
      router.replace('/login');
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      setPermissionError('Could not ask for notification access. Please try again.');
    } finally {
      setRequestingPermission(false);
    }
  };

  const handleSkipNotifications = () => {
    markForwardNavigation();
    handleCompleteOnboarding();
    router.replace('/login');
  };

  if (checking) {
    return (
      <main className="flex h-dvh w-full items-center justify-center bg-white">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#5B2FD1] border-t-transparent" />
      </main>
    );
  }

  const rows = [
    { icon: '🏡', bg: '#EDE8FF', title: 'Helper is on the way',    sub: 'Priya will arrive in 5 mins',          time: 'now', delay: '0.2s' },
    { icon: '✅', bg: '#E6F9F0', title: 'Booking confirmed',        sub: 'Utensils cleaning — Thu 9 AM',         time: '2m',  delay: '0.36s' },
    { icon: '⭐', bg: '#FEF3E2', title: 'Rate your experience',     sub: 'How was your session with Meena?',     time: '5m',  delay: '0.52s' },
  ] as const;

return (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
      .np { font-family: 'DM Sans', sans-serif; }
      @keyframes np-pulse {
        0% { transform: scale(1); opacity: 0.18; }
        70% { transform: scale(1.55); opacity: 0; }
        100% { transform: scale(1.55); opacity: 0; }
      }
      @keyframes np-in { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      .np-ring  { animation: np-pulse 2.4s ease-out infinite; }
      .np-ring2 { animation: np-pulse 2.4s ease-out 0.8s infinite; }
      .np-f1 { opacity:0; animation: np-in .5s ease both .1s; }
      .np-f2 { opacity:0; animation: np-in .5s ease both .25s; }
      .np-f3 { opacity:0; animation: np-in .5s ease both .4s; }
      .np-allow:active { opacity:.88; transform:scale(.98); }
      .np-skip:active  { opacity:.5; }
    `}</style>

    <main className="np relative flex h-dvh w-full flex-col items-center justify-between bg-white px-6 pt-10 pb-[max(2rem,env(safe-area-inset-bottom))]">

      {/* Hero */}
      <div className="flex flex-1 flex-col items-center justify-center gap-0 w-full">

        {/* Bell with pulse */}
        <div className="relative flex items-center justify-center mb-8" style={{ width:88, height:88 }}>
          <div className="np-ring absolute inset-0 rounded-full" style={{ background:'#5B2FD1' }} />
          <div className="np-ring2 absolute inset-0 rounded-full" style={{ background:'#5B2FD1' }} />
          <div className="relative flex items-center justify-center" style={{ width:72, height:72, borderRadius:22, background:'#EDE8FF' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5B2FD1" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>
        </div>

        <h1 className="np-f1 text-center font-semibold" style={{ fontSize:'clamp(1.4rem,6vw,1.75rem)', color:'#120A2E', letterSpacing:'-.025em', lineHeight:1.2, marginBottom:10 }}>
          Never miss a moment
        </h1>
        <p className="np-f2 text-center" style={{ fontSize:14, color:'#9B8DC0', lineHeight:1.6, maxWidth:220, marginBottom:36 }}>
          We'll let you know when your helper is nearby or your booking changes.
        </p>

        <div className="np-f3 flex flex-col gap-[10px] w-full">
          {[
            { label: 'Helper arrival alerts' },
            { label: 'Booking & schedule updates' },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-3 rounded-2xl px-[14px] py-3" style={{ background:'#F7F5FF' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#5B2FD1', flexShrink:0 }} />
              <span style={{ fontSize:13.5, color:'#3C3489' }}>{r.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-[10px] w-full">
        {permissionError ? (
          <p role="status" className="text-center" style={{ fontSize:12.5, color:'#D14343', lineHeight:1.4 }}>
            {permissionError}
          </p>
        ) : null}
        <button type="button" onClick={handleEnableNotifications} disabled={requestingPermission} className="np-allow flex w-full items-center justify-center gap-2 rounded-2xl disabled:opacity-70" style={{ height:52, background:'#5B2FD1', border:'none', fontFamily:'inherit', fontSize:15, fontWeight:600, color:'#fff', cursor: requestingPermission ? 'wait' : 'pointer' }}>
          {requestingPermission ? 'Asking permission...' : 'Allow notifications'}
        </button>
        <button type="button" onClick={handleSkipNotifications} className="np-skip w-full" style={{ height:40, background:'none', border:'none', fontFamily:'inherit', fontSize:13.5, color:'#B0A3CC', cursor:'pointer' }}>
          Not now
        </button>
      </div>

    </main>
  </>
);
}
