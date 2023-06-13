const Personagem = require("../models/Personagem.js");

async function criar(personagem) {
	const personagemCriado = await Personagem.create({
		nome: personagem.nome,
		sexo: personagem.sexo,
		estadoVida: personagem.estadoVida,
		titulos: personagem.titulos,
	});

	return personagemCriado;
}

async function editar(personagem) {
	await personagem.save();
}

async function deletar(personagem) {
	await personagem.destroy();
}

async function listarUm(id) {
	return await Personagem.findByPk(id);
}

async function listarTodos() {
	let resultado = await Personagem.findAll();

	resultado = resultado.map(function (personagem) {
		return personagem.dataValues;
	});

	return resultado;
}

async function listarPorNome(nome) {
	return await Personagem.findOne({ where: { nome: nome } });
}

module.exports = { criar, editar, deletar, listarUm, listarPorNome, listarTodos };
