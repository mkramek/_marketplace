import mongoose from 'mongoose';
const CartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    quantity: Number,
    shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' },
    status: {
        type: String,
        default: 'Not processed',
        enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
})
const CartItem = mongoose.model('CartItem', CartItemSchema)
const OrderSchema = new mongoose.Schema({
    products: [CartItemSchema],
    customer_name: {
        type: String,
        trim: true,
        required: 'Wymagana nazwa'
    },
    customer_email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Podaj właściwy adres Email'],
        required: 'Wymagany Email'
    },
    delivery_address: {
        street: { type: String, required: 'Wymagana nazwa ulicy' },
        city: { type: String, required: 'Wymagana nazwa miasta' },
        state: { type: String },
        zipcode: { type: String, required: 'Wymagany kod pocztowy' },
        country: { type: String, required: 'Wymagane podanie nazwy kraju' }
    },
    payment_id: {},
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

const Order = mongoose.model('Order', OrderSchema)

export { Order, CartItem }
