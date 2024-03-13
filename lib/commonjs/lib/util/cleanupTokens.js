"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanupTokens = cleanupTokens;
var _getTokenTypeByToken = _interopRequireDefault(require("./getTokenTypeByToken"));
var _flattenInlineTokens = _interopRequireDefault(require("./flattenInlineTokens"));
var _renderInlineAsText = _interopRequireDefault(require("./renderInlineAsText"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function cleanupTokens(tokens) {
  tokens = (0, _flattenInlineTokens.default)(tokens);
  tokens.forEach(token => {
    token.type = (0, _getTokenTypeByToken.default)(token);

    // set image and hardbreak to block elements
    if (token.type === 'image' || token.type === 'hardbreak') {
      token.block = true;
    }

    // Set img alt text
    if (token.type === 'image') {
      token.attrs[token.attrIndex('alt')][1] = (0, _renderInlineAsText.default)(token.children);
    }
  });

  /**
   * changing a link token to a blocklink to fix issue where link tokens with
   * nested non text tokens breaks component
   */
  const stack = [];
  tokens = tokens.reduce((acc, token, index) => {
    if (token.type === 'link' && token.nesting === 1) {
      stack.push(token);
    } else if (stack.length > 0 && token.type === 'link' && token.nesting === -1) {
      if (stack.some(stackToken => stackToken.block)) {
        stack[0].type = 'blocklink';
        stack[0].block = true;
        token.type = 'blocklink';
        token.block = true;
      }
      stack.push(token);
      while (stack.length) {
        acc.push(stack.shift());
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }
    return acc;
  }, []);
  return tokens;
}
//# sourceMappingURL=cleanupTokens.js.map