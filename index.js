import ollama from 'ollama'
import nunjucks from 'nunjucks';
import * as lancedb from "vectordb"
import embed_fun from "./utils.js";


const db = await lancedb.connect('./rag/wine-lancedb')
const table = await db.openTable("top-rated-wines", embed_fun);
const results = await table.search("sweet and taste like vanilla")
                .metricType("cosine")
                .limit(10)
                .execute();

console.log("Printing docs after similarity search --> ", 
    results.map(r => {
            const { vector, ...rest } = r;
            return rest;
    })
);


// Configure Nunjucks to use the current directory for templates

nunjucks.configure('./prompt', {
    autoescape: true
});
const data = {
    results: results
}

const prompt_with_rag = nunjucks.render('wine_summary.txt', data);
console.log(prompt_with_rag);

const response = await ollama.chat({
    model: 'llama3',
    messages: [{ role: 'user', content: prompt_with_rag }],
  })
console.log(response.message.content)