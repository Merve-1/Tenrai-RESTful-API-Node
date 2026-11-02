var logger = require("./Logger");
var TenraiClient = require("./TenraiClient");
var Anime = require("./Anime");
var Manga = require("./Manga");

var client = new TenraiClient();

async function main(){
    logger.log("Starting app...");
    var cowboyBebop = await Anime.fetchById(1);
    var berserk = await Manga.fetchById(2);

    await client.get("/anime/1");

    logger.log("Finished setup");

    console.log(`${logger.count} total logs`);
    logger.logs.map((log) => console.log(`${log.message}`));

    console.log(`index.js client request count: ${client.requestCount}`);

}

main().catch((err) => {
    console.error(err.message);
    process.exit(1);
});