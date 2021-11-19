const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Clowns_Store', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect thanh cong')
    } catch (error) {
        console.log('Connect that bai')
    }
    
}

module.exports = { connect }