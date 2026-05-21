import { PageContainer } from "@/components/ui/page-container";

export default function WalletPage() {
  return (
    <PageContainer>
      <section className="px-5 pt-10">
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
          Wallet
        </h1>
        <p className="mt-3 text-base text-black/60">
          Wallet balance and payment history will appear here.
        </p>
      </section>
    </PageContainer>
  );
}
