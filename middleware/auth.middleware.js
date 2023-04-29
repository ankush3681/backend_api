const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{

    const token = req.headers.authorization;
    if(token){
        try {
            const decode = jwt.verify(token.split(" ")[1], 'Masai',);
          if(decode){
            // console.log(decode)
            req.body.author=decode.author;
            req.body.authorID=decode.authorID;
            next();
          }else{
            res.send({"msg":"Login First!!"})
          }
        } catch (err) {
           res.status(400).send({"err":err.message});
        }
    }else{
        res.send({"msg":"Login First!!"})
    }
}

module.exports = {
    auth
}