const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res= response) => {
    const busqueda = req.params.busqueda;

    //expresion regular para la busqueda (i) => insensible
    const  regex = new RegExp(busqueda, 'i');

    //busqueda de usuarios, hospitales, medicos
    const [usuarios, hospitales,medicos] = await Promise.all([
         Usuario.find({nombre: regex}),
         Hospital.find({nombre: regex}),
         Medico.find({nombre: regex}),
    ]);
    res.status(200).json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}
const getDocumentosColeccion = async (req, res= response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    //expresion regular para la busqueda (i) => insensible
    const  regex = new RegExp(busqueda, 'i');

    let data = [];
    switch (tabla) {
        case 'medicos':
             data = await Medico.find({nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital','nombre img');
        break;
        case 'hospitales':
            data = await  Hospital.find({nombre: regex})
                                  .populate('usuario', 'nombre img')
        break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex})
        break;
        default:
           return res.status(400).json({
                ok: false,
                msg:'La tabla tiene que ser usuarios/medicos/hospitales'
            });
        
    }
    //busqueda de usuarios, hospitales, medicos
    res.status(200).json({
        ok: true,
        resultados: data
    })
}
module.exports = {
    getTodo,
    getDocumentosColeccion
}