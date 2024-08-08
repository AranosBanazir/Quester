const { Schema } = require('mongoose');
const BaseUser = require('./BaseUser')



const childSchema = new Schema({
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    inventory: [{type: Schema.Types.ObjectId, ref: 'Reward'}],
    wallet: {
        type: Number,
        default: 0
    }
})








const Child = BaseUser.discriminator('Child', childSchema )



module.exports = Child