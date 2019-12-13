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
        console.log(this.comment.content)
    }

}