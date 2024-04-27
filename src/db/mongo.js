const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bilalddr0:eN9MdBflGsKZInHg@cluster0.5yis8ea.mongodb.net/').then(console.log("Connect DB"))

module.exports = mongoose;