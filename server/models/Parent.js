const { Schema, model } = require('mongoose');
const BaseUser = require('./BaseUser')



const parentSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
    rewards: [{type: Schema.Types.ObjectId, ref: 'Reward'}],
    kids: [{type: Schema.Types.ObjectId, ref: 'Child'}]
})








const Parent = BaseUser.discriminator('Parent', parentSchema )



module.exports = Parent