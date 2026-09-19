const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  title: { type: String, required: true },

  description: { type: String, required: true },

  price: { type: Number, required: true, min: 0 },

  stock: { type: Number, required: true, min: 0 },

  rate: { type: Number, min: 0, max: 5, default: 0 },

  category: { type: String, required: true },

  images: [
    {
      url: {
        type: String,
        required: true
      },

      public_id: {
        type: String,
        required: true
      }
    }
  ]

}, 

{ timestamps: true });

module.exports = mongoose.model('Product', productSchema);