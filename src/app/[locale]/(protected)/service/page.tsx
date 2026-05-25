'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';

interface ServiceDetailPageProps {
  // Worker details
  workerName: string;
  workerRole: string;
  workerImage: string;
  rating: number;
  reviewCount: number;
  
  // Booking details
  arrivingInMins: number;
  progress: number;
  
  // Service details
  serviceDate: string;
  serviceTime: string;
  duration: number;
  location: string;
  checkInOTP: string;
  
  // Additional
  bookingId?: string;
  isLiveTracking?: boolean;
}

export default function ServiceDetailPage({
  workerName = "Riya Sharma",
  workerRole = "Cleaning Expert",
  workerImage = "/images/worker-photo.jpg",
  rating = 4.9,
  reviewCount = 236,
  arrivingInMins = 6,
  progress = 0.38,
  serviceDate = "Mon, 25 May",
  serviceTime = "6:00 PM",
  duration = 120,
  location = "Dhansal Cinema, Opposite Maa Kali Road, Near Bhogat Singh More",
  checkInOTP = "4826",
  bookingId = "SNB-9843",
  isLiveTracking = true,
}: ServiceDetailPageProps) {
  const router = useRouter();
  const [copiedOTP, setCopiedOTP] = useState(false);

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(checkInOTP || "4826");
    setCopiedOTP(true);
    setTimeout(() => setCopiedOTP(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="w-6 h-6 bg-slate-200 rounded" />
          </button>
          <div className="flex items-center gap-2">
            <div className="relative flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-green-700 tracking-wide">
                LIVE TRACKING
              </span>
            </div>
          </div>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-6 space-y-4">
        {/* Worker Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 flex-1">
              <div className="relative">
                <img
                  src={workerImage}
                  alt={workerName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-slate-200">
                  <div className="w-4 h-4 bg-green-200 rounded-full" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                  {workerName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{workerRole}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex items-center gap-0.5">
                    <span className="text-xs font-semibold text-slate-900">★ {rating}</span>
                    <span className="text-xs text-slate-500">({reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-3">
              <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
                Reschedule
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors whitespace-nowrap">
                Cancel
              </button>
            </div>
          </div>

          {/* Arriving Status */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-600">Arriving in</span>
                <span className="text-sm font-semibold text-slate-900">{arrivingInMins} mins</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">ETA 6:47 PM</p>
            </div>
          </div>

          {/* Your Location */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-600">Your location</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dhansal Cinema, Opposite Maa Kali Road, Near Bhogat Singh More
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Check-in OTP */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-900 mb-3">Check-in OTP</p>
          <p className="text-xs text-slate-600 mb-3">Share with expert to start service</p>
          <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="flex gap-2">
              {(checkInOTP || "4826").split('').map((digit, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center"
                >
                  <span className="text-white font-semibold text-lg">{digit}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleCopyOTP}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                copiedOTP
                  ? "bg-green-100"
                  : "hover:bg-slate-200"
              )}
            >
              {copiedOTP ? (
                <div className="w-5 h-5 bg-green-200 rounded-full" />
              ) : (
                <div className="w-5 h-5 bg-slate-200 rounded" />
              )}
            </button>
          </div>
        </div>

        {/* Booked for someone else */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-900">Booked for someone else?</p>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <div className="w-5 h-5 bg-purple-200 rounded" />
            </button>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="space-y-4">
            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-purple-200 rounded mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {serviceDate}, {serviceTime} - {duration} min visit
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-purple-200 rounded mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-700">{location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <button className="w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-purple-200 rounded" />
              <div>
                <p className="text-sm font-medium text-slate-900">Payment Details</p>
                <p className="text-xs text-slate-500 mt-0.5">View details</p>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>

        {/* Contact Support */}
        <button className="w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-purple-200 rounded" />
              <div>
                <p className="text-sm font-medium text-slate-900">Contact Support</p>
                <p className="text-xs text-slate-500 mt-0.5">Resolve your queries</p>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}