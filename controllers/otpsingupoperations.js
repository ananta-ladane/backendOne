const Otpdata = require("../models/otpsignupquery").Optdata;
const nodemailer = require("nodemailer");


exports.showotpsignup = (req, res) => {

    res.render("otpsignup", { message: "" });
}

exports.getoptuserdata = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    let otpuserdata = new Otpdata();

    let data = otpuserdata.idata(name, email);
    data.then((success) => {
        console.log(success)

        if (success.acknowledged === true) {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                    user: "anantaladane42@gmail.com",
                    pass: "eqdtqilqfptrmcon",
                },
            });

            transporter.sendMail({
                from: '"Developer" <anantaladane42gmail.com>', // sender address
                to: email, // list of recipients
                subject: "This is the first app", // subject line
                text: "Hello world?", // plain text body
                html: "<h3>Welcome to my app</h3><p>Thanks for signin<p><strong>Best Regards, </strong><p>Ananta Ladane</p>", // HTML body
            });
            res.render("generateotp", { message: "" })
        } else if (success.status === "Existed") {
            res.render("otpsignup", { message: "Email is already taken " })
        }
    }).catch((error) => {
        console.log(error);
    })
}

exports.otplogin = (req, res) => {
    res.render("generateotp", { message: "" });
}

exports.genotp = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;

    let otpuserdata = new Otpdata();

    let data = otpuserdata.fgendata(name, email);

    data.then((success) => {
        console.log(success);
        if (success) {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
                auth: {
                    user: "anantaladane42@gmail.com",
                    pass: "eqdtqilqfptrmcon",
                },
            });

            transporter.sendMail({
                from: '"Developer" <anantaladane42gmail.com>', // sender address
                to: email, // list of recipients
                subject: "This is the first app", // subject line
                text: "Hello world?", // plain text body
                html: "<h4>Enter your OTP: " + Math.round(Math.random() * 100000) + "</h4> <h5>Thank you, </h5> <p>Best Regards, </p><p>Ananta Ladane</p>", // HTML body
            });

            res.render("otplogin", { data: success })
        } else {
            res.render("generateotp", { message: "Invalide detiles plz try again" })
        }
    }).catch((error) => {
        console.log(error)
    })
}

exports.muserotp = (req, res) => {

    let otp = req.body.pass;
}