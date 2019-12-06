import { Component, Input } from '@angular/core';
import { Post } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Affiche les poste
 */
@Component({
    selector: 'post',
    templateUrl: 'post.html'
})
export class PostComponent {
    @Input() post: Post;

    constructor(
        private postSocket: PostSocketService,
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) { }

    ngOnInit() {
        // détermine le bon type de contenu
        this.post.content = this.parser.parse(this.post);
    }

    onComment(message: string) {
        this.postService.comment(this.post, message);
        this.postSocket.onComment((comment) => {
            this.post.comments.push(comment);
        });
    }

    hasClicked(event) {
        // WIP
        if (this.post.liked === undefined || this.post.liked === null) {
            this.post.liked = true;
        } else {
            this.post.liked = !this.post.liked;
        }
    }
}
