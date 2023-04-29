const express = require("express");
const {UserModel} = require("../model/user.model");
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const UserRoute = express.Router();

// register

UserRoute.post("/register", async(req,res)=>{
  try {
      const { email,pass,name,age } = req.body;
      bcrypt.hash(pass, 5, async(err, hash) =>{
        // Store hash in your password DB.
        const user =  new UserModel({name,email,age,pass:hash} );
        await user.save();
        res.status(200).send({"msg":"user registered successfully."})
    });
       
    } catch (err) {
        console.log(err)
        res.status(400).send({"err":"something went wrong"})
    }
    })
    
    // login
    
    UserRoute.post("/login", async(req,res)=>{
        const { email,pass } = req.body;
        try {
          const user = await UserModel.findOne({email});
          if(user){
            var token = jwt.sign({ author:user.name,authorID:user._id }, 'Masai');
            bcrypt.compare(pass, user.pass, (err, result)=> {
              if(result){
              res.status(200).send({"msg":"User Login Success.","token":token})
              }else{
                res.status(200).send({"msg":"Wrong Credentials."})
              }
          });
        }else{
          res.status(200).send({"msg":"Email not found!!!"})
        }
          
        } catch (err) {
            console.log(err)
            res.status(400).send({"err":"something went wrong"})
        }
    })

    module.exports ={
        UserRoute
    }
    