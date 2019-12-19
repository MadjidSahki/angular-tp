import {
    Post,
    Comment,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';

const youtube = "https://youtu.be/";

/**
 * Parse le contenu d'un post pour en extraire le texte, les images, les vidéos et les liens Youtube.
 */
export class MessageParser {

    parse(post: Post): PostContent<any>[] {
        const pictureRegex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/gmi;
        const videoRegex = /(http)?s?:?(\/\/[^"']*\.(?:mp4))/gmi;
        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;

        let messages = post.message.split(' ');
        let content = []
        for (let i = 0; i < messages.length; i++) {
            const pictureMatche = pictureRegex.exec(messages[i]);
            const videoMatche = videoRegex.exec(messages[i]);
            const youtubeMatche = youtubeRegex.exec(messages[i]);

            
            if (pictureMatche) {
                content.push(new PicturePostContent(pictureMatche[0]));
            }
            if (videoMatche) {
                content.push(new VideoPostContent(videoMatche[0]));
            }
            if (youtubeMatche) {
                content.push(new YoutubePostContent(youtubeMatche[2]));
            }
        }

        if (content.length === 0) {
            return null;
        } else {
            return content;
        }

        // retourner une instance de VideoPostContent si match
        // retourner une instance de YoutubePostContent si match

    }
}
