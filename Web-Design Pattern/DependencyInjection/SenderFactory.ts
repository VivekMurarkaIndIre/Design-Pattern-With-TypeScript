import { ISender } from "./ISender";
import { EmailSender } from "./EmailSender";
import { SmsSender } from "./SmsSender";

export class SenderFactory {
    static createSender(type: string): ISender {
        switch (type) {
            case "email":
                return new EmailSender();
            case "sms":
                return new SmsSender();
            default:
                throw new Error("Invalid sender type");
        }
    }
}