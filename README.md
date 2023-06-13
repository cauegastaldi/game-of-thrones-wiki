Back-End:

Bibliotecas necessárias (acessíveis via npm): express, express-validator, mysql2, sequelize, body-parser, cors.

Instruções de execução:

Criar um arquivo ".env" na raíz do diretório do back-end e colocar os seguintes atributos: DB_NAME, DB_USER, DB_PASSWORD e DB_HOST, sendo, respectivamente, os atributos para o nome da base de dados, nome do usuário do banco de dados, senha do usuário do banco de dados, e o host do usuário do banco de dados (no caso "localhost").
Exemplo:
DB_NAME="gotwiki"
DB_USER="caue"
DB_PASSWORD="caue"
DB_HOST="localhost"

Após isso, para criar a base de dados, suas tabelas, e populá-las, é preciso executar o script "criar-e-popular-banco.js" que fica no diretório "scripts".

Após executar o script, para inicar a execução da aplicação principal, executar o arquivo "app.js" que fica no diretório raíz do projeto, por meio do comando "node app.js".

As rotas disponíveis são:

Familia:

GET localhost:8000/familia/ : Lista todas as famílias disponíveis.
GET localhost:8000/familia/id : Lista a família com o id especificado(se existir). Requer o parâmetro "id" na url da requisição.
POST localhost:8000/familia/ : Cria uma família no banco. Requer o parâmetro "nome" (não pode ser nulo nem vazio) no corpo da requisição. O nome também não pode existir no banco de dados.
PUT localhost:8000/familia/id: Edita uma família com um id especificado. Requer os parâmetros "id", na url da requisição, e "nome" no corpo da requisição. O nome também não pode existir no banco de dados.
DELETE localhost:8000/familia/id : Deleta a família com o id especificado. Requer o parâmetro "id" na url da requisição. Não é possível excluir famílias que tenham personagens associados.

Personagem:

GET localhost:8000/personagem/ : Lista todos os personagens disponíveis.
GET localhost:8000/personagem/id : Lista o personagem com o id especificado(se existir). Requer o parâmetro "id" na url da requisição.
POST localhost:8000/personagem/ : Cria um personagem no banco. Requer os parâmetros "nome" (não pode ser nulo nem vazio), "sexo" (Masculino ou Feminino), titulos (opcional) e "estadoVida" (Vivo ou Morto) no corpo da requisição.
PUT localhost:8000/personagem/id: Edita um personagem com o id especificado. Requer os parâmetros "id", na url da requisição, e pode ter os parâmetros "nome" (não pode ser vazio), "sexo" (Masculino ou Feminino), "estadoVida" (Vivo ou Morto) e "titulos" no corpo da requisição.
DELETE localhost:8000/personagem/id : Deleta o personagem com o id especificado. Requer o parâmetro "id" na url da requisição.

Front-End:

Bibliotecas necessárias (acessíveis via npm): react-hook-form, yup, react-router, react-router-dom.

Dentro da raíz do diretório "front-end", executar o comando "npm run dev" para iniciar a aplicação front-end.

Na página de personagens, é possível adicionar um personagem clicando no botão "Adicionar", e editar ou excluir personagens já existentes passando o mouse no card do personagem desejado e clicando em um dos botões: editar ou excluir.

Na página de famílias, é possível adicionar uma família clicando no botão "Adicionar", e editar ou excluir famílias já existentes passando o mouse no card da família desejada e clicando um dos botões: editar ou excluir. Lembrando que as famílias não podem ser excluidas se tiverem personagems associados a ela.
