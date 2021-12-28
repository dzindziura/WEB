const productRouter = require('./product.router');
const router = require('express').Router({strict: true});

router.use('/products', productRouter);

module.exports = router;
