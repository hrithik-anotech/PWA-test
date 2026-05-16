export default function SplashScreen() {
  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-[#2B174D] via-[#5B2FD1] to-[#B18BFF] px-6">
      <div className="flex flex-col items-center text-center text-white">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/10 text-5xl font-bold backdrop-blur-md">
          S
        </div>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight">
          Snibto
        </h1>

        <p className="mt-2 text-sm font-medium tracking-[0.3em] text-white/80 uppercase">
          Your Trusted Home Assistant
        </p>
      </div>
    </main>
  );
}
