import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import {
  FlatList,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StatusBar,
  TextInputFocusEventData,
  View,
} from 'react-native';
import { Menu, TextInput, TouchableRipple } from 'react-native-paper';
import DropdownInput from './dropdown-input';
import MultiSelectDropdownItem from './multi-select-dropdown-item';
import { DropdownRef, MultiSelectDropdownProps, Option } from './types';
import useDropdown from './use-dropdown';
import DropdownHeader from './dropdown-header';

function MultiSelectDropdown(
  props: MultiSelectDropdownProps,
  ref: React.Ref<DropdownRef>
) {
  const {
    testID,
    menuTestID,
    options,
    mode,
    placeholder,
    label,
    menuUpIcon = <TextInput.Icon icon={'menu-up'} pointerEvents="none" />,
    menuDownIcon = <TextInput.Icon icon={'menu-down'} pointerEvents="none" />,
    value,
    menuContentStyle = { paddingVertical: 0 },
    maxMenuHeight,
    listContainerStyle,
    statusBarHeight = Platform.OS === 'android'
      ? StatusBar.currentHeight
      : undefined,
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
    customInputProps = {},
  } = props;

  const selectedLabel = useMemo(
    () =>
      options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label)
        .join(', '),
    [options, value]
  );
  const {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout,
  } = useDropdown({ maxMenuHeight, isSearchable });
  const rightIcon = enable ? menuUpIcon : menuDownIcon;

  useImperativeHandle(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    },
  }));

  const resetMenu = useCallback(() => {
    onSelect?.([]);
    toggleMenu();
  }, [onSelect, toggleMenu]);

  const renderMultiSelectDropdownItem = useCallback(
    (option: Option, index: number) => (
      <CustomMultiSelectDropdownItem
        key={option.value}
        option={option}
        value={value}
        width={dropdownLayout.width}
        onSelect={onSelect}
        isLast={options.length <= index + 1}
        menuItemTestID={menuTestID ? `${menuTestID}-${option.value}` : ''}
      />
    ),
    [
      value,
      dropdownLayout.width,
      onSelect,
      options,
      menuTestID,
      CustomMultiSelectDropdownItem,
    ]
  );

  const handleInputFocus = useCallback(
    (_e: NativeSyntheticEvent<TextInputFocusEventData>) => setEnable(true),
    [setEnable]
  );

  // Memoize the custom input props to prevent unnecessary re-renders
  const inputProps = useMemo(
    () => ({
      placeholder,
      label,
      rightIcon,
      selectedLabel,
      mode,
      disabled,
      error,
      isSearchable,
      onFocus: handleInputFocus,
      ...customInputProps,
    }),
    [
      placeholder,
      label,
      rightIcon,
      selectedLabel,
      mode,
      disabled,
      error,
      isSearchable,
      handleInputFocus,
      customInputProps,
    ]
  );

  return (
    <Menu
      testID={menuTestID}
      visible={enable}
      onDismiss={toggleMenu}
      style={menuStyle}
      elevation={5}
      statusBarHeight={statusBarHeight}
      keyboardShouldPersistTaps={'handled'}
      anchor={
        <Touchable
          testID={testID}
          disabled={disabled}
          onLayout={onLayout}
          {...(!isSearchable && { onPress: toggleMenu })}
        >
          <View pointerEvents={isSearchable ? 'auto' : 'none'}>
            <CustomMultiSelectDropdownInput {...inputProps} />
          </View>
        </Touchable>
      }
      contentStyle={menuContentStyle}
    >
      {!hideMenuHeader && (
        <CustomMenuHeader
          label={label}
          toggleMenu={toggleMenu}
          resetMenu={resetMenu}
          value={value}
          multiSelect
        />
      )}
      {isFlatList ? (
        <FlatList
          data={options}
          bounces={false}
          renderItem={({ item: option, index }) =>
            renderMultiSelectDropdownItem(option, index)
          }
          keyExtractor={(item) => item.value}
          style={[defaultListStyle, listContainerStyle]}
          {...flatListProps}
        />
      ) : (
        <ScrollView
          style={[defaultListStyle, listContainerStyle]}
          bounces={false}
          {...scrollViewProps}
        >
          {options.map((option, index) =>
            renderMultiSelectDropdownItem(option, index)
          )}
        </ScrollView>
      )}
    </Menu>
  );
}

export default forwardRef(MultiSelectDropdown);
