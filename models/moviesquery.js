const getdb = require("../utils/database").getdb;
const { ObjectId } = require("mongodb");
const { Aggregate } = require("mongoose");

class Moviesoperations {

    insertData(tid, image, mname, discription, reting, author, date, time, endtime, duration, price, datetime, status) {
        let db = getdb();
        let theaterid = new ObjectId(tid);
        console.log(theaterid);
        let mdata = db.collection("moviedata").insertOne({ tid: theaterid, Image: image, Moviename: mname, Discription: discription, Reting: reting, Author: author, Date: date, Time: time, Endtime: endtime, Duration: duration, Price: price, datetime: datetime, status: status }).then((success) => {
            console.log(success);
            return success
        }).catch((error) => {
            console.log(error);
            return error;
        })
        return mdata;
    }

    showdata(tid) {
        let db = getdb();
        let sdata = db.collection("moviedata").find({ tid: new ObjectId(tid) }).toArray().then((success) => {
            console.log(success)
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })

        return sdata;
    }

    alldata() {
        let db = getdb();
        let alldata = db.collection("moviedata").aggregate([{ $match: { status: "1" } }, { $lookup: { from: "theaterdata", localField: "tid", foreignField: "_id", as: "theaterInfo" } }]).toArray().then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })
        return alldata;
    }

    rmovie(id) {
        let db = getdb();
        let did = new ObjectId(id);

        let ddata = db.collection("moviedata").updateOne({ _id: did }, { $set: { status: "0" } }).then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error
        })

        return ddata;
    }

    fmovie(id) {
        let db = getdb();

        let fdata = db.collection("moviedata").findOne({ _id: new ObjectId(id) }).then((success) => {
            return (success);

        }).catch((error) => {

            return (error);
        })

        return fdata;
    }

    udata(id, data) {
        let db = getdb();

        let did = new ObjectId(id);
        console.log(did);
        console.log("this is the model did");

        let udata = db.collection("moviedata").updateOne({ _id: did }, { $set: data }).then((success) => {
            console.log(success);
            console.log("this os the model data")
            return success;
        }).catch((error) => {
            return error
        })

        return udata;
    }

    searchdata(moviename) {
        let db = getdb();

        console.log(moviename)
        // let data = db.collection("moviedata").find({ Moviename: moviename })
        let data = db.collection("moviedata").aggregate([{ $match: { Moviename: moviename, status: "1" } }, { $lookup: { from: "theaterdata", localField: "tid", foreignField: "_id", as: "theaterInfo" } }]).toArray().then((success) => {
            console.log(success);
            return success

        }).catch((error) => {
            console.log(error);
            return error
        })
        return data
    }

    fmdata(id) {
        let db = getdb();
        let mid = new ObjectId(id);
        let data = db.collection("moviedata").aggregate([{ $match: { _id: mid } }, { $lookup: { from: "theaterdata", localField: "tid", foreignField: "_id", as: "theaterdata" } }]).toArray().then((success) => {
            console.log(success)
            console.log("this is the single movie data")
            return success
        }).catch((error) => {
            return error
            console.log(error)
        })

        return data
    }



    bsdata(id) {
        let db = getdb();
        let mid = new ObjectId(id);
        // let mid = toString(id)
        console.log(mid);
        console.log("this is the mid in model")

        let data = db.collection("seatbookdata").find({ movieid: mid, status: "1" }).toArray().then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })

        return data
    }
}

exports.Moviesoperations = Moviesoperations;