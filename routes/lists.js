const router = require('express').Router();
const List = require("../models/List");

const verify = require('../verifyToken');



//create
router.post("/", verify, async (req, res) => {
    //verify by using only token

    if (req.user.isAdmin) {
        const newList = new Movie(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!!!")
    }
})



module.exports = router;