import { ISender } from "./ISender";

export class EmailSender implements ISender {
    async send(to: string, message: string): Promise<void> {
        console.log(`Sending email to ${to} with message: ${message}`);
    }
}