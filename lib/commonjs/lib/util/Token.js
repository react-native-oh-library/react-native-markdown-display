"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class Token {
  constructor(type, nesting = 0, children = null, block = false) {
    this.type = type;
    this.nesting = nesting;
    this.children = children;
    this.block = block;
  }
}
exports.default = Token;
//# sourceMappingURL=Token.js.map