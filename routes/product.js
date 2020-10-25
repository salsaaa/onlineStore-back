var express = require("express");
var router = express.Router();
var Product = require('../models/Product');
var User = require("./user");
const authenticationMiddleware = require('../middleware/authenticatio')


router.post("/", function (req, res) {
    const { name, picture, category, price, avail_qnt, actual_qnt,stars,currency } = req.body;
    const NewProduct = new Product({
        name, picture, category, price, avail_qnt, actual_qnt,stars,currency
    });
    NewProduct.save()
        .then((data) => {
            res.send({ message: "Product was added successfully", data });
        })
        .catch(e => res.send({ error: e.message }));



});
router.get("/", (req, res, next) => {
    Product.find().then((data) => {
        res.send(data);
    }).catch((err) => {
        next(err);
    })
});

//get Product by id
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const Products = await Product.find({ _id: id })

        res.json(Products);
    }
    catch (err) {
        next(err);
    }

})
//edit Product
router.patch("/:id", function (req, res) {
    const id = req.params.id;
    const { name, picture, category, price, avail_qnt, actual_qnt,stars,currency} = req.body;
    Product.findByIdAndUpdate(
        { _id: id },
        {
            name, picture, category, price, avail_qnt, actual_qnt,stars,currency

        },
        { new: true, omitUndefined: true, runValidators: true },
        (err, data) => {
            if (err) {
                console.log(err);
                res.statusCode = 401;
                res.send("Product is not exist");
            } else {
                res.send({ msg: "Product was edited successfully", userUdated: data });
            }
        }
    );
});

router.delete("/:id", function (req, res) {
    const id = req.params.id;
    Product.findByIdAndDelete({ _id: id }, (err, data) => {
        if (err) {
            res.send("Product is not exist");
        } else {
            res.send("deleted successfully");
        }

    });

});
module.exports = router;