export default interface PaymentFee {
  paymentMethodId: number;
  currencyCode: string;
  amount: number;
  amountUsd: number;
}