const { Router } = require('express');
const { check } = require('express-validator');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
    
const esRoleValido = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'password debe tener más de 6 letras').isLength({ min: 6 }),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);


module.exports = router;