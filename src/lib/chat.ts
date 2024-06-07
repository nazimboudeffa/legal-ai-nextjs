import { OpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { RetrievalQAChain, loadQAMapReduceChain } from "langchain/chains";

export async function promptChatGPT( apiKey : string, prompt: string, document: string) {

  const model = new OpenAI({
    model: "gpt-3.5-turbo-instruct", // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
    temperature: 0.9,
    apiKey: apiKey, // In Node.js defaults to process.env.OPENAI_API_KEY
  });
  
  const VECTOR_STORE_PATH = "./src/documents/"+document+"-data-index";

  console.log("Parameters")
  console.log(apiKey)
  console.log(prompt)
  console.log(document)

  console.log("Loading existing vector store...");
  let vectorStore = await HNSWLib.load(
    VECTOR_STORE_PATH,
    new OpenAIEmbeddings({ openAIApiKey: apiKey })
  );

  console.log("Create a chain that uses a map reduce chain and HNSWLib vector store.")
  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQAMapReduceChain(model),
    retriever: vectorStore.asRetriever(),
  });

  console.log("Querying ...")
  const result = await chain.invoke({
    query: prompt,
  });

  console.log(result);
    
  return result

  }