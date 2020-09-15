/**
 * 
 * ruta api/uploads
 */
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

// Middleware para subir imagenes en nuestra ruta
router.use(expressFileUpload());

/* APP RUTAS PROTEGIDAS CON JWT*/

router.put('/:tipo/:id', [validarJWT] ,fileUpload);
router.get('/:tipo/:foto' ,retornaImagen);
module.exports = router;