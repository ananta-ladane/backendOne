const getdb = require("../utils/database").getdb;


class Fileope {

    idata(file) {
        let db = getdb();

        let data = db.collection("uploadfiles").insertOne({ File: file }).then((success) => {
            console.log(success);
            return success
        }).catch((error) => {
            return error
        })

        return data;
    }
}


exports.Fileope = Fileope;