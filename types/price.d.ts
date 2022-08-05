export default interface Price {
  totalAmount: number;
  totalAmountUsd: number;
  amount: number;
  amountUsd: number;
  originalAmount: number;
  originalAmountUsd: number;
  amountPerAdult: number;
  amountPerChild: number;
  amountPerInfant: number;
  taxAmount: number;
  taxAmountUsd: number;
  totalTaxAmount: number;
  totalTaxAmountUsd: number;
  currencyCode: string;
  paymentFeeAmountUsd: number;
  bookingFee: number;
  bookingFeeUsd: number;
  totalBookingFee: number;
  totalBookingFeeUsd: number;
}
