const express = require('express');
const app = express();
const path = require('path');
const Picblog = require('./models/picblog');
const cities = require('./seeds/cities')

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

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/picblogs', async (req, res) => {
    const picblogs = await Picblog.find({});
    res.render('picblogs/index', { picblogs })
});

// app.get('/makepicblog', async (req, res) => {
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const pic = new Picblog({
//             location: `${cities[random1000].city}, ${cities[random1000].state}`
//         })
//         await pic.save();
//         res.send(pic);
//     }
    // const random1000 = Math.floor(Math.random() * 1000);
    // const pic = new Picblog({
    //     title: 'Califonia'
    // })
    // await pic.save();
    // res.send(pic);
// })

app.get('/picblogs/new', (req, res) => {
    res.render('picblogs/new');
})

app.post('/picblogs', async (req, res) => {
    const pic = new Picblog(req.body.pic);
    await pic.save();
    res.redirect(`/picblogs/${pic._id}`)
})

app.get('/picblogs/:id', async (req, res) => {
    const pic = await Picblog.findById(req.params.id);
    res.render('picblogs/show', { pic });
})

app.listen(3000, () => {
    console.log('Live on 3000')
});