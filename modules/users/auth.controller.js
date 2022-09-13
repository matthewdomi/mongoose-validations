const User = require("./user.model")
exports.register = async (req, res)=>{
    // Email
    // get variable from the requested body
    const {email, password} = req.body

    // CHEking if EMAIL ALREADY EXIT 
    const emailExists = await User.findOne({email})
    if(emailExists){
        return res.status(400).json({error:"Email Already in Use"})
    }


    // create User 
    const user = await User.create({...req.body});
    res.status(201).json({user});

}