"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _app = _interopRequireDefault(require("./app"));
var _UserRouter = _interopRequireDefault(require("./routes/UserRouter"));
var _LoginRouter = _interopRequireDefault(require("./routes/LoginRouter"));
var _TaskRouter = _interopRequireDefault(require("./routes/TaskRouter"));
var _TaskTimeRouter = _interopRequireDefault(require("./routes/TaskTimeRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const server = new _app.default();
server.addRouter(_UserRouter.default.getRouter());
server.addRouter(_LoginRouter.default.getRouter());
server.addRouter(_TaskRouter.default.getRouter());
server.addRouter(_TaskTimeRouter.default.getRouter());
server.addErrorMiddleware();
var _default = server;
exports.default = _default;