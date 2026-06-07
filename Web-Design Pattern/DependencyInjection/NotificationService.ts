import { ISender } from "./ISender";
import { INotificationService } from "./INotificationService";

export class NotificationService implements INotificationService {
    private sender: ISender;

    constructor(sender: ISender) {
        this.sender = sender;
    }

    async notify(to: string, message: string): Promise<void> {
        await this.sender.send(to, message);
    }
}
