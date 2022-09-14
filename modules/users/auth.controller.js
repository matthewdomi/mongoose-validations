const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateToken = (user)=>{
    const token = jwt.sign({id: user._id, email: user.email},
        "5faaf12d1655c7b572843e87f41050f6a15becdaf0eebfbad8cb3d513d993733",
       { expiresIn: "1h" }      

         );
         return{
            token,
            user,
         };
};


exports.register = async (req, res)=>{
    // Email
    // get variable from the requested body
    const {email, password} = req.body

    // CHEking if EMAIL ALREADY EXIT 
    const emailExists = await User.findOne({email})
    if(emailExists){
        return res.status(400).json({error:"Email Already in Use"})
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    

    // create User 
    const user = await User.create({...req.body, password: hashedPassword});

    // generate token
   const token= generateToken(user)
    res.status(201).json({token});


};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    let user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({msg: "Invalid credential"});

    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({msg: "Invalid credential"})
    }

    const token= generateToken(user)
    res.status(201).json({token});
};

