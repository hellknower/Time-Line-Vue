const mongoose = require('mongoose');

const DB_NAME = 'timeLine';
const DB_URL = 'localhost:27017';

const options = {
    useNewUrlParser:true,
    useUnifiedTopology: true
}

const dbPromise = mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`,options);

module.exports = dbPromise;