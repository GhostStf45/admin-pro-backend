/**
 * Medicos
 * Ruta: 'api/medico'
 */
/**
 * Medicos
 * ruta: 'api/medicos'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require ('../controllers/medicos');

const router = Router();

/* APP RUTAS PROTEGIDAS CON JWT*/

router.get('/' ,getMedicos);
router.post('/',
    [
       validarJWT,
       check('nombre', 'El nombre del medico es necesario').not().notEmpty(),
       check('hospital', 'El hospital id debe de ser valido').isMongoId(),
       validarCampos

    ] 
,crearMedico);
router.put('/:id', 
    [
      
    ] 
,actualizarMedico);

router.delete('/:id' ,borrarMedico);

module.exports = router;