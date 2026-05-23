import Image from "next/image";

export default function SplashScreen() {
  return (
    <main className="relative flex h-dvh items-center justify-center overflow-hidden bg-[#0D002B]">

      {/* TOP-RIGHT GRADIENT ORB */}
      <div className="absolute -top-1/4 -right-[35%] h-[70%] w-[85%] rounded-full bg-[radial-gradient(circle_at_55%_45%,rgba(153,63,213)_0%,rgba(153,63,213,0.6)_25%,rgba(153,63,213,0.25)_55%,transparent_75%)] opacity-[0.85] blur-[80px]" />

      {/* TOP-RIGHT SECONDARY FROST LAYER */}
      <div className="absolute -top-[30%] -right-[40%] h-[80%] w-[95%] rounded-full bg-[radial-gradient(circle_at_55%_45%,rgba(153,63,213,0.25)_30%,rgba(153,63,213,0.05)_60%,transparent_80%)] blur-[100px]" />

      {/* BOTTOM-LEFT GRADIENT ORB */}
      <div className="absolute -bottom-1/4 -left-[35%] h-[70%] w-[85%] rounded-full bg-[radial-gradient(circle_at_45%_55%,rgba(153,63,213,0.95)_0%,rgba(153,63,213,0.9)_25%,rgba(153,63,213,0.2)_55%,transparent_75%)] opacity-80 blur-[80px]" />
      {/* WHITE INSET SHADOW FROST */}
      <div className="pointer-events-none absolute inset-0 z-[6] shadow-[inset_0_60px_80px_-20px_rgba(255,255,255,0.12),inset_0_-60px_80px_-20px_rgba(255,255,255,0.12),inset_60px_0_80px_-20px_rgba(255,255,255,0.10),inset_-60px_0_80px_-20px_rgba(255,255,255,0.10)]" />

      {/* LOGO */}
      <div className="relative z-10">
        <Image
          src="/images/logos/splash-logo.png"
          alt="Snibto"
          width={300}
          height={200}
          sizes="16rem"
          priority
          quality={90}
          className="h-auto w-64 object-contain"
        />
      </div>
    </main>
  );
}
