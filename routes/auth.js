/*

    Rutas de Usuarios / Auth
    host + /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');


const router = Router();



router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres mínimo').isLength({ min: 6 }),
        validarCampos
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres mínimo').isLength({ min: 6 }),
        validarCampos
    ],
    loginUser
);

router.get('/renew', revalidateToken);


module.exports = router;