"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _TaskTimeModel = _interopRequireDefault(require("../models/TaskTimeModel"));
var _RelationTimeService = _interopRequireDefault(require("./RelationTimeService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TaskTimeService extends _RelationTimeService.default {
  constructor(model = new _TaskTimeModel.default()) {
    super(model);
  }
}
exports.default = TaskTimeService;