"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = exports.default = void 0;
var _mongoose = require("mongoose");
var _DatabaseModel = _interopRequireDefault(require("./DatabaseModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});
exports.userSchema = userSchema;
class UserModel extends _DatabaseModel.default {
  constructor(model = (0, _mongoose.model)('User', userSchema)) {
    super(model);
  }
  async update(id, obj) {
    return this.model.findOneAndUpdate({
      _id: id
    }, {
      name: obj.name
    }, {
      new: true
    });
  }
}
exports.default = UserModel;