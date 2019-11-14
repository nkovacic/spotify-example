import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo, { LogoSize } from './Logo';
import { STATUSBAR_HEIGHT } from 'app/appStyle';
import { PlatformHelper } from 'app/services/PlatformHelper';
import { CustomText } from '.';
import { FontWeight } from './CustomText';
import mainTranslations from 'app/mainTranslations';

class NavbarTitle extends Component<any> {
    render() {
        return (
            <View style={styles.headerContainer}>
                <CustomText fontWeight={FontWeight.bold}>
                    {mainTranslations.general.appTitle}
                </CustomText>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginTop: STATUSBAR_HEIGHT,
        flex: 1,
        justifyContent: 'center'
    }
});

export default NavbarTitle;