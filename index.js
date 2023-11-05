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
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.use(express.json());

let username;
// custom middleware to authenticate user
app.use((req, res, next) => {
    console.log(req.path);
    if (req.path === "/login" || req.path === "/signup"){
        next();
        return;
    }
    let token = req.headers.authorization;
    if (!token){
        res.status(401).json({error: "Please login"});
        return;
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err){
            res.status(401).json({error: "Please login"});
            return;
        }
        username = decoded["username"];
        console.log(username + " verification passed")
        next();
    })
})

var nodes = [
    { name: "aaaaaaa", id: 1, x: 100, y: 100, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "12h 30m" },
    { name: "DHFJGHD", id: 2, x: 200, y: 200, r: 80, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 45m" },
    { name: "JFGHDFG", id: 3, x: 300, y: 300, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 15m" },
    { name: "KJGDFHD", id: 4, x: 400, y: 400, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "10h 0m" },
    { name: "DHFJGHD", id: 5, x: 500, y: 500, r: 80, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 30m" },
    { name: "JFGHDFG", id: 6, x: 600, y: 600, r: 50, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "3h 45m" },
    { name: "KJGDFHD", id: 7, x: 700, y: 700, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 0m" },
    { name: "DHFJGHD", id: 8, x: 800, y: 800, r: 80, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 15m" },
    { name: "JFGHDFG", id: 9, x: 900, y: 900, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 30m" },
    { name: "KJGDFHD", id: 10, x: 100, y: 900, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 15m" },
    { name: "DHFJGHD", id: 11, x: 200, y: 800, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "2h 45m" },
    { name: "JFGHDFG", id: 12, x: 300, y: 700, r: 50, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 0m" },
    { name: "KJGDFHD", id: 13, x: 400, y: 600, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 45m" },
    { name: "DHFJGHD", id: 14, x: 500, y: 500, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "12h 0m" },
    { name: "JFGHDFG", id: 15, x: 600, y: 400, r: 80, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 15m" },
    { name: "KJGDFHD", id: 16, x: 700, y: 300, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 30m" },
    { name: "DHFJGHD", id: 17, x: 800, y: 200, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 45m" },
    { name: "JFGHDFG", id: 18, x: 900, y: 100, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 0m" },
    { name: "KJGDFHD", id: 19, x: 100, y: 100, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "10h 15m" },
    { name: "DHFJGHD", id: 20, x: 200, y: 200, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "3h 30m" },
    { name: "JFGHDFG", id: 21, x: 300, y: 300, r: 50, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "6h 45m" },
    { name: "KJGDFHD", id: 22, x: 400, y: 400, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 0m" },
    { name: "DHFJGHD", id: 23, x: 500, y: 500, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 30m" },
    { name: "JFGHDFG", id: 24, x: 600, y: 600, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "8h 45m" },
    { name: "KJGDFHD", id: 25, x: 700, y: 700, r: 100, color: "#DB5657", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "4h 0m" },
    { name: "DHFJGHD", id: 26, x: 800, y: 800, r: 50, color: "#67BB6D", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "9h 15m" },
    { name: "JFGHDFG", id: 27, x: 900, y: 900, r: 80, color: "#3DC7C7", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "2h 30m" },
    { name: "KJGDFHD", id: 28, x: 100, y: 900, r: 100, color: "#D4DC6C", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "7h 45m" },
    { name: "DHFJGHD", id: 29, x: 200, y: 800, r: 50, color: "#9292C8", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "11h 0m" },
    { name: "JFGHDFG", id: 30, x: 300, y: 700, r: 80, color: "#60DAAC", date: "2023-10-01", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium", timeRequired: "5h 15m" }
];

app.get('/', (req, res) => {
    res.redirect("/login");
    // res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    (async () => {
        let userData = await User.find({username: username}, {username: 1, password: 1});
        console.log(userData);
        if (userData.length === 0){
            res.status(401).json({error: "Username or password is incorrect"});
            return;
        }
        let hash = userData[0].password;
        bcrypt.compare(password, hash, (err, result) => {
            if (result){
                let token = jwt.sign({username: username}, process.env.jwtSecret, {expiresIn: '2d'});
                console.log(token);
                res.status(200).json({token: token, message: "Login successful"});
            }else{
                console.log(err);
                res.status(401).json({error: "Username or password is incorrect"});
            }
        })
    })()
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', (req, res) => {
    console.log(req.body);
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
            console.log(existingUser)
            console.log("Username already exists");
            res.status(409).json({error: "Username already taken"});
            return;
        }
        // Create a hash for the password
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (!err){
                let newUser = new User({
                    username: username,
                    password: hash,
                    bubbles: []
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
        let user = await User.find({username: "shakthi"}, {_id: 0, bubbles: 1});
        // deep copying the array of tasks
        let bubbleData = JSON.parse(JSON.stringify(user[0].bubbles).replace(/_id/g, "id"));
        res.json(bubbleData)
    })();
});

app.post("/data", (req, res) => {
    let bubbleData = req.body;
    console.log(bubbleData);
    (async () => {
        let user = await User.findOne({username: username});
        user.bubbles.push(bubbleData);
        user.save();
        let newBubble = user.bubbles[user.bubbles.length - 1];
        console.log(newBubble._id);
        res.json({id: newBubble._id});
    })()
});

app.delete("/data", (req, res) => {
    let bubbleId = req.body.id;
    console.log(bubbleId);
    (async () => {
        // let user = await User.findOne({username: username});
        // let bubbleIndex = user.bubbles.findIndex((bubble) => {
        //     return bubble._id == bubbleId;
        // });
        // user.bubbles.splice(bubbleIndex, 1);
        // user.save();
        let modifiedUser = await User.findOneAndUpdate({username: username}, {$pull: {bubbles: {_id: bubbleId}}});
        console.log(modifiedUser);
        res.json({message: "Bubble deleted successfully"});
    })()
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});