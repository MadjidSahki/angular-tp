import { Component, Input, Pipe, ChangeDetectionStrategy } from '@angular/core';
import { PostContent, YoutubePostContent } from 'models';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    templateUrl: 'youtube-post-content.html',
    selector: 'youtube-post-content',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeFeedContentComponent {
    @Input() postContent: YoutubePostContent;
    constructor(
        private sanitizer: DomSanitizer
    ) { }

    get url() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.postContent.value.videoId);
    }
}
