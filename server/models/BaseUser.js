const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const baseUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

// set up pre-save middleware to create password
const saltRounds = 10;
baseUserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

baseUserSchema.pre('findOneAndUpdate', async function (next){
  const incomingPass = this._update.password
  const hashedPass = await bcrypt.hash(incomingPass, saltRounds)
  console.log(this)
  if (incomingPass){
    this.set({
      password: hashedPass
    })
  }
  next()
})

// compare the incoming password with the hashed password
baseUserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const BaseUser = model('User', baseUserSchema);

module.exports = BaseUser;
