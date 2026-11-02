var logger = require("./Logger");

const BASE_URL = "https://api.tenrai.org/v1"
const MIN_INTERVAL_MS = 400;

class TenariClient{
    constructor(){
        this.cache = new Map();
        this.requestCount = 0;
        this.lastRequestAt = 0;
        logger.log("TenraiClient created");
    }
    async get(path){
        if (this.cache.has(path)){
            logger.log(`cache hit: ${path}`);
            return this.cache.get(path);
        }
        const wait = this.lastRequestAt + MIN_INTERVAL_MS - Date.now();
        if(wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
        this.lastRequestAt = Date.now();

        this.requestCount++;
        logger.log(`GET ${BASE_URL}${path}`);

        const res = await fetch(`${BASE_URL}${path}`);
        if(!res.ok){
            throw new Error(`Tenrai API error ${res.status} for ${path}`);
        }
        const { data } = await res.json();
        this.cache.set(path, data);
        return data;
    }
}
module.exports = TenariClient;