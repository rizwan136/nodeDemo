const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer')
const router = express.Router();
const packageModel = require("../models/package");
const app = express();

router.use(express.static(__dirname+"./uploads"));


   const Storage = multer.diskStorage({
        destination:"./uploads",
       filename:(req,file,cb)=>{
            cb(null,file.originalname);
        }
    });
    const upload = multer({
        storage:Storage
    }).single('user_file');
const Package = mongoose.model('Package');



app.post("/package", upload, async (req, res, next) => {
    const package = new Package();
    const body = req.body;
    console.log(req.file);

    const img = req.file.filename;
    package.name = body.name;
    package.price = body.price;
    package.description = body.description;
    package.image = img;
    await package.save((err, doc) =>{
        if(!err)
        res.json(doc);
        else{
            return next(err);
        }
    })
})

app.get("/package/search", async (req,res)=>{
    let package = await Package.find();
    return res.send(package)})

app.get("/package/search/:id",async (req, res, next) => {
    await Package.findById(req.params.id,
        (err, data) => {
            if (!err) {
                res.send(data);
            } else {
                return next(err);
            }
        });
});

app.put("/package/update/:id", async (req, res, next) => {
    const update =  new Package();
    const body = req.body;
       
        update.name = body.name;
        update.price = body.price;
        update.description = body.description;
    await Package.findByIdAndUpdate(req.params.id,req.body,
        (err, data) => {
            if (!err) {
                res.send(data);
            } else {
                return next(err);
            }
        })
});


app.delete("/package/delete/:id",async (req, res, next) => {
    await Package.findByIdAndRemove(req.params.id,
        (err, data) => {
            if (!err) {
                res.send(data);
            } else {
                return next(err);
            }
        });
});


module.exports = app;