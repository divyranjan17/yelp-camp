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
    for(let i=0; i<300; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 20) + 10;
        const camp = new Campground({
            author: '6120ea89b6f60b140c92f144', // YOUR USER ID
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, quibusdam tenetur in voluptatem hic consequatur ipsam animi, cumque quod laudantium rem dicta ducimus necessitatibus fugit corporis? Corrupti nihil rerum vitae?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvyelp/image/upload/v1629775258/YelpCamp/xwpoab5ynt4s9uk2tk7y.jpg',
                    filename: 'YelpCamp/xwpoab5ynt4s9uk2tk7y'
                },
                {
                    url: 'https://res.cloudinary.com/dvyelp/image/upload/v1629657671/YelpCamp/x2lime1qhxvjyeiaxsnk.jpg',
                    filename: 'YelpCamp/x2lime1qhxvjyeiaxsnk'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})