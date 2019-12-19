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
        if (this.post.content != null) {
            const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg|mp4))/gmi;
            const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
            const execute = regex.exec(this.post.message);
            const executeYoutube = youtubeRegex.exec(this.post.message);
            if (execute) {
                let o = this.post.message.replace(execute[0], '');
                this.post.message = o;
            }

            if (executeYoutube) {
                let o = this.post.message.replace(executeYoutube[0], '');
                this.post.message = o;
            }

        }

        this.postSocket.onLike((like) => {
            if(like.post.id !== this.user.id) {
            }      
        });
    }

    async onComment(message: string) {
        let comment = await this.postService.comment(this.post, message);
        this.post.comments.push(comment);
        this.postSocket.onComment((comment) => {
            if (comment.user.id !== this.user.id) {
                this.post.comments.push(comment);
            }
        });
    }

    async hasClicked(event) {
        // WIP
        if (this.post.liked === undefined || this.post.liked === null) {
            this.post.liked = true;
        } else {
            this.post.liked = !this.post.liked;
        }
        let like = await this.postService.like(this.post);
    }
}
