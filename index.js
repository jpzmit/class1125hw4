const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://jzadmin:zhoupu2008@testcluster.apdsu.mongodb.net/class1125");
//create data schema
const ContactSchema ={
    FirstName:String,
    LastName:String,
    PhoneNumber: Number,
    Email:String,
    University: String,
    Major: String
}
const contact = mongoose.model("contact",ContactSchema);

app.set('view engine','ejs');
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get('/show',(req,res)=>{
    contact.find({},(err,contact)=>{
        res.render('index',{
            contactlist: contact
        });
    })
})

app.post("/",(req, res)=>{
    let newContact = new contact({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        PhoneNumber: req.body.PhoneNumber,
        Email: req.body.Email,
        University: req.body.University,
        Major: req.body.Major
    })
    newContact.save();
    res.redirect("/");
});

app.listen(3000, ()=>{
    console.log('listening to port 3000')
});

