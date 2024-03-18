"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeFitImage = _interopRequireDefault(require("react-native-fit-image"));
var _openUrl = _interopRequireDefault(require("./util/openUrl"));
var _hasParents = _interopRequireDefault(require("./util/hasParents"));
var _textStyleProps = _interopRequireDefault(require("./data/textStyleProps"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const renderRules = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => null,
  // The main container
  body: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_body
  }, children),
  // Headings
  heading1: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_heading1
  }, children),
  heading2: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_heading2
  }, children),
  heading3: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_heading3
  }, children),
  heading4: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_heading4
  }, children),
  heading5: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_heading5
  }, children),
  heading6: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_heading6
  }, children),
  // Horizontal Rule
  hr: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_hr
  }),
  // Emphasis
  strong: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.strong
  }, children),
  em: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.em
  }, children),
  s: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.s
  }, children),
  // Blockquotes
  blockquote: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_blockquote
  }, children),
  // Lists
  bullet_list: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_bullet_list
  }, children),
  ordered_list: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_ordered_list
  }, children),
  // this is a unique and quite annoying render rule because it has
  // child items that can be styled (the list icon and the list content)
  // outside of the AST tree so there are some work arounds in the
  // AST renderer specifically to get the styling right here
  list_item: (node, children, parent, styles, inheritedStyles = {}) => {
    // we need to grab any text specific stuff here that is applied on the list_item style
    // and apply it onto bullet_list_icon. the AST renderer has some workaround code to make
    // the content classes apply correctly to the child AST tree items as well
    // as code that forces the creation of the inheritedStyles object for list_items
    const refStyle = {
      ...inheritedStyles,
      ..._reactNative.StyleSheet.flatten(styles.list_item)
    };
    const arr = Object.keys(refStyle);
    const modifiedInheritedStylesObj = {};
    for (let b = 0; b < arr.length; b++) {
      if (_textStyleProps.default.includes(arr[b])) {
        modifiedInheritedStylesObj[arr[b]] = refStyle[arr[b]];
      }
    }
    if ((0, _hasParents.default)(parent, 'bullet_list')) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: node.key,
        style: styles._VIEW_SAFE_list_item
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: [modifiedInheritedStylesObj, styles.bullet_list_icon],
        accessible: false
      }, _reactNative.Platform.select({
        android: '\u2022',
        ios: '\u00B7',
        default: '\u2022'
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles._VIEW_SAFE_bullet_list_content
      }, children));
    }
    if ((0, _hasParents.default)(parent, 'ordered_list')) {
      const orderedListIndex = parent.findIndex(el => el.type === 'ordered_list');
      const orderedList = parent[orderedListIndex];
      let listItemNumber;
      if (orderedList.attributes && orderedList.attributes.start) {
        listItemNumber = orderedList.attributes.start + node.index;
      } else {
        listItemNumber = node.index + 1;
      }
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: node.key,
        style: styles._VIEW_SAFE_list_item
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        style: [modifiedInheritedStylesObj, styles.ordered_list_icon]
      }, listItemNumber, node.markup), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles._VIEW_SAFE_ordered_list_content
      }, children));
    }

    // we should not need this, but just in case
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: node.key,
      style: styles._VIEW_SAFE_list_item
    }, children);
  },
  // Code
  code_inline: (node, children, parent, styles, inheritedStyles = {}) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: [inheritedStyles, styles.code_inline]
  }, node.content),
  code_block: (node, children, parent, styles, inheritedStyles = {}) => {
    // we trim new lines off the end of code blocks because the parser sends an extra one.
    let {
      content
    } = node;
    if (typeof node.content === 'string' && node.content.charAt(node.content.length - 1) === '\n') {
      content = node.content.substring(0, node.content.length - 1);
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      key: node.key,
      style: [inheritedStyles, styles.code_block]
    }, content);
  },
  fence: (node, children, parent, styles, inheritedStyles = {}) => {
    // we trim new lines off the end of code blocks because the parser sends an extra one.
    let {
      content
    } = node;
    if (typeof node.content === 'string' && node.content.charAt(node.content.length - 1) === '\n') {
      content = node.content.substring(0, node.content.length - 1);
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      key: node.key,
      style: [inheritedStyles, styles.fence]
    }, content);
  },
  // Tables
  table: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_table
  }, children),
  thead: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_thead
  }, children),
  tbody: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_tbody
  }, children),
  th: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_th
  }, children),
  tr: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_tr
  }, children),
  td: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_td
  }, children),
  // Links
  link: (node, children, parent, styles, onLinkPress) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.link,
    onPress: () => (0, _openUrl.default)(node.attributes.href, onLinkPress)
  }, children),
  blocklink: (node, children, parent, styles, onLinkPress) => /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    key: node.key,
    onPress: () => (0, _openUrl.default)(node.attributes.href, onLinkPress),
    style: styles.blocklink
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.image
  }, children)),
  // Images
  image: (node, children, parent, styles, allowedImageHandlers, defaultImageHandler) => {
    const {
      src,
      alt
    } = node.attributes;

    // we check that the source starts with at least one of the elements in allowedImageHandlers
    const show = allowedImageHandlers.filter(value => {
      return src.toLowerCase().startsWith(value.toLowerCase());
    }).length > 0;
    if (show === false && defaultImageHandler === null) {
      return null;
    }
    const imageProps = {
      indicator: true,
      key: node.key,
      style: styles._VIEW_SAFE_image,
      source: {
        uri: show === true ? src : `${defaultImageHandler}${src}`
      }
    };
    if (alt) {
      imageProps.accessible = true;
      imageProps.accessibilityLabel = alt;
    }
    return /*#__PURE__*/_react.default.createElement(_reactNativeFitImage.default, imageProps);
  },
  // Text Output
  text: (node, children, parent, styles, inheritedStyles = {}) => {
    let isTable = false;
    parent.forEach(element => {
      if (element.type == 'table') {
        isTable = true;
      }
    });
    if (isTable) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: node.key,
        style: {
          width: ' 100%'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: node.key,
        style: [inheritedStyles, styles.text]
      }, node.content));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: node.key,
        style: [inheritedStyles, styles.text]
      }, node.content);
    }
  },
  textgroup: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.textgroup
  }, children),
  paragraph: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_paragraph
  }, children),
  hardbreak: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.hardbreak
  }, '\n'),
  softbreak: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.softbreak
  }, '\n'),
  // Believe these are never used but retained for completeness
  pre: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: node.key,
    style: styles._VIEW_SAFE_pre
  }, children),
  inline: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.inline
  }, children),
  span: (node, children, parent, styles) => /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    key: node.key,
    style: styles.span
  }, children)
};
var _default = exports.default = renderRules;
//# sourceMappingURL=renderRules.js.map