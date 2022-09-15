const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
     const token = jwt.sign(
       { id: user._id, email: user.email },
       "65376e8194b7d7f8a3f4bfda38aa5ac0a6e3b06c6c767442a894b70e328b66d8",
       {
         expiresIn: "1h",
       }
     );
     return {
       token,
       user,
     };
    
}

exports.register = async (req, res) => {
    const { email, password } = req.body;

    //checking to see if email already exists
    const emailExists = await User.findOne({email})
    if (emailExists) {
        return res.status(400).json({error: "email already in used"});
        }
       
        //hash password
        const hashedPassword =await bcrypt.hash(password, 12)
    
     //create user
        const user = await User.create({...req.body, password: hashedPassword} );

        //generate token
        const token = generateToken(user);
       
    res.status(201).json({token});    
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    let user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({msg: "Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({msg: "Invalid credentials"})
    }
    const token = generateToken(user)
     res.status(200).json({ token });    
};
    