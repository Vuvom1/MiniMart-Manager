const { default: mongoose } = require('mongoose');
require(`dotenv`).config();

const connectDB = async () => {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster01.on4em.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`).then(() => {
        console.log('Connect to MongoDB success');
    })
    .catch((err) => {
        console.log(err);
    })
};

module.exports = connectDB;

