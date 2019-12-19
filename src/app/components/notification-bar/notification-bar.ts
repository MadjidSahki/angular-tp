import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { NotificationService } from 'src/app/services/NotificationsService';
import { NotificationModel, NotificationType } from 'models';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit, AfterViewInit {
    private notifications: NotificationModel[] = [];
    private notificationType = NotificationType;
    private isVisible: boolean;

    constructor(
        private notificationService: NotificationService,
        private popupService: NzNotificationService
    ) { }

    ngOnInit() {
        this.notificationService.onNewChannel((notif: NotificationModel) => {
            if (notif && this.notifications.includes(notif) === false) {
                this.notifications.push(notif);
                this.addInLocalStorage(JSON.stringify(this.notifications));
                this.computeNotifDisplay(notif);
                this.createPushNotification(notif);
            }
        });

        this.notificationService.onLike((notif: NotificationModel) => {
            if (notif && this.notifications.includes(notif) === false) {
                this.notifications.push(notif);
                this.addInLocalStorage(JSON.stringify(this.notifications));
                this.computeNotifDisplay(notif);
                this.createPushNotification(notif);
            }
        });

        this.notificationService.onComment((notif: NotificationModel) => {
            if (notif && this.notifications.includes(notif) === false) {
                this.notifications.push(notif);
                this.addInLocalStorage(JSON.stringify(this.notifications));
                this.computeNotifDisplay(notif);
                this.createPushNotification(notif);
            }
        });

        this.notificationService.onPost((notif: NotificationModel) => {
            if (notif && this.notifications.includes(notif) === false) {
                this.notifications.push(notif);
                this.addInLocalStorage(JSON.stringify(this.notifications));
                this.computeNotifDisplay(notif);
                this.createPushNotification(notif);
            }
        });

        this.notificationService.onUserConnect((notif: NotificationModel) => {
            if (notif && this.notifications.includes(notif) === false) {
                this.notifications.push(notif);
                this.addInLocalStorage(JSON.stringify(this.notifications));
                this.computeNotifDisplay(notif);
                this.createPushNotification(notif);
            }
        });

        let notifs: NotificationModel[] = JSON.parse(this.getInLocalStorage());
        notifs.forEach((notif) => {
            this.notifications.push(notif);
        });
    }

    ngAfterViewInit(): void {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission(function (status) {
            });
        }
    }

    @HostListener('document:visibilitychange', ['$event'])
    visibilitychange() {
        if (document.hidden) {
            this.isVisible = document.hidden ? false : true;
        }
    }

    createPushNotification(notificationModel: NotificationModel) {
        if (this.isVisible === false) {
            if (Notification.permission === 'granted') {
                var notification = new Notification("New notification !", {
                    body: this.computeNotifStringDiplay(notificationModel),
                    icon: 'http://i.stack.imgur.com/Jzjhz.png?s=48&g=1',
                    dir: 'auto'
                });
                setTimeout(function () {
                    notification.close();
                }, 4000);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (status) {
                });
            }
        }
    }



    getInLocalStorage() {
        return localStorage.getItem('notifications');
    }

    addInLocalStorage(value: string) {
        localStorage.setItem('notifications', value);
    }

    computeNotifDisplay(notif: NotificationModel) {
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
            case this.notificationType.Like:
                this.popupService.blank(
                    `User ${notif.user.username} liked a post`,
                    `User ${notif.user.username} liked post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            case this.notificationType.NewChannel:
                this.popupService.blank(
                    `A channel named ${notif.data.name} was created`,
                    `A channel named ${notif.data.name} was created at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            case this.notificationType.Post:
                this.popupService.blank(
                    `User ${notif.user.username} posted a message`,
                    `User ${notif.user.username} posted "${notif.data.message}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
                );
                break;
            default:
                break;
        }
    }

    computeNotifStringDiplay(notif: NotificationModel) {
        switch (notif.type) {
            case this.notificationType.UserConnect:
                return `User ${notif.user.username} connected at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`;
            case this.notificationType.Comment:
                return `User ${notif.user.username} commented ${notif.data.message} on post number "${notif.data.post.id}" at ${notif.datetime.toLocaleString("en-US", { hour12: false })}`
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
