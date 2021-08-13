require('dotenv').config();
const express = require('express');
const massive = require('massive');

const {
   getAllProducts,
   getOneProduct,
   createProduct,
   updateProduct,
   deleteProduct,
} = require('./products_controller');

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
   connectionString: CONNECTION_STRING,
   ssl: {
      rejectUnauthorized: false
   }
})
.then((dbInstance) => {
   app.set("db", dbInstance);
   console.log('Database connection successful.')
})
.catch((e) => console.log('DB connection problem', e));

app.use(express.json());

app.get('/api/products', getAllProducts);
app.get('/api/products/:id', getOneProduct);
app.post('/api/products', createProduct);
app.put('/api/products/:id', updateProduct);
app.delete('/api/products/:id', deleteProduct);

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}.`))