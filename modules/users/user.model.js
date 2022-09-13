const {Schema, model}= require("mongoose")

const userSchema = new Schema({

    firstName:{
        type: String,
        required: true,
        minLength: 2

    },

    lastName:{
        type: String,
        required: true,
        minLength: [2, "Cannot have a name with "]
    },
    
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,

    },
    
    password:{
        type: String,
        required: true,
        minLength: [7, "Password too short. Add more"]

    },
    

    
})

{
    timestamps: true
}

module.exports = model("User", userSchema)