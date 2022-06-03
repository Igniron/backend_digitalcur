// Rutas de usuarios / Auth
// host + /api/auth


//Dependencias
const {Router} = require('express')
const router = Router();
const { body, validationResult, check } = require('express-validator');

//Rutas
const { createUser, loginUser, renewToken } = require('../controllers/auth')


//Middleware
const { fileValidator } = require('../middlewares/filevalidator')
const { validateJWT } = require('../middlewares/validate-jwt')

    router.post(
    '/new', 
    [ 
        check('name', 'El nombre es obligatorio').not().isEmpty(), 
        check('email', 'El email es obligatorio').isEmail(), 
        check('password', 'El password debe de ser de 5 a 12 caracteres').isLength({ min: 5, max: 12 }),
        fileValidator 
    ],
    createUser)


router.post('/',
[ 
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'El password debe de ser de 5 a 12 caracteres').isLength({ min: 5, max: 12 }),
    fileValidator
],
loginUser)

router.get('/renew', validateJWT, renewToken)

module.exports = router;