const express = require("express");
const { connection } = require("./db")
const { UserRoute } = require("./routes/user.route");
const { auth } = require("./middleware/auth.middleware");
const { noteRoute } = require("./routes/note.router")
const cors = require("cors");
require('dotenv').config();

const app = express();
 app.use(express.json());
 app.use(cors());

app.use("/user",UserRoute)
app.use("/note",noteRoute)

app.get("/",(req,res)=>{
  
    res.status(200).send("Home Page")
})

app.use(auth);

app.get("/about",(req,res)=>{
    res.status(200).send("About Data")
})

app.get("/contact",(req,res)=>{
    res.status(200).send("Contact Data")
})

app.get("/movie",(req,res)=>{
    res.status(200).send("Movie Data")

})

app.get("/series",(req,res)=>{
    res.status(200).send("Series Data")
})

app.listen(process.env.port,async()=>{
    try {
      await connection;
      console.log("Connected to DB")
    } catch (err) {
        console.log("cannot connect to DB")
        console.log(err)
    }
    console.log(`server is running on port ${process.env.port}...`);
})