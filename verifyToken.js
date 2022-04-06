const jwt = require("jsonwebtoken");


//before going to router function first go into this verify function.
function verify(req, res, next) {
    //token in headers not in body***
    const authHeader = req.headers.token;
    if (authHeader) {
        //we need second part of token only
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(401).json("Token is not valid!!");
            //if no error
            req.user = user;
            next();//now to go to actual router
        })

    } else {
        return res.status(401).json("You are not authenticated 🤨")
    }
}
module.exports = verify;
