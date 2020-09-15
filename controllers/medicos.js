const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre')
    res.json ({
        ok: true,
       medicos
    })
}
const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico ({
        usuario: uid,
        ... req.body
    });
    try {
        const medicoDB = await medico.save();
        res.status(200).json ({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            err: error
        })
    }
    
}
const actualizarMedico = async (req, res = response) => {
   
}
const borrarMedico = (req, res = response) => {
    res.json ({
        ok: true,
        msg: 'borrarMedico'
    })
}
module.exports  = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}