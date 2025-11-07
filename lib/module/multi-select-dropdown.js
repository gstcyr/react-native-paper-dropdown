import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import { FlatList, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownInput from "./dropdown-input.js";
import MultiSelectDropdownItem from "./multi-select-dropdown-item.js";
import useDropdown from "./use-dropdown.js";
import DropdownHeader from "./dropdown-header.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function MultiSelectDropdown(props, ref) {
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
    menuContentStyle = {
      paddingVertical: 0
    },
    maxMenuHeight,
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
    CustomMultiSelectDropdownItem = MultiSelectDropdownItem,
    CustomMultiSelectDropdownInput = DropdownInput,
    CustomMenuHeader = DropdownHeader,
    customInputProps = {}
  } = props;
  const selectedLabel = useMemo(() => options.filter(option => value.includes(option.value)).map(option => option.label).join(', '), [options, value]);
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
  useImperativeHandle(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    }
  }));
  const resetMenu = useCallback(() => {
    onSelect?.([]);
    toggleMenu();
  }, [onSelect, toggleMenu]);
  const renderMultiSelectDropdownItem = useCallback((option, index) => /*#__PURE__*/_jsx(CustomMultiSelectDropdownItem, {
    option: option,
    value: value,
    width: dropdownLayout.width,
    onSelect: onSelect,
    isLast: options.length <= index + 1,
    menuItemTestID: menuTestID ? `${menuTestID}-${option.value}` : ''
  }, option.value), [value, dropdownLayout.width, onSelect, options, menuTestID, CustomMultiSelectDropdownItem]);
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
    testID: menuTestID,
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
        children: /*#__PURE__*/_jsx(CustomMultiSelectDropdownInput, {
          ...inputProps
        })
      })
    }),
    contentStyle: menuContentStyle,
    children: [!hideMenuHeader && /*#__PURE__*/_jsx(CustomMenuHeader, {
      label: label,
      toggleMenu: toggleMenu,
      resetMenu: resetMenu,
      value: value,
      multiSelect: true
    }), isFlatList ? /*#__PURE__*/_jsx(FlatList, {
      data: options,
      bounces: false,
      renderItem: ({
        item: option,
        index
      }) => renderMultiSelectDropdownItem(option, index),
      keyExtractor: item => item.value,
      style: [defaultListStyle, listContainerStyle],
      ...flatListProps
    }) : /*#__PURE__*/_jsx(ScrollView, {
      style: [defaultListStyle, listContainerStyle],
      bounces: false,
      ...scrollViewProps,
      children: options.map((option, index) => renderMultiSelectDropdownItem(option, index))
    })]
  });
}
export default /*#__PURE__*/forwardRef(MultiSelectDropdown);
//# sourceMappingURL=multi-select-dropdown.js.map