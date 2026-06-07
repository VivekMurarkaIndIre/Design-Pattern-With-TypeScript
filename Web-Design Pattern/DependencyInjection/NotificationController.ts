import { INotificationService } from "./INotificationService";
export class NotificationController {
    
    constructor(private notificationService: INotificationService){}

    async sendNotification(to:string, message:string):Promise<void>{
        await this.notificationService.notify(to, message);
    }
}