import Category from "../models/category";
import Product from "../models/product";
import { unlinkSync } from "fs";

export const readAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.send(error);
  }
};

export const readProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.send(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      categoryId: req.body.categoryId,
      price: req.body.price,
      quantity: req.body.quantity,
      images: [
        { imageURL: "first image", isMain: true },
        { imageURL: "2 image" },
        { imageURL: "3 image" },
        { imageURL: "4 image" },
      ],
      thumbnail: "imageURL created by multer service...",
      description: req.body.description,
    });
    if (await checkCategoryId(newProduct.categoryId)) {
      return res.send("invalid Categoryid");
    }
    let product = await newProduct.save();
    res.json(product);
  } catch (error) {
    res.send(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    // if(product.thumbnail)
    // unlinkSync(`${__dirname}/../../public/image/category/${product.thumbnail}`);
    // for(let image of product.images){
    // unlinkSync(`${__dirname}/../../public/image/category/${image}`);
    // }
    product.deleteOne();
    res.send("product deleted successfully");
  } catch (error) {
    res.send(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    let name = req.body.name ? req.body.name : product.name;
    let categoryId = req.body.categoryId
      ? req.body.categoryId
      : product.categoryId;
    let price = req.body.price ? req.body.price : product.price;
    let quantity = req.body.quantity ? req.body.quantity : product.quantity;
    let description = req.body.description
      ? req.body.description
      : product.description;

    if (await checkCategoryId(categoryId)) {
      return res.send("invalid Categoryid");
    }

    await product.updateOne(
      {
        name: name,
        categoryId: categoryId,
        price: price,
        quantity: quantity,
        description: description,
      },
      { new: true, useFindAndModify: false }
    );
    const updatedProduct = await Product.findById(req.params.productId);

    res.json(updatedProduct);
  } catch (error) {
    res.send(error);
  }
};

const checkCategoryId = async (categoryIds) => {
  for (let category of categoryIds) {
    let check = await Category.findById(category);
    if (check === null) {
      return true;
    }
  }
  return false;
};