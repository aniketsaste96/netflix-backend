const router = require('express').Router();
const List = require("../models/List");

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



module.exports = router;