## ollama-rag-demo

### Overview

Welcome to the ollama-lancedb-rag app! This application serves as a demonstration of the integration of lancedb and Ollama to create a RAG ssystem. 

> Features

    RAG-Powered QA: Implement Retrieval Augmented Generation techniques to enhance language models with additional, up-to-date data for accurate and context-aware responses.

    Dynamic Prompt Templates: Utilize prompt templates to structure user questions, providing context for the language model and improving the quality of generated responses.

### Setup

Install Dependencies:

```
npm install
```

##### Configure ollama:

```


##### Run the Application:

Run load-data.js and push embeddings to vector store

```
node load-data.js

```

Run index.js and see AI responses

```
node index.js
```

