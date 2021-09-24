import mongoose from 'mongoose';
const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Wymagana nazwa'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

export default mongoose.model('Shop', ShopSchema)
