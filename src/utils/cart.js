import Cart from "../models/cart";
import mongoose from "mongoose";
import Product from "../models/product";

// removing a value from array
Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

export const createCart = async (userId) => {
  const newCart = new Cart({
    user: userId,
  });

  const cart = await newCart.save();
  return cart;
};

export const refreshCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  let totalPrice = 0;
  let totalQty = 0;

  for (let productId of cart.products) {
    let product = await Product.findById(productId._id);

    if (product === null || product.isDisable === true || productId.Qty === 0)
      cart.products.remove(productId);
    else {
      if (product.quantity >= productId.Qty) productId.isAvailable = true;
      else productId.isAvailable = false;
      totalPrice += product.price * productId.Qty;
      totalQty += productId.Qty;
    }
  }

  cart.totalPrice = totalPrice;
  cart.totalQty = totalQty;

  await cart.save();

  let result = await Cart.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "products._id",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $project: {
        products: {
          _id: 1,
          name: 1,
          price: 1,
          thumbnail: 1,
        },
        totalPrice: 1,
        totalQty: 1,
        updatedAt: 1,
      },
    },
  ]);

  for (let product of result[0].products) {
    let cartProduct = cart.products.find(
      ({ _id }) => _id.toString() === product._id.toString()
    );
    product.Qty = cartProduct.Qty;
    product.isAvailable = cartProduct.isAvailable;
  }

  return result;
};