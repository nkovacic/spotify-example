import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export interface StringifiedStyles {
    fontSize?: string | number;
    letterSpacing?: string | number;
    lineHeight?: string | number;
    textShadowRadius?: string | number;
    textShadowOffset?: { width: number | string; height: number | string; };
    shadowOffset?: { width: number | string; height: number | string; };
    borderBottomLeftRadius?: string | number;
    borderBottomRightRadius?: string | number;
    borderTopLeftRadius?: string | number;
    borderTopRightRadius?: string | number;
    borderBottomWidth?: string | number;
    borderTopWidth?: string | number;
    borderRightWidth?: string | number;
    borderLeftWidth?: string | number;
    borderRadius?: string | number;
    shadowRadius?: string | number;
    borderWidth?: string | number;
    aspectRatio?: string | number;
    rotation?: string | number;
    scaleX?: string | number;
    scaleY?: string | number;
    translateX?: string | number;
    translateY?: string | number;
}

export type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle | StringifiedStyles };