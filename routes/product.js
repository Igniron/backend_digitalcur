const {Router} = require('express')
const router = Router();
const { body, validationResult, check } = require('express-validator');
const { newProduct, updateProduct, deleteProduct, getProducts } = require('../controllers/product')
//Middleware
const { fileValidator } = require('../middlewares/filevalidator');
const Product = require('../models/Product');


router.get('/', getProducts)

router.post('/new',
[
    check('name', 'El nombre es obligatorio').isLength({ min: 1, max: 50 }),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('description', 'La categoria es obligatoria').not().isEmpty(),
    check('price', 'La categoria es obligatoria').not().isEmpty(),
    check('membership_price', 'El precio con membresia es obligatorio').not().isEmpty(),
    check('offer', 'La categoria es obligatoria').not().isEmpty(),
    check('prominent', 'Tienes que decir si el producto es destacable, es obligatorio').not().isEmpty(),
    fileValidator,
], newProduct)

router.put('/:productId', updateProduct)

router.delete('/:productId', deleteProduct)
module.exports = router;
    