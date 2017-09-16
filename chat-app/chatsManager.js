const mongoRepository = require('./mongoRepository.js');

const chatSchema = {
    from: String,
    clientId: String,
    text: String
};

const chatModel = mongoRepository.getModel('Chat', chatSchema);

const save_chat = function (chat) {
    console.log(chat);
    var data = new chatModel({
        from: chat.from,
        clientId: chat.clientId,
        text: chat.text
    });
    mongoRepository.create(data);
};

const get_history = function (callback) {
    chatModel.find(function (err, chats) {
        if (err) return console.error(err);
        console.log(chats);
        return callback(chats);
    });
};

module.exports = { saveChat: save_chat, getHistory: get_history };