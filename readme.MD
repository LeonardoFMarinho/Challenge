# Challenge

## Tecnologias Utilizadas

- Node.Js
- Typescript
- TypeORM
- Postgres
- Docker
- Tsrying
- Jest

## Pastas

### A divisão de pastas seguiu a ideia das camadas do projeto.

OBS: A pasta City ou Client seguem a mesma logica

- Em cada uma delas, encontramos:

#### Pasta entity:

- Nela está o arquivo referente a Entity da pasta aberta anteriormente

#### Pasta Repository

- Interface do repositório.
- Repositório que tem como função se comunicar com BD (Implementa da Interface do repositório)
- Repósitorio in-Memory para os testes. 3. useCase (Implementa da Interface do repositório )

#### Pasta UseCase

- Encontramos as features implementadas
- Dentro da pasta de cada feature, encontramos o teste relacionado ao seu UseCase

## Features

### City

- [x] Criação de Cidades
- [x] Busca de Cidade pelo nome
- [x] Listagem de clientes pelo Estado

### Client

- [x] Criação de Clientes
- [x] Deleção de Clientes
- [x] Busca de cliente pelo Id
- [x] Listagem de clientes pelo nome
- [x] Atualização do nome do cliente
