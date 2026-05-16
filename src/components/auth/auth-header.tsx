interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({
  title,
  description,
}: AuthHeaderProps) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-[clamp(4.25rem,17vw,6rem)] w-[clamp(4.25rem,17vw,6rem)] items-center justify-center rounded-full bg-gradient-to-br from-[#5B2FD1] to-[#8B5CF6] text-[clamp(1.75rem,6vw,2.25rem)] font-bold text-white shadow-[0_10px_30px_rgba(91,47,209,0.35)]">
        S
      </div>

      <h1 className="mt-[clamp(1rem,4.5vw,2rem)] text-[clamp(2.25rem,9vw,3rem)] font-extrabold tracking-tight text-[#5B2FD1]">
        Snibto
      </h1>

      <p className="mt-2 text-[clamp(0.625rem,2.6vw,0.875rem)] font-semibold tracking-[0.2em] uppercase text-black/50">
        YOUR TRUSTED HOME ASSISTANT
      </p>

      <div className="mt-[clamp(1.25rem,5vw,2.5rem)]">
        <h2 className="text-[clamp(1.5rem,6.5vw,1.875rem)] font-bold tracking-tight text-[#111111]">
          {title}
        </h2>

        <p className="mt-3 text-[clamp(0.9375rem,3.6vw,1rem)] leading-[1.6] text-black/60">
          {description}
        </p>
      </div>
    </div>
  );
}
