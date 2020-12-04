import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Home() {

    Icon.loadFont();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.header_banner} source={require('../images/home/banner.png')}/>
            </View>

            <View style={styles.header_menu}>
                <Text style={styles.header_menu_title}>
                    Sapatos
                </Text>

                <Icon name="reorder" size={40} color="#000" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    // Class



    // Header
    // Banner
    header_banner: {
        width: '100%',
        height: 200,
    },

    // Menu
    // Title
    header_menu_title:{
        fontFamily: 'Open Sans'
    },
})