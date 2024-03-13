"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertAdditionalStyles;
var _cssToReactNative = _interopRequireDefault(require("css-to-react-native"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function convertAdditionalStyles(style) {
  const rules = style.split(';');
  const tuples = rules.map(rule => {
    let [key, value] = rule.split(':');
    if (key && value) {
      key = key.trim();
      value = value.trim();
      return [key, value];
    } else {
      return null;
    }
  }).filter(x => {
    return x != null;
  });
  const conv = (0, _cssToReactNative.default)(tuples);
  return conv;
}
//# sourceMappingURL=convertAdditionalStyles.js.map