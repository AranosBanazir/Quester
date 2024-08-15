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




childSchema.methods.buyReward = async function (cost) {
    //returning false if there are not enough funds
    if (cost > this.wallet){
        return false
    }
    this.wallet = this.wallet - cost

    await this.save()
    return true
    
  };

  //TODO This has not been tested
  childSchema.methods.payForTask = async function (points) {
    //returning false if there are not enough funds
    this.wallet = this.wallet + points
    await this.save()
    return true
    
  };

  

const Child = BaseUser.discriminator('Child', childSchema )



module.exports = Child