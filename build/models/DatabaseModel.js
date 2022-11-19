"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class DatabaseModel {
  constructor(model) {
    this.model = model;
  }
  async create(obj) {
    return this.model.create({
      ...obj
    });
  }
  async read() {
    return this.model.find();
  }
  async readOne(id) {
    const obj = await this.model.findOne({
      _id: id
    });
    if (!obj) return null;
    return obj;
  }
  async delete(id) {
    const obj = await this.model.deleteOne({
      _id: id
    });
    return obj.deletedCount > 0;
  }
  async findByEmail(email) {
    return this.model.findOne({
      email
    });
  }
}
exports.default = DatabaseModel;