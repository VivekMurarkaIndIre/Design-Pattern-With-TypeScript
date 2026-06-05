import { PaymentInterface, PaymentCurrencyAmount } from "./PaymentInterface";
import { PaymentFactory } from "./PaymentFactory";

function main() {
    const amount: PaymentCurrencyAmount = {
        currency: "Euro",
        value: 100,
    };

    const paymentService: PaymentInterface = PaymentFactory.create("Paypal");

    paymentService.makePayment(amount);
}

main();