const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.set('strictQuery', true);
const dbConn = async () => {
    try {
        mongoose.connect(process.env.MONGOOSE_URL, { useUnifiedTopology: true });
        console.log(`Connected to DB ${process.env.MONGOOSE}`);
    } catch (err) {
        console.log(err);
    }
};

module.exports = dbConn;