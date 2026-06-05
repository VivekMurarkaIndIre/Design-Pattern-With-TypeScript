import { PaymentInterface } from "./PaymentInterface";
import { Stripe } from "./Stripe";
import { Paypal } from "./Paypal";

type PaymentMerchant = "Stripe" | "Paypal";

export class PaymentFactory {
    static create(type: PaymentMerchant): PaymentInterface {
        switch (type) {
            case "Stripe":
                return new Stripe();
            case "Paypal":
                return new Paypal();
        }
    }
}