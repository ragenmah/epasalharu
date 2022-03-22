const Product = require("../models/productModel");

//to post product
exports.postProduct = async (req, res) => {
  let product = new Product({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    countInStock: req.body.countInStock,
    product_description: req.body.product_description,
    product_image: req.file.path,
    product_rating: req.body.product_rating,
    category: req.body.category,
  });
  product = await product.save();
  if (!product) {
    return res.status(400).json({ error: "product not saved" });
  }
  res.send(product);
};

//to fetch all product list
exports.productList = async (req, res) => {
  const product = await Product.find().populate("category", "category_name");
  //static field
  //let ma naya dynamic data aanu paryo
  if (!product) {
    return res
      .status(400)
      .json({ error: "something went wrong - product not fetched " });
  }
  res.send(product);
};

//to fetch single product
exports.productDetails = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "category_name"
  );
  if (!product) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send(product);
};

//to update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      countInStock: req.body.countInStock,
      product_description: req.body.product_description,
      product_image: req.body.product_image,
      product_rating: req.body.product_rating,
      category: req.body.category,
    },
    { new: true }
  );
  if (!product) {
    return res.status(400).json({ error: "Somthing went wrong" });
  }
  res.send(product);
};

//to delete Product
exports.deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(400).json({ error: "product not found" });
      } else {
        return res.status(200).json({ message: "product deleted" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

//to fetch single product
exports.postSearchProduct = async (req, res) => {
  var priceRange = req.body.filters.price;
  var productPrice = req.body.filters.product_price || [];
  var category = req.body.filters.category;
  console.log(category);
  if (category.length != 0) {
    const product = await Product.find({ category: category }).populate(
      "category",
      "category_name"
    );
    return res.status(200).send(product);
  }
  if (productPrice.length === 0) {
    // fetch all product
    const product = await Product.find().populate("category", "category_name");
    return res.status(200).send(product);
  } else if (productPrice.length != 0 && category.length != 0) {
    const product = await Product.findAll({
      product_price: { $gte: productPrice[0], $lte: productPrice[1] },
    }).populate("category", "category_name");
    return res.status(200).send(product);
  } else if (productPrice.length != 0) {
    const product = await Product.find({
      product_price: { $gte: productPrice[0], $lte: productPrice[1] },
    }).populate("category", "category_name");
    return res.status(200).send(product);
  }
  return res
    .status(400)
    .json({ error: "something went wrong - product not fetched " });
};
