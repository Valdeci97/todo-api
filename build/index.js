"use strict";

require("dotenv/config");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PORT = process.env.PORT || 3001;
_server.default.start(PORT);