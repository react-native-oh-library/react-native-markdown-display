"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeTextStyleProps;
var _textStyleProps = _interopRequireDefault(require("../data/textStyleProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function removeTextStyleProps(style) {
  const intersection = _textStyleProps.default.filter(value => Object.keys(style).includes(value));
  const obj = {
    ...style
  };
  intersection.forEach(value => {
    delete obj[value];
  });
  return obj;
}
//# sourceMappingURL=removeTextStyleProps.js.map