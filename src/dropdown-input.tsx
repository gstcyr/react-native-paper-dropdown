import { TextInput } from 'react-native-paper';
import { DropdownInputProps } from './types';

function DropdownInput(props: DropdownInputProps) {
  const {
    placeholder,
    label,
    rightIcon,
    selectedLabel,
    mode,
    disabled,
    error,
    isSearchable = false,
  } = props;

  return (
    <TextInput
      placeholder={placeholder}
      label={label}
      value={selectedLabel}
      right={rightIcon}
      mode={mode}
      editable={isSearchable}
      disabled={disabled}
      error={error}
    />
  );
}

export default DropdownInput;
