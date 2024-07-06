import { Replicate } from 'langchain_community/llms';
import { load_summarize_chain, RecursiveCharacterTextSplitter } from 'langchain'

export const summarizeContent = async (docs) => {
    const llm = new Replicate({
        model: 'meta/meta-llama-3-70b-instruct',
        model_kwargs: { temperature: 0.0, top_p: 1, max_new_tokens: 1000 },
    });

    const textSplitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder({
       chunk_size: 1000,
       chunk_overlap: 0, 
    });

    const splitDocs = textSplitter.split_documents(docs);

    const chain =  load_summarize_chain(llm, { chain_type: 'map_reduce' });
    const summary = await chain.run(splitDocs);
    return summary;
};