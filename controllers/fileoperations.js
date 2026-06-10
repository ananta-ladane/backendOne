const Fileope = require("../models/filequerys").Fileope;


exports.showfileform = (req, res) => {
    res.render("fileshow")
}


exports.getfiledata =(req, res) =>{
   
    let file = req.file.filename;
//  console.log(file)
    let fdata = new Fileope();

    let data = fdata.idata(file);

}