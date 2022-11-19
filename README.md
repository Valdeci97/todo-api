# <div align="center">Todo API</div>
### <p align="center">API REST para o gerenciamento de usuários e tarefas.</p>

## <div align="center">Tecnologias</div>
Projeto feito para gerenciamento de tarefas do dia a dia com banco de dados mongodb.
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="80px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" width="80px" />
</div>

#

### <p align="center">Como usar</p>

Você vai precisar ter instalado [Git](https://git-scm.com/), [Docker](https://docs.docker.com/engine/install/), [docker-compose plugin](https://docs.docker.com/compose/install/)**

**Apenas linux. Windows e Mac já instalam junto ao docker desktop.

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

Se nada e errado aconteceu a aplicação estará rodando no localhost na porta 3001, também terá uma instância rodando na porta 8081 de uma gerenciador do mongo, caso queira ver as mudanças diretamente do banco de dados.
Acesse http://localhost:3001/api-docs
