import * as lancedb from "vectordb"
import fs from 'fs/promises';
import pkg from 'papaparse';
const {parse} = pkg;
import embed_fun from "./utils.js";

const filePath = './rag/top_rated_wines.csv';
async function parseCSVFile(filePath) {
    let results;
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        results = parse(fileContent, { header: true });
        console.log(filePath, " is laoded successfully.");
    // Further processing of results can be done here
    } catch (err) {
        console.error('Error reading or parsing file:', err);
        // let result to be empty list
        results = [];
    }
    return results.data;
}

const data = await parseCSVFile(filePath);
console.log(data);

//Create a text splitter

//Split the text and get Document list as response
const db = await lancedb.connect('./rag/wine-lancedb')
const tableNames = await db.tableNames();

embed_fun.sourceColumn = "notes"
let table; 
if (tableNames.includes("top-rated-wines")) {
    console.log('Table already exists, using it.');
    table = await db.openTable("top-rated-wines", embed_fun);
} else {
    console.log('Creating new table.');
    table = await db.createTable('top-rated-wines', data, embed_fun)
}

// Search for the most similar document
const results = await table
                .search("vanilla and tastes like pear")
                .metricType("cosine")
                .limit(10)
                .execute();
console.log("Printing docs after similarity search --> ", 
    results.map(r => {
            const { vector, ...rest } = r;
            return rest;
    })
);
