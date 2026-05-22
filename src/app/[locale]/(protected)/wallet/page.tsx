'use client';

import { useState } from 'react';

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
  const [currentNav, setCurrentNav] = useState<'home' | 'bookings' | 'wallet'>(
    'wallet'
  );
  const [balance, setBalance] = useState('0');
  const [cashAmount, setCashAmount] = useState('0');
  const [bonusAmount, setBonusAmount] = useState('0');
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsData);
  const [showAddMoney, setShowAddMoney] = useState(false);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-[#F6F6F6] to-[#FAFAFA] pb-24 sm:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#DCDCDC] bg-white pt-[env(safe-area-inset-top)]">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="-ml-2 flex h-10 w-10 items-center justify-center rounded-lg text-black transition-colors hover:bg-gray-100 active:scale-95"
                aria-label="Go back"
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
              </button>
              <h1 className="text-xl font-semibold text-black">Wallet</h1>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-[#666666] transition-colors hover:bg-gray-100 active:scale-95"
            >
              <svg
                className="h-4 w-4 text-[#E0A0E0]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Secure</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 sm:py-8">
        {/* Balance Card */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#6D28D9] p-6 text-white shadow-lg sm:p-8">
          <div className="flex items-start justify-between mb-12">
            <div>
              <p className="text-sm font-medium opacity-90">Available Balance</p>
              <h2 className="mt-3 text-5xl font-bold sm:text-6xl">₹{balance}</h2>
            </div>

            {/* Wallet Illustration SVG */}
            <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 opacity-80">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Wallet */}
                <rect x="30" y="60" width="140" height="100" rx="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                <circle cx="140" cy="120" r="15" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                
                {/* Cards inside wallet */}
                <rect x="45" y="50" width="30" height="50" rx="4" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                <rect x="65" y="45" width="30" height="50" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                <rect x="85" y="40" width="30" height="50" rx="4" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
              </svg>
            </div>
          </div>

          {/* Add Money Button */}
          <button
            onClick={() => setShowAddMoney(true)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#8B5CF6] transition-all hover:shadow-lg active:scale-95 sm:px-8 sm:py-4"
          >
            <span>Add Money</span>
            <span className="text-lg">+</span>
          </button>
        </div>

        {/* Cash & Bonus Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:gap-5">
          {/* Cash Card */}
          <button
            className="group flex items-center justify-between rounded-2xl border border-[#D8D8D8] bg-white px-4 py-5 transition-all hover:shadow-md active:scale-95 sm:px-5 sm:py-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F5E9] sm:h-12 sm:w-12">
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
            className="group flex items-center justify-between rounded-2xl border border-[#D8D8D8] bg-white px-4 py-5 transition-all hover:shadow-md active:scale-95 sm:px-5 sm:py-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3E5F5] sm:h-12 sm:w-12">
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
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#D8D8D8] bg-white px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E9] sm:h-14 sm:w-14">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h3 className="font-semibold text-black sm:text-base">
                Refer & Earn ₹100
              </h3>
              <p className="mt-1 text-xs text-[#666666] sm:text-sm">
                Invite friends and earn rewards
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
          <h3 className="text-lg font-semibold text-black sm:text-xl">Transactions</h3>

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
              <p className="font-medium text-[#999999]">No transactions yet</p>
              <p className="mt-1 text-sm text-[#CCCCCC]">
                Your transactions will appear here
              </p>
            </div>
          )}
        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-between rounded-2xl border border-[#D8D8D8] bg-white px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
            <p className="text-sm font-medium text-[#666666]">
              Your payments are <span className="font-semibold">100% secure</span>
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-[#DCDCDC] bg-white pb-[env(safe-area-inset-bottom)] sm:hidden">
        <div className="flex items-center justify-around">
          {[
            {
              id: 'home',
              label: 'Home',
              icon: (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              ),
            },
            {
              id: 'bookings',
              label: 'Bookings',
              icon: (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 9h10v2H7z" />
                </svg>
              ),
            },
            {
              id: 'wallet',
              label: 'Wallet',
              icon: (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 6h-2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H6V8h12v10zm-6-3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
                </svg>
              ),
            },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() =>
                setCurrentNav(nav.id as 'home' | 'bookings' | 'wallet')
              }
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-colors',
                currentNav === nav.id
                  ? 'text-[#8B5CF6]'
                  : 'text-[#999999] hover:text-[#666666]'
              )}
            >
              {nav.icon}
              <span className="text-xs font-medium">{nav.label}</span>
            </button>
          ))}
        </div>
      </nav>

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
              <h2 className="text-2xl font-semibold text-black">Add Money</h2>
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