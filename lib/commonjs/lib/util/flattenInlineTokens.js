"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flattenTokens;
function flattenTokens(tokens) {
  return tokens.reduce((acc, curr) => {
    if (curr.type === 'inline' && curr.children && curr.children.length > 0) {
      const children = flattenTokens(curr.children);
      while (children.length) {
        acc.push(children.shift());
      }
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
}
//# sourceMappingURL=flattenInlineTokens.js.map