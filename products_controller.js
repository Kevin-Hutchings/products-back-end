const createProduct = (req, res) => {
   const db = req.app.get('db');
   const {
      name,
      description,
      price,
      image_url,
   } = req.body;

   db.create_product(name, description, price, image_url)
   .then(() => {
      res.sendStatus(200)
   })
   .catch((e) => {
      res.status(500).json({message: "Something went wrong :("});
      console.log(e)
   });
};

const getOneProduct = (req, res) => {
   const db = req.app.get('db');
   const { id } = req.params;

   db.read_product(id)
   .then((product) => {
      res.status(200).json(product)
   })
   .catch((e) => {
      res.status(500).json({message: "Sorry, we couldn't find that product"});
      console.log(e)
   });
};

const getAllProducts = (req, res) => {
   const db = req.app.get('db');

   db.read_products()
   .then((product) => {
      res.status(200).json(product)
   })
   .catch((e) => {
      res.status(500).json({message: "Something went wrong :("});
      console.log(e)
   });
};

const updateProduct = (req, res) => {
   const db = req.app.get('db');
   const { description } = req.query;
   const { id } = req.params;

   db.update_products(id, description)
   .then(() => res.sendStatus(200))
   .catch((e) => {
      res.status(500).json({message: "Unable to update product"});
      console.log(e)
   });
};

const deleteProduct = (req, res) => {
   const db = req.app.get('db');
   const { id } = req.params;

   db.delete_product(id)
   .then(() => res.sendStatus(200))
   .catch((e) => {
      res.status(500).json({message: "Unable to delete product"});
      console.log(e)
   });
};

module.exports = {
   createProduct,
   getOneProduct,
   getAllProducts,
   updateProduct,
   deleteProduct,
}