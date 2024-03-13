"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = openUrl;
var _reactNative = require("react-native");
function openUrl(url, customCallback) {
  if (customCallback) {
    const result = customCallback(url);
    if (url && result && typeof result === 'boolean') {
      _reactNative.Linking.openURL(url);
    }
  } else if (url) {
    _reactNative.Linking.openURL(url);
  }
}
//# sourceMappingURL=openUrl.js.map