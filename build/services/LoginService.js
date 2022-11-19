"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = _interopRequireDefault(require("../exceptions/HttpException"));
var _UserModel = _interopRequireDefault(require("../models/UserModel"));
var _jwt = _interopRequireDefault(require("../utils/jwt"));
var _HashProvider = _interopRequireDefault(require("../utils/HashProvider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class LoginService {
  constructor(model = new _UserModel.default(), hashHandler = new _HashProvider.default(), tokenHandler = new _jwt.default()) {
    this.model = model;
    this.hashHandler = hashHandler;
    this.tokenHandler = tokenHandler;
  }
  async login(obj) {
    const dbUser = await this.model.findByEmail(obj.email);
    if (!dbUser) throw new _HttpException.default(400, 'E-mail or password incorrect');
    const isSamePassword = await this.hashHandler.compareHash(obj.password, dbUser.password);
    if (!isSamePassword) {
      throw new _HttpException.default(400, 'E-mail or password incorrect');
    }
    const userId = dbUser._id.toString();
    const token = this.tokenHandler.generate({
      id: userId
    });
    return {
      user: {
        id: userId,
        name: dbUser.name,
        email: dbUser.email
      },
      token
    };
  }
}
exports.default = LoginService;