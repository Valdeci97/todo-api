import { User } from '../../../interfaces/UserInterface';

export const user: User = {
  name: 'primeiro usuário',
  email: 'user@user.com',
  password: '12345678',
};

export const userToUpdate: User = {
  name: 'primeiro usuário atualizado',
  email: 'user@user.com',
  password: '12345678',
};

export const wrongEmailUser: User = {
  name: 'usuário que errou o email',
  email: 'user@fake.com',
  password: '12345678',
};

export const wrongPasswordUser: User = {
  name: 'usuário que errou a senha',
  email: 'user@user.com',
  password: '123456789',
};
