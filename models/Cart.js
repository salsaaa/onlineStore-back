const mongoose = require("mongoose");
const _ = require('lodash')
const Cart = mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: 'User'
    },
    products: [{
      productId: {
        type: mongoose.ObjectId,
        ref: 'Product'
      },
      actual_qnt: { type: Number, required: false},
    }
  ],

  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Cart', Cart);

