import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: '.env' })

const port = 3000;
const app = express();

const db = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
    port: process.env.PORT,
    ssl: { require: true, rejectUnauthorized: false },
    idleTimeoutMillis: 30000
})

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res)=> {
    res.render("index.ejs");
})

app.get("/about", (req, res)=> {
    res.render("partials/about.ejs");
})

app.get("/contacts", (req, res)=> {
    res.render("partials/contacts.ejs");
})

app.post("/contacts", async(req, res)=>{
    try{
        const {name, email, textarea} = req.body
        await db.query("INSERT INTO message (name, email, message) VALUES ($1, $2, $3)", [name, email, textarea])
        res.render("partials/submit.ejs")
    } catch(err) {
        console.log(err);
        res.redirect("/");
    };

})

app.listen(port, ()=>{
    console.log(`app is listing on port ${port}`);
})