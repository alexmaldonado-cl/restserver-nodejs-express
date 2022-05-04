const Role    = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (nombre = '') => {
    const existeRol = await Role.findOne({ nombre });
    if (!existeRol) {
        throw new Error(`El rol ${nombre } no está registrado en la BD`);
    }
}

const existeEmail = async (correo) => {
    const existeEmailBD = await Usuario.findOne({ correo });
    if (existeEmailBD) {
        throw new Error(`El correo ${correo } ya se encuentra registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeusuario = await Usuario.findById(id);
    if (!existeusuario) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
};