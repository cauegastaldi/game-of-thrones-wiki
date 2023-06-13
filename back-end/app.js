const express = require("express");
const bodyparser = require("body-parser");
const db = require("./database/db");
const cors = require("cors");

const porta = 8000;
const app = express();

await db.sync();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.use("/personagem", require("./rotas/rotasPersonagem"));

app.use("/familia", require("./rotas/rotasFamilia"));

app.listen(porta, function () {
	console.log(`servidor operando na porta ${porta}`);
});
