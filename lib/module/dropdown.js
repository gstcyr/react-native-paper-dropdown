import { FlatList, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownItem from "./dropdown-item.js";
import DropdownInput from "./dropdown-input.js";
import useDropdown from "./use-dropdown.js";
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import DropdownHeader from "./dropdown-header.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Dropdown(props, ref) {
  const {
    testID,
    menuTestID,
    options,
    mode,
    placeholder,
    label,
    menuUpIcon = /*#__PURE__*/_jsx(TextInput.Icon, {
      icon: 'menu-up',
      pointerEvents: "none"
    }),
    menuDownIcon = /*#__PURE__*/_jsx(TextInput.Icon, {
      icon: 'menu-down',
      pointerEvents: "none"
    }),
    value,
    maxMenuHeight,
    menuContentStyle,
    listContainerStyle,
    statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : undefined,
    hideMenuHeader = false,
    isFlatList = false,
    flatListProps,
    scrollViewProps,
    isSearchable = false,
    Touchable = TouchableRipple,
    disabled = false,
    error = false,
    onSelect,
    CustomDropdownItem = DropdownItem,
    CustomDropdownInput = DropdownInput,
    CustomMenuHeader = DropdownHeader,
    customInputProps = {}
  } = props;
  const selectedLabel = options.find(option => option.value === value)?.label;
  const {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout
  } = useDropdown({
    maxMenuHeight,
    isSearchable
  });
  const rightIcon = enable ? menuUpIcon : menuDownIcon;
  const contentStyle = useMemo(() => ({
    paddingVertical: 0
  }), []);
  useImperativeHandle(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    }
  }));
  const resetMenu = useCallback(() => {
    onSelect?.(undefined);
    toggleMenu();
  }, [onSelect, toggleMenu]);
  const renderDropdownItem = useCallback((option, index) => /*#__PURE__*/_jsx(CustomDropdownItem, {
    option: option,
    value: value,
    width: dropdownLayout.width,
    toggleMenu: toggleMenu,
    onSelect: onSelect,
    isLast: options.length <= index + 1,
    menuItemTestID: menuTestID ? `${menuTestID}-${option.value}` : ''
  }, option.value), [value, dropdownLayout.width, toggleMenu, onSelect, options, menuTestID, CustomDropdownItem]);
  const handleInputFocus = useCallback(_e => setEnable(true), [setEnable]);

  // Memoize the custom input props to prevent unnecessary re-renders
  const inputProps = useMemo(() => ({
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
  return /*#__PURE__*/_jsxs(Menu, {
    visible: enable,
    onDismiss: toggleMenu,
    style: menuStyle,
    elevation: 5,
    statusBarHeight: statusBarHeight,
    keyboardShouldPersistTaps: 'handled',
    anchor: /*#__PURE__*/_jsx(Touchable, {
      testID: testID,
      disabled: disabled,
      onLayout: onLayout,
      ...(!isSearchable && {
        onPress: toggleMenu
      }),
      children: /*#__PURE__*/_jsx(View, {
        pointerEvents: isSearchable ? 'auto' : 'none',
        children: /*#__PURE__*/_jsx(CustomDropdownInput, {
          ...inputProps
        })
      })
    }),
    contentStyle: [contentStyle, menuContentStyle],
    testID: menuTestID,
    children: [!hideMenuHeader && /*#__PURE__*/_jsx(CustomMenuHeader, {
      label: label,
      toggleMenu: toggleMenu,
      resetMenu: resetMenu,
      value: value,
      multiSelect: false
    }), isFlatList ? /*#__PURE__*/_jsx(FlatList, {
      data: options,
      bounces: false,
      renderItem: ({
        item: option,
        index
      }) => renderDropdownItem(option, index),
      keyExtractor: item => item.value,
      style: [defaultListStyle, listContainerStyle],
      ...flatListProps
    }) : /*#__PURE__*/_jsx(ScrollView, {
      style: [defaultListStyle, listContainerStyle],
      bounces: false,
      ...scrollViewProps,
      children: options.map((option, index) => renderDropdownItem(option, index))
    })]
  });
}
export default /*#__PURE__*/forwardRef(Dropdown);
//# sourceMappingURL=dropdown.js.map