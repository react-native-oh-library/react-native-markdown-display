"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitTextNonTextNodes;
function splitTextNonTextNodes(children) {
  return children.reduce((acc, curr) => {
    if (curr.type.displayName === 'Text') {
      acc.textNodes.push(curr);
    } else {
      acc.nonTextNodes.push(curr);
    }
    return acc;
  }, {
    textNodes: [],
    nonTextNodes: []
  });
}
//# sourceMappingURL=splitTextNonTextNodes.js.map