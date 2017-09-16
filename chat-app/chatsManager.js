const mongoose = require('mongoose');
mongoose.connect("mongodb://coder2xx:<password>@cluster4-shard-00-00-i2q0s.mongodb.net:27017,cluster4-shard-00-01-i2q0s.mongodb.net:27017,cluster4-shard-00-02-i2q0s.mongodb.net:27017/Akshay?ssl=true&replicaSet=Cluster4-shard-0&authSource=admin");

const db = mongoose.connection;
db.on('error', () => {
    console.error('Connection error for MONGODB...');
});
db.once('open', () => {
    console.log("Connected to MONGODB successfully...");
});

const schema = mongoose.Schema;

const chatSchema = {
    from: String,
    clientId: String,
    text: String
};

const chatModel = mongoose.model('Chat', new schema(chatSchema));

const save_chat = function (chat) {
    console.log(chat);
    var data = new chatModel({
        from: chat.from,
        clientId: chat.clientId,
        text: chat.text
    });
    data.save(function (err, fluffy) {
        if (err) {
            return console.error(err);
        }
    });
};

const get_history = function (callback) {
    chatModel.find(function (err, chats) {
        if (err) return console.error(err);
        console.log(chats);
        return callback(chats);
    });
};

module.exports = { saveChat: save_chat, getHistory: get_history };