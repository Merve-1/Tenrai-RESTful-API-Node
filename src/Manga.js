var logger = require("./Logger");
var TenraiClient = require("./TenraiClient");

var client = new TenraiClient();

class Manga {
    constructor(data){
        this.id = data.mal_id;
        this.title = data.title;
        this.chapters = data.chapters;
        this.score = data.score;
        logger.log(`New Manga: ${this.title} has ${this.chapters} chapters and a score of ${this.score}`);
    }
    static async fetchById(id){
        const data = await client.get(`/manga/${id}`);
        return new Manga(data);
    }
}
module.exports = Manga;