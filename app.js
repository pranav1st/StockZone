// Imports
const express = require('express')
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');

//  Local Storage
mongoose.connect('mongodb://localhost:27017/stockdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/*  //  Cloud database
mongoose.connect('mongodb+srv://test123:pass123@cluster0.a1nxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
*/

const app = express()
const port = 5000;

app.use(bodyParser.json())

// Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/js', express.static(__dirname+'public/js'));
app.use('/img', express.static(__dirname+'public/img'));

// Set views
app.set('views','./views');
app.set('view engine','ejs');


app.get('/home',(req, res) =>  {
    res.render('market')
})

app.get('/about',(req, res) =>  {
    res.render('about')
})

app.get('/discover',(req, res) =>  {
    res.render('stock') // discover
})

app.get('/search',(req, res) =>  {
    res.render('search')
})

app.get('/login',(req, res) =>  {
    res.render('login')
})

app.post('/api/register', async (req, res)=> {
    console.log(req.body);
    const {email_id, passwd}   = req.body;
    //const password = await bcrypt.hash(passwd, 10);
    
    try { 
        const response = await User.create({
            email_id,
            passwd
        })
        console.log("User created successfully!", response);
    } catch(err) {
        if (err.code === 11000){
            return res.json({status: 'error', error: 'Email ID already in use.'});
        }
        throw err;
        //return res.json({status: 'error'});
    }

    res.json({status: 'ok'});
})

app.post('/api/login', async (req, res)=> {
    const {email_id, passwd}   = req.body;
    const user = await User.findOne({email_id, passwd}).lean();
    if (!user){
        return res.json({status: 'error', error: 'Invalid credentials.'});
    }

    if (passwd == user.passwd){
        console.log("Login success!")
        return res.json({status: 'ok', data: ''});
    }

})

app.post('/api/search', async (req, res) => {
    console.log("recieved");

})

app.listen(port, () => console.info(`App listening on port ${port}`))
