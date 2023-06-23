const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground'); 

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10
        const camp = new Campground({
            author: "6194fe8001efcd608c591282",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita iusto dolorum minima magnam quisquam est, nihil, iure quos ullam dolores doloremque beatae laudantium ipsa? Nobis deserunt aliquid molestias obcaecati cumque',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]


            },
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dqoj20yjf/image/upload/v1637153702/YelpCamp/ak9tzhgc0ektpvl1aieh.jpg',
                    filename: 'YelpCamp/ak9tzhgc0ektpvl1aieh',
                },
                {
                    url: 'https://res.cloudinary.com/dqoj20yjf/image/upload/v1637153702/YelpCamp/dsiaiagaaqcxakbo3v7d.jpg',
                    filename: 'YelpCamp/dsiaiagaaqcxakbo3v7d',
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close() 
})