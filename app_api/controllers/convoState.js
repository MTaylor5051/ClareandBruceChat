var mongoose = require("mongoose");
var convoStateModel = mongoose.model('ConvoState');

var sendJSONResponse = function(res, status, content){
  
    res.status(status);
    res.json(content);
};

module.exports.getConvoState = function(req, res) {
    convoStateModel.find()
      .exec(function(err, convoState) {
          var updatedConvo = {};
          
        if (convoState.length === 0) {
          sendJSONResponse(res, 404, {
            "message": "No data"
          });
          var date = new Date();
            convoStateModel.create({
                onHold: false,
                clareAvailable: false,
                clareLastOnline: date,
                bruceAvailable: false,
                bruceLastOnline: date
         });
          return;
        } else if (err) {
          sendJSONResponse(res, 404, err);
          return;
        }
        var date = new Date();
        
        var clareLastOnlineSpan = date.getTime() - convoState[0].clareLastOnline.getTime();
        var bruceLastOnlineSpan = date.getTime() - convoState[0].bruceLastOnline.getTime();

        if(clareLastOnlineSpan > 3000){
            convoState[0].clareAvailable = false;
        }

        if(bruceLastOnlineSpan > 3000){
            convoState[0].bruceAvailable = false;
        }

        if(convoState[0].bruceAvailable === false && convoState[0].clareAvailable === false){
            convoState[0].onHold = false;
        }

        updatedConvo = convoState[0];

       updatedConvo.save(function(err, updatedConvo) {
           if(err){
           console.log(err)
           }
       });

        sendJSONResponse(res, 200, convoState);
      });
}

module.exports.updateConvoState = function(req, res){

    convoStateModel.findById(req.body._id)
    .exec(
      function(err, convoState) {
          
        if (!convoState) {
          sendJSONResponse(res, 404, {
            "message": "ConvoState not found."
          });
          return;
        } else if (err) {
          sendJSONResponse(res, 400, err);
          return;
        }

        var date = new Date();

        if(req.body.onHold !== undefined){
             convoState.onHold = req.body.onHold;
        }
        
        if(req.body.clareAvailable === true){
           convoState.clareAvailable = req.body.clareAvailable;
           convoState.clareLastOnline = date;
        }

        if(req.body.bruceAvailable === true){
            convoState.bruceAvailable = req.body.bruceAvailable;
            convoState.bruceLastOnline = date;
        }

        convoState.save(function(err, convoState) {
          if (err) {
            sendJSONResponse(res, 404, err);
          } else {
           sendJSONResponse(res, 201, {"success": true});
          }
        });
      });
}