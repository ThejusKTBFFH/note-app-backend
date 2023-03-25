const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRouter  = require("./routes/user.js");

const  noteRouter  = require("./routes/note.js");

const app = express();

app.use(express.json());

app.use(cors());


app.use("/auth", userRouter);
app.use("/notes", noteRouter);


const url = "mongodb+srv://1thejusjoshi:noteapp@cluster0.zin7irk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

app.listen(5000,()=>{
    console.log("server started at 5000");
})



mongoose
