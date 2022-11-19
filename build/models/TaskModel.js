"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskSchema = exports.default = void 0;
var _mongoose = require("mongoose");
var _RelationDatabaseModel = _interopRequireDefault(require("./RelationDatabaseModel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const taskSchema = new _mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  when: {
    type: Date,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, {
  versionKey: false
});
exports.taskSchema = taskSchema;
class TaskModel extends _RelationDatabaseModel.default {
  constructor(model = (0, _mongoose.model)('Task', taskSchema)) {
    super(model);
  }
  async read(relationId) {
    return this.model.find({
      userId: relationId
    });
  }
  async update(id, obj) {
    return this.model.findOneAndUpdate({
      _id: id
    }, obj, {
      new: true
    });
  }
  async findByDate(relationId, when) {
    return this.model.findOne({
      when: {
        $eq: when
      },
      userId: {
        $in: relationId
      }
    });
  }
}
exports.default = TaskModel;