const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({    
    companyName: { type: String, unique: true, required: true },
    purchaseDate: { type: Date, required: true },
    quantity: { type: Number, required: true },
    purchaseRate: { type: Number, required: true },
   
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserStock', schema);