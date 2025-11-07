import { useCallback, useState, useMemo } from 'react';
import { Keyboard, useWindowDimensions } from 'react-native';
function useDropdown({
  maxMenuHeight,
  maxHeightFraction = 2.5,
  isSearchable = false
}) {
  const [enable, setEnable] = useState(false);
  const {
    height
  } = useWindowDimensions();
  const finalMenuHeight = maxMenuHeight ?? height / maxHeightFraction;
  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0
  });
  const toggleMenu = useCallback(() => {
    Keyboard.dismiss();
    setEnable(prev => !prev);
  }, []);
  const onLayout = useCallback(({
    nativeEvent: {
      layout
    }
  }) => {
    setDropdownLayout(layout);
  }, []);
  const searchablePositioning = useMemo(() => {
    if (!isSearchable) return {};

    // If the dropdown is searchable, position it below the input
    return {
      marginTop: dropdownLayout.height
    };
  }, [isSearchable, dropdownLayout.height]);
  const menuStyle = useMemo(() => ({
    width: dropdownLayout.width,
    ...searchablePositioning
  }), [dropdownLayout.width, searchablePositioning]);
  const defaultListStyle = useMemo(() => ({
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
export default useDropdown;
//# sourceMappingURL=use-dropdown.js.map