"use client";

import Link from "next/link";

export default function ProfileSetupPage() {
  const handleContinue = () => {
    localStorage.setItem("hasProfile", "true");
  };

  return (
    <main className="min-h-screen bg-[#FCFCFF] p-6 font-[var(--font-urbanist)]">
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-[2rem] border border-black/5 bg-white p-6 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-[#111111]">Profile Setup</h1>
          <p className="mt-3 text-sm text-black/70">
            Complete your profile so we can personalize the best home helper recommendations.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-black/10 bg-[#F8F8FF] p-4">
            <p className="font-semibold text-[#111111]">Name</p>
            <p className="text-sm text-black/60">Your display name and preferred greeting.</p>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-[#F8F8FF] p-4">
            <p className="font-semibold text-[#111111]">Location</p>
            <p className="text-sm text-black/60">Where you want helpers to arrive.</p>
          </div>
        </div>

        <Link
          href="/location-access"
          onClick={handleContinue}
          className="inline-flex h-[3.5rem] items-center justify-center rounded-[1.5rem] bg-[#5B2FD1] px-5 text-white shadow-lg transition hover:bg-[#6d3ef0]"
        >
          Continue to Location Access
        </Link>
      </div>
    </main>
  );
}
