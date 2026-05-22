'use client';

import { cn } from '@/lib/cn';

const DEFAULT_UPI_PAYEE_VPA = process.env.NEXT_PUBLIC_UPI_PAYEE_VPA ?? '';
const DEFAULT_UPI_PAYEE_NAME = process.env.NEXT_PUBLIC_UPI_PAYEE_NAME ?? 'Snibto';
const UPI_PAYEE_VPA_PLACEHOLDER = 'yourupiid@bank';
const IOS_GOOGLE_PAY_SCHEME = 'tez://upi/pay';
const DEFAULT_UPI_SCHEME = 'upi://pay';

export type UPIPaymentFooterMode = 'fixed' | 'inline';

export type UPIPaymentFooterProps = {
  amount: string;
  transactionNote: string;
  buttonLabel?: string;
  className?: string;
  mode?: UPIPaymentFooterMode;
  payeeName?: string;
  payeeVpa?: string;
  paymentInitial?: string;
  paymentLabel?: string;
};

const isIOSDevice = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

const isConfiguredUPIVPA = (vpa: string) => {
  return Boolean(vpa && vpa.includes('@') && vpa !== UPI_PAYEE_VPA_PLACEHOLDER);
};

export function UPIPaymentFooter({
  amount,
  transactionNote,
  buttonLabel = 'Pay Now',
  className,
  mode = 'fixed',
  payeeName = DEFAULT_UPI_PAYEE_NAME,
  payeeVpa = DEFAULT_UPI_PAYEE_VPA,
  paymentInitial = 'G',
  paymentLabel = 'Google Pay UPI',
}: UPIPaymentFooterProps) {
  const handlePayNow = () => {
    if (!isConfiguredUPIVPA(payeeVpa)) {
      alert('Add a real UPI receiver ID in NEXT_PUBLIC_UPI_PAYEE_VPA.');
      return;
    }

    const params = new URLSearchParams({
      pa: payeeVpa,
      pn: payeeName,
      am: amount,
      cu: 'INR',
      tn: transactionNote,
    });

    const payScheme = isIOSDevice() ? IOS_GOOGLE_PAY_SCHEME : DEFAULT_UPI_SCHEME;

    window.location.assign(`${payScheme}?${params.toString()}`);
  };

  return (
    <footer
      className={cn(
        'border-t border-[#D8D8D8] bg-white px-5 pt-3',
        mode === 'fixed' &&
          'fixed bottom-0 left-1/2 z-50 w-full max-w-[36rem] -translate-x-1/2',
        mode === 'inline' && 'w-full',
        className
      )}
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.75rem)',
      }}
    >
      <p className="mb-1 text-sm font-semibold text-black">
        Pay using <span className="text-[0.55rem]">{'\u25B2'}</span>
      </p>
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E2E2E2] bg-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5F30CA] text-[0.58rem] font-bold text-white">
              {paymentInitial}
            </div>
          </div>
          <span className="truncate text-sm font-semibold text-black">{paymentLabel}</span>
        </div>

        <button
          type="button"
          onClick={handlePayNow}
          className="h-11 w-[9.25rem] rounded-lg bg-[#6330D6] text-sm font-semibold text-white transition-all active:scale-[0.98]"
        >
          {buttonLabel}
        </button>
      </div>
    </footer>
  );
}
