var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema ({
    // associated article to attach note to
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    // users note text as a string
    date: String,
    noteText: String
    
});

var Note = mongoose.model("Note", noteSchema)

module.exports= Note; 