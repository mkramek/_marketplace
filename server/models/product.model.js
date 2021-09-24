import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema({
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
    category: {
        type: String
    },
    quantity: {
        type: Number,
        required: "Podaj ilość"
    },
    price: {
        type: Number,
        required: "Wymagana cena"
    },
    unit: {
    	type: String,
    	required: "Wymagana jednostka"
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' }
})

export default mongoose.model('Product', ProductSchema)
