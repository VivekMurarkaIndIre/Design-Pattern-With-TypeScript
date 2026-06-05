
export type PaymentCurrencyAmount = {
    currency: string
    value: number
}

export type ErrorLog = {
    errorCode: number
    errorMessage: string
    errorType: "NetworkError" | "InsufficientFund" | "FraudDetection"
}

export type PaymentDetail = {
    transactionId: string
    message: string
}

export interface PaymentInterface {
    makePayment(amount: PaymentCurrencyAmount): ErrorLog | PaymentDetail
}