var express = require("express");
var router = express.Router();
var Cart = require('../models/Cart');
var User = require("./user");
cons = require('../middleware/authenticatio')


router.post("/", function (req, res) {
  const { userId,products } = req.body;
  const NewCart = new Cart({
    userId,
    products
  });
  NewCart.save()
    .then((data) => {
      res.send({ message: "Cart was added successfully", data });
    })
    .catch(e => res.send({ error: e.message }));



});
router.get("/", (req, res, next) => {
  Cart.find().then((data) => {
    res.send(data);
  }).catch((err) => {
    next(err);
  })
});

//get Cart by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const Carts = await Cart.find({ _id: id })

    res.json(Carts);
  }
  catch (err) {
    next(err);
  }

})
//edit Cart
router.patch("/:id", function (req, res) {
  const id = req.params.id;
  const { products } = req.body;
  Cart.findByIdAndUpdate(
    { _id: id },
    {
      products
    },
    { new: true, omitUndefined: true, runValidators: true },
    (err, data) => {
      if (err) {
        console.log(err);
        res.statusCode = 401;
        res.send("Cart is not exist");
      } else {
        res.send({ msg: "Cart was edited successfully", userUdated: data });
      }
    }
  );
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  Cart.findByIdAndDelete({ _id: id }, (err, data) => {
    if (err) {
      res.send("Cart is not exist");
    } else {
      res.send("deleted successfully");
    }

  });

});
module.exports = router;