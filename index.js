const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require("cors")
//routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")

app.use(cors())
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
app.use("/api/lists", listRoute);



app.listen(8800, () => {
    console.log(`server is running on ${8800}💻`)
})