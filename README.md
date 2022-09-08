# TractianTest
REST API Test to Tractian Selection Process

O teste está acessível em produção a partir desse link: https://arm.digiture.eu.org/tractian/[rota abaixo]

As rotas da aplicação aceitam apenas requisições com o body em JSON. Não é necessário autenticação. As rotas e seus respectivos métodos presentes no momento são:

### Cadastro de Companhias
- [POST] /companies
- [GET]  /companies
- [GET] /companies/:id
- [PATCH] /companies/:id
- [DELETE] /companies/:id

### Cadastro de Funcionários
- [POST] companies/:company/users
- [GET] companies/:company/users
- [GET] companies/:company/users/:id
- [PATCH] companies/:company/users/:id
- [DELETE] companies/:company/users/:id

### Cadastro de Maquinário
- [POST] companies/:company/assets
- [GET] companies/:company/assets
- [GET] companies/:company/assets/:id
- [PATCH] companies/:company/assets/:id
- [DELETE] companies/:company/assets/:id
- [GET] companies/:company/assets/:id/picture
- [POST] companies/:company/assets/:id/picture

### Registro de Sensores
- [POST] /companies/:company/assets/:asset/sensors
- [GET] /companies/:company/assets/:asset/sensors
- [PATCH] /companies/:company/assets/:asset/sensors
- [DELETE] /companies/:company/assets/:asset/sensors

Os campos necessários são expressos pelos schemas do Joi presentes no domínio de cada entidade.
