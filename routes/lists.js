const router = require('express').Router();
const List = require("../models/List");

const verify = require('../verifyToken');



//create
router.post("/", verify, async (req, res) => {
    //verify by using only token

    if (req.user.isAdmin) {
        const newList = new List(req.body);
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

//delete
router.delete("/:id", verify, async (req, res) => {
    //verify by using only token

    if (req.user.isAdmin) {

        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You are not allowed!!!")
    }
})



module.exports = router;