export const UPI_PAYMENT_SCHEME = 'upi://pay';

export const UPI_PAYEE_VPA_PLACEHOLDER = 'yourupiid@bank';

export type UpiPaymentParams = {
  amount: string;
  payeeName: string;
  payeeVpa: string;
  transactionNote: string;
};

export const FUTURE_UPI_APP_CHOOSER_OPTIONS = [
  { id: 'google-pay', label: 'Google Pay' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'paytm', label: 'Paytm' },
] as const;

export const isConfiguredUPIVPA = (vpa: string) => {
  const normalizedVpa = vpa.trim();

  return Boolean(
    normalizedVpa &&
      normalizedVpa.includes('@') &&
      normalizedVpa !== UPI_PAYEE_VPA_PLACEHOLDER
  );
};

export const createUpiPaymentUrl = ({
  amount,
  payeeName,
  payeeVpa,
  transactionNote,
}: UpiPaymentParams) => {
  const params = new URLSearchParams({
    pa: payeeVpa.trim(),
    pn: payeeName.trim(),
    am: amount.trim(),
    cu: 'INR',
    tn: transactionNote.trim(),
  });

  return `${UPI_PAYMENT_SCHEME}?${params.toString()}`;
};
