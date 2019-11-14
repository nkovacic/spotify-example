import { StyleSheet, RegisteredStyle } from 'react-native';

import { scale } from './scalingUtils';
import deepMap from './deepMap';
import { NamedStyles } from './types';

const validScaleSheetRegex = /^(\-?\d+(\.\d{1,2})?)@(ms(\d+(\.\d{1,2})?)?|s|vs)$/;
const scaleRegex = /^(\-?\d+(\.\d{1,2})?)@s$/;
const verticalScaleRegex = /^(\-?\d+(\.\d{1,2})?)@vs$/;
const moderateScaleRegex = /^(\-?\d+(\.\d{1,2})?)@ms(\d+(\.\d{1,2})?)?$/;

const scaleByAnnotation = (value: string): number => {
    if (!validScaleSheetRegex.test(value)) {
        return parseFloat(value);
    }
    const size = parseFloat(value.split('@')[0]);

    if (scaleRegex.test(value)) {
        return scale(size);
    }

    return size ? size : parseFloat(value);
};

const ScaledSheet = {
    create<T extends NamedStyles<T>>(styleSheet: T): { [P in keyof T]: RegisteredStyle<T[P]> } {
        return StyleSheet.create(deepMap(styleSheet, scaleByAnnotation)) as any;
    }
};

export default ScaledSheet;