const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://admin:kELusSadtqGxJI4A@SG-ClownsStore-48311.servers.mongodirector.com:27017/ClownS_Store')
        console.log('Connect thanh cong')
    } catch (error) {
        console.log('Connect that bai')
    }
    
}

module.exports = { connect }