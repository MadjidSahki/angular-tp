import {
    Post,
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

    parse(post: Post): PostContent<any> {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);
        if (pictureMatche) {
            return new PicturePostContent(post.message);
        }

        // const videoRegex = / /gmi;  // TODO
        // const videoMatche = videoRegex.exec(post.message);
        // if(videoMatche) {
        //     return new VideoPostContent(post.message);
        // }
        // retourner une instance de VideoPostContent si match

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        const youtubeMatche = youtubeRegex.exec(post.message);
        if (youtubeMatche) {
            console.log(post.message);
            return new YoutubePostContent(youtubeMatche[2]);
        }
        // retourner une instance de YoutubePostContent si match

        return null;
    }
}
