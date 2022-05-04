const Role = require('../models/role');

const esRoleValido = async (nombre = '') => {
    const existeRol = await Role.findOne({ nombre });
    if (!existeRol) {
        throw new Error(`El rol ${nombre } no está registrado en la BD`);
    }
}

module.exports = esRoleValido;