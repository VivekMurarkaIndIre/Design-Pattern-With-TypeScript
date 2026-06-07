import { ISender } from "./ISender";
export class SmsSender implements ISender {

    async send(to: string, message: string): Promise<void> {
        console.log(`Sending SMS to ${to} with message: ${message}`);
    }
}