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
            const updatedMovie = await new Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

            res.status(200).json(updatedMovie);


        } catch (error) {
            res.status(500).json(error);
        }


    } else {
        res.status(403).json("You are not allowed!!!")
    }


})

//delete movie

router.delete("/:id", verify, async (req, res) => {
    //verify by using only token

    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("The movie has beemn updated!!!");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!!!")
    }


})

//get movie

router.get("/find/:id", verify, async (req, res) => {
    //verify by using only token


    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get random movie

router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;


    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error);
    }
})

//get all

//delete movie

router.get("/", verify, async (req, res) => {
    //verify by using only token

    if (req.user.isAdmin === true) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!!!")
    }


})


module.exports = router;