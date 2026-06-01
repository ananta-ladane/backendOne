const { ObjectId } = require("mongodb");

const getdb = require("../utils/database").getdb;


class Seatbook {

    isdata(mid, tid, mname, seats, time, fdate, endtime, duration, tname, location, totalprice, mdatetime, email) {
        let db = getdb();

        let movieid = new ObjectId(mid);
        let theaterid = new ObjectId(tid);

        let data = db.collection("seatbookdata").insertOne({ movieid: movieid, theaterid: theaterid, moviename: mname, seats: seats, time: time, sbook: fdate, endtime: endtime, duration: duration, theatername: tname, location: location, totalprice: totalprice, status: "0", tmdatetime: mdatetime, useremail: email }).then((success) => {
            console.log(success)
            console.log("this the model console.log")
            return success
        }).catch((error) => {
            console.log(error)
            return error
        })

        return data;
    }

    fusdata(bsid) {
        let db = getdb();
        console.log("this in model find _id")
        let id = new ObjectId(bsid)
        console.log(id)

        let data = db.collection("seatbookdata").findOne({ _id: id }).then((success) => {
            console.log(success);
            console.log("find model data")
            return success
        }).catch((error) => {
            console.log(error);
            return error
        })

        return data;
    }

    upayment(id) {
        let db = getdb();
        let result = db.collection("seatbookdata").updateOne({ _id: new ObjectId(id) }, { $set: { status: "1" } }).then((success) => {
            console.log(success);
            if (success.modifiedCount > 0) {
                let fdata = db.collection("seatbookdata").findOne({ _id: new ObjectId(id) }).then((success) => {
                    console.log(success);
                    return success;
                }).catch((error) => {
                    console.log(error);
                    return error;
                })

                return fdata;
            } else {
                console.log("payment failed");
                return { message: "payment failed" };
            }

            // return success;
        }).catch((error) => {
            console.log(error);
            return error;
        });
        return result;
    }

    // userdata(hh) {
    //     let db = getdb();

    //     let data = db.collection("signup").findOne({ _id: hh }).then((success) => {
    //         console.log(success);
    //         return success;
    //     }).catch((error) => {
    //         console.log(error);
    //         return error;
    //     })
    //     return data;
    // }

    tikectdata(id) {
        let db = getdb();

        let data = db.collection("seatbookdata").findOne({ _id: new ObjectId(id) }).then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })

        return data;
    }
}

exports.Seatbook = Seatbook;