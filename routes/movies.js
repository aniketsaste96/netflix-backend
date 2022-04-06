const router = require('express').Router();
const Movie = require("../models/Movie");

const verify = require('../verifyToken');



//create
router.post("/", verify, async (req, res) => {
    //verify by using only token

    if (req.user.isAdmin) {

        const newMovie = new Movie(req.body);

        try {

            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);


        } catch (error) {
            res.status(500).json(error);
        }


    } else {
        res.status(403).json("You are not allowed!!!")
    }


})

//update movie

router.put("/:id", verify, async (req, res) => {
    //verify by using only token

    if (req.user.isAdmin) {



        try {
            const updatedMovie = new Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            res.status(200).json(updatedMovie);


        } catch (error) {
            res.status(500).json(error);
        }


    } else {
        res.status(403).json("You are not allowed!!!")
    }


})



module.exports = router;