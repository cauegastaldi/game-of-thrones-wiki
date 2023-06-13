const router = require("express").Router();
const dao = require("../daos/familiaDao");
const { validationResult, check } = require("express-validator");

const formatadorErros = ({ msg }) => {
	return `${msg}`;
};

router.get("/", async (req, res) => {
	const resultado = await dao.listarTodos();
	res.status(200).json({
		familias: resultado,
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
			const familiaBuscada = await dao.listarUm(id);
			if (familiaBuscada != null) {
				res.status(200).json({
					familia: familiaBuscada,
				});
			} else {
				res.status(400).json({
					codigoErro: "ERRO_FAMILIA_NAO_ENCONTRADA",
					dadosErro: `Familia de id = ${id} não encontrada! Por favor, informe uma familia existente`,
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
	async (req, res) => {
		const resultado = validationResult(req).formatWith(formatadorErros);

		try {
			resultado.throw();
			const nome = req.body.nome;

			const familiaBuscada = await dao.listarPorNome(nome);
			if (familiaBuscada !== null) {
				return res.status(400).json({
					codigoErro: "ERRO_FAMILIA_EXISTENTE",
					dadosErro: "O nome especificado já existe!",
				});
			}

			const familiaCriada = await dao.criar({
				nome: nome,
			});

			if (familiaCriada) {
				res.status(201).json(familiaCriada);
			} else {
				res.status(500).json({
					codigoErro: "ERRO_INTERNO",
					dadosErro: `Familia não pôde ser criada!`,
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
	async (req, res) => {
		const resultado = validationResult(req).formatWith(formatadorErros);

		try {
			resultado.throw();
			const id = req.params.id;
			const familiaBuscada = await dao.listarUm(id);
			if (familiaBuscada == null) {
				return res.status(404).json({
					codigoErro: "ERRO_FAMILIA_NAO_ENCONTRADA",
					dadosErro: `Familia de id = ${id} não encontrada! Por favor, informe uma familia existente.`,
				});
			}
			const nome = req.body.nome;
			if (nome != null) {
				const familiaBuscada = await dao.listarPorNome(nome);
				if (familiaBuscada !== null) {
					return res.status(400).json({
						codigoErro: "ERRO_FAMILIA_EXISTENTE",
						dadosErro: "O nome especificado já existe!",
					});
				}
			}
			familiaBuscada.nome = nome;
			await dao.editar(familiaBuscada);
			res.status(200).json({
				msg: `Familia de id = ${id} editada com sucesso!`,
			});
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
			const familiaBuscada = await dao.listarUm(id);
			if (familiaBuscada == null) {
				return res.status(404).json({
					codigoErro: "ERRO_FAMILIA_NAO_ENCONTRADA",
					dadosErro: `Familia de id = ${id} não encontrada! Por favor, informe uma familia existente.`,
				});
			}
			const numeroPersonagensAssociados = await familiaBuscada.countPersonagens();
			if (numeroPersonagensAssociados > 0)
				return res.status(400).json({
					codigoErro: "ERRO_PERSONAGENS_ASSOCIADOS",
					dadosErro:
						"Não foi possível excluir a familia, pois existem personagens associados a ela.",
				});

			await dao.deletar(familiaBuscada);
			res.status(200).json({
				msg: `Familia de id = ${id} deletada com sucesso!`,
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
