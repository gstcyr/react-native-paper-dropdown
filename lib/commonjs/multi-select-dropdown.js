"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativePaper = require("react-native-paper");
var _dropdownInput = _interopRequireDefault(require("./dropdown-input.js"));
var _multiSelectDropdownItem = _interopRequireDefault(require("./multi-select-dropdown-item.js"));
var _useDropdown = _interopRequireDefault(require("./use-dropdown.js"));
var _dropdownHeader = _interopRequireDefault(require("./dropdown-header.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function MultiSelectDropdown(props, ref) {
  const {
    testID,
    menuTestID,
    options,
    mode,
    placeholder,
    label,
    menuUpIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.TextInput.Icon, {
      icon: 'menu-up',
      pointerEvents: "none"
    }),
    menuDownIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativePaper.TextInput.Icon, {
      icon: 'menu-down',
      pointerEvents: "none"
    }),
    value,
    menuContentStyle = {
      paddingVertical: 0
    },
    maxMenuHeight,
    listContainerStyle,
    statusBarHeight = _reactNative.Platform.OS === 'android' ? _reactNative.StatusBar.currentHeight : undefined,
    hideMenuHeader = false,
    isFlatList = false,
    flatListProps,
    scrollViewProps,
    isSearchable = false,
    Touchable = _reactNativePaper.TouchableRipple,
    disabled = false,
    error = false,
    onSelect,
    CustomMultiSelectDropdownItem = _multiSelectDropdownItem.default,
    CustomMultiSelectDropdownInput = _dropdownInput.default,
    CustomMenuHeader = _dropdownHeader.default,
    customInputProps = {}
  } = props;
  const selectedLabel = (0, _react.useMemo)(() => options.filter(option => value.includes(option.value)).map(option => option.label).join(', '), [options, value]);
  const {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout
  } = (0, _useDropdown.default)({
    maxMenuHeight,
    isSearchable
  });
  const rightIcon = enable ? menuUpIcon : menuDownIcon;
  (0, _react.useImperativeHandle)(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    }
  }));
  const resetMenu = (0, _react.useCallback)(() => {
    onSelect?.([]);
    toggleMenu();
  }, [onSelect, toggleMenu]);
  const renderMultiSelectDropdownItem = (0, _react.useCallback)((option, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomMultiSelectDropdownItem, {
    option: option,
    value: value,
    width: dropdownLayout.width,
    onSelect: onSelect,
    isLast: options.length <= index + 1,
    menuItemTestID: menuTestID ? `${menuTestID}-${option.value}` : ''
  }, option.value), [value, dropdownLayout.width, onSelect, options, menuTestID, CustomMultiSelectDropdownItem]);
  const handleInputFocus = (0, _react.useCallback)(_e => setEnable(true), [setEnable]);

  // Memoize the custom input props to prevent unnecessary re-renders
  const inputProps = (0, _react.useMemo)(() => ({
    placeholder,
    label,
    rightIcon,
    selectedLabel,
    mode,
    disabled,
    error,
    isSearchable,
    onFocus: handleInputFocus,
    ...customInputProps
  }), [placeholder, label, rightIcon, selectedLabel, mode, disabled, error, isSearchable, handleInputFocus, customInputProps]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativePaper.Menu, {
    testID: menuTestID,
    visible: enable,
    onDismiss: toggleMenu,
    style: menuStyle,
    elevation: 5,
    statusBarHeight: statusBarHeight,
    keyboardShouldPersistTaps: 'handled',
    anchor: /*#__PURE__*/(0, _jsxRuntime.jsx)(Touchable, {
      testID: testID,
      disabled: disabled,
      onLayout: onLayout,
      ...(!isSearchable && {
        onPress: toggleMenu
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        pointerEvents: isSearchable ? 'auto' : 'none',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomMultiSelectDropdownInput, {
          ...inputProps
        })
      })
    }),
    contentStyle: menuContentStyle,
    children: [!hideMenuHeader && /*#__PURE__*/(0, _jsxRuntime.jsx)(CustomMenuHeader, {
      label: label,
      toggleMenu: toggleMenu,
      resetMenu: resetMenu,
      value: value,
      multiSelect: true
    }), isFlatList ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.FlatList, {
      data: options,
      bounces: false,
      renderItem: ({
        item: option,
        index
      }) => renderMultiSelectDropdownItem(option, index),
      keyExtractor: item => item.value,
      style: [defaultListStyle, listContainerStyle],
      ...flatListProps
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
      style: [defaultListStyle, listContainerStyle],
      bounces: false,
      ...scrollViewProps,
      children: options.map((option, index) => renderMultiSelectDropdownItem(option, index))
    })]
  });
}
var _default = exports.default = /*#__PURE__*/(0, _react.forwardRef)(MultiSelectDropdown);
//# sourceMappingURL=multi-select-dropdown.js.map