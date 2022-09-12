const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const postRouter = require("./modules/posts/post.route");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Welcome to my server, use /Post to get all post")
});
app.use("/posts", postRouter)

async function start() {
    await dbConnect();

    app.listen(4000, (err) => {
        console.log("Server is running on http://localhost:4000")
    })
}

start();
