import Price from "./price.d";
import PaymentFee from "./payment-fee";

export default interface Fare {
  id: string;
  price: Price;
  providerCode: string;
  handoffUrl: string;
  ecpc: number;
  paymentFees: PaymentFee[];
  remainingSeatsCount: number;
  conditionIds: string[];
  legConditionIds: string[];
  refundable: boolean;
  exchangeable: boolean;
  tags: string[];
  tripId: string;
}
