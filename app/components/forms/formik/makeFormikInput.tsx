import React from 'react';
import {
    makeReactNativeField,
    makeReactNativeFieldProps,
    setFormikInitialValue, 
    setFormikInitialValueProps,
    withError, 
    withErrorProps,
    withTouched,
    withTouchedProps
} from 'react-native-formik';
import { compose, mapProps } from 'recompose';

import { InputType } from '../CustomInput';
import { TextInputProps } from 'react-native';

interface withInputTypePropsProps {
    type?: InputType
}

type makeFormikInputProps = makeReactNativeFieldProps &
    setFormikInitialValueProps &
    withInputTypePropsProps &
    withErrorProps &
    withTouchedProps;

type makeFormikInputType = <Props>(wrappedComponent: React.ComponentType<Props>) => React.ComponentClass<Props & makeFormikInputProps>;
type withInputTypeProps = <Props>(wrappedComponent: React.ComponentType<Props>) => React.ComponentClass<Props & withInputTypePropsProps>;

const getInputTypeProps = (type: InputType) => {
    switch (type) {
        case InputType.email:
            return {
                autoCorrect: false,
                keyboardType: "email-address",
                autoCapitalize: "none"
            } as TextInputProps;
        case InputType.password:
            return {
                autoCorrect: false,
                secureTextEntry: true,
                autoCapitalize: "none"
            } as TextInputProps;
        case InputType.number:
            return {
                keyboardType: "phone-pad"
            } as TextInputProps;
        case InputType.name:
            return {
                autoCorrect: false
            } as TextInputProps;
        default:
            return {};
    }
}; 

const withInputTypeProps = mapProps<InputType, any>(({ inputType, ...props }) => ({
    ...getInputTypeProps(inputType),
    ...props
  })) as withInputTypeProps;

const makeFormikInput = compose(
    withInputTypeProps,
    setFormikInitialValue,
    withError,
    withTouched,
    makeReactNativeField
) as makeFormikInputType;

export default makeFormikInput;