"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasParents;
/**
 *
 * @param {Array} parents
 * @param {string} type
 * @return {boolean}
 */
function hasParents(parents, type) {
  return parents.findIndex(el => el.type === type) > -1;
}
//# sourceMappingURL=hasParents.js.map