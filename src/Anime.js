var logger = require("./Logger");
var TenraiClient = require("./TenraiClient");
var client = new TenraiClient();

class Anime {
    constructor (data){
        this.id = data.mal_id;
        this.title = data.title;
        this.episodes = data.episodes;
        this.score = data.score;
        logger.log(`New Anime: ${this.title} has ${this.episodes} episodes and a score of ${this.score}`);
    }
    static async fetchById(id){
        const data = await client.get(`/anime/${id}`);
        return new Anime(data);
    }   
}

module.exports = Anime;