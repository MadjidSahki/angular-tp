import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/NotificationsService';
import { Notification, NotificationType } from 'models';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    private notifications: Notification[] = [];
    private notificationType = NotificationType;

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notificationService.onNewChannel((notif: Notification) => {
            console.log(notif);
            this.notifications.push(notif);
        });

        this.notificationService.onLike((notif: Notification) => {
            console.log(notif);
            this.notifications.push(notif);
        });

        this.notificationService.onComment((notif: Notification) => {
            console.log(notif);
            this.notifications.push(notif);
        });

        this.notificationService.onPost((notif: Notification) => {
            console.log(notif);
            this.notifications.push(notif);
        });

        this.notificationService.onUserConnect((notif: Notification) => {
            console.log(notif);
            this.notifications.push(notif);
        });
    }

    computeNotifDisplay(notif: Notification) {
        switch (notif.type) {
            case this.notificationType.UserConnect:
                return `User ${notif.user.username} connected at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.Comment:
                return `User ${notif.user.username} commented ${notif.data.message} on post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.Like:
                return `User ${notif.user.username} liked post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.NewChannel:
                return `A channel named ${notif.data.name} was created at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.Post:
                return `User ${notif.user.username} posted "${notif.data.message}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            default:
                break;
        }
    }
}
