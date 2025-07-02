import { ForwardRefExoticComponent } from 'react';
import {
  DimensionValue,
  FlatListProps,
  NativeSyntheticEvent,
  PressableProps,
  ScrollViewProps,
  StyleProp,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from 'react-native';
import { TextInputLabelProp } from 'react-native-paper/lib/typescript/components/TextInput/types';
import { TextInputProps } from 'react-native-paper';

export type DropdownInputProps = {
  placeholder?: string;
  label?: TextInputLabelProp;
  rightIcon: JSX.Element;
  selectedLabel?: string;
  mode?: 'flat' | 'outlined';
  disabled?: boolean;
  error?: boolean;
  isSearchable?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

export type Option = {
  label: string;
  value: string;
};

export type DropdownProps = {
  testID?: string;
  menuTestID?: string;
  value?: string;
  options: Option[];
  menuUpIcon?: JSX.Element;
  menuDownIcon?: JSX.Element;
  maxMenuHeight?: number;
  menuContentStyle?: ViewStyle;
  listContainerStyle?: StyleProp<ViewStyle>;
  hideMenuHeader?: boolean;
  statusBarHeight?: number;
  isSearchable?: boolean;
  Touchable?: ForwardRefExoticComponent<
    PressableProps & React.RefAttributes<View>
  >;
  onSelect?: (value?: string) => void;
  CustomMenuHeader?: (props: DropdownHeaderProps) => JSX.Element;
  CustomDropdownItem?: (props: DropdownItemProps) => JSX.Element;
  CustomDropdownInput?: (props: DropdownInputProps) => JSX.Element;
  customInputProps?: Record<string, any>;
} & Pick<
  TextInputProps,
  'placeholder' | 'label' | 'mode' | 'disabled' | 'error'
> &
  ListRenderProps;

export type MultiSelectDropdownProps = {
  testID?: string;
  menuTestID?: string;
  value: string[];
  options: Option[];
  menuUpIcon?: JSX.Element;
  menuDownIcon?: JSX.Element;
  maxMenuHeight?: number;
  menuContentStyle?: ViewStyle;
  listContainerStyle?: StyleProp<ViewStyle>;
  hideMenuHeader?: boolean;
  statusBarHeight?: number;
  isSearchable?: boolean;
  Touchable?: ForwardRefExoticComponent<
    PressableProps & React.RefAttributes<View>
  >;
  onSelect?: (value: string[]) => void;
  CustomMenuHeader?: (props: DropdownHeaderProps) => JSX.Element;
  CustomMultiSelectDropdownItem?: (
    props: MultiSelectDropdownItemProps
  ) => JSX.Element;
  CustomMultiSelectDropdownInput?: (props: DropdownInputProps) => JSX.Element;
  customInputProps?: Record<string, any>;
} & Pick<
  TextInputProps,
  'placeholder' | 'label' | 'mode' | 'disabled' | 'error'
> &
  ListRenderProps;

export type DropdownItemProps = {
  option: Option;
  value?: string;
  onSelect?: (value: string) => void;
  width: DimensionValue;
  toggleMenu: () => void;
  isLast: boolean;
  menuItemTestID?: string;
};

export type MultiSelectDropdownItemProps = {
  option: Option;
  value?: string[];
  onSelect?: (value: string[]) => void;
  width: DimensionValue;
  isLast: boolean;
  menuItemTestID?: string;
};

export type DropdownHeaderProps = {
  value?: string | string[];
  label?: TextInputLabelProp;
  multiSelect: boolean;
  toggleMenu: () => void;
  resetMenu: () => void;
};

export type DropdownRef = {
  blur: () => void;
  focus: () => void;
};

export type ListRenderProps =
  | {
      isFlatList: true;
      flatListProps?: Omit<
        FlatListProps<Option>,
        'data' | 'renderItem' | 'keyExtractor'
      >;
      scrollViewProps?: never;
    }
  | {
      isFlatList?: false;
      flatListProps?: never;
      scrollViewProps?: ScrollViewProps;
    };
