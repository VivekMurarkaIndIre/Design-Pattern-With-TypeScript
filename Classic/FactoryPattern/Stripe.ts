import { PaymentInterface, ErrorLog, PaymentDetail, PaymentCurrencyAmount } from "./PaymentInterface";

export class Stripe implements PaymentInterface {
    makePayment(amount: PaymentCurrencyAmount): ErrorLog | PaymentDetail {
        try {
            // Do something
            return { transactionId: "txn_stripe_123", message: "Payment successful" };
        } catch {
            return { errorCode: 500, errorMessage: "Stripe payment failed", errorType: "NetworkError" };
        }
    }
}