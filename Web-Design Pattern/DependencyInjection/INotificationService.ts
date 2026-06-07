
export interface INotificationService {
    notify(to:string, message:string):Promise<void>;
}   