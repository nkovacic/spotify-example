import React, { Component } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { makeReactNativeFieldProps } from 'react-native-formik';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { isEqual, format, isValid } from 'date-fns'

import CustomIcon, { IconType } from '../CustomIcon';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';

import appStyle from 'app/appStyle';


interface State {
    isDatetimePickerVisible: boolean;
    isDefaultDate: boolean;
    timeZoneOffsetInHours: number;
}

interface Props extends ViewProps, makeReactNativeFieldProps {
    date?: Date;
    defaultDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    onCancel?(): void;
    onChange?(newDate: Date, oldDate?: Date): void;
}

const defaultDate = new Date(2000, 0, 2)

class CustomDatetimePicker extends Component<Props, State> {
    static defaultProps: Props = {
        date: new Date(
            defaultDate.getUTCFullYear(),
            defaultDate.getUTCMonth(),
            defaultDate.getUTCDate(),
            defaultDate.getUTCHours(),
            defaultDate.getUTCMinutes(),
            defaultDate.getUTCSeconds()
        )
    } as any;

    constructor(props: Props) {
        super(props);

        const newDefaultDate = this.props.defaultDate || defaultDate

        this.state = {
            isDatetimePickerVisible: false,
            isDefaultDate: isEqual(this.props.date!, newDefaultDate),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
        };
    }

    private getValidDate() {
        if (isValid(this.props.date)) {
            return this.props.date!;
        }
        else if (isValid(this.props.defaultDate)) {
            return this.props.defaultDate!;
        }
        else {
            return CustomDatetimePicker.defaultProps.date!;
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.date !== this.props.date && !isEqual(prevProps.date as Date, this.props.date as Date)) {
            this.setState({
                isDefaultDate: false
            });
        }
    }

    onDatetimePickerCancel = () => {
        this.setState({
            isDatetimePickerVisible: false
        });

        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    onDatetimePickerConfirm = (date: Date) => {
        this.setState({
            isDatetimePickerVisible: false,
            isDefaultDate: false
        });

        if (this.props.onChange) {
            this.props.onChange(date, this.props.date);
        }
    }

    openDatePicker = () => {
        this.setState({ isDatetimePickerVisible: true });
    }
    
    renderDateParts() {
        const date = this.getValidDate();

        return ['dd', 'MM', 'yyyy'].map((dateFormat) => {
            let textStyles = [styles.datePartText] as Array<any>;

            if (!this.state.isDefaultDate) {
                textStyles.push(styles.datePartTextTouched);
            }
            
            return (
                <View key={dateFormat} style={styles.datePartContainer}>
                    <CustomText style={textStyles}>
                        {format(date, dateFormat)}
                    </CustomText>
                    <CustomIcon style={styles.datePartIcon} color={appStyle.colors.lightGrey} 
                        name='md-arrow-dropdown' iconType={IconType.ionicons} size={20} />
                </View>
            );
        })
    }

    render() {
        const date = this.getValidDate(),
            { minDate, maxDate } = this.props;

        return (
            <CustomTouchable {...this.props} onPress={this.openDatePicker}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        {this.renderDateParts()}
                    </View>
                    <DateTimePicker
                        date={date}
                        datePickerModeAndroid='spinner'
                        isVisible={this.state.isDatetimePickerVisible}
                        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                        maximumDate={maxDate}
                        minimumDate={minDate}
                        onConfirm={this.onDatetimePickerConfirm}
                        onCancel={this.onDatetimePickerCancel}                    
                    />
                </View>
            </CustomTouchable>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    datePartContainer: {
        borderColor: appStyle.colors.lightGrey,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        marginRight: 10,
        paddingBottom: 1,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 1
    },
    datePartText: {
        fontSize: 18,
        marginRight: 5
    },
    datePartTextTouched: {
        color: 'black'
    },
    datePartIcon: {
        alignSelf: 'center'
    }
})

export default CustomDatetimePicker;