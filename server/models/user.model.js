import mongoose from 'mongoose';
import crypto from 'crypto';
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Wymagana Nazwa'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email już istnieje!',
    match: [/.+\@.+\..+/, 'Podaj właściwy Email'],
    required: 'Email jest wymagany'
  },
  hashed_password: {
    type: String,
    required: "Wymagane hasło"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  seller: {
    type: Boolean,
    default: false
  },
  stripe_seller: {},
  stripe_customer: {},
  company_name: {
    type: String,
  },
  company_tax_id: String,
  company_address_line_1: String,
  company_address_line_2: String,
  accept_newsletter: Boolean
})

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

UserSchema.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Hasło musi mieć conajmniej 6 znaków.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Hasło jest wymagane')
  }
}, null)

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)
