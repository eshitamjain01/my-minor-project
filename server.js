const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.get("/",(req, res) => {
    res.sendFile(_dirname + "/public/index.html");
});

mongoose.connect("mongodb://127.0.0.1:27017/crudDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const StudentSchema = new mongoose.Schema({
    name: String,
    email: String
});

const Student = mongoose.model("Student", StudentSchema);


// CREATE
app.post("/add", async(req,res)=>{
    const student = new Student(req.body);
    await student.save();
    res.send("Student Added");
});


// READ
app.get("/students", async(req,res)=>{
    const data = await Student.find();
    res.json(data);
});


// UPDATE
app.put("/update/:id", async(req,res)=>{
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated Successfully");
});


// DELETE
app.delete("/delete/:id", async(req,res)=>{
    await Student.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully");
});


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
