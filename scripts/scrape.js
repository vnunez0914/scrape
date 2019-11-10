var request = require("request")
var cheerio = require("cheerio")

var scrape = function (cb) {
    request("https://www.t-nation.com/diet-fat-loss", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];
        
        $(".articleSearchPage").each(function(i, element){
   
            var head = $(this).children("<h2>").text().trim();
            var sum = $(this).children(".teaser").text().trim();

            if(head && sum){
                // regex cleans up text with white space
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                    // assigns it to model to create the article
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd)
            }
        })
        cb(articles)
    })
}

module.exports = scrape