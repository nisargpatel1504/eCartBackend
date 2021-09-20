const Product = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
  try {
    Product.find((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json(data );
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.getProductById = async (req, res) => {
  const _id = req.params.id;
  try {
    Product.findOne({ _id }, (err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ product: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};

exports.addProduct = async (req, res) => {
  const { title, image, price, rating } = req.body;

  try {
    const product = new Product({
      title,
      image,
      price,
      rating,
    });

    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: err }] });
      }
      return res.status(200).json({ product: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};



exports.deleteProduct = async(req,res) =>{
  try{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).send("Product deleted");

}
catch(err){
res.status(500).send(err)
}
}