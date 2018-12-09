/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, TouchableOpacity, FlatList, Dimensions, TextInput, StyleSheet } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width
import ModalDropdown from 'react-native-modal-dropdown';
import TDropDown from '../../Modal/TDropdown'
import Constant from '../../config/constant'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInputNameCategory: ''
        }
    }
    componentWillMount() {

    }

    createCategory = () => {
        if (this.state.TextInputNameCategory.trim() != '' && this.state.TextInputNameCategory.length > 0) {
            try {

                fetch(Constant.urlCreateCategory, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"name":this.state.TextInputNameCategory}),
                })
                    .then((response) => {

                        console.log(JSON.parse(response._bodyInit));
                        this.setState({TextInputNameCategory:''})
                        let str = JSON.parse(response._bodyInit);
                        // this.setState({resultLogin:str})
                        if (str.sucess == true) {
                            // Actions.HomeScreen({ accessToken: str.accessToken });
                        } else {
                            Alert.alert(
                                'Thông báo',
                                'Tạo danh mục thất bại',
                                [
                                    { text: 'OK' },
                                ],
                                { cancelable: false }
                            )
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (e) {
                Alert.alert(
                    'Thông báo',
                    'Tạo danh mục thất bại',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                )
            }
        }

    }
    render() {
        return (
            <View >
                <View style={{ flex: 1 }}>
                    <Text>{'Tạo danh mục'}</Text>
                    <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ TextInputNameCategory: text })}
                        placeholder={'Tên danh mục sản phẩm'}
                        style={styles.inputStyle}
                    />
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 50, margin: 20, backgroundColor: '#33FFFF' }}
                        onPress={() => this.createCategory()}>
                        <Text>{'Tạo Danh mục'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>

                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    inputStyle: {
        color: '#333',
        fontSize: 16,
        lineHeight: 23,
        height: 50,
        borderColor: '#333',
        borderWidth: 0.5,
        fontFamily: 'System',
        margin: 10,
        borderRadius: 5
    }

})