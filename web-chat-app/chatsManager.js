const mongoose = require('mongoose');
mongoose.connect("mongodb://coder2xx:Swami4566@cluster0-shard-00-00-xi1wy.mongodb.net:27017,cluster0-shard-00-01-xi1wy.mongodb.net:27017,cluster0-shard-00-02-xi1wy.mongodb.net:27017/akshay?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");

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
