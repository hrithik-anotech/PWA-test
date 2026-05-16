"use client";

import { Link } from "next-view-transitions";

export default function AddressDetailsPage() {
  const handleFinish = () => {
    localStorage.setItem("hasAddress", "true");
  };

  return (
    <main className="min-h-screen bg-[#FCFCFF] p-6 font-[var(--font-urbanist)]">
      <div className="mx-auto flex max-w-md flex-col gap-6 rounded-[2rem] border border-black/5 bg-white p-6 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-[#111111]">Address Details</h1>
          <p className="mt-3 text-sm text-black/70">
            Add your address so helpers can reach you at the right place.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-black/10 bg-[#F8F8FF] p-4">
            <p className="font-semibold text-[#111111]">Street</p>
            <p className="text-sm text-black/60">Your neighbourhood and home details.</p>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-[#F8F8FF] p-4">
            <p className="font-semibold text-[#111111]">City</p>
            <p className="text-sm text-black/60">Used to determine local helper availability.</p>
          </div>
        </div>

        <Link
          href="/home"
          onClick={handleFinish}
          className="inline-flex h-[3.5rem] items-center justify-center rounded-[1.5rem] bg-[#5B2FD1] px-5 text-white shadow-lg transition hover:bg-[#6d3ef0]"
        >
          Finish and Go to Home
        </Link>
      </div>
    </main>
  );
}
