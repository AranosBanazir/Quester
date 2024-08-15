const { Schema, model } = require('mongoose');


const taskSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    points:{
        //points earned from doing a task
        type: Number,
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
    childConfirmed:{
        type: Boolean,
        default: false
    },
    parentConfirmed:{
        type: Boolean,
        default: false
    }
})

//resets the confirm for both Parent/Child
taskSchema.methods.resetTask = async function () {
    //returning false if there are not enough funds
    this.childConfirmed = false
    this.parentConfirmed = false
    await this.save()
    return true
  };

const Task =  model('Task', taskSchema)


module.exports = Task