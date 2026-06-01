const getdb = require("../utils/database").getdb;

class SignupModel {

    insertData(username, email, password) {
        let db = getdb();
        let qres = db.collection("signup").find({ username: username, email: email, password: password }).toArray().then((success) => {
            if (success.length === 0) {
                let data = db.collection("signup").insertOne({ username: username, email: email, password: password }).then((success) => {
                    console.log(success);
                    return success;

                }).catch((error) => {
                    console.log(error);
                    return error;
                })
                return data;
            } else {
                return { status: "Existed" }
            }
        }).catch((error) => {
            console.log(error)
        });

        return qres;

    }

    fData(email) {
        let db = getdb();
        let data = db.collection("signup").find({ email: email }).toArray().then((success) => {
            console.log(success);
            return success
        }).catch((error) => {
            console.log(error);
            return error
        })
        return data;
    }

    gpdata(name, email) {

        let db = getdb();

        let data = db.collection("signup").findOne({$and:[{username: name}, {email:email}]}).then((success) => {
            console.log(success)
            return success
        }).catch((error) => {
            console.log(error)
            return error
        })

        return data;
    }

    ugpass(name, email, pass) {

        let db = getdb();

        let data = db.collection("signup").updateOne({ $and: [{ username: name }, { email: email }] }, { $set: { password: pass } }).then((success) => {
            console(success)
            return success
        }).catch((error) => {
            console.log(error)
            return (error)
        })

        return data;
    }
}

module.exports = SignupModel;