import { PaymentInterface, ErrorLog, PaymentDetail, PaymentCurrencyAmount } from "./PaymentInterface";

export class Paypal implements PaymentInterface {
    makePayment(amount: PaymentCurrencyAmount): ErrorLog | PaymentDetail {
        try {
            // Do something
            return { transactionId: "txn_paypal_123", message: "Payment successful" };
        } catch {
            return { errorCode: 500, errorMessage: "PayPal payment failed", errorType: "NetworkError" };
        }
    }
}