"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToTokens = stringToTokens;
function stringToTokens(source, markdownIt) {
  let result = [];
  try {
    result = markdownIt.parse(source, {});
  } catch (err) {
    console.warn(err);
  }
  return result;
}
//# sourceMappingURL=stringToTokens.js.map