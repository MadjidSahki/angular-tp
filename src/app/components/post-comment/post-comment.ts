import { Component, Input } from '@angular/core';
import { Comment } from 'models';
import { MessageParser } from 'services';

/**
 * Affiche le commentaire d'un post
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent {
    constructor(
        private parser: MessageParser
    ) { }
    @Input() comment: Comment;

    ngOnInit() {
        // détermine le bon type de contenu
        this.comment.content = this.parser.parse(this.comment);
        if (this.comment.content != null) {
            const regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg|mp4))/gmi;
            const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
            const execute = regex.exec(this.comment.message);
            const executeYoutube = youtubeRegex.exec(this.comment.message);
            if (execute) {
                let o = this.comment.message.replace(execute[0], '');
                this.comment.message = o;
            }

            if (executeYoutube) {
                let o = this.comment.message.replace(executeYoutube[0], '');
                this.comment.message = o;
            }

        }
    }
}