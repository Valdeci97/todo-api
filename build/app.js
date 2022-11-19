"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _logger = _interopRequireDefault(require("./logger"));
var _connection = _interopRequireDefault(require("./connection"));
var _middlewares = _interopRequireDefault(require("./middlewares"));
var _swagger = _interopRequireDefault(require("./utils/swagger/swagger.json"));
var _RateLimiter = _interopRequireDefault(require("./middlewares/RateLimiter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class App {
  constructor() {
    this.app = (0, _express.default)();
    this.app.use((0, _helmet.default)());
    this.app.use(_express.default.json());
    this.app.use((0, _cors.default)());
    this.setupDocumentation();
    this.app.use(_RateLimiter.default.createRateLimiter());
  }
  async start(PORT) {
    await (0, _connection.default)();
    this.app.listen(PORT, () => _logger.default.info(`Server running at port: ${PORT}`));
  }
  addRouter(router) {
    this.app.use(router);
  }
  getApp() {
    return this.app;
  }
  addErrorMiddleware(middleware = new _middlewares.default().errorHandler) {
    this.app.use(middleware);
  }
  setupDocumentation() {
    this.app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
  }
}
exports.default = App;