import {Request, Response} from 'express';
import { NotificationController } from './NotificationController';

export function createRoute(notificationController: NotificationController) {
    return (req: Request, res: Response) => {
        const { to, message } = req.body;
        notificationController.sendNotification(to, message)
            .then(() => res.status(200).json({ message: "Notification sent" }))
            .catch((error) => res.status(500).json({ message: "Failed to send notification", error }));
    };
}