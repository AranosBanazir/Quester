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
    // deadline:{
    //     type: Date
    // }  
})



const Task =  model('Task', taskSchema)


module.exports = Task