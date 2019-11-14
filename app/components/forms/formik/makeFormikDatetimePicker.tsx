import React from 'react';
import { get } from 'lodash';
import { compose, mapProps } from 'recompose';
import {
    setFormikInitialValue, 
    setFormikInitialValueProps,
    withError, 
    withErrorProps,
    withTouched,
    withTouchedProps,
    withFormik,
    makeReactNativeFieldProps
} from 'react-native-formik';
import { FormikState, FormikValues } from 'formik';
import Logger from 'app/services/Logger';

const makeRectNativeDatetimePicker = compose(
    withFormik,
    mapProps<FormikState<FormikValues>, any>(({ formik: { setFieldValue, setFieldTouched, values, isSubmitting }, name, ...props }) => ({
        date: get(values, name),
        maxDate: props.maxDate,
        minDate: props.minDate,
        ...props,
        name,
        onChange: (newDate: Date, oldDate: Date) => {
            setFieldValue(name, newDate);
            
            if (props.onChange) {
                props.onChange(newDate, oldDate);
            }
        },
        onCancel: () => {
            // validate onCancel only while not submitting
            // this prevents validating twice in succession when clicking 'done' on keyboard - first onSubmitEditing, then onCancel
            setFieldTouched(name, true, !isSubmitting);
            
            if (props.onCancel) {
                props.onCancel();
            }
        }
    }))
);

type makeFormikInputProps = makeReactNativeFieldProps &
    setFormikInitialValueProps &
    withErrorProps &
    withTouchedProps;

type makeFormikField = <Props>(wrappedComponent: React.ComponentType<Props>) => React.ComponentClass<Props & makeFormikInputProps>;

const makeFormDatetimePicker = compose(
    withError,
    withTouched,
    makeRectNativeDatetimePicker
) as makeFormikField;

export default makeFormDatetimePicker;