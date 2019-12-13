import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/NotificationsService';
import { Notification, NotificationType } from 'models';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    private notifications: Notification[] = [];
    private notificationType = NotificationType;

    constructor(
        private notificationService: NotificationService,
         private popupService: NzNotificationService
         ) { }

    ngOnInit() {
        this.notificationService.onNewChannel((notif: Notification) => {
            if(notif && this.notifications.includes(notif) === false) {
            this.notifications.push(notif);
            this.computeNotifDisplay(notif);
            }
        });

        this.notificationService.onLike((notif: Notification) => {
            if(notif && this.notifications.includes(notif) === false) {
            this.notifications.push(notif);
            this.computeNotifDisplay(notif);
            }
        });

        this.notificationService.onComment((notif: Notification) => {
            if(notif && this.notifications.includes(notif) === false) {
            this.notifications.push(notif);
            this.computeNotifDisplay(notif);
            }
        });

        this.notificationService.onPost((notif: Notification) => {
            if(notif && this.notifications.includes(notif) === false) {
            this.notifications.push(notif);
            this.computeNotifDisplay(notif);
            }
        });

        this.notificationService.onUserConnect((notif: Notification) => {
            if(notif && this.notifications.includes(notif) === false) {
            this.notifications.push(notif);
            this.computeNotifDisplay(notif);
            }
        });
    }

    computeNotifDisplay(notif: Notification) {
        switch (notif.type) {
            case this.notificationType.UserConnect:
                this.popupService.blank(
                    `User ${notif.user.username} connected`,
                    `User ${notif.user.username} connected at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            case this.notificationType.Comment:
                this.popupService.blank(
                    `User ${notif.user.username} commented a post`,
                    `User ${notif.user.username} commented ${notif.data.message} on post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
                // return `User ${notif.user.username} commented ${notif.data.message} on post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
            case this.notificationType.Like:
                    this.popupService.blank(
                        `User ${notif.user.username} liked a post`,
                        `User ${notif.user.username} liked post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                    );
                    break;
                    // return `User ${notif.user.username} liked post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.NewChannel:
                    this.popupService.blank(
                        `A channel named ${notif.data.name} was created`,
                        `A channel named ${notif.data.name} was created at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                    );
                    break;
                // return `A channel named ${notif.data.name} was created at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.Post:
                    this.popupService.blank(
                        `User ${notif.user.username} posted a message`,
                        `User ${notif.user.username} posted "${notif.data.message}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                    );
                    break;
                // return `User ${notif.user.username} posted "${notif.data.message}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            default:
                break;
        }
    }
}
