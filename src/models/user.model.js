const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const roles = [
  'user', 'admin',
];

const genders = [
  'male',
  'female',
];

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    sparse: true,
  },
  phone: {
    type: String,
    unique: true,
    lowercase: true,
    sparse: true,
  },
  username: {
    type: String,
    maxlength: 50,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 50,
    default: null,
  },
  firstName: {
    type: String,
    maxlength: 50,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  gender: {
    type: String,
    enum: genders,
  },
  bio: {
    type: String,
    min: 10,
    max: 200,
  },
  dob: {
    type: Date,
  },
  avatar: {
    type: String,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: 'user',
    enum: roles,
  },
  interests: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Interest',
  }],
}, {
  timestamps: true,
});

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = bcrypt.hashSync(this.password);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  getUserInfo() {
    return {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username || null,
      email: this.email || null,
      phone: this.phone || null,
      passwordSet: !!this.password,
    };
  },

  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },
});

// userSchema.statics = {
//   roles,

//   checkDuplicateEmailError (err) {
//     if (err.code === 11000) {
//       var error = new Error('Email already taken')
//       error.errors = [{
//         field: 'email',
//         location: 'body',
//         messages: ['Email already taken']
//       }]
//       error.status = httpStatus.CONFLICT
//       return error
//     }

//     return err
//   },

//   async findAndGenerateToken (payload) {
//     const { email, password } = payload
//     if (!email) throw new APIError('Email must be provided for login')

//     const user = await this.findOne({ email }).exec()
//     if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

//     const passwordOK = await user.passwordMatches(password)

//     if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED)

//     if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)

//     return user
//   }
// }

module.exports = mongoose.model('User', userSchema);
