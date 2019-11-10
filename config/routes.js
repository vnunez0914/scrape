
// requires scrape function
var scrape = require("../scripts/scrape");

// requires headline and notes controllers
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");



// routes to render the homepage and saved handlebars page
module.exports = function(router){
    router.get('/', function(req, res){
        res.render("home");
    });
    router.get("/saved", function(req, res){
        res.render("saved");
    });

    router.get("/api/fetch", function(req, res){
        headlinesController.fetch(function(err, docs){
            if(!docs || docs.insertedCount === 0){
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            }
            else {
                res.json({
                    message: "Added" + docs.insertedCount + " new articles!"
                })
            }
        })
    })

    router.get("/api/headlines", function(req, res){
        var query = {};
        if (req.query.saved){
            query = req.query;
        }

        headlinesController.get(query, function(data){
            res.json(data);
        })
    })
    // route to delete a specific article. 
    router.delete("/api/headlines/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function(err, data){
            res.json(data);
        })
    })
    // updates headline. runs controller function
    router.patch("/api/headlines", function(req, res){
        headlinesController.update(req.body, function(err, data){
            res.json(data);
        })
    })
    // handles grabbing notes to display to user
    router.get("/api/notes/:headline_id?", function(req, res){
        var query = {};
        // if params set by user is true, query id is equal to the params they set
        if(req.params.headline_id){
            query._id = req.params.headline_id;
        }

        notesController.get(query, function(err, data){
            res.json(data);
        })
    })
    // runs delete on users choice
    router.delete("/api/notes/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        })
    })
    // route to post new articles
    router.post("/api/notes", function(req, res){
        notesController.save(req.body, function(data){
            res.json(data)
        })
    })


}