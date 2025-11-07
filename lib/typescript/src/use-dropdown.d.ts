import { LayoutChangeEvent, LayoutRectangle, ViewStyle } from 'react-native';
export type UseDropdownParams = {
    maxMenuHeight?: number;
    maxHeightFraction?: number;
    isSearchable?: boolean;
};
declare function useDropdown({ maxMenuHeight, maxHeightFraction, isSearchable, }: UseDropdownParams): {
    enable: boolean;
    setEnable: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    toggleMenu: () => void;
    onLayout: ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
    menuStyle: ViewStyle;
    defaultListStyle: ViewStyle;
    dropdownLayout: LayoutRectangle;
};
export default useDropdown;
//# sourceMappingURL=use-dropdown.d.ts.map