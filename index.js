const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
//routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")


dotenv.config();


//mongodb connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(() => console.log("mongodb connected 🔥")).catch((error) => console.log(error))




app.use(express.json());








app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);



app.listen(8800, () => {
    console.log(`server is running on ${8800}💻`)
})