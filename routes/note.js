const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const NoteModel = require("../models/Notes.js");

const UserModel = require("../models/User.js");



const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const result = await NoteModel.find({});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err);
    }
})

const verifyToken = (req,res,next)=>{

    const authHeader = req.headers.authorization;
    if(authHeader){
        jwt.verify(authHeader, "secret", (err)=>{
            if(err){
                return res.sendStatus(403);
            }
            next();
        })
    }else{
        res.sendStatus(401);
    }
};

router.post("/", verifyToken , async(req,res)=>{

    const note = new NoteModel({
        _id: new mongoose.Types.ObjectId(),
        notetitle: req.body.notetitle,
        content: req.body.content,
        date: req.body.date,
        time: req.body.title,

    })

    console.log(note);

    try{
        const result = await note.save();
        res.status(201).json({
            createdNote:{
                notetitle: result.notetitle,
                content:result.notetitle,
                date:result.date,
                time:result.time,
                _id: result._id,
            }
        })
    }
    catch(err){

        res.status(500).json(err);

    }
})

router.get("/:noteId", async(req,res)=>{
    try{
        const result = await NoteModel.findById(req.params.noteId);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.put("/notes/:id", async(req,res)=>{
    try{
        const {id} = req.params;

        const note = await NoteModel.findByIdAndUpdate(id,req.body);

        if(!note){
            return res.status(404).json({message:`cannot find any note with ID ${id}`})
        }

        const updatedNote = await NoteModel.findById(id);

        res.status(200).json(updatedNote);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

router.delete("/notes/:id", async(req,res)=>{

    try{
        const{id} = req.params;
        const note = await NoteModel.findByIdAndDelete(id);

        if(!note){
            return res.status(404).json({message: `cannot find any note with id ${id} `})
        }

        res.status(200).json(note);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

module.exports = router;

