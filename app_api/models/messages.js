var mongoose = require("mongoose");

var messagesSchema = new mongoose.Schema({
    name: {type: String },
    message: { type: String },
    date: { type: Date, "default": Date.now }
});

mongoose.model('Messages', messagesSchema);