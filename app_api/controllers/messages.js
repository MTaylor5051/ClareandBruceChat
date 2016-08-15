var mongoose = require("mongoose");
var messagesModel = mongoose.model('Messages');

var sendJSONResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.getMessages = function(req, res){

 messagesModel.find().limit(4).sort('-date')
      .exec(function(err, messages) {
          
        if (messages.length === 0) {
          sendJSONResponse(res, 404, {
            "message": "No data"
          });
          return;
        } else if (err) {
          sendJSONResponse(res, 404, err);
          return;
        }

        sendJSONResponse(res, 200, messages);
      });
}

module.exports.postMessages = function(req, res){
        messagesModel.create({
            name: req.body.name,
            message: req.body.message
         }, function(err) {
           if (err) {
             console.log(err);
             sendJSONresponse(res, 400, err);
           } else {
            sendJSONResponse(res, 201, {"success": true});
           }
          });
}