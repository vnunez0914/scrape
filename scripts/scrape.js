var request = require("request")
var cheerio = require("cheerio")

var scrape = function (cb) {
    request("http://www.nytimes.com", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];
        // selects all row-item comic-item class
        $(".theme-summary").each(function(i, element){
            // grabs children from row-item, removes extra space
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

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