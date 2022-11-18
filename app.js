const express = require('express');
const app = express();
const path = require('path');
const Picblog = require('./models/picblog');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/pic-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err){
        console.log(err)
    } else {
        console.log('Connected to Database!')
    }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/makepicblog', async (req, res) => {
    const pic = new Picblog({title: 'San Francisco', description:'Weather'});
    await pic.save();
    res.send(pic)
})

app.listen(3000, () => {
    console.log('Live on 3000')
});