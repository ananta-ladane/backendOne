const express = require("express");
const router = require("./router/router");
const app = express();
const bodyparser = require("body-parser");
const mongoconnect = require("./utils/database").mongoconnect;
const session = require("express-session");
const mongosescon = require("connect-mongodb-session")(session);
const multer = require("multer");
const path = require("path");



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// app.use(multer({ storage: storage } ))

app.use("/public", express.static(path.join(__dirname, 'public'))); //conect css and js files

app.use(express.json()); // contect axios or connect frontend to backend axios

// app.use(express.static(""));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    }
})

app.use(multer({ storage: fileStorage }).single("image"));


const store = new mongosescon({
    uri: "mongodb+srv://anantaladane42_db_user:JoPb7WXGQc1JfLof@cluster1.oqt7375.mongodb.net/?appName=Cluster1",
    collection: "sessions"
})

app.use(session({
    secret: "ananta",
    resave: false,
    saveUninitialized: true,
    store: store,
}))


app.use(bodyparser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(router);

mongoconnect(() => {
    app.listen(3000);
})


