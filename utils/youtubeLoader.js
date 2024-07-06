import { YoutubeLoader } from 'langchain/document_loaders';

export const loadYoutubeTranscript = async (url) => {
    const loader = YoutubeLoader.from_youtube_url(url, { add_video_info: true });
    const docs = await loader.load();
    return docs;
};