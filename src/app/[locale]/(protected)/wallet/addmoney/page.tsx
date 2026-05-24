'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { UPIPaymentFooter } from '@/components/payments';

export default function AddMoneyPage() {
  const t = useTranslations('Wallet');
  const tCommon = useTranslations('Common');
  
  const [amount, setAmount] = useState('500');

  const handleAmountChange = (val: string) => {
    // Only allow numbers
    const cleanVal = val.replace(/[^0-9]/g, '');
    setAmount(cleanVal);
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="min-h-screen bg-[#F9F8FD] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F9F8FD] pt-[env(safe-area-inset-top)] border-b border-gray-100">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/wallet"
              className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg text-black transition-colors hover:bg-gray-100 active:scale-95"
              aria-label={tCommon('back')}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h1 className="text-xl font-semibold text-black">{t('addMoney')}</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-6 sm:px-6 max-w-md mx-auto w-full">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <label className="text-sm font-medium text-gray-500 uppercase tracking-wider block mb-3">
            {t('enterAmount')}
          </label>
          
          {/* Currency Input Field */}
          <div className="relative flex items-center border-b-2 border-gray-200 focus-within:border-[#8B5CF6] transition-colors pb-2">
            <span className="text-3xl sm:text-4xl font-bold text-gray-800 mr-2">₹</span>
            <input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              className="w-full text-3xl sm:text-4xl font-bold text-gray-800 outline-none bg-transparent"
            />
          </div>

          {/* Quick Amount Suggestion Buttons */}
          <div className="mt-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {t('selectAmount')}
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              {quickAmounts.map((amt) => {
                const isSelected = amount === amt.toString();
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className={`py-3.5 px-1 text-sm font-bold rounded-2xl transition-all border-2 text-center active:scale-95 ${
                      isSelected
                        ? 'border-[#8B5CF6] bg-[#F7F2FF] text-[#8B5CF6]'
                        : 'border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    +₹{amt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* UPI Payment Footer */}
      <UPIPaymentFooter
        amount={amount || '0'}
        transactionNote="Add money to Snibto Wallet"
        buttonLabel="Proceed to Pay"
      />
    </div>
  );
}
