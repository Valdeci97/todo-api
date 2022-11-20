# <div align="center">Todo API</div>

### <p align="center">API REST para o gerenciamento de usuários e tarefas.</p>

## <div align="center">Tecnologias</div>

Projeto feito para gerenciamento de tarefas do dia a dia com banco de dados mongodb. [deploy](https://todo-api-dev.onrender.com/api-docs/)

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" width="80px" />
</div>

#

### <p align="center">Como usar</p>

Você vai precisar ter instalado [Git](https://git-scm.com/), [Docker](https://docs.docker.com/engine/install/), [docker-compose plugin](https://docs.docker.com/compose/install/)\*\*

\*\*Apenas linux. Windows e Mac já instalam junto ao docker desktop.

#

Abra um terminal e clone o repositório - exemplo com chave SSH.

```
git clone git@github.com:Valdeci97/todo-api.git
```

Habilite a permissão para executar comandos de terminal no container docker

```
chmod +x .docker/entrypoint.sh
```

Inicie o container docker

```
docker-compose up -d
```

Caso o comando falhe, tente:

```
docker compose up -d
```

Se nada de errado aconteceu a aplicação estará rodando no localhost na porta 3001, também terá uma instância rodando na porta 8081 de um gerenciador do mongo, caso queira ver as mudanças diretamente do banco de dados.

Acesse http://localhost:3001/api-docs para ver a documentação da aplicação.

Acesse http://localhost:8081 para ver o banco de dados "todo".

Rodando os testes - Após termino use o comando "exit" para sair do container

```
docker exec -it express_app bash

npm test
```

Parando os containeres

```
docker-compose down

ou

docker compose down
```
