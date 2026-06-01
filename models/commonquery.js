
const getdb = require("../utils/database").getdb;



class Commonqueryy {

    bsdata() {
        let db = getdb();

        let data = db.collection("seatbookdata").find({}).toArray().then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })

        return data
    }

}


exports.Commonqueryy = Commonqueryy;