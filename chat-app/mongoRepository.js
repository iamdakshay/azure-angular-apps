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

const mGetModel = (modelTitle, modelInfo) => {
    const modelSchema = new schema(modelInfo);
    return mongoose.model(modelTitle, modelSchema);
};

const mCreate = function (document) {
    document.save(function (err, fluffy) {
        if (err) {
            return console.error(err);
        }
    });
};

const mUpdate = function () {
    var history = new chatHistory({ from: fromUser, message: chatMessage });
    history.save(function (err, fluffy) {
        if (err) return console.error(err);
    });
};

const mDelete = function () {
    var history = new chatHistory({ from: fromUser, message: chatMessage });
    history.save(function (err, fluffy) {
        if (err) return console.error(err);
    });
};

const mRead = function () {
    var history = new chatHistory({ from: fromUser, message: chatMessage });
    history.save(function (err, fluffy) {
        if (err) return console.error(err);
    });
};

module.exports = {
    getModel: mGetModel,
    create: mCreate,
    read: mRead,
    update: mUpdate,
    delete: mDelete
};