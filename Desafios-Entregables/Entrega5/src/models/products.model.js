import mongoose from 'mongoose';

const productsCollection = "products";

const productschema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true },
    code: {type: String, required: true},
    category: { type: String, required: true, enum: [ 'Ropa', 'Deportes', 'Cosmetica' ] },
    stock: { type: Number, required: true }
});

export const productsModel = mongoose.model(productsCollection, productschema);