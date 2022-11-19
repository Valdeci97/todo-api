"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class RelationTimeService {
  constructor(model) {
    this.model = model;
  }
  findByDay(relationId) {
    return this.model.findByDay(relationId);
  }
  findByWeek(relationId) {
    return this.model.findByWeek(relationId);
  }
  async findByMonth(relationId) {
    return this.model.findByMonth(relationId);
  }
  async findByYear(relationId) {
    return this.model.findByYear(relationId);
  }
  async findLate(relationId) {
    return this.model.findLate(relationId);
  }
}
exports.default = RelationTimeService;