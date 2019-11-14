import { UtilityHelper } from "app/services/UtilityHelper";
import { StyleSheet } from "react-native";
import { NamedStyles } from "./types";

type deepMapMutator = (val: string) => number;

const deepMapper = (val: string, fn?: any): number => {
    return UtilityHelper.isObject(val) ? deepMap(val as any, fn) : fn(val);
}

function mapObject<T extends NamedStyles<T>>(obj: T, fn: deepMapMutator) {
    return Object.keys(obj).reduce(
    (res, key) => {
        res[key] = fn((obj as any)[key]);

        return res;
    }, {} as any) as NamedStyles<T>;
}

function deepMap<T extends NamedStyles<T>>(obj: NamedStyles<T>, fn: deepMapMutator): any {
    if (Array.isArray(obj)) {
        return obj.map((val: string) => deepMapper(val)) as any;
    }

    if (UtilityHelper.isObject(obj)) {
        return mapObject(obj, deepMapper);
    }

    return obj;
};



export default deepMap;