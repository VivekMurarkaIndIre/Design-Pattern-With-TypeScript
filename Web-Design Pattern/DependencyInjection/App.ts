import express from 'express';
import { INotificationService } from './INotificationService';
import { NotificationController } from './NotificationController';
import { createRoute } from './router';
import { SenderFactory } from './SenderFactory';

const app = express();
app.use(express.json());

const sender = SenderFactory.createSender("email"); // or "sms"
const notificationService: INotificationService = {
    notify: (to: string, message: string) => sender.send(to, message)
};

const notificationController = new NotificationController(notificationService);
app.use("/posts", createRoute(notificationController));

app.listen(3000, () => console.log("Running on http://localhost:3000"));