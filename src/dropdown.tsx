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
import DropdownItem from './dropdown-item';
import DropdownInput from './dropdown-input';
import { DropdownProps, DropdownRef, Option } from './types';
import useDropdown from './use-dropdown';
import { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import DropdownHeader from './dropdown-header';

function Dropdown(props: DropdownProps, ref: React.Ref<DropdownRef>) {
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
    maxMenuHeight,
    menuContentStyle,
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
    CustomDropdownItem = DropdownItem,
    CustomDropdownInput = DropdownInput,
    CustomMenuHeader = DropdownHeader,
    customInputProps = {},
  } = props;
  const selectedLabel = options.find((option) => option.value === value)?.label;
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
  const contentStyle = useMemo(() => ({ paddingVertical: 0 }), []);

  useImperativeHandle(ref, () => ({
    focus() {
      setEnable(true);
    },
    blur() {
      setEnable(false);
    },
  }));

  const resetMenu = useCallback(() => {
    onSelect?.(undefined);
    toggleMenu();
  }, [onSelect, toggleMenu]);

  const renderDropdownItem = useCallback(
    (option: Option, index: number) => (
      <CustomDropdownItem
        key={option.value}
        option={option}
        value={value}
        width={dropdownLayout.width}
        toggleMenu={toggleMenu}
        onSelect={onSelect}
        isLast={options.length <= index + 1}
        menuItemTestID={menuTestID ? `${menuTestID}-${option.value}` : ''}
      />
    ),
    [
      value,
      dropdownLayout.width,
      toggleMenu,
      onSelect,
      options,
      menuTestID,
      CustomDropdownItem,
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
            <CustomDropdownInput {...inputProps} />
          </View>
        </Touchable>
      }
      contentStyle={[contentStyle, menuContentStyle]}
      testID={menuTestID}
    >
      {!hideMenuHeader && (
        <CustomMenuHeader
          label={label}
          toggleMenu={toggleMenu}
          resetMenu={resetMenu}
          value={value}
          multiSelect={false}
        />
      )}

      {isFlatList ? (
        <FlatList
          data={options}
          bounces={false}
          renderItem={({ item: option, index }) =>
            renderDropdownItem(option, index)
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
          {options.map((option, index) => renderDropdownItem(option, index))}
        </ScrollView>
      )}
    </Menu>
  );
}

export default forwardRef(Dropdown);
