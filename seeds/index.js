const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const server = '127.0.0.1: 27017';
const database = 'yelp-camp';
const Campground = require('../models/campground'); 
mongoose.connect(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", ()=>{
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 20) + 10;
        const camp = new Campground({
            author: '6120ea89b6f60b140c92f144',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quibusdam tenetur in voluptatem hic consequatur ipsam animi, cumque quod laudantium rem dicta ducimus necessitatibus fugit corporis? Corrupti nihil rerum vitae?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dvyelp/image/upload/v1629651585/YelpCamp/p6in6izrkbng5x3os9m2.jpg',
                    filename: 'YelpCamp/p6in6izrkbng5x3os9m2'
                },
                {
                    url: 'https://res.cloudinary.com/dvyelp/image/upload/v1629651586/YelpCamp/a5s3sie9rb7ml59jwwtp.jpg',
                    filename: 'YelpCamp/a5s3sie9rb7ml59jwwtp'
                } 
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})