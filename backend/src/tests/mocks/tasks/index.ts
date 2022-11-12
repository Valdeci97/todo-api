import { Task } from '../../../interfaces/TaskInterface';

export const task: Task = {
  userId: '6363daa6ab1e71a12204e9e4',
  category: 'Estudos',
  title: 'Criando testes',
  description: 'Testando funcionamento do serviço de tasks',
  when: '2022-12-12T22:30:00.000Z',
  done: false,
  createdAt: new Date(),
};

export const taskToUpdate: Task = {
  userId: '6363daa6ab1e71a12204e9e4',
  category: 'Estudos',
  title: 'Criando testes',
  description: 'Testando funcionamento do serviço de tasks',
  when: '2022-12-15T22:30:00.000Z',
  done: false,
  createdAt: new Date(),
};
