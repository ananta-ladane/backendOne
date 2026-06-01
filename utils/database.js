const mongooes = require("mongodb");
const MongoClient = mongooes.MongoClient;
let _db;


const mongoconnect = (callback) => {
    MongoClient.connect("mongodb+srv://anantaladane42_db_user:JoPb7WXGQc1JfLof@cluster1.oqt7375.mongodb.net/?appName=Cluster1").then((success) => {
        console.log(success);
        _db = success.db("developer");
        console.log("the database connected");
    }).catch((error) => {
        console.log(error)
    });

    callback();
}


const getdb = () => {
    if (_db) {
        return _db;
    } else {
        console.log("database not found")
    }
}



exports.mongoconnect = mongoconnect;
exports.getdb = getdb;