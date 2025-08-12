import express from "express";
import bodyParser from "body-parser";

const port = 3000;
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
    console.log(req.body);
})

app.listen(port, ()=>{
    console.log(`app is listing on port ${port}`);
})