"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUniqueID;
let uuid = new Date().getTime();
function getUniqueID() {
  uuid++;
  return `rnmr_${uuid.toString(16)}`;
}
//# sourceMappingURL=getUniqueID.js.map