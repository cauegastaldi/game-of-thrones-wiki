const router = require("express").Router();
const personagemDao = require("../daos/personagemDao");
const familiaDao = require("../daos/familiaDao");
const { validationResult, check } = require("express-validator");

const formatadorErros = ({ msg }) => {
	return `${msg}`;
};

router.get("/", async (req, res) => {
	let resultado = await personagemDao.listarTodos();

	res.status(200).json({
		personagens: resultado,
	});
});

router.get(
	"/:id",
	check("id")
		.exists()
		.withMessage("ID não pode ser nulo!")
		.isInt()
		.withMessage("ID deve ser um número inteiro!")
		.custom((id) => id > 0)
		.withMessage("ID não pode ser negativo!"),
	async (req, res) => {
		const resultado = validationResult(req).formatWith(formatadorErros);
		try {
			resultado.throw();
			id = req.params.id;
			const personagemBuscado = await personagemDao.listarUm(id);
			if (personagemBuscado != null) {
				res.status(200).json({
					personagem: personagemBuscado,
				});
			} else {
				res.status(400).json({
					codigoErro: "ERRO_PERSONAGEM_NAO_ENCONTRADO",
					dadosErro: `Personagem de id = ${id} não encontrado! Por favor, informe um personagem existente.`,
				});
			}
		} catch (error) {
			res.status(400).json({
				codigoErro: "ERRO_CAMPOS_INVALIDOS",
				dadosErro: error.mapped(),
			});
		}
	}
);

router.post(
	"/",
	check("nome")
		.exists()
		.withMessage("Nome não pode ser nulo!")
		.trim()
		.notEmpty()
		.withMessage("Nome não pode ser vazio!"),
	check("sexo")
		.exists()
		.withMessage("Sexo não pode ser nulo!")
		.trim()
		.notEmpty()
		.withMessage("Sexo não pode ser vazio!")
		.isIn(["Masculino", "Feminino"])
		.withMessage("Sexo precisa ser 'Masculino' ou 'Feminino'"),
	check("estadoVida")
		.exists()
		.withMessage("estadoVida não pode ser nulo!")
		.trim()
		.notEmpty()
		.withMessage("estadoVida não pode ser vazio!")
		.isIn(["Vivo", "Morto"])
		.withMessage("estadoVida precisa ser 'Vivo' ou 'Morto'"),
	check("idFamilia")
		.exists()
		.withMessage("idFamilia não pode ser nulo!")
		.isInt()
		.withMessage("idFamilia deve ser um número inteiro!")
		.custom((id) => id > 0)
		.withMessage("idFamilia não pode ser negativo!"),
	async (req, res) => {
		const resultado = validationResult(req).formatWith(formatadorErros);
		try {
			resultado.throw();
			const nome = req.body.nome;
			const sexo = req.body.sexo;
			const estadoVida = req.body.estadoVida;
			const titulos = req.body.titulos;
			const idFamilia = req.body.idFamilia;
			const familiaBuscada = await familiaDao.listarUm(idFamilia);
			if (familiaBuscada == null) {
				return res.status(400).json({
					codigoErro: "ERRO_FAMILIA_NAO_EXISTENTE",
					dadosErro: `Familia de id = ${idFamilia} não existe! Por favor, informe uma familia existente.`,
				});
			}
			const personagemCriado = await personagemDao.criar({
				nome: nome,
				sexo: sexo,
				estadoVida: estadoVida,
				titulos: titulos,
			});
			personagemCriado.setFamilia(familiaBuscada);
			if (personagemCriado) {
				return res.status(201).json(personagemCriado);
			} else {
				res.status(500).json({
					codigoErro: "ERRO_INTERNO",
					dadosErro: `Personagem não pôde ser criado!`,
				});
			}
		} catch (error) {
			res.status(400).json({
				codigoErro: "ERRO_CAMPOS_INVALIDOS",
				dadosErro: error.mapped(),
			});
		}
	}
);

router.put(
	"/:id",
	check("id")
		.exists()
		.withMessage("ID não pode ser nulo!")
		.isInt()
		.withMessage("ID deve ser um número inteiro!")
		.custom((id) => id > 0)
		.withMessage("ID não pode ser negativo!"),
	check("nome").optional().trim().notEmpty().withMessage("Nome não pode ser vazio!"),
	check("sexo")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Sexo não pode ser vazio!")
		.isIn(["Masculino", "Feminino"])
		.withMessage("Sexo precisa ser 'Masculino' ou 'Feminino'"),
	check("estadoVida")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("estadoVida não pode ser vazio!")
		.isIn(["Vivo", "Morto"])
		.withMessage("estadoVida precisa ser 'Vivo' ou 'Morto'"),
	check("idFamilia")
		.optional()
		.isInt()
		.withMessage("idFamilia deve ser um número inteiro!")
		.custom((id) => id > 0)
		.withMessage("idFamilia não pode ser negativo!"),

	async (req, res) => {
		const resultado = validationResult(req).formatWith(formatadorErros);
		try {
			resultado.throw();
			const id = req.params.id;
			const personagemAlterado = await personagemDao.listarUm(id);
			if (personagemAlterado == null) {
				return res.status(400).json({
					codigoErro: "ERRO_PERSONAGEM_NAO_ENCONTRADO",
					dadosErro: `Personagem de id = ${id} não encontrado! Por favor, informe um personagem existente.`,
				});
			}
			const nome = req.body.nome;
			const sexo = req.body.sexo;
			const estadoVida = req.body.estadoVida;
			const titulos = req.body.titulos;
			const idFamilia = req.body.idFamilia;
			if (nome != null) personagemAlterado.nome = nome;
			if (sexo != null) personagemAlterado.sexo = sexo;
			if (estadoVida != null) personagemAlterado.estadoVida = estadoVida;
			if (titulos != null) personagemAlterado.titulos = titulos;
			if (idFamilia != null) {
				const familiaBuscada = await familiaDao.listarUm(idFamilia);
				if (familiaBuscada == null) {
					return res.status(400).json({
						codigoErro: "ERRO_FAMILIA_NAO_ENCONTRADA",
						dadosErro: `Familia de id = ${idFamilia} não encontrada! Por favor, informe uma familia existente.`,
					});
				}
				await personagemAlterado.setFamilia(familiaBuscada);
			}

			await personagemDao.editar(personagemAlterado);
			res.status(200).send({ msg: `Personagem de id = ${id} editado com sucesso!` });
		} catch (error) {
			res.status(400).json({
				codigoErro: "ERRO_CAMPOS_INVALIDOS",
				dadosErro: error.mapped(),
			});
		}
	}
);

router.delete(
	"/:id",
	check("id")
		.exists()
		.withMessage("ID não pode ser nulo!")
		.isInt()
		.withMessage("ID deve ser um número inteiro!")
		.custom((id) => id > 0)
		.withMessage("ID não pode ser negativo!"),
	async (req, res) => {
		const resultado = validationResult(req).formatWith(formatadorErros);
		try {
			resultado.throw();
			const id = req.params.id;
			const personagemBuscado = await personagemDao.listarUm(id);
			if (personagemBuscado == null) {
				return res.status(404).json({
					codigoErro: "ERRO_FAMILIA_NAO_ENCONTRADA",
					dadosErro: `Personagem de id = ${id} não encontrado! Por favor, informe um personagem existente.`,
				});
			}
			await personagemDao.deletar(personagemBuscado);
			res.status(200).json({
				msg: `Personagem de id = ${id} deletado com sucesso!`,
			});
		} catch (error) {
			res.status(400).json({
				codigoErro: "ERRO_CAMPOS_INVALIDOS",
				dadosErro: error.mapped(),
			});
		}
	}
);

module.exports = router;
