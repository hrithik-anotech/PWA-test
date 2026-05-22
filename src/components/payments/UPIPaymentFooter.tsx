'use client';

import { cn } from '@/lib/cn';
import {
  createUpiPaymentUrl,
  isConfiguredUPIVPA,
} from '@/lib/payments';
import { useState } from 'react';

const DEFAULT_UPI_PAYEE_VPA =
  process.env.NEXT_PUBLIC_UPI_PAYEE_VPA ?? '';

const DEFAULT_UPI_PAYEE_NAME =
  process.env.NEXT_PUBLIC_UPI_PAYEE_NAME ?? 'Snibto';

const UPI_APPS = [
  { name: 'PhonePe',    scheme: 'phonepe'  },
  { name: 'Google Pay', scheme: 'tez'      },
  { name: 'Paytm',      scheme: 'paytmmp'  },
  { name: 'BHIM',       scheme: 'bhim'     },
];

function buildAppUpiUrl(scheme: string, base: string) {
  return base.replace(/^upi:\/\//, `${scheme}://`);
}

export type UPIPaymentFooterMode = 'fixed' | 'inline';

export type UPIPaymentFooterProps = {
  amount: string;
  transactionNote: string;
  buttonLabel?: string;
  className?: string;
  mode?: UPIPaymentFooterMode;
  payeeName?: string;
  payeeVpa?: string;
};

type PaymentError = 'configuration' | 'launch';

export function UPIPaymentFooter({
  amount,
  transactionNote,
  buttonLabel = 'Pay Now',
  className,
  mode = 'fixed',
  payeeName = DEFAULT_UPI_PAYEE_NAME,
  payeeVpa = DEFAULT_UPI_PAYEE_VPA,
}: UPIPaymentFooterProps) {
  const [paymentError, setPaymentError] =
    useState<PaymentError | null>(null);

  const handlePayNow = () => {
    if (!isConfiguredUPIVPA(payeeVpa)) {
      setPaymentError('configuration');
      return;
    }

    const baseUrl = createUpiPaymentUrl({
      amount,
      payeeName,
      payeeVpa,
      transactionNote,
    });

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    if (!isIOS) {
      window.location.href = baseUrl;
      return;
    }

    let index = 0;

    const tryNext = () => {
      if (index >= UPI_APPS.length) {
        window.location.href = baseUrl;
        return;
      }

      const app = UPI_APPS[index++];
      const appUrl = buildAppUpiUrl(app.scheme, baseUrl);
      let opened = false;

      const onBlur = () => {
        opened = true;
        cleanup();
      };

      const cleanup = () => {
        window.removeEventListener('blur', onBlur);
        clearTimeout(timer);
      };

      window.addEventListener('blur', onBlur);
      window.location.href = appUrl;

      const timer = setTimeout(() => {
        cleanup();
        if (!opened) tryNext();
      }, 800);
    };

    tryNext();
  };

  const errorContent =
    paymentError === 'configuration'
      ? {
          title: 'UPI Payment Setup Needed',
          description: (
            <>
              The UPI receiver ID is not configured. Please add{' '}
              <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
                NEXT_PUBLIC_UPI_PAYEE_VPA
              </code>{' '}
              to your environment variables.
            </>
          ),
        }
      : {
          title: 'UPI Payment Could Not Start',
          description:
            'Please try again from this screen or use another available payment option.',
        };

  const closeError = () => {
    setPaymentError(null);
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to   { opacity: 1; backdrop-filter: blur(4px); }
        }
        .upi-error-overlay { animation: fadeIn 0.3s ease-out; }
        .upi-error-modal   { animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>

      <footer
        className={cn(
          'bg-gradient-to-b from-white via-white to-gray-50 px-4 pt-2 transition-all duration-300',
          mode === 'fixed' &&
            'fixed bottom-0 left-1/2 z-50 w-full max-w-[36rem] -translate-x-1/2 border-t border-gray-200/50',
          mode === 'inline' && 'w-full',
          className
        )}
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
        }}
      >
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Total Amount
          </span>
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-2xl font-bold text-transparent">
            &#8377;{amount}
          </span>
        </div>

        <button
          type="button"
          onClick={handlePayNow}
          className="relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#7B3FF2] to-[#5A2A9F] font-semibold text-white shadow-lg transition-all duration-200 hover:from-[#8B4FFF] hover:to-[#6A3AAF] hover:shadow-xl active:scale-[0.98] active:shadow-md"
        >
          <span className="text-lg font-bold tracking-tight">
            {buttonLabel}
          </span>
          <svg
            className="ml-1 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </footer>

      {paymentError && (
        <div
          className="upi-error-overlay fixed inset-0 z-40 flex items-end bg-black/30 sm:items-center sm:justify-center"
          onClick={closeError}
        >
          <div
            className="upi-error-modal w-full max-w-sm rounded-t-2xl bg-white p-6 sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 0a9 9 0 110-18 9 9 0 010 18z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {errorContent.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {errorContent.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeError}
              className="mt-4 w-full rounded-lg bg-gray-100 py-2.5 font-medium text-gray-900 transition-colors hover:bg-gray-200 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}