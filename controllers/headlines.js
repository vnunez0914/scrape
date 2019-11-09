// requires scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

var Headline = require("../models/Headline")

// updates/deleting articles 
module.exports = {
    // fetch runs scrape function and inserts to mongo collection
    fetch: function(cb){
        scrape(function(data){
            var articles = data;
            for (var i = 0; i < articles.length; i++){
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            // inserts articles to the collection. cb returns errors in docs
            Headline.collection.insertMany(articles, {ordered: false}, function(err, docs){
                cb(err, docs);
            });
        });
    },
    delete: function(query, cb){
        Headline.remove(query,cb);
    },
    // finds headlines in query and sorts from most recent to least
    get: function(query, cb){
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc){
            cb(doc);
        });
    },

    // updates articles
    update: function(query, cb) {
        Headline.update({_id:query._id},{
            $set:query
        }, {}, cb);
    }
}