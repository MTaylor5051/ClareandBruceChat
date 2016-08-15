var express = require("express");
var router = express.Router();

var ctrlConvoState = require("../controllers/convoState");
var ctrlMessages = require("../controllers/messages");

router.get('/convoState', ctrlConvoState.getConvoState);
router.put('/convoState', ctrlConvoState.updateConvoState);

router.get('/messages', ctrlMessages.getMessages);
router.post('/messages', ctrlMessages.postMessages);

module.exports = router;