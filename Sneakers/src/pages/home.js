import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
    
    Icon.loadFont();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Banner */}
                <Image style={styles.header_banner} source={require('../images/home/banner.png')}/>
            
                {/* Menu */}
                <View style={styles.header_menu}>
                    <Text style={[styles.classTitle, styles.header_menu_title,]}>
                        Sapatos
                    </Text>

                    <Icon name="reorder" size={40} color="#000" />
                </View>
            </View>

            {/* HR */}
            <View style={styles.classHr}></View>

            {/* Products || Sneakers */}
            <ScrollView style={styles.products}>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    // Class
    classTitle: {
        fontFamily: 'Anton-Regular',
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "100",
    },
    classHr: {
        height: 1,

        backgroundColor: "#000",
    },



    // Header
    // Banner
    header_banner: {
        width: '100%',
        height: 200,
    },

    // Menu
    header_menu: {
        flexDirection: "row",
        justifyContent: "space-between",

        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    // Title
})