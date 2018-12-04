/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';




export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChooseTab: 0,
        }
    }



    render() {
        return (
            <View >
                <Text>Thanh Toán</Text>
            </View >
        );
    }
}

