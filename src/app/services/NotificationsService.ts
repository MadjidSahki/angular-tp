import { Injectable } from '@angular/core';
import { NotificationModel, Channel, NotificationType, User, Post, Like, Comment } from 'models';
import { PostSocketService } from './PostSocketService';
import { AuthenticationService } from './AuthenticationService';

@Injectable()
export class NotificationService {
    private socketService: PostSocketService
    private authService: AuthenticationService;
    private notificationType = NotificationType;

    constructor(
        postSocketService: PostSocketService,
        authenticationService: AuthenticationService
    ) {
        this.socketService = postSocketService;
        this.authService = authenticationService;
    }

    onNewChannel(callback: (notification: NotificationModel) => void) {
        this.socketService.onNewChannel((channel: Channel) => {
            let resp = new NotificationModel();
            resp = {
                type: this.notificationType.NewChannel,
                data: channel,
                datetime: new Date()
            };
            callback(resp);
        });
    }

    onUserConnect(callback: (notification: NotificationModel) => void) {
        this.socketService.onUserConnect((user: User) => {
            if (user.id !== this.authService.user.id) {
                let resp = new NotificationModel();
                resp = {
                    type: this.notificationType.UserConnect,
                    user: user,
                    data: user,
                    datetime: new Date()
                };
                callback(resp);
            }
        });
    }

    onPost(callback: (notification: NotificationModel) => void) {
        this.socketService.onPost((post: Post) => {
            if (post.user.id !== this.authService.user.id) {
                let resp = new NotificationModel();
                resp = {
                    type: this.notificationType.Post,
                    user: post.user,
                    data: post,
                    datetime: new Date()
                };
                callback(resp);
            }
        });
    }

    onLike(callback: (notification: NotificationModel) => void) {
        this.socketService.onLike((like: Like) => {
            if (like.user.id !== this.authService.user.id) {
                let resp = new NotificationModel();
                resp = {
                    type: this.notificationType.Like,
                    user: like.user,
                    data: like,
                    datetime: new Date()
                };
                callback(resp);
            }
        });
    }

    onComment(callback: (notification: NotificationModel) => void) {
        this.socketService.onComment((comment: Comment) => {
            if (comment.user.id !== this.authService.user.id) {
                let resp = new NotificationModel();
                resp = {
                    type: this.notificationType.Comment,
                    user: comment.user,
                    data: comment,
                    datetime: new Date()
                };
                callback(resp);
            }
        });
    }




}