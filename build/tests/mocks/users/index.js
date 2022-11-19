"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrongPasswordUser = exports.wrongEmailUser = exports.validUserRequestInfo = exports.userToUpdate = exports.user = void 0;
const user = {
  name: 'primeiro usuário',
  email: 'user@user.com',
  password: '12345678'
};
exports.user = user;
const userToUpdate = {
  name: 'primeiro usuário atualizado',
  email: 'user@user.com',
  password: '12345678'
};
exports.userToUpdate = userToUpdate;
const wrongEmailUser = {
  name: 'usuário que errou o email',
  email: 'user@fake.com',
  password: '12345678'
};
exports.wrongEmailUser = wrongEmailUser;
const wrongPasswordUser = {
  name: 'usuário que errou a senha',
  email: 'user@user.com',
  password: '123456789'
};
exports.wrongPasswordUser = wrongPasswordUser;
const validUserRequestInfo = {
  token: 'Bearer token',
  id: '63668fa4e27e79b50232f561'
};
exports.validUserRequestInfo = validUserRequestInfo;