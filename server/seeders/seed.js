const db = require('../config/connection');
const { BaseUser, Child } = require('../models');
// const cleanDB = require('./cleanDB');
// const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await BaseUser.deleteMany()
    await Child.create({
        name: 'Child',
        password: '12345asdfasdf',


    });

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
