<a href="https://imgur.com/C9XnPIk"><img src="https://i.imgur.com/C9XnPIk.png" title="source: imgur.com" /></a>
# Me Empresta Bank - Projeto de Sistema Bancário - API Rest

![GitHub last commit](https://img.shields.io/github/last-commit/EryckBarreto/projeto-sistema-bancario-api-rest)

O Me Empresta Bank é um projeto de sistema bancário simples desenvolvido em Node.js usando o framework Express. Este projeto foi criado para demonstrar habilidades em desenvolvimento de software, programação em JavaScript, gerenciamento de rotas e endpoints com Express, manipulação de dados em memória, e construção de uma API REST básica.


## Funcionalidades

O sistema bancário oferece as seguintes funcionalidades:

- Abertura de contas bancárias com informações pessoais e senha de acesso.
- Depósitos em contas bancárias.
- Saques de contas bancárias, com validação de saldo e senha.
- Transferências entre contas bancárias, com verificação de saldo e senha.
- Consulta de saldo e extrato de contas bancárias.

## Instalação e Uso

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/EryckBarreto/projeto-sistema-bancario-api-rest
   ``` 
2. **Clonar o repositório:**
   ```bash
   npm install
3. **Iniciar o servidor:**
   ```bash
   node index.js
O servidor estará rodando em http://localhost:3000.



## Endpoints da API

* GET /contas: Lista todas as contas bancárias (requer autenticação).
* POST /contas: Abre uma nova conta bancária.
* PUT /contas/:numeroConta/usuario: Atualiza informações do usuário da conta.
* DELETE /contas/:numeroConta: Deleta uma conta bancária.
* POST /transacoes/depositar: Realiza um depósito em uma conta.
* POST /transacoes/sacar: Realiza um saque de uma conta.
* POST /transacoes/transferir: Realiza uma transferência entre contas.
* GET /contas/saldo: Consulta o saldo de uma conta.
* GET /contas/extrato: Consulta o extrato de uma conta.

## Tecnologias Utilizadas

* Insomnia: É usado para testar as rotas da API.
* Git: É usado para controle de versão do código.
* GitHub: É usado para hospedar o repositório do código.
* JavaScript: É a linguagem de programação usada para escrever o código.
* Express: É o framework usado para criar a API.
* Node.js: É o ambiente de execução do JavaScript usado para * rodar o código.
* RESTful API: A API deve seguir o padrão REST.

## Referência

 - [Git Reference](https://git-scm.com/docs)
 - [JavaScript Reference](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
 - [Node Reference](https://nodejs.org/en/docs)
 - [Insomnia Reference](https://docs.insomnia.rest/)



## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/EryckBarreto/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://https://www.linkedin.com/in/eryckbarreto/)


