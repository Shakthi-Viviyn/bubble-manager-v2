import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';
import {config} from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

config();
const saltRounds = 8;

const __dirname = dirname(fileURLToPath(import.meta.url));

mongoose.connect(`mongodb+srv://bubblemanageradmin:${process.env.mongoPassword}@devdatacluster.gruur93.mongodb.net/BubbleDB`);

const bubbleSchema = new mongoose.Schema({
    name: String,
    color: String,
    date: String,
    description: String,
    timeRequired: String
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    bubbles: [bubbleSchema]
});

const User = mongoose.model("User", userSchema);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use(express.json());

let username;
// custom middleware to authenticate user
app.use((req, res, next) => {
    if (req.path === "/login" || req.path === "/signup"){
        next();
        return;
    }
    let token = req.headers.authorization;
    if (!token){
        res.redirect("/login");
        return;
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err){
            res.redirect("/login");
            return;
        }
        username = decoded["username"];
        next();
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    (async () => {
        let userData = await User.find({username: username}, {username: 1, password: 1});
        if (userData.length === 0){
            res.status(401).json({error: "Username or password is incorrect"});
            return;
        }
        let hash = userData[0].password;
        bcrypt.compare(password, hash, (err, result) => {
            if (result){
                let token = jwt.sign({username: username}, process.env.jwtSecret, {expiresIn: '2d'});
                res.status(200).json({token: token, message: "Login successful"});
            }else{
                console.log(err);
                res.status(401).json({error: "Username or password is incorrect"});
            }
        })
    })()
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // additional server side checks for username and password
    if (username === ""){
        res.status(400).json({error: "Please enter a username."});
        return;
    }
    if (password === ""){
        res.status(400).json({error: "Please enter a password."});
        return;
    }
    (async () => {
        //Username already exsists check
        let existingUser = await User.find({username: username}, {username: 1});
        if (existingUser.length > 0){
            res.status(409).json({error: "Username already taken"});
            return;
        }
        // Create a hash for the password
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (!err){
                let newUser = new User({
                    username: username,
                    password: hash,
                    bubbles: [
                        {
                            "name": "Hover me",
                            "color": "#3DC7C7",
                            "date": "2023-11-05",
                            "description": "Double click to pop your task bubble",
                            "timeRequired": "",

                        },
                        {
                            "name": "Me too",
                            "color": "#D4DC6C",
                            "date": "2023-11-05",
                            "description": "Click the plus icon to add tasks. Name, description & data are mandatory.",
                            "timeRequired": "",
                        },
                        {
                            "name": "And me",
                            "color": "#67BB6D",
                            "date": "2023-11-05",
                            "description": "There is limit on the length of name and description. And yes you can choose color of the bubbles.",
                            "timeRequired": "",
                        },
                        {
                            "name": "Hello",
                            "color": "#9292C8",
                            "date": "2099-12-31",
                            "description": "There is more. The size of bubbles change dynamically based on the deadline to help you identify the most important tasks.",
                            "timeRequired": "",
                        },
                        {
                            "name": "Enjoy 🥳",
                            "color": "#DB5657",
                            "date": "2099-12-31",
                            "description": "Have fun and if you want to leave you can logout using the menu.",
                            "timeRequired": "",
                        },
                        {
                            "name": "1️⃣2️⃣3️⃣",
                            "color": "#3DC7C7",
                            "date": "2099-12-31",
                            "description": "Yes there are three sizes.",
                            "timeRequired": "",
                        },
                        {
                            "name": "Welcome",
                            "color": "#DB5657",
                            "date": "2023-11-05",
                            "description": "Hi this is your bubble manager. And no, this is not your regular task manager. It is much better.",
                            "timeRequired": "",
                        }
                    ]
                });
                //Save the userData to the database
                newUser.save();
                res.status(200).send({message: "User created successfully."});
            }else{
                console.log(err);
                res.status(500).json({error: "Please try again later"});
            }
        });
        
    })()
});

app.get("/data", (req, res) => {
    (async () => {
        try{
            let user = await User.find({username: username}, {_id: 0, bubbles: 1});
            if (user != []) {
                // deep copying the array of tasks
                let bubbleData = JSON.parse(JSON.stringify(user[0].bubbles).replace(/_id/g, "id"));
                res.json(bubbleData)
                return;
            }
            res.status(401).json({error: "Login in again"})
        }catch(err){
            console.log(err);
            res.status(500).json({error: "Please try again later"});
        }
    })();
});

app.post("/data", (req, res) => {
    let bubbleData = req.body;
    (async () => {
        try{
            let user = await User.findOne({username: username});
            user.bubbles.push(bubbleData);
            user.save();
            let newBubble = user.bubbles[user.bubbles.length - 1];
            res.json({id: newBubble._id});
        }catch(err){
            console.log(err);
            res.status(500).json({error: "Please try again later"});
        }
    })()
});

app.delete("/data", (req, res) => {
    let bubbleId = req.body.id;
    try{
        (async () => {
            await User.findOneAndUpdate({username: username}, {$pull: {bubbles: {_id: bubbleId}}});
            res.json({message: "Bubble deleted successfully"});
        })()
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Please try again later"});
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});