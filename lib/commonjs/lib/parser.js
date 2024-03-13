"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parser;
var _tokensToAST = _interopRequireDefault(require("./util/tokensToAST"));
var _stringToTokens = require("./util/stringToTokens");
var _cleanupTokens = require("./util/cleanupTokens");
var _groupTextTokens = _interopRequireDefault(require("./util/groupTextTokens"));
var _omitListItemParagraph = _interopRequireDefault(require("./util/omitListItemParagraph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *
 * @param {string} source
 * @param {function} [renderer]
 * @param {AstRenderer} [markdownIt]
 * @return {View}
 */
function parser(source, renderer, markdownIt) {
  if (Array.isArray(source)) {
    return renderer(source);
  }
  let tokens = (0, _stringToTokens.stringToTokens)(source, markdownIt);
  tokens = (0, _cleanupTokens.cleanupTokens)(tokens);
  tokens = (0, _groupTextTokens.default)(tokens);
  tokens = (0, _omitListItemParagraph.default)(tokens);
  const astTree = (0, _tokensToAST.default)(tokens);
  return renderer(astTree);
}
//# sourceMappingURL=parser.js.map