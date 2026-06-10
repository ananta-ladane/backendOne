const express = require("express");
const router = express.Router();
const { showsignuoform, getsignupdata, logindata, loginform, homepage, theaterpage, passshpowform, passdata, upassform, upassdata, logout } = require("../controllers/singupoprationes");
const { showmoveform, moviedata, showmoviedata, finddata, updataMovie, allmoviedata, removie, sdata, sitdata } = require("../controllers/movieoprationes");
const { signupdatatheaterdata, signupformtheater, theaterdata, theaterlogin, findtheaterdata, theatereditdata, updatetheaterdata, floaction, theaterlogout,  showpaasdata, findpaasdata, updatepass, findpassdata } = require("../controllers/theateropration");
const { showotpsignup, getoptuserdata, otplogin, genotp } = require("../controllers/otpsingupoperations");
const { showfileform, getfiledata } = require("../controllers/fileoperations");
const { isdata, fsdata, paynow, ftdata } = require("../controllers/seatbookopeations");
// const nodemailer = require("nodemailer");


// router.get("/mailesend", (req, res) => {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
//         auth: {
//             user: "anantaladane42@gmail.com",
//             pass: "eqdtqilqfptrmcon",
//         },
//     });

//     transporter.sendMail({
//         from: '"Example Team" <anantaladane@gmail.com>', // sender address
//         to: "aniketladane1010@gmail.com", // list of recipients
//         subject: "this is first app", // subject line
//         text: "", // plain text body
//         html: "<h1>Welcome to ananta app<h1><p>thanks for signup</p>", // HTML body
//     });

// })




router.get("/theaterlogout", theaterlogout);
router.get("/logout", logout);

//----------------------------------

// router.get("/math", (req, res)=>{
//     console.log(Math.round(Math.random()*100000))
// })

//file show
router.post("/getfiledata", getfiledata)
router.get("/showfileform", showfileform);

//---------------seat ulr--------------
router.post("/foundticket/:id", ftdata)
router.post("/paynow/:id", paynow);
router.get("/showseatbookdata", fsdata);
router.post("/sdata", sdata);
router.post("/moviebookingdetails", isdata)


// login with otp
router.post("/genoptdata", genotp);
router.get("/optgenerate", otplogin);
router.post("/optgetdata", getoptuserdata);
router.get("/otpsignpage", showotpsignup);

// login with pass
router.post("/upassdata", upassdata);
router.get("/changepassshowform", upassform)
router.post("/forgotpassdata", passdata)
router.get("/forgetpass", passshpowform)

//
router.get("/dashboard", (req, res) => {
    res.render("dashboard", { uid: "" });
});

//--------user----------------------------
router.get("/showmovielist", allmoviedata);
router.get("/showloginform", loginform);
router.post("/login", logindata);
router.post("/getdata", getsignupdata);
router.get("/showform", showsignuoform);

//-----------
router.post("/sitdata", sitdata)
router.post("/update/:id", updataMovie);
router.get("/finddata/:id", finddata);
router.post("/remove/:id", removie);
router.get("/showmovies/:Tid", showmoviedata);
router.post("/getmoviedata", moviedata);
// router.get("/showmovieform", showmoveform);

router.post("/locationdata", floaction)
router.post("/updatetheaterdata/:id", updatetheaterdata);
router.get("/theateredit/:id", theatereditdata);
router.get("/theaterdetail/:Tid", findtheaterdata);

router.post("/changepadd/:id", updatepass);
router.post("/getpassdata", findpassdata);
router.get("/theaterpass", showpaasdata);

router.post("/theaterlogindata", theaterdata);
router.get("/theaterlogin", theaterlogin);

router.post("/getsingupdata", signupdatatheaterdata);
router.get("/theatersignup", signupformtheater);
router.get("/showtheaterpage", theaterpage);

router.get("/", homepage);

// router.get("/", (req, res) => { res.send("<h1>Hello this is signup app</h1>") });

// router.use((req, res) => {
//     res.status(404).json("notfound",{
//         success: false,
//         message: "User Route Not Found"
//     });
// });

router.use((req, res) => {
    res.status(404).render("notfound", {
        // success: false,
        message: "Page Not Found"
    });
});

module.exports = router;

