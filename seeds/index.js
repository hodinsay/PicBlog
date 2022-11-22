const Picblog = require('../models/picblog');
const cities = require('./cities')
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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Picblog.deletemany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const pic = new Picblog({
            location: `${cities[random1000].city, $cities[random1000].state}`
        })
        await pic.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

