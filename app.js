const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const express= require("express");
const path=require("path");
const app=express();
const port = 8000;
const bodyparser=require("body-parser")
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
// Defien mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var Contact = mongoose.model('Contact', contactSchema);


// Express specific stuff
// For serving static files
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// Pug specific stuff
// Set the template engine as pug
app.set('view engine','pug')
// Set the views directory
app.set('views',path.join(__dirname,'views'))

//Endpoints
app.get('/',(req,res)=>{
const params={}
res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
const params={}
res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
 var myData=new Contact(req.body);
 myData.save().then(()=>{
    res.send("This item has been saved to the database")

}).catch(()=>{
    res.status(400).send("Item was not saved to the databse")
});

    // res.status(200).render('contact.pug')
})
// Start the server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})
