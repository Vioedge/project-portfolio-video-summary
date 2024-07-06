import { loadYoutubeTranscript } from '../utils/youtubeLoader'
import { summarizeContent } from '../utils/summarize'

export default async function handler(req, res) {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Youtube URL is required' });
    }
    try {
        const docs = await loadYoutubeTranscript(url);
        const summary = await summarizeContent(docs);

        return res.status(200).json({ summary });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}