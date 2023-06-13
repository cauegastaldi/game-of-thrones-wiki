# Game Of Thrones Wiki

## Visão Geral

A "Game Of Thrones Wiki" é um projeto desenvolvido para um trabalho da faculdade, com a utilização de Node.JS para o back-end, e HTML, CSS e React para o front-end.

O projeto conta com duas entidades: Personagens e Famílias, e as principais funcionalidades da aplicação consistem no gerenciamento de personagens e famílias.

## Instruções de execução:

Back-End:

Bibliotecas necessárias (acessíveis via npm): express, express-validator, mysql2, sequelize, body-parser, cors.

Criar um arquivo ".env" na raíz do diretório do back-end e colocar os seguintes atributos: DB_NAME, DB_USER, DB_PASSWORD e DB_HOST, sendo, respectivamente, os atributos para o nome da base de dados, nome do usuário do banco de dados, senha do usuário do banco de dados, e o host do usuário do banco de dados.

Após isso, é preciso executar o arquivo "app.js" que fica no diretório raíz do projeto, por meio do comando "node app.js".

As rotas disponíveis são:

Familia:

GET localhost:8000/familia/ : Lista todas as famílias disponíveis.<br>
GET localhost:8000/familia/id : Lista a família com o id especificado(se existir). Requer o parâmetro "id" na url da requisição.<br>
POST localhost:8000/familia/ : Cria uma família no banco. Requer o parâmetro "nome" (não pode ser nulo nem vazio) no corpo da requisição. O nome também não pode existir no banco de dados.<br>
PUT localhost:8000/familia/id: Edita uma família com um id especificado. Requer os parâmetros "id", na url da requisição, e "nome" no corpo da requisição. O nome também não pode existir no banco de dados.<br>
DELETE localhost:8000/familia/id : Deleta a família com o id especificado. Requer o parâmetro "id" na url da requisição. Não é possível excluir famílias que tenham personagens associados.<br>

Personagem:

GET localhost:8000/personagem/ : Lista todos os personagens disponíveis.<br>
GET localhost:8000/personagem/id : Lista o personagem com o id especificado(se existir). Requer o parâmetro "id" na url da requisição.<br>
POST localhost:8000/personagem/ : Cria um personagem no banco. Requer os parâmetros "nome" (não pode ser nulo nem vazio), "sexo" (Masculino ou Feminino), titulos (opcional) e "estadoVida" (Vivo ou Morto) no corpo da requisição.<br>
PUT localhost:8000/personagem/id: Edita um personagem com o id especificado. Requer os parâmetros "id", na url da requisição, e pode ter os parâmetros "nome" (não pode ser vazio), "sexo" (Masculino ou Feminino), "estadoVida" (Vivo ou Morto) e "titulos" no corpo da requisição.<br>
DELETE localhost:8000/personagem/id : Deleta o personagem com o id especificado. Requer o parâmetro "id" na url da requisição.<br>

Front-End:

Bibliotecas necessárias (acessíveis via npm): react-hook-form, yup, react-router, react-router-dom.

Dentro da raíz do diretório "front-end", executar o comando "npm run dev" para iniciar a aplicação front-end.

Na página de personagens, é possível adicionar um personagem clicando no botão "Adicionar", e editar ou excluir personagens já existentes passando o mouse no card do personagem desejado e clicando em um dos botões: editar ou excluir.

Na página de famílias, é possível adicionar uma família clicando no botão "Adicionar", e editar ou excluir famílias já existentes passando o mouse no card da família desejada e clicando um dos botões: editar ou excluir. Lembrando que as famílias não podem ser excluidas se tiverem personagems associados a ela.
