var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);
app.use(express.static(__dirname + "/public"));
 
//connection express handlaebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// logs in request
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

//deployed db or local db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connecting mongoose to db
mongoose.connect(db, function(error){
    if(error) {
        console.log(error);
    }
    else{
        console.log("mongoose connected successfully");
    }
});

// listening to port
app.listen(PORT, function(){
    console.log("listening on PORT: " + PORT);
});