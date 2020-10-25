var express = require("express");
const { check } = require("express-validator");
var cors = require("cors");
var router = express.Router();
var User = require("../models/User");
const customErr = require("../helper/customError");
const authenticationMiddleware = require("../middleware/authenticatio");
const validationMiddlware = require("../middleware/validation");
const CartRouter = require('./cart')
var Cart = require('../models/Cart');

router.use(express.json());

router.use(cors());

router.get("/", (req, res, next) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
});
//get user by id
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  User.find({ _id: id })
    .then((data) => {
      res.send(data);

    })
    .catch((err) => {
      next(err);
    });
});
//create user or register
router.post("/",
  async (req, res, next) => {
    const { user, products } = req.body;
    const NewUser = await new User(user).save();
    const NewCart = await new Cart({
      userId: NewUser._id,
      products
    }).save()
    if(NewCart){
      res.json("user and his cart added successfully");

    }else{
      throw customErr("bad request", 400);
    }

  }
);
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw customErr("wrong email or password", 401);
  const isMatched = await user.comparePassword(password); //password
  if (!isMatched) throw customErr("wrong email or password ", 401);
  const token = await user.generateToken();

  res.json({ user, token });
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  User.findByIdAndDelete({ _id: id }, (err, data) => { })
    .then(() => {
      res.send("deleted successfully");
    })
    .catch((err) => {
      throw customErr("User is not exist", 403);
    });
});

router.patch(
  "/:id",
  function (req, res) {
    const id = req.params.id;
    const { email, address, name, note, phone } = req.body;
    User.findByIdAndUpdate(
      id,
      {
        email, address, name, note, phone
      },
      { new: true, omitUndefined: true, runValidators: true },
      (err, data) => {
        if (err) {
          res.send("User is not exist");
        } else {
          res.send({ msg: "user was edited successfully", userUdated: data });
        }
      }
    );
  }
);
module.exports = router;
