'use client';

import { useEffect } from 'react';

type Props = {
  isExiting?: boolean;
};

function playLightningSound() {
  try {
    const AudioContext =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    // --- 1. THE LIGHTNING CRACKLE (High frequency energy sparks) ---
    for (let i = 0; i < 3; i++) {
      const crackleOsc = ctx.createOscillator();
      const crackleGain = ctx.createGain();
      
      crackleOsc.type = 'triangle';
      crackleOsc.frequency.setValueAtTime(3000 + Math.random() * 2000, now + i * 0.04);
      crackleOsc.frequency.exponentialRampToValueAtTime(100, now + i * 0.04 + 0.03);
      
      crackleGain.gain.setValueAtTime(0.08, now + i * 0.04);
      crackleGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.03);
      
      crackleOsc.connect(crackleGain);
      crackleGain.connect(ctx.destination);
      
      crackleOsc.start(now + i * 0.04);
      crackleOsc.stop(now + i * 0.04 + 0.03);
    }
    
    // --- 2. THE ZAP (Main energy discharge) ---
    const mainOsc = ctx.createOscillator();
    const mainGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    mainOsc.type = 'sawtooth';
    mainOsc.frequency.setValueAtTime(800, now);
    mainOsc.frequency.exponentialRampToValueAtTime(180, now + 0.4);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.4);
    
    mainGain.gain.setValueAtTime(0.18, now);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    mainOsc.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);
    
    mainOsc.start(now);
    mainOsc.stop(now + 0.4);
    
    // --- 3. THE RUMBLE (Low-end thunder decay) ---
    const bufferSize = ctx.sampleRate * 1.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(200, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(35, now + 1.2);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    
    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noiseNode.start(now);
    noiseNode.stop(now + 1.2);
  } catch (error) {
    console.error('Failed to play instant splash sound effect:', error);
  }
}

export default function InstantSplash({ isExiting = false }: Props) {
  useEffect(() => {
    if (isExiting) return;
    
    // Play the lightning strike sound effect exactly at the strike frame (1.0s)
    const timer = setTimeout(() => {
      playLightningSound();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isExiting]);
  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-linear-to-b from-[#5F30CA] via-[#311782] to-[#0D002B] transition-opacity duration-600 ease-out-sine ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ── STYLE TAG FOR CUSTOM HARDWARE-ACCELERATED KEYFRAMES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── ENTRANCES (Run Once) ── */
        @keyframes instant-bg-orb-entrance {
          0% { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
        }

        @keyframes instant-ring-entrance-1 {
          0% { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes instant-ring-entrance-2 {
          0% { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes instant-ring-entrance-3 {
          0% { transform: scale(0.3); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes instant-bolt-strike {
          0% { transform: scale(0.3); opacity: 0; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
          70% { transform: scale(0.3); opacity: 0; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
          /* 1.0s: The instant strike! */
          72% { transform: scale(1.4); opacity: 1; filter: drop-shadow(0 0 25px rgba(255,255,255,1)) drop-shadow(0 0 50px rgba(167,139,250,0.95)); }
          /* 1.12s: The rapid flicker */
          78% { transform: scale(0.9); opacity: 0.35; filter: drop-shadow(0 0 8px rgba(255,255,255,0.7)) drop-shadow(0 0 15px rgba(167,139,250,0.5)); }
          /* 1.22s: Second main strike */
          85% { transform: scale(1.25); opacity: 1; filter: drop-shadow(0 0 20px rgba(255,255,255,0.98)) drop-shadow(0 0 45px rgba(167,139,250,0.85)); }
          /* 1.35s: Settles and stabilizes */
          100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 25px rgba(167, 139, 250, 0.65)); }
        }

        @keyframes instant-ghost-fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* ── BREATHING / LOOPING (Infinite) ── */
        @keyframes instant-bg-orb-breath {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.95; }
        }

        @keyframes instant-ring-1 {
          0%, 100% { transform: scale(0.98); opacity: 0.85; border-color: rgba(255, 255, 255, 0.16); }
          50% { transform: scale(1.03); opacity: 1; border-color: rgba(255, 255, 255, 0.28); }
        }

        @keyframes instant-ring-2 {
          0%, 100% { transform: scale(0.97); opacity: 0.45; border-color: rgba(255, 255, 255, 0.08); box-shadow: 0 0 20px rgba(153, 63, 213, 0.05); }
          50% { transform: scale(1.05); opacity: 0.65; border-color: rgba(255, 255, 255, 0.18); box-shadow: 0 0 35px rgba(153, 63, 213, 0.15); }
        }

        @keyframes instant-ring-3 {
          0%, 100% { transform: scale(0.96); opacity: 0.25; border-color: rgba(255, 255, 255, 0.04); }
          50% { transform: scale(1.07); opacity: 0.45; border-color: rgba(255, 255, 255, 0.10); }
        }

        @keyframes instant-bolt-breath {
          0%, 100% { 
            transform: scale(0.96); 
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 25px rgba(167, 139, 250, 0.65)); 
          }
          50% { 
            transform: scale(1.04); 
            filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.98)) drop-shadow(0 0 45px rgba(167, 139, 250, 0.9)); 
          }
        }

        @keyframes instant-ghost-1 {
          0%, 100% { transform: translate(0, 0) rotate(15deg) scale(1); }
          50% { transform: translate(6px, -8px) rotate(16.5deg) scale(1.03); }
        }

        @keyframes instant-ghost-2 {
          0%, 100% { transform: translate(0, 0) rotate(-25deg) scale(1); }
          50% { transform: translate(-5px, 6px) rotate(-23.5deg) scale(0.97); }
        }

        @keyframes instant-ghost-3 {
          0%, 100% { transform: translate(0, 0) rotate(35deg) scale(1); }
          50% { transform: translate(8px, 8px) rotate(33deg) scale(1.04); }
        }

        /* ── ANIMATION CLASS ATTACHMENTS ── */
        .anim-bg-orb {
          animation: instant-bg-orb-entrance 1.0s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     instant-bg-orb-breath 6s ease-in-out infinite 1.0s;
        }
        
        .anim-ring-1 {
          animation: instant-ring-entrance-1 0.8s cubic-bezier(0.16, 1, 0.3, 1) both 0.2s,
                     instant-ring-1 3.5s ease-in-out infinite 1.0s;
          transform-origin: center;
        }
        .anim-ring-2 {
          animation: instant-ring-entrance-2 0.8s cubic-bezier(0.16, 1, 0.3, 1) both 0.4s,
                     instant-ring-2 4.2s ease-in-out infinite 1.2s;
          transform-origin: center;
        }
        .anim-ring-3 {
          animation: instant-ring-entrance-3 0.8s cubic-bezier(0.16, 1, 0.3, 1) both 0.6s,
                     instant-ring-3 5.0s ease-in-out infinite 1.4s;
          transform-origin: center;
        }
        
        .anim-bolt {
          animation: instant-bolt-strike 1.4s cubic-bezier(0.25, 1, 0.5, 1) both,
                     instant-bolt-breath 3.5s ease-in-out infinite 1.4s;
          transform-origin: center;
        }

        .anim-ghost-container {
          animation: instant-ghost-fade 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .anim-ghost-1 {
          animation: instant-ghost-1 12s ease-in-out infinite;
          transform-origin: center;
        }
        .anim-ghost-2 {
          animation: instant-ghost-2 10s ease-in-out infinite;
          transform-origin: center;
        }
        .anim-ghost-3 {
          animation: instant-ghost-3 14s ease-in-out infinite;
          transform-origin: center;
        }

        .ease-out-sine {
          transition-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
        }
      ` }} />

      {/* ── CENTRAL GRADIENT ORB FOR DEPTH ── */}
      <div className="anim-bg-orb pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(153,63,213,0.35)_0%,rgba(95,48,202,0.15)_40%,transparent_75%)] opacity-85 blur-[55px]" />

      {/* ── GHOST LIGHTNING BOLTS (CORNERS) ── */}
      {/* Top-Left Ghost Bolt */}
      <div className="anim-ghost-container pointer-events-none absolute -left-[12%] -top-[8%] origin-center">
        <div className="anim-ghost-1 text-[#CFAFFF] opacity-[0.04] blur-[1px]">
          <svg
            width="360"
            height="450"
            viewBox="0 0 11 14"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M6.21429 5.55556V0.5L0.5 8.44444H4.78571V13.5L10.5 5.55556H6.21429Z" />
          </svg>
        </div>
      </div>

      {/* Bottom-Left Ghost Bolt */}
      <div className="anim-ghost-container pointer-events-none absolute -bottom-[6%] -left-[8%] origin-center">
        <div className="anim-ghost-2 text-[#CFAFFF] opacity-[0.03]">
          <svg
            width="220"
            height="280"
            viewBox="0 0 11 14"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M6.21429 5.55556V0.5L0.5 8.44444H4.78571V13.5L10.5 5.55556H6.21429Z" />
          </svg>
        </div>
      </div>

      {/* Bottom-Right Ghost Bolt */}
      <div className="anim-ghost-container pointer-events-none absolute -bottom-[10%] -right-[8%] origin-center">
        <div className="anim-ghost-3 text-[#CFAFFF] opacity-[0.04] blur-[0.5px]">
          <svg
            width="280"
            height="350"
            viewBox="0 0 11 14"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M6.21429 5.55556V0.5L0.5 8.44444H4.78571V13.5L10.5 5.55556H6.21429Z" />
          </svg>
        </div>
      </div>

      {/* ── CONCENTRIC GLASSMORPHIC RINGS & CENTRAL BOLT ── */}
      <div className="relative flex items-center justify-center">
        
        {/* Outer Ring */}
        <div className="anim-ring-3 pointer-events-none absolute flex items-center justify-center rounded-full border border-white/5 bg-transparent backdrop-blur-[2px] w-[290px] h-[290px]" />

        {/* Middle Ring */}
        <div className="anim-ring-2 pointer-events-none absolute flex items-center justify-center rounded-full border border-white/8 bg-white/[0.01] backdrop-blur-sm shadow-[0_0_25px_rgba(153,63,213,0.08)] w-[210px] h-[210px]" />

        {/* Innermost Ring */}
        <div className="anim-ring-1 pointer-events-none absolute flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-[inset_0_0_15px_rgba(255,255,255,0.05),0_0_20px_rgba(153,63,213,0.12)] w-[130px] h-[130px]" />

        {/* Central Lightning Bolt */}
        <div className="anim-bolt relative z-10 text-[#F2EBFF]">
          <svg
            width="80"
            height="100"
            viewBox="0 0 11 14"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M6.21429 5.55556V0.5L0.5 8.44444H4.78571V13.5L10.5 5.55556H6.21429Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
