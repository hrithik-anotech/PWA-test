'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

interface Transaction {
  id: string;
  description: string;
  amount: string;
  type: 'credit' | 'debit';
  date: string;
  icon: string;
}

const transactionsData: Transaction[] = [
  // Empty initially - add transactions as needed
];

export default function WalletPage() {
  const t = useTranslations('Wallet');
  const tCommon = useTranslations('Common');
  const tProfile = useTranslations('Profile');

  const [balance, setBalance] = useState('0');
  const [cashAmount, setCashAmount] = useState('0');
  const [bonusAmount, setBonusAmount] = useState('0');
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsData);
  const [showAddMoney, setShowAddMoney] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F8FD] ">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F9F8FD] pt-[env(safe-area-inset-top)]">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/home"
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
              <h1 className="text-xl font-semibold text-black">{t('title')}</h1>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#666666] transition-colors"
            >
              <div className='bg-[#F1EDFD] p-1 rounded-full'>
              <Image alt="secure" src="/images/icons/secure.svg" width={15} height={15} />
              </div>
              <span>Secure</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 pb-6 sm:px-6 sm:pb-8">
        {/* Balance Card */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#c49eff] via-[#a97ee8] to-[#7849e0] p-5 text-white shadow-lg sm:p-6">
          <div className="flex items-center justify-between gap-4">

            {/* Left: text + button */}
            <div className="flex flex-col justify-between gap-5 sm:gap-7">
              <div>
                <p className="text-sm font-medium opacity-80 tracking-wide">
                  {t('balance')}
                </p>
                <h2 className="mt-2 text-5xl font-bold leading-none sm:text-6xl">
                  ₹{balance}
                </h2>
              </div>

              <button
                onClick={() => setShowAddMoney(true)}
                className="inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-2xl bg-white px-5 py-2.5 text-base font-bold text-[#5F30CA] shadow-md transition-transform active:scale-[0.98] sm:px-6 sm:py-3"
              >
                {t('addMoney')} <span className="font-bold">+</span>
              </button>
            </div>

            {/* Right: wallet illustration */}
            <div className="relative h-32 w-32 shrink-0 opacity-95 sm:h-36 sm:w-36">
              <Image
                alt="wallet"
                src="/images/profile/wallet-bg.webp"
                fill
                loading="eager"
                sizes="(min-width: 640px) 9rem, 8rem"
                quality={85}
                className="object-contain drop-shadow-xl"
              />
            </div>

          </div>
        </div>

        {/* Cash & Bonus Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:gap-5">
          {/* Cash Card */}
          <button
            className="group flex items-center justify-between rounded-xl border border-[#D8D8D8] bg-white px-4 py-5 transition-all hover:shadow-md active:scale-95 sm:px-5 sm:py-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DFF7EC] sm:h-12 sm:w-12">
                <span className="text-lg sm:text-xl">💵</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-[#666666] sm:text-sm">Cash</p>
                <p className="mt-1 text-base font-bold text-black sm:text-lg">
                  ₹{cashAmount}
                </p>
              </div>
            </div>
            <svg className="h-5 w-5 text-[#CCCCCC] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bonus Card */}
          <button
            className="group flex items-center justify-between rounded-xl border border-[#D8D8D8] bg-white px-4 py-5 transition-all hover:shadow-md active:scale-95 sm:px-5 sm:py-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1EEFC] sm:h-12 sm:w-12">
                <span className="text-lg sm:text-xl">🎁</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-[#666666] sm:text-sm">Bonus</p>
                <p className="mt-1 text-base font-bold text-black sm:text-lg">
                  ₹{bonusAmount}
                </p>
              </div>
            </div>
            <svg className="h-5 w-5 text-[#CCCCCC] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Refer & Earn */}
        <div className="mb-6 flex items-center justify-between rounded-xl bg-[#F7F3FD] px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DFF7EC] sm:h-14 sm:w-14">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h3 className="font-semibold text-black sm:text-base">
                {tProfile('referTitle')}
              </h3>
              <p className="mt-1 text-xs text-[#666666] sm:text-sm">
                {tProfile('referSub')}
              </p>
            </div>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 active:scale-95 sm:h-11 sm:w-11"
            aria-label="Refer"
          >
            <svg className="h-6 w-6 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Transactions Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black sm:text-xl">{t('transactions')}</h3>

          {transactions.length > 0 ? (
            <div className="mt-4 space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between rounded-xl border border-[#D8D8D8] bg-white px-4 py-4 sm:px-5 sm:py-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{transaction.icon}</div>
                    <div>
                      <p className="font-medium text-black">{transaction.description}</p>
                      <p className="text-xs text-[#666666] sm:text-sm">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'font-bold sm:text-lg',
                      transaction.type === 'credit'
                        ? 'text-green-600'
                        : 'text-black'
                    )}
                  >
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8D8D8] py-12 text-center">
              <svg
                className="mb-3 h-12 w-12 text-[#CCCCCC]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="font-medium text-[#999999]">{t('noTransactions')}</p>
            </div>
          )}
        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-between rounded-2xl border border-[#D8D8D8] bg-white px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
            <p className="text-sm font-medium text-[#666666]">
              Your payments are <span className="font-semibold">100% secure</span>
            </p>
          </div>
        </div>
      </main>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/30 sm:items-center sm:justify-center"
          onClick={() => setShowAddMoney(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-black">{t('addMoney')}</h2>
              <button
                onClick={() => setShowAddMoney(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              {[100, 500, 1000, 5000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setBalance((prev) => {
                      const newBalance = (parseInt(prev) + amount).toString();
                      setCashAmount(newBalance);
                      return newBalance;
                    });
                    setShowAddMoney(false);
                  }}
                  className="w-full rounded-xl border-2 border-[#D8D8D8] bg-white py-4 font-semibold text-black transition-all hover:border-[#8B5CF6] hover:bg-[#F7F2FF] active:scale-95"
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
