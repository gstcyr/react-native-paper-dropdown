import { useCallback, useState, useMemo } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  LayoutRectangle,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

export type UseDropdownParams = {
  maxMenuHeight?: number;
  maxHeightFraction?: number;
  isSearchable?: boolean;
};

function useDropdown({
  maxMenuHeight,
  maxHeightFraction = 2.5,
  isSearchable = false,
}: UseDropdownParams) {
  const [enable, setEnable] = useState(false);
  const { height } = useWindowDimensions();
  const finalMenuHeight = maxMenuHeight ?? height / maxHeightFraction;

  const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const toggleMenu = useCallback(() => {
    Keyboard.dismiss();
    setEnable((prev) => !prev);
  }, []);

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setDropdownLayout(layout);
    },
    []
  );

  const searchablePositioning = useMemo(() => {
    if (!isSearchable) return {};

    // If the dropdown is searchable, position it below the input
    return { marginTop: dropdownLayout.height };
  }, [isSearchable, dropdownLayout.height]);

  const menuStyle: ViewStyle = useMemo(
    () => ({
      width: dropdownLayout.width,
      ...searchablePositioning,
    }),
    [dropdownLayout.width, searchablePositioning]
  );

  const defaultListStyle: ViewStyle = useMemo(
    () => ({
      maxHeight: finalMenuHeight,
    }),
    [finalMenuHeight]
  );

  return {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout,
  };
}

export default useDropdown;
