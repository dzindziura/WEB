const ProductModel = require('../database/models/Product');
const OrderModel = require('../database/models/Order');
const router = require('express').Router({strict: true});

router.get('/', async (req, res) => {
  try {
    const filter = req.query;

    const products = await ProductModel.find(filter);
    res.json(products);
  } catch (e) {
    console.log('products GET error: ', e.message);
    res.status(400).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const product = await ProductModel.findById(id);
    res.json(product);
  } catch (e) {
    console.log('products GET error: ', e.message);
    res.status(400).send();
  }
});

router.post('/', async (req, res) => {
  try {
    let newProduct = req.body;

    newProduct = await ProductModel.create(newProduct);

    res.json(newProduct);
  } catch (e) {
    console.log('products POST error: ', e.message);
    res.status(400).send(e.message);
  }
});

router.put('/', async (req, res) => {
  try {
    const {id, data} = req.body;

    await ProductModel.findByIdAndUpdate(id, data);

    res.send();
  } catch (e) {
    console.log('products PUT error: ', e.message);
    res.status(400).send(e.message);
  }
})

router.delete('/', async (req, res) => {
  const {id} = req.body;

  ProductModel.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log('products DELETE error: ', err.message);
      res.status(400).send(err.message);
    }
    else {
      res.send();
    }
  });
})

router.post('/order', async (req, res) => {
  try {
    const newOrder = req.body;

    await OrderModel.create(newOrder);

    res.send();
  } catch (e) {
    console.log('order POST error: ', e.message);
    res.status(400).send(e.message);
  }
})

module.exports = router;
