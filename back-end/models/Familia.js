const banco = require("../database/db.js");
const Sequelize = require("sequelize");

const Familia = banco.define("familia", {
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
    }
});

module.exports = Familia;