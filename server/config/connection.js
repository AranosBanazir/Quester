const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://calebsaiia:pOyjCoyIaztjkezD@quester.rdcej.mongodb.net/');

module.exports = mongoose.connection;
