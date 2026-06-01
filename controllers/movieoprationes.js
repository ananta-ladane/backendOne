const { render } = require("ejs");
// const { lazy } = require("react");

const Moviesoperations = require("../models/moviesquery").Moviesoperations;

const Commonqueryy = require("../models/commonquery").Commonqueryy;




// exports.showmoveform = (req, res) => {
//     res.render("movieform");
// }

exports.moviedata = (req, res) => {


    let tid = req.body.tid;
    console.log(req.body.tid);
    let image = req.body.image;
    let mname = req.body.moviename;
    let discription = req.body.moviedis;
    let reting = req.body.movierating;
    let author = req.body.auther;
    let date = req.body.date;
    let time = req.body.time;
    let endtime = req.body.endtime;
    let duration = req.body.duration;
    let price = req.body.price;
    let datetime = req.body.datetime;
    let status = req.body.status;

    let movie = new Moviesoperations();
    let moviedetiles = movie.insertData(tid, image, mname, discription, reting, author, date, time, endtime, duration, price, datetime, status);

    moviedetiles.then((success) => {
        console.log(success)
        console.log("this is movie collection")

    }).catch((error) => {
        console.log(error)
    })


}

exports.showmoviedata = (req, res) => {

    let tid = req.params.Tid
    let movie = new Moviesoperations();
    let moviedata = movie.showdata(tid);



    moviedata.then((success) => {
        console.log(success);
        let did = success[0].tid;
        console.log(did);

        res.render("showmoviesdata", { did: did, moviedata: success })
    }).catch((error) => {
        console.log(error)
    })
}

exports.allmoviedata = (req, res) => {

    let movie = new Moviesoperations();

    let moviedata = movie.alldata();
    console.log(req.session.uid);

    moviedata.then((success) => {
        console.log(success);
        res.render("showdetiles", { moviedata: success })
    }).catch((error) => {
        console.log(error);
    })
}



exports.removie = (req, res) => {
    console.log(req.body.id);
    let id = req.body.id;
    let tid = req.body.tid;
    let movie = new Moviesoperations();
    let movieid = movie.rmovie(id);
    movieid.then((success) => {
        console.log(success)
        res.redirect(`/showmovies/${tid}`);

    }).catch((error) => {
        console.log(error);
    })
}

exports.finddata = (req, res) => {

    console.log(req.params.id)
    console.log("id found")
    let id = req.params.id;

    let movie = new Moviesoperations();
    let movieid = movie.fmovie(id);

    movieid.then((success) => {
        console.log(success);

        res.render("editform", { data: success });
    }).catch((error) => {
        console.log(error)
    })

}


exports.updataMovie = (req, res) => {

    let id = req.params.id;
    let tid = req.body.tid;
    console.log(tid);
    let data = {

        Image: req.body.image,
        Name: req.body.moviename,
        Discription: req.body.moviedis,
        Reting: req.body.movierating,
        Author: req.body.auther,
        Date: req.body.date,
        Time: req.body.time,
        Endtime: req.body.endtime,
        Duration: req.body.duration,
        Price: req.body.price,
        datetime: req.body.datetime,

        status: req.body.status
    };


    console.log(id);
    console.log("this is the controller data");

    let movie = new Moviesoperations();

    let mdata = movie.udata(id, data);
    mdata.then((success) => {
        console.log(success);
        console.log("this is the controller success")
        // let Tid = success.tid;
        // console.log(Tid);
        res.redirect(`/showmovies/${tid}`);
    }).catch((error) => {
        console.log(error)
    })
}

exports.sdata = (req, res) => {

    let moviename = req.body.movie;

    let sdata = new Moviesoperations();

    let mdata = sdata.searchdata(moviename);

    mdata.then((success) => {
        console.log(success)
        res.render("searchmoviedata", { moviedata: success })
    }).catch((error) => {
        console.log(error)
    });


}

exports.sitdata = (req, res) => {
    let id = req.body.id;

    let mdata = new Moviesoperations();

    let data = mdata.fmdata(id);
    data.then((success) => {
        console.log(success)
        console.log("this is the find movie data")
        let mid = success[0]._id;
        console.log(mid)
        let bookedData = mdata.bsdata(mid);
        bookedData.then((seat) => {
            // console.log(seats.seats);

            let data = [];
            seat.map((item) => {
                data.push(...item.seats);
            });
            console.log(data);
            console.log("this is the booked seats data");
            let mdatetime = seat[0]?.tmdatetime || "";

            // console.log("mdatetime:" + mdatetime);


            let ctime = new Date().toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);
            console.log(ctime);
            res.render("singlemovie", { mdata: success, bookseat: data, mdatetime: mdatetime, ct: ctime })
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error)
    })
}