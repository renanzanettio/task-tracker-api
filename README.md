# Task Tracker API

API RESTful para gestão de tarefas e projetos (Task Tracker), desenvolvida com Node.js, Express, TypeScript, Sequelize (PostgreSQL) e documentação interativa via Swagger.

Trabalho prático individual (AT1) da disciplina Laboratório de Desenvolvimento Web (LDW).

## Tema

Gestão de Tarefas e Projetos (Task Tracker): cadastro de tarefas com nome, descrição, estimativa de tempo (em horas) e deadline.

## Tecnologias

- Node.js + Express
- TypeScript
- Sequelize ORM + PostgreSQL
- Swagger (swagger-ui-express)
- Docker / Docker Compose

## Estrutura do projeto

```
src/
  config/       -> configuração do banco de dados (Sequelize)
  models/       -> definição do model Task
  controllers/  -> lógica de negócio (CRUD de tarefas)
  routes/       -> mapeamento das rotas Express
  migrations/   -> migration de criação da tabela tasks
  docs/         -> especificação OpenAPI (swagger.json)
  app.ts        -> configuração do Express (middlewares, rotas, swagger)
  server.ts     -> ponto de entrada da aplicação
```

## Como executar (via Docker - recomendado)

Pré-requisitos: Docker e Docker Compose instalados.

1. Suba os containers (API + PostgreSQL local):

```bash
docker compose up --build
```

2. Rode a migration para criar a tabela `tasks` no banco (em outro terminal, com os containers já rodando):

```bash
docker compose exec api npm run migrate
```

> Obs: o Postgres deste projeto é exposto na porta **5433** do seu computador (mapeada para a 5432 interna do container), para não conflitar com outro Postgres que já esteja usando a 5432 na sua máquina. A API continua se conectando normalmente via rede interna do Docker (`db:5432`), então isso não afeta o funcionamento.

3. A API estará disponível em `http://localhost:3000` e a documentação interativa em:

```
http://localhost:3000/api/docs
```

## Como executar localmente (sem Docker)

Pré-requisitos: Node.js 20+ e uma instância local do PostgreSQL rodando.

1. Instale as dependências:

```bash
npm install
```

2. Copie o arquivo de variáveis de ambiente e ajuste se necessário:

```bash
cp .env.example .env
```

3. Rode a migration para criar a tabela `tasks`:

```bash
npm run migrate
```

4. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

## Endpoints

| Método | Rota           | Descrição                          |
| ------ | -------------- | ----------------------------------- |
| GET    | /api/tasks     | Lista todas as tarefas              |
| GET    | /api/tasks/:id | Busca uma tarefa por ID             |
| POST   | /api/tasks     | Cria uma nova tarefa                |
| PUT    | /api/tasks/:id | Atualiza uma tarefa existente       |
| DELETE | /api/tasks/:id | Remove uma tarefa                   |

### Campos da tarefa

| Campo             | Tipo    | Obrigatório | Descrição                          |
| ----------------- | ------- | ----------- | ------------------------------------ |
| nome              | string  | sim         | Nome/título da tarefa                |
| descricao         | string  | não         | Descrição detalhada da tarefa        |
| estimativa_tempo  | integer | sim         | Estimativa de tempo em horas         |
| deadline          | date    | sim         | Data limite para conclusão (AAAA-MM-DD) |

Exemplos de requisições prontas estão em `requests/requests.http`.
