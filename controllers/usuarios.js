const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {
    const {s, nombre = 'Anonimo', page = 1, limit = 10} = req.query;
    res.json({
        msg: 'get API - Controller',
        s,
        nombre,
        page,
        limit
    });
};

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const usuario = new Usuario({ nombre, correo, password, role });
    
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: "El correo ya está registrado"
        });
    }

    //Encriptar passsword
    const salt       = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
};


const usuariosPut = (req, res = response) => {

    const {id} = req.params;


    res.json({
        msg: 'put API - Controller',
        id
    });
};


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
};


const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}