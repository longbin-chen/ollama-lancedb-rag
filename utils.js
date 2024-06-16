const { pipeline } = await import('@xenova/transformers')
const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

const embed_fun = {}
embed_fun.sourceColumn = 'content'
embed_fun.embed = async function (batch) {
    let result = []
    for (let text of batch) {
        const res = await pipe(text, { pooling: 'mean', normalize: true })
        result.push(Array.from(res['data']))
    }
    return (result)
}

export default embed_fun; // Use this line to export the object with ESM syntax
