const banco = require("../database/db.js");
const Sequelize = require("sequelize");
const Familia = require("./Familia.js");

const Personagem = banco.define("personagem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    },

    sexo: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    },

    estadoVida: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: false
    },

    titulos: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: false
    }
});

Personagem.belongsTo(Familia, {
    as: "familia",
    foreignKey: "idFamilia"
});

Familia.hasMany(Personagem, {
    as: "personagens",
    foreignKey: "idFamilia"
});

module.exports = Personagem;