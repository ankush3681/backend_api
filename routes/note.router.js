const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/auth.middleware");
const noteRoute = express.Router();

noteRoute.use(auth);

// create

noteRoute.post("/add", async(req,res)=>{

    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({"msg":"Note Added Successfully"})
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})


// read

noteRoute.get("/allnotes",async(req,res)=>{
    try {
        const note = await NoteModel.find({authorID: req.body.authorID});
        res.status(200).send(note);
    } catch (err) {
        res.status(400).send({"err":err.meassage})
    }
})


// update
// 644bd0252b95f460ebc016ca

noteRoute.patch("/update/:user_id",async(req,res)=>{
   const id = req.params.user_id;
   const note = await NoteModel.findOne({_id:id});
   
    try {
        if(req.body.authorID == note.authorID){
            await NoteModel.findByIdAndUpdate({_id:id},req.body);
            res.status(200).send({"msg":`Note of id: ${id} updated successfully`});
           }else{
            res.status(200).send({"err":"You are not authorized to do this action"});
           }
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
})


// delete

noteRoute.delete("/delete/:note_id", async(req,res)=>{
    const id = req.params.note_id;
    const note = await NoteModel.findOne({_id:id});
    
    try {
        if(req.body.authorID === note.authorID){
            await NoteModel.findByIdAndDelete({_id:id});
            res.status(200).send({"msg":`Note of id: ${id} deleted successfully`});
        }else{
            res.status(200).send({"err":"You are not authorized to do this action"});
        }
    } catch (err) {
        res.status(400).send({"err":err.message});
    }
   
})


module.exports = {
    noteRoute
}