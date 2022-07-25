const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactdance');
}

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    concern: String
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body);
    mydata.save().then( ()=>{
        res.send("This item is save to the database")
    }).catch(() =>{
        res.status(400).send("sorry item is not sve in your database")
    });

    // res.status(200).render('contact.pug');
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});