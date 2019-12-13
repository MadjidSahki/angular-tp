import { Injectable } from '@angular/core';
import { Notification, Channel, NotificationType, User, Post, Like, Comment } from 'models';
import { PostSocketService } from 'services';

@Injectable()
export class NotificationService {
    private socketService: PostSocketService
    private notificationType = NotificationType;
    constructor(
        postSocketService: PostSocketService,
    ) { 
        this.socketService = postSocketService;
    }

    onNewChannel(callback: (notification: Notification) => void) {
        this.socketService.onNewChannel((channel: Channel) => {
            let resp = new Notification();
            resp = {
                type : this.notificationType.NewChannel,
                data: channel,
                datetime: new Date()
            };
            callback(resp);
        });
    }

    onUserConnect(callback: (notification: Notification) => void) {
        this.socketService.onUserConnect((user: User) => {
            let resp = new Notification();
            resp = {
                type : this.notificationType.UserConnect,
                user: user,
                data: user,
                datetime: new Date()
            };
            callback(resp);
        });
    }

    onPost(callback: (notification: Notification) => void) {
        this.socketService.onPost((post: Post) => {
            let resp = new Notification();
            resp = {
                type : this.notificationType.Post,
                user: post.user,
                data: post,
                datetime: new Date()
            };
            callback(resp);
        });
    }

    onLike(callback: (notification: Notification) => void) {
        this.socketService.onLike((like: Like) => {
            let resp = new Notification();
            resp = {
                type : this.notificationType.Like,
                user: like.user,
                data: like,
                datetime: new Date()
            };
            callback(resp);
        });
    }

    onComment(callback: (notification: Notification) => void) {
        this.socketService.onComment((comment: Comment) => {
            let resp = new Notification();
            resp = {
                type : this.notificationType.Like,
                user: comment.user,
                data: comment,
                datetime: new Date()
            };
            callback(resp);
        });
    }

    
    
    
}