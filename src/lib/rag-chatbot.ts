import {
    GoogleGenerativeAIEmbeddings,
    ChatGoogleGenerativeAI,
  } from "@langchain/google-genai";
  import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
  import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
  import { MemoryVectorStore } from "langchain/vectorstores/memory";
  import { PromptTemplate } from "@langchain/core/prompts";
  import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
  import { StringOutputParser } from "@langchain/core/output_parsers";
  import path from "path";
  
  const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    temperature: 0.2,
  });
  
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "models/embedding-001",
  });
  
  const pdfPath = path.join(process.cwd(), "src", "documents", "data-hukum-ketenagakerjaan.pdf");
  
  let retriever: any;
  
  async function initializeRetriever() {
    if (retriever) {
      return;
    }
  
    console.log("Memuat dokumen dari:", pdfPath);
    const loader = new PDFLoader(pdfPath);
    const documents = await loader.load();
  
    if (documents.length === 0) {
      throw new Error("Dokumen PDF tidak berhasil dimuat atau kosong.");
    }
  
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1500,
      chunkOverlap: 150,
    });
    const chunks = await textSplitter.splitDocuments(documents);
    console.log(`Dokumen berhasil dipecah menjadi ${chunks.length} bagian.`);
  
    console.log("Membuat MemoryVectorStore...");
    const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);
    
    retriever = vectorStore.asRetriever({ k: 5 });
    console.log("Inisialisasi Retriever selesai.");
  }
  
  export async function processQuery(query: string) {
    await initializeRetriever();
  
    const template = `
      Anda adalah asisten AI ahli hukum ketenagakerjaan Indonesia. Gunakan hanya informasi dari konteks yang diberikan untuk menjawab pertanyaan.
      Jika informasi tidak ada, jawab "Maaf, saya tidak dapat menemukan informasi mengenai hal tersebut dalam dokumen yang saya miliki.".
      Konteks: {context}
      Pertanyaan: {question}
      Jawaban Akurat:
      `;
      
    const PROMPT = PromptTemplate.fromTemplate(template);
  
    const formatDocs = (docs: any[]) => docs.map(doc => doc.pageContent).join("\n\n");
  
    const ragChain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocs),
        question: new RunnablePassthrough(),
      },
      PROMPT,
      llm,
      new StringOutputParser(),
    ]);
  
    const result = await ragChain.invoke(query);
    const relevantDocs = await retriever.getRelevantDocuments(query);
    const sources = relevantDocs.map((doc: any) => 
      doc.metadata.source ? path.basename(doc.metadata.source) : 'Dokumen PDF yang diunggah'
    );
    const uniqueSources = [...new Set(sources)];
  
    return {
      answer: result,
      sources: uniqueSources,
    };
  }