const mongoose = require("mongoose");
const _ = require('lodash')
const Product = mongoose.Schema(
    {
        name: { type: String, required: true,unique: true },
        picture: { type: String, required: false },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        stars: { type: Number, required: false },
        currency: { type: String, required: false },
        avail_qnt: { type: Number, required: true },
        actual_qnt: { type: Number, required: false, default: 0 },

    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Product', Product);

