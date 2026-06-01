const getdb = require("../utils/database").getdb;



class Otpdata {

    idata(name, email) {
        let db = getdb();
        let fdata = db.collection("otpsignup").find({ Email: email }).toArray().then((success) => {
            console.log(success);
            if (success.length === 0) {
                let iuser = db.collection("otpsignup").insertOne({ Name: name, Email: email }).then((success) => {
                    console.log(success)
                    return success
                }).catch((error) => {
                    console.log(error)
                    return error
                })
                return iuser
            } else {
                return { status: "Existed" }
            };

        }).catch((error) => {
            console.log(error)
        });


        return fdata;
    }

    fgendata(name, email) {


        let db = getdb();

        let data = db.collection("otpsignup").findOne({ $and: [{ Name: name }, { Email: email }] }).then((success) => {
            console.log(success)
            return success

        }).catch((error) => {
            console.log(error)
            return error;
        })

        return data;
    }
}


exports.Optdata = Otpdata;