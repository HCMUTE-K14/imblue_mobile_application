import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default class TDropDown extends React.Component {

    render() {
        const { checked, isShowBoder } = this.props;
            return (
                <View>
                    <View style={[styles.container, this.props.style]}>
                        <Text numberOfLines={1} style={[styles.title]}>{this.props.title}</Text>
                        <View style={styles.arrow}>
                            <Icon style={[{ marginRight: 10 }, this.props.iconStyle]} name={checked ? 'ios-arrow-down' : 'ios-arrow-up'} size={20} />
                        </View>
                    </View>
                </View>
            );
        }
}
var styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        height:50,
        // alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderColor: '#cccccc',
        borderWidth: 1,
        // justifyContent: 'center'
    },
    container1: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    arrow: {
        position: 'absolute',
        top: 0, right: 0,
        bottom: 0,
        justifyContent: 'center'

    },
    title: {
        color: '#000000',
        marginRight: 30,

    },

});