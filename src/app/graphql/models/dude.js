import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

const dudeSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'No valid email address provided.'],
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 42,
  },
  role: {
    type: String,
  },
});

dudeSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

dudeSchema.pre('remove', function(next) {
  this.model('Message').deleteMany({ userId: this._id }, next);
});

dudeSchema.pre('save', async function() {
  this.password = await this.generatePasswordHash();
});

dudeSchema.methods.generatePasswordHash = async function() {
  const saltRounds = 10;
  return await bcrypt.hash(this.password, saltRounds);
};

dudeSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const Dude = mongoose.model('Dude', dudeSchema);

export default Dude;
