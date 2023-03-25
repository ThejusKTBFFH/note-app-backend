const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    notetitle:{type: String, required: true, unique: true},
    content:{type: String, required: true},
    date:{type: String},
    time:{type:String},
    userOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

});

const NoteModel = mongoose.model("notes",NoteSchema);

module.exports = NoteModel;