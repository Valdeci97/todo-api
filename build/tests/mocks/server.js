"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _app = _interopRequireDefault(require("../../app"));
var _userRouter = _interopRequireDefault(require("./routes/userRouter"));
var _loginRouter = _interopRequireDefault(require("./routes/loginRouter"));
var _taskRouter = _interopRequireDefault(require("./routes/taskRouter"));
var _taskTimeRouter = _interopRequireDefault(require("./routes/taskTimeRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const server = new _app.default();
server.addRouter(_userRouter.default.getRouter());
server.addRouter(_loginRouter.default.getRouter());
server.addRouter(_taskRouter.default.getRouter());
server.addRouter(_taskTimeRouter.default.getRouter());
server.addErrorMiddleware();
var _default = server;
exports.default = _default;