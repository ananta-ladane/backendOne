const SignupModel = require("../models/sinupquery");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");



exports.homepage = (req, res) => {
    res.render("homepage");
}

exports.theaterpage = (req, res) => {
    res.render("theaterpage");
}


exports.showsignuoform = (req, res) => {
    res.render("signup", { message: "" })
}

exports.getsignupdata = (req, res) => {
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    if (username || email || password) {
        bcrypt.hash(password, 10).then((success) => {
            console.log(success);
            let instance = new SignupModel();
            let result = instance.insertData(username, email, success);
            result.then((success) => {
                console.log("in controller");
                console.log(success);

                if (success.acknowledged === true) {

                    console.log("Email send successfully")

                    // const transporter = nodemailer.createTransport({
                    //     host: "smtp.gmail.com",
                    //     port: 587,
                    //     secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                    //     auth: {
                    //         user: "anantaladane42@gmail.com",
                    //         pass: "eqdtqilqfptrmcon",
                    //     },
                    // });

                    // transporter.sendMail({
                    //     from: '"developer" <anantaladane@gmail.com>', // sender address
                    //     to: email, // list of recipients
                    //     subject: "Welcome to MyBookShow", // subject line
                    //     text: "", // plain text body
                    //     html: "<h1>Welcome to MyBookShow<h1><p>thanks for signup</p>", // HTML body
                    // });

                    res.render("login", { message: "" });

                } else if (success.status === "Existed") {
                    res.render("signup", { message: "username is already taken" });
                }

            }).catch((error) => {
                console.log(error)
            });
        }).catch((error) => {
            console.log(error);
        })
    } else {
        res.render("signup", { message: "Plz Enter the Details" })
    }

}

exports.loginform = (req, res) => {
    res.render("login", { message: "" })
}

exports.logindata = (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password)

    let email = req.body.email;
    let password = req.body.password;

    let instance = new SignupModel();
    let result = instance.fData(email);
    result.then((success) => {
        console.log("login successfully");
        console.log(success);
        let uid = success[0]._id;

        if (success.length === 0) {

            res.render("login", { message: "Username or passwod is invalid" });
        }

        let hashstore = success[0].password;

        bcrypt.compare(password, hashstore).then((success) => {
            if (success) {

                req.session.uid = uid;

                // req.session.save((err) => {

                //     if (err) {
                //         console.log("filed to sava session id")
                //     } else {
                //         console.log("session id sava successfully")
                //     }
                // })
                
                console.log("this is the user session id: " + req.session.uid)
                res.render("dashboard", { uid: req.session.uid });

            } else {
                res.render("login", { message: " password is invalid" });
            }
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error)
    });


}

exports.passshpowform = (req, res) => {
    res.render("forgotpass", { message: "" })
}


exports.passdata = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    let mdata = new SignupModel();

    let data = mdata.gpdata(name, email);

    data.then((success) => {
        console.log(success);

        const uname = success.username;
        const uemail = success.email;
        if (success) {
            // const transporter = nodemailer.createTransport({
            //     host: "smtp.gmail.com",
            //     port: 587,
            //     secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
            //     auth: {
            //         user: "anantaladane42@gmail.com",
            //         pass: "eqdtqilqfptrmcon",
            //     },
            // });

            // transporter.sendMail({
            //     from: '"developer" <anantaladane@gmail.com>', // sender address
            //     to: email, // list of recipients
            //     subject: "Welcome to MyBookShow", // subject line
            //     text: "", // plain text body
            //     html: `<h1>Welcome to MyBookShow<h1> <p>Change your password <a href='https://backendone-8rim.onrender.com/changepassshowform'> ckick here</a></p> <h5>Thank you,</h5> <p>Best Regards, </p><p>Ananta Ladane</p>`, // HTML body
            // });
            console.log("link send on email")
            res.redirect("/changepassshowform")
        } else {
            res.render("forgotpass", { message: "Plz Enter the valid details" })
        }
    }).catch((error) => {
        console.log(error)
    })
}


exports.upassform = (req, res) => {
    res.render("changepassform")
}

exports.upassdata = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.pass;

    bcrypt.hash(password, 10).then((success) => {

        let udata = new SignupModel();

        let data = udata.ugpass(name, email, success);
        data.then((success) => {
            console.log(success)
            res.render("login", { message: "" })
        }).catch((error) => {
            console.log(error)
        })

    }).catch((error) => {
        console.log(error)
    })


}


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);

        } else {
            res.clearCookie("connect.sid")
            res.redirect("/")
        }
    })
}