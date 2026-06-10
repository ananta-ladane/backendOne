
const Theater = require("../models/theaterquery").Theaters;
const bcrypt = require("bcrypt");


exports.signupformtheater = (req, res) => {
    res.render("signuptheater", { message: "" });
}

exports.signupdatatheaterdata = (req, res) => {

    let username = req.body.username;
    let email = req.body.email;
    let seats = req.body.seats;
    let landmark = req.body.landmark;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let password = req.body.password;

    bcrypt.hash(password, 10).then((success) => {
        let theater = new Theater();

        let result = theater.idata(username, email, seats, landmark, city, state, country, success);

        result.then((success) => {
            console.log(success);

            if (success.acknowledged === true) {
                res.render("theaterlogin", { message: "" });

            } else if (success.status === "Existed") {
                res.render("signuptheater", { message: "username already Existed" });
            }
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error)
    })

}


exports.theaterlogin = (req, res) => {
    res.render("theaterlogin", { message: "" })
}


exports.theaterdata = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let data = new Theater();

    let ldata = data.fdata(email);

    ldata.then((success) => {
        console.log(success);
        if (success.length === 0) {
            res.render("theaterlogin", { message: "Invalid username of password" });
        }
        let theaterid = success[0]._id;
        let hashpass = success[0].password;
        bcrypt.compare(password, hashpass).then((success) => {
            if (success) {
                req.session.theaterid = theaterid;
                res.render("movieform", { Tid: req.session.theaterid });
            } else {
                res.render("theaterlogin", { message: "Invalid password plz try again" });
            }
        })
    }).catch((error) => {
        console.log(error);
    })
}

exports.showpaasdata = (req, res) => {
    res.render("theaterpass")
}


exports.findpassdata = (req, res) => {

    let name = req.body.tname;
    let email = req.body.email;

    console.log(name);
    console.log(email)

    let theater = new Theater();

    let data = theater.findpdata(name, email);

    data.then((success) => {
        console.log(success)
        console.log("this is finddata and go updataoage")
        if (success) {
            res.render("theaterpasschang", { data: success });
        }
    }).catch((error) => {
        console.log()
    })

}


exports.updatepass = (req, res) => {
    let id = req.params.id;
    let pass = req.body.pass;

    let theater = new Theater();

    bcrypt.hash(pass, 10).then((success) => {
        let theater = new Theater();

        let data = theater.upass(id, success);

        data.then((success) => {
            console.log(success)

            if (success) {
                res.redirect("/theaterlogin")
            }
        }).catch((error) => {
            console.log(error)
        });

    }).catch((error) => {
        console.log(error)
    })
}

exports.findtheaterdata = (req, res) => {

    let tid = req.params.Tid;

    console.log(tid)
    let theater = new Theater();

    let data = theater.finddata(tid);

    data.then((success) => {
        console.log(success);
        let did = success._id;
        console.log(did);
        console.log("this is the theater id")
        res.render("theaterprofile", { tdata: success, did: did })
    }).catch((error) => {
        console.log(error)
    })
}

exports.theatereditdata = (req, res) => {
    let id = req.params.id;

    let theater = new Theater();

    let data = theater.edata(id);

    data.then((success) => {
        console.log(success);
        res.render("theatereditdata", { data: success })
    }).catch((error) => {
        consolr.log(error);
    })
}

exports.updatetheaterdata = (req, res) => {
    let id = req.params.id;

    let data = {
        theatername: req.body.theatername,
        email: req.body.email,
        seats: req.body.seats,
        landmark: req.body.landmark,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country
    }

    let theater = new Theater();
    let ddata = theater.udata(id, data);

    ddata.then((success) => {
        console.log(success)
        res.redirect(`/theaterdetail/${id}`)
    }).catch((error) => {
        console.log(error);
        return error;
    })

}

exports.floaction = (req, res) => {

    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;

    let fdata = new Theater();

    let data = fdata.fldata(city, state, country);

    // data.then((success) => {
    //     console.log(success)
    //     res.render("locationbasedata", {theaterdata : success})
    // }).catch((error) => {
    //     console.log(error);
    // })

    data.then((success) => {
        console.log(success);

        res.render("locationbasedata", { locationtheaterdata: success })

    }).catch((error) => {
        consolr.log(error);
    })

}

exports.theaterlogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
}
