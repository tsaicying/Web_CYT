import express from "express";
import bodyParser from "body-parser";
import { Client } from "pg";
import dotenv from 'dotenv';

dotenv.config()
console.log(process.env.HOST)

const db = new Client({
    user: "message_yb22_user",
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.POSTGRES_PW,
    port: process.env.DB_PORT || 5432,
    ssl:{require: true, rejectUnauthorized: false }
})


db.connect();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({entended:true}));

app.get("/", (req, res)=> {
    res.render("index.ejs");
})

app.get("/about", (req, res)=> {
    res.render("partials/about.ejs");
})

app.get("/contacts", (req, res)=> {
    res.render("partials/contacts.ejs");
})

app.post("/contacts", (req, res)=>{
    db.query("INSERT INTO message (name, email, message) VALUES ($1, $2, $3)", [req.body.name, req.body.email, req.body.textarea])
    res.render("partials/submit.ejs");
})

app.listen(port, ()=>{
    console.log(`app is listing on port ${port}`);
})