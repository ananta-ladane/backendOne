const seatbook = require("../models/seatbookquery").Seatbook;
const nodemailer = require("nodemailer");


exports.isdata = (req, res) => {


    let mid = req.body.mid;
    let tid = req.body.tid;
    let mname = req.body.mname;
    let seats = req.body.seats;
    let time = req.body.time;
    let fdate = req.body.fdate;
    let endtime = req.body.endtime;
    let duration = req.body.duration;
    let tname = req.body.tname;
    let location = req.body.location;
    let totalprice = req.body.totalprice;
    let mdatetime = req.body.datetime;
    let email = req.body.useremail;
    console.log(req.body);

    let currentdate = new Date().toLocaleDateString("en-CA");

   
    console.log(mdatetime)
    // console.log(currentDate);
    // let cdate = new Date(currentDate).toLocaleDateString();


    // let ocdate = new Date(cdate);
    // console.log(typeof ocdate)
    // console.log(ocdate);

    // let mdate = req.body.mdate;
    // let fdate = req.body.fdate;

    let ddata = new Date(fdate).toLocaleDateString("en-CA");
    console.log(ddata)
    console.log(typeof ddata)

    // console.log(ddata);
    // console.log(typeof ddata);

    if (ddata >= currentdate) {
       
            console.log(" movie is available")

            let data = new seatbook();
            let result = data.isdata(mid, tid, mname, seats, time, fdate, endtime, duration, tname, location, totalprice, mdatetime, email);

            result.then((success) => {
                console.log(success);
                let BookingId = success.insertedId;

                // req.session.BookingId = BookingId;
                // console.log(req.session.BookingId)

                res.send(BookingId)
                console.log(BookingId);
                console.log("this is the seat booking id")

                // res.redirect("/showseatbookdata", { id: req.session.BookingId })

                // res.render("confirmationdata", { BookingId: BookingId });

            }).catch((error) => {
                console.log(error);
            })
       
    } else {
        console.log("movie isn't available")
    }


    // return "Hello";
}


exports.fsdata = (req, res) => {

    // let data = await userdata.find({});

    // let data = await seatbook.find({});
    // console.log("this is the find data")
    // console.log(data)


    let data = new seatbook();
    let sid = req.query.id
    console.log(sid)

    // let id = req.session.sid;

    // console.log(req.session.BookingId)
    // console.log(typeof req.session.BookingId)

    let result = data.fusdata(sid);

    result.then((success) => {
        console.log(success)
        console.log(req.session.uid);
        res.render("confirmationdata", { seatdata: success });

    }).catch((error) => {
        console.log(error)
    })

}

exports.paynow = (req, res) => {

    let id = req.params.id;
    // let id = req.body.id;

    let pnow = new seatbook();

    let result = pnow.upayment(id);

    result.then((success) => {
        console.log(success);

        const uemail = success.useremail;
        console.log(uemail);

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
            from: '"developer" <anantaladane@gmail.com>', // sender address
            to: uemail, // list of recipients
            subject: "Payment Confirmation", // subject line
            text: "", // plain text body
            html: `<div><h1>Thank you for ticket booking</h1><strong>plz check your ticket details</strong><div style="width: 280PX; margin: 10px auto; border: 1px solid black; border-radius: 5px; padding: 10px;"><p>Booking_id: ${success._id}</p><p>Movie_name: ${success.moviename}</p><p>Seat_no: ${success.seats}</p><p>Show D&T: ${success.tmdatetime}</p><p>Theater_name: ${success.theatername}</p><p>Location: ${success.location}</p><p>Total_amount: ${success.totalprice}</p></div><p>Thank you!</p><p>Best Regards,</p>BookMyShow Team</p></div>`, // HTML body
        });
        console.log("payment successful");
        // res.send("<h1>Payment done successfully</h1>");
        // res.redirect(`/showseatbookdata/?id=${id}`);
        res.render("ticketdetails", { ticketdata: success });

    }).catch((error) => {
        console.log(error);
        res.send("Payment failed");
    })
}

exports.ftdata = (req, res) => {
    // let id = req.body.id;
    // console.log(id)

    let id = req.params.id;
    console.log(id)
    console.log("this is the download ticket id")

    let tdata = new seatbook();

    let result = tdata.tikectdata(id);

    result.then((success) => {
        console.log(success);
        res.render("downloadticket", { tdata: success });
    }).catch((error) => {
        console.log(error);
    })
}