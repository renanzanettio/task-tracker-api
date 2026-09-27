import dotenv from 'dotenv';
import { app } from './app';
import { sequelize } from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Numero de tentativas e intervalo entre elas, usados para aguardar o banco
// de dados subir (util principalmente na primeira vez que o container do
// Postgres é criado, quando a inicializacao do banco demora alguns segundos)
const MAX_TENTATIVAS = 10;
const INTERVALO_MS = 3000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function conectarComRetry() {
  for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
    try {
      await sequelize.authenticate();
      console.log('Conexão com o PostgreSQL realizada com sucesso.');
      return;
    } catch (error) {
      console.log(
        `Tentativa ${tentativa}/${MAX_TENTATIVAS} de conexão com o banco falhou (${
          (error as Error).message
        }). Tentando novamente em ${INTERVALO_MS / 1000}s...`,
      );
      await delay(INTERVALO_MS);
    }
  }
  throw new Error(
    'Não foi possível conectar ao banco de dados após várias tentativas.',
  );
}

async function main() {
  try {
    await conectarComRetry();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(
        `Health Check disponivel em: http://localhost:${PORT}/api/health`,
      );
      console.log(
        `Documentacao Swagger disponivel em: http://localhost:${PORT}/api/docs`,
      );
    });
  } catch (error) {
    console.log('Erro ao conectar com o banco de dados: ', error);
  }
}

main();
