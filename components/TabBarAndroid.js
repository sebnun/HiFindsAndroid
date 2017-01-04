import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const TabBarAndroid = (props) =>
    <View style={styles.container}>

        <TouchableOpacity
            style={[styles.touch, props.current === 'all' ? styles.active : undefined]}
            onPress={() => props.update('all')}>
            <Text style={styles.text}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.touch, props.current === 'womens' ? styles.active : undefined]}
            onPress={() => props.update('womens')}>
            <Text style={styles.text}>Women's</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.touch, props.current === 'mens' ? styles.active : undefined]}
            onPress={() => props.update('mens')}>
            <Text style={styles.text}>Men's</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.touch, props.current === 'fun' ? styles.active : undefined]}
            onPress={() => props.update('fun')}>
            <Text style={styles.text}>Fun</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.touch, props.current === 'home' ? styles.active : undefined]}
            onPress={() => props.update('home')}>
            <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

    </View>;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    touch: {
        height: 30,
        flex: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd'
    },
    text: {
        textAlign: 'center'
    },
    active: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF5656',
    }
})

export default TabBarAndroid;