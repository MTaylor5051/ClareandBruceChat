var mongoose = require("mongoose");

var convoStateSchema = new mongoose.Schema({
    onHold: {type: Boolean },
    clareAvailable: { type: Boolean },
    clareLastOnline: { type: Date, "default": Date.now },
    bruceAvailable: { type: Boolean },
    bruceLastOnline: { type: Date, "default": Date.now }
});


mongoose.model('ConvoState', convoStateSchema);