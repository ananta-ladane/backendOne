const getdb = require("../utils/database").getdb;
const { ObjectId } = require("mongodb");
// const { Form } = require("react-router-dom");

class Theaters {

    idata(username, email, seats, landmark, city, state, country, password) {
        let db = getdb();
        let fdata = db.collection("theaterdata").find({ email: email }).toArray().then((success) => {

            if (success.length === 0) {
                let data = db.collection("theaterdata").insertOne({
                    theatername: username,
                    email: email,
                    seats: seats,
                    landmark: landmark,
                    city: city,
                    state: state,
                    country: country,
                    password: password
                }).then((success) => {
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
            console.log(error);

        });

        return fdata;
    }

    fdata(email) {
        let db = getdb();
        let data = db.collection("theaterdata").find({ email: email }).toArray().then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })

        return data;
    }

    finddata(id) {
        let db = getdb();
        let did = new ObjectId(id);
        console.log(did)
        let data = db.collection("theaterdata").findOne({ _id: did }).then((success) => {
            console.log(success);
            console.log("this the theater data id")
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        });

        return data;
    }

    findpdata(name, email) {

        let db = getdb();

        let data = db.collection("theaterdata").findOne({ theatername: name, email: email }).then((success) => {
            console.log(success)
            return success
        }).catch((error) => {
            console.log(error)
            return error
        })

        return data;

    }

    upass(id, pass) {

        let db = getdb();

        let tid = new ObjectId(id)

        let data = db.collection("theaterdata").updateOne({ _id: tid }, { $set: { password: pass } }).then((success) => {
            console.log(success)
            return success
        }).catch((error) => {
            console.log(error)
            return error
        })

        return data;
    }

    edata(id) {
        let db = getdb();

        let did = new ObjectId(id);

        let data = db.collection("theaterdata").findOne({ _id: did }).then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })

        return data;

    }

    udata(id, data) {
        let db = getdb();
        let did = new ObjectId(id);

        let udata = db.collection("theaterdata").updateOne({ _id: did }, { $set: data }).then((success) => {
            console.log(success);
            return success;
        }).catch((error) => {
            console.log(error);
            return error;
        })

        return udata;
    }

    fldata(city, state, country) {

        let db = getdb();
        // let fdata = db.collection("moviedata").aggregate([{ $match: { status: "1" } }]).toArray().then((success) => {
        //     console.log(success)
        //     console.log("this is the status 1 data")
        //     if (success) {
        //         let data = db.collection("theaterdata").aggregate([{ $match: { city: city, state: state, country: country } }, { $lookup: { from: "moviedata", localField: "_id", foreignField: "tid", as: "movieInfo" } }]).toArray().then((success) => {
        //             console.log(success);
        //             return success
        //         }).catch((error) => {
        //             console.log(error);
        //             return error;
        //         })

        //         return data
        //     } else {
        //         console.log("status data is not found")
        //     }


        let fdata = db.collection("moviedata").aggregate([
            {
                $match: { status: "1" }
            },
            {
                $lookup: {
                    from: "theaterdata",
                    localField: "tid",
                    foreignField: "_id",
                    as: "theaterDetails"
                }
            },
            // { $match: { city: city, state: state, country: country } },
            {
                $unwind: "$theaterDetails"
            },

            {
                $match: {
                    "theaterDetails.city": city,
                    "theaterDetails.state": state,
                    "theaterDetails.country": country
                }
            }


        ]).toArray().then((success) => {
            console.log(success)
            return success
        }).catch((error) => {

            return error
        })

        return fdata



        // db.movies.aggregate([
        //     {
        //         $match: { status: 1 }
        //     },
        //     {
        //         $lookup: {
        //             from: "theaters",
        //             localField: "theaterId",
        //             foreignField: "_id",
        //             as: "theaterDetails"
        //         }
        //     },
        //     {
        //         $unwind: "$theaterDetails"
        //     },

    }
}

exports.Theaters = Theaters;