"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tokensToAST;
var _getUniqueID = _interopRequireDefault(require("./getUniqueID"));
var _getTokenTypeByToken = _interopRequireDefault(require("./getTokenTypeByToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *
 * @param {{type: string, tag:string, content: string, children: *, attrs: Array, meta, info, block: boolean}} token
 * @param {number} tokenIndex
 * @return {{type: string, content, tokenIndex: *, index: number, attributes: {}, children: *}}
 */
function createNode(token, tokenIndex) {
  const type = (0, _getTokenTypeByToken.default)(token);
  const content = token.content;
  let attributes = {};
  if (token.attrs) {
    attributes = token.attrs.reduce((prev, curr) => {
      const [name, value] = curr;
      return {
        ...prev,
        [name]: value
      };
    }, {});
  }
  return {
    type,
    sourceType: token.type,
    sourceInfo: token.info,
    sourceMeta: token.meta,
    block: token.block,
    markup: token.markup,
    key: (0, _getUniqueID.default)() + '_' + type,
    content,
    tokenIndex,
    index: 0,
    attributes,
    children: tokensToAST(token.children)
  };
}

/**
 *
 * @param {Array<{type: string, tag:string, content: string, children: *, attrs: Array}>}tokens
 * @return {Array}
 */
function tokensToAST(tokens) {
  let stack = [];
  let children = [];
  if (!tokens || tokens.length === 0) {
    return [];
  }
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const astNode = createNode(token, i);
    if (!(astNode.type === 'text' && astNode.children.length === 0 && astNode.content === '')) {
      astNode.index = children.length;
      if (token.nesting === 1) {
        children.push(astNode);
        stack.push(children);
        children = astNode.children;
      } else if (token.nesting === -1) {
        children = stack.pop();
      } else if (token.nesting === 0) {
        children.push(astNode);
      }
    }
  }
  return children;
}
//# sourceMappingURL=tokensToAST.js.map