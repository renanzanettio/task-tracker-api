# 1. Define a imagem de origem base
FROM node:20-alpine

# 2. Define diretorio de trabalho interno do container
WORKDIR /app

# 3. Copia apenas o manifesto de dependencias
COPY package.json ./

# 4. Instala as dependencias do projeto
RUN npm install

# 5. Copia todo o restante do codigo
COPY . .

# 6. Expoe a porta padrao da API
EXPOSE 3000

# 7. Comando para inicializar a aplicacao em modo de desenvolvimento
CMD ["npm", "run", "dev"]
