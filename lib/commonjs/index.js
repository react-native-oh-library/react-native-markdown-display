"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AstRenderer", {
  enumerable: true,
  get: function () {
    return _AstRenderer.default;
  }
});
Object.defineProperty(exports, "FitImage", {
  enumerable: true,
  get: function () {
    return _reactNativeFitImage.default;
  }
});
Object.defineProperty(exports, "MarkdownIt", {
  enumerable: true,
  get: function () {
    return _markdownIt.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "getUniqueID", {
  enumerable: true,
  get: function () {
    return _getUniqueID.default;
  }
});
Object.defineProperty(exports, "hasParents", {
  enumerable: true,
  get: function () {
    return _hasParents.default;
  }
});
Object.defineProperty(exports, "openUrl", {
  enumerable: true,
  get: function () {
    return _openUrl.default;
  }
});
Object.defineProperty(exports, "parser", {
  enumerable: true,
  get: function () {
    return _parser.default;
  }
});
Object.defineProperty(exports, "removeTextStyleProps", {
  enumerable: true,
  get: function () {
    return _removeTextStyleProps.default;
  }
});
Object.defineProperty(exports, "renderRules", {
  enumerable: true,
  get: function () {
    return _renderRules.default;
  }
});
Object.defineProperty(exports, "stringToTokens", {
  enumerable: true,
  get: function () {
    return _stringToTokens.stringToTokens;
  }
});
Object.defineProperty(exports, "styles", {
  enumerable: true,
  get: function () {
    return _styles.styles;
  }
});
Object.defineProperty(exports, "textStyleProps", {
  enumerable: true,
  get: function () {
    return _textStyleProps.default;
  }
});
Object.defineProperty(exports, "tokensToAST", {
  enumerable: true,
  get: function () {
    return _tokensToAST.default;
  }
});
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _parser = _interopRequireDefault(require("./lib/parser"));
var _getUniqueID = _interopRequireDefault(require("./lib/util/getUniqueID"));
var _hasParents = _interopRequireDefault(require("./lib/util/hasParents"));
var _openUrl = _interopRequireDefault(require("./lib/util/openUrl"));
var _tokensToAST = _interopRequireDefault(require("./lib/util/tokensToAST"));
var _renderRules = _interopRequireDefault(require("./lib/renderRules"));
var _AstRenderer = _interopRequireDefault(require("./lib/AstRenderer"));
var _markdownIt = _interopRequireDefault(require("markdown-it"));
var _removeTextStyleProps = _interopRequireDefault(require("./lib/util/removeTextStyleProps"));
var _styles = require("./lib/styles");
var _stringToTokens = require("./lib/util/stringToTokens");
var _reactNativeFitImage = _interopRequireDefault(require("react-native-fit-image"));
var _textStyleProps = _interopRequireDefault(require("./lib/data/textStyleProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Base Markdown component
 * @author Mient-jan Stelling + contributors
 */

// we use StyleSheet.flatten here to make sure we have an object, in case someone
// passes in a StyleSheet.create result to the style prop
const getStyle = (mergeStyle, style) => {
  let useStyles = {};
  if (mergeStyle === true && style !== null) {
    // make sure we get anything user defuned
    Object.keys(style).forEach(value => {
      useStyles[value] = {
        ..._reactNative.StyleSheet.flatten(style[value])
      };
    });

    // combine any existing styles
    Object.keys(_styles.styles).forEach(value => {
      useStyles[value] = {
        ..._styles.styles[value],
        ..._reactNative.StyleSheet.flatten(style[value])
      };
    });
  } else {
    useStyles = {
      ..._styles.styles
    };
    if (style !== null) {
      Object.keys(style).forEach(value => {
        useStyles[value] = {
          ..._reactNative.StyleSheet.flatten(style[value])
        };
      });
    }
  }
  Object.keys(useStyles).forEach(value => {
    useStyles['_VIEW_SAFE_' + value] = (0, _removeTextStyleProps.default)(useStyles[value]);
  });
  return _reactNative.StyleSheet.create(useStyles);
};
const getRenderer = (renderer, rules, style, mergeStyle, onLinkPress, maxTopLevelChildren, topLevelMaxExceededItem, allowedImageHandlers, defaultImageHandler, debugPrintTree) => {
  if (renderer && rules) {
    console.warn('react-native-markdown-display you are using renderer and rules at the same time. This is not possible, props.rules is ignored');
  }
  if (renderer && style) {
    console.warn('react-native-markdown-display you are using renderer and style at the same time. This is not possible, props.style is ignored');
  }

  // these checks are here to prevent extra overhead.
  if (renderer) {
    if (!(typeof renderer === 'function') || renderer instanceof _AstRenderer.default) {
      return renderer;
    } else {
      throw new Error('Provided renderer is not compatible with function or AstRenderer. please change');
    }
  } else {
    let useStyles = getStyle(mergeStyle, style);
    return new _AstRenderer.default({
      ..._renderRules.default,
      ...(rules || {})
    }, useStyles, onLinkPress, maxTopLevelChildren, topLevelMaxExceededItem, allowedImageHandlers, defaultImageHandler, debugPrintTree);
  }
};
const Markdown = /*#__PURE__*/_react.default.memo(({
  children,
  renderer = null,
  rules = null,
  style = null,
  mergeStyle = true,
  markdownit = (0, _markdownIt.default)({
    typographer: true
  }),
  onLinkPress,
  maxTopLevelChildren = null,
  topLevelMaxExceededItem = /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: "dotdotdot"
  }, "..."),
  allowedImageHandlers = ['data:image/png;base64', 'data:image/gif;base64', 'data:image/jpeg;base64', 'https://', 'http://'],
  defaultImageHandler = 'https://',
  debugPrintTree = false
}) => {
  const momoizedRenderer = (0, _react.useMemo)(() => getRenderer(renderer, rules, style, mergeStyle, onLinkPress, maxTopLevelChildren, topLevelMaxExceededItem, allowedImageHandlers, defaultImageHandler, debugPrintTree), [maxTopLevelChildren, onLinkPress, renderer, rules, style, mergeStyle, topLevelMaxExceededItem, allowedImageHandlers, defaultImageHandler, debugPrintTree]);
  const momoizedParser = (0, _react.useMemo)(() => markdownit, [markdownit]);
  return (0, _parser.default)(children, momoizedRenderer.render, momoizedParser);
});
Markdown.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array]).isRequired,
  renderer: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.instanceOf(_AstRenderer.default)]),
  onLinkPress: _propTypes.default.func,
  maxTopLevelChildren: _propTypes.default.number,
  topLevelMaxExceededItem: _propTypes.default.any,
  rules: (props, propName, componentName) => {
    let invalidProps = [];
    const prop = props[propName];
    if (!prop) {
      return;
    }
    if (typeof prop === 'object') {
      invalidProps = Object.keys(prop).filter(key => typeof prop[key] !== 'function');
    }
    if (typeof prop !== 'object') {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must be of shape {[index:string]:function} `);
    } else if (invalidProps.length > 0) {
      return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. These ` + `props are not of type function \`${invalidProps.join(', ')}\` `);
    }
  },
  markdownit: _propTypes.default.instanceOf(_markdownIt.default),
  style: _propTypes.default.any,
  mergeStyle: _propTypes.default.bool,
  allowedImageHandlers: _propTypes.default.arrayOf(_propTypes.default.string),
  defaultImageHandler: _propTypes.default.string,
  debugPrintTree: _propTypes.default.bool
};
var _default = exports.default = Markdown;
//# sourceMappingURL=index.js.map