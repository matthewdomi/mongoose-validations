const { Schema, model } = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    body: {
        type: String,
        required: true,   
        minLength: 15,
    },
    published: {
        type: Boolean,
        default: false,

    }



});
// {
//     timestamps: true
// }

module.exports = model("Post", postSchema)