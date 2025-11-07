"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
function useDropdown({
  maxMenuHeight,
  maxHeightFraction = 2.5,
  isSearchable = false
}) {
  const [enable, setEnable] = (0, _react.useState)(false);
  const {
    height
  } = (0, _reactNative.useWindowDimensions)();
  const finalMenuHeight = maxMenuHeight ?? height / maxHeightFraction;
  const [dropdownLayout, setDropdownLayout] = (0, _react.useState)({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });
  const toggleMenu = (0, _react.useCallback)(() => {
    _reactNative.Keyboard.dismiss();
    setEnable(prev => !prev);
  }, []);
  const onLayout = (0, _react.useCallback)(({
    nativeEvent: {
      layout
    }
  }) => {
    setDropdownLayout(layout);
  }, []);
  const searchablePositioning = (0, _react.useMemo)(() => {
    if (!isSearchable) return {};

    // If the dropdown is searchable, position it below the input
    return {
      marginTop: dropdownLayout.height
    };
  }, [isSearchable, dropdownLayout.height]);
  const menuStyle = (0, _react.useMemo)(() => ({
    width: dropdownLayout.width,
    ...searchablePositioning
  }), [dropdownLayout.width, searchablePositioning]);
  const defaultListStyle = (0, _react.useMemo)(() => ({
    maxHeight: finalMenuHeight
  }), [finalMenuHeight]);
  return {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout
  };
}
var _default = exports.default = useDropdown;
//# sourceMappingURL=use-dropdown.js.map