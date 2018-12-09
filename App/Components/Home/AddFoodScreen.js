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
            TextInputNameCategory: '',
            statusAddCategory: false,
            priceFood: '',
            dropDownSelected: {
                name: 'Vui Lòng danh mục sản phẩm',
                id: -1
            },
            statusChooseCategory: false,
            TextInputNameFood: '',
            statusAddFood: false,
            categoriesFood: [],
            unitFood: ''
        }
    }
    componentWillMount() {
        this.getCategory()
    }
    getCategory = () => {
        var accessToken = this.props.accessToken;
        var that = this;
        try {

            fetch(Constant.urlCreateCategory, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },

            })
                .then((response) => {
                    this.setState({ TextInputNameCategory: '' })
                    let str = JSON.parse(response._bodyInit);
                    if (str.success == true) {
                        this.setState({ categoriesFood: str.result })
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
    createCategory = () => {
        var accessToken = this.props.accessToken;
        var that = this;
        if (this.state.TextInputNameCategory.trim() != '' && this.state.TextInputNameCategory.length > 0) {
            try {

                fetch(Constant.urlCreateCategory, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    },
                    body: JSON.stringify({
                        name: this.state.TextInputNameCategory
                    }),
                })
                    .then((response) => {

                        let str = JSON.parse(response._bodyInit);
                        if (str.success == true) {
                            that.getCategory()
                            Alert.alert(
                                'Thông báo',
                                'Tạo danh mục thành công',
                                [
                                    { text: 'OK' },
                                ],
                                { cancelable: false }
                            )
                            this.setState({ TextInputNameCategory: '', statusAddCategory: false })
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
    createFoodByCategory = () => {
        var accessToken = this.props.accessToken;
        var that = this;
        const { TextInputNameFood, priceFood, dropDownSelected, unitFood } = this.state;
        if (TextInputNameFood.trim() != '' && TextInputNameFood.length > 0 && priceFood.trim() != ''
            && priceFood.length > 0 && dropDownSelected.id != '-1', unitFood.trim() != '' && unitFood.length > 0) {
            try {

                fetch(Constant.urlBeverages, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    },
                    body: JSON.stringify({
                        category: dropDownSelected.id,
                        name: TextInputNameFood,
                        price: priceFood,
                        unit: unitFood
                    }),
                })
                    .then((response) => {
                        this.setState({ TextInputNameCategory: '' })
                        let str = JSON.parse(response._bodyInit);
                        if (str.success == true) {
                            that.setState({
                                priceFood: '', dropDownSelected: {
                                    name: 'Vui Lòng danh mục sản phẩm',
                                    id: -1
                                }, TextInputNameFood: '', statusAddFood: false,unitFood:''
                            })
                            Alert.alert(
                                'Thông báo',
                                'Tạo món thành công',
                                [
                                    { text: 'OK' ,onPress: () => that.resetData()},
                                ],
                                { cancelable: false }
                            )
                            
                            
                        } else {
                            Alert.alert(
                                'Thông báo',
                                'Tạo món thất bại',
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
                    'Tạo món thất bại',
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                )
            }
        } else {
            Alert.alert(
                'Thông báo',
                'Vui lòng điền đầy đủ thông tin',
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }

    }
    _renderCountryCodeRow(rowData) {

        const { name } = rowData;
        return (
            <View style={{
                justifyContent: 'center',
                width: DEVICE_WIDTH,
                height: 50,
                paddingRight: 10, paddingLeft: 10
            }}>
                <Text numberOfLines={1} style={[{ fontSize: 16, color: '#2c3e50', }]}> {`${name}`}</Text>
            </View>
        );
    }
    onDropdownWillHide = () => {
        this.setState({
            dropDownChecked: false
        });
    }

    onDropdownWillShow = () => {
        this.setState({
            dropDownChecked: true
        });
    }
    onChangeText = (value) => {
        if (value.trim() != '') {
            this.setState({ TextInputNameCategory: value, statusAddCategory: true })
        } else {

            this.setState({ statusAddCategory: false, TextInputNameFood: '' })
        }

    }
    onChangeTextFood = (value) => {
        if (value.trim() != '') {
            this.setState({ TextInputNameFood: value, statusAddFood: true })
        } else {

            this.setState({ statusAddFood: false, TextInputNameFood: '' })
        }

    }
    render() {
        return (
            <View >
                <View style={{ flex: 1 }}>
                    <Text>{'Tạo danh mục'}</Text>
                    <TextInput
                        autoCorrect={false}
                        onChangeText={this.onChangeText}
                        value={this.state.TextInputNameCategory}
                        placeholder={'Tên danh mục sản phẩm'}
                        style={styles.inputStyle}
                    />
                    <TouchableOpacity disabled={!this.state.statusAddCategory} style={{ justifyContent: 'center', alignItems: 'center', height: 50, margin: 20, backgroundColor: this.state.statusAddCategory ? '#33FFFF' : '#C0C0C0' }}
                        onPress={() => this.createCategory()}>
                        <Text style={{ color: this.state.statusAddCategory ? null : '#808080' }}>{'Tạo Danh mục'}</Text>
                    </TouchableOpacity>
                    <Text>{'Tạo món'}</Text>
                    <ModalDropdown style={[{ width: DEVICE_WIDTH, height: 50, }]}
                        options={this.state.categoriesFood}
                        renderRow={this._renderCountryCodeRow.bind(this)}
                        onDropdownWillShow={this.onDropdownWillShow}
                        onDropdownWillHide={this.onDropdownWillHide}
                        onSelect={(idx, value) => this.setState({
                            dropDownSelected: {
                                name: value.name,
                                id: value.id
                            },
                            statusChooseCategory: true,
                        })}
                        dropdownStyle={{
                            shadowColor: "rgba(0, 0, 0, 0.2)",
                            shadowOffset: {
                                width: 0,
                                height: 5
                            },
                            shadowRadius: 20,
                            shadowOpacity: 1,
                            // height: isTablet ? 60 : 50 * (optionsLocation.length > 3 ? 3 : optionsLocation.length),
                            width: DEVICE_WIDTH,
                            justifyContent: 'center',
                            // alignItems: 'center',
                        }}
                    >
                        <TDropDown checked={this.state.dropDownChecked} textStyle={{ color: '#2c3e50', fontSize: 16, alignItems: 'center', }} style={[{ paddingLeft: 10, paddingRight: 10, alignItems: 'center', }]}
                            title={this.state.dropDownSelected.name} />
                    </ModalDropdown>
                    <TextInput
                        disabled={this.state.dropDownSelected.id != -1 ? false : true}
                        autoCorrect={false}
                        value={this.state.TextInputNameFood}
                        onChangeText={this.onChangeTextFood}
                        placeholder={'Tên món'}
                        style={styles.inputStyle}

                    />
                    <TextInput
                        disabled={this.state.dropDownSelected.id != -1 ? false : true}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ priceFood: text })}
                        placeholder={'Giá'}
                        value={this.state.priceFood}
                        style={styles.inputStyle}
                    />
                    <TextInput
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ unitFood: text })}
                        placeholder={'Đơn vị'}
                        value={this.state.unitFood}
                        style={styles.inputStyle}

                    />
                    <TouchableOpacity disabled={!this.state.statusAddFood} style={{ justifyContent: 'center', alignItems: 'center', height: 50, margin: 20, backgroundColor: this.state.statusAddFood ? '#33FFFF' : '#C0C0C0' }}
                        onPress={() => this.createFoodByCategory()}
                    >
                        <Text style={{ color: this.state.statusAddFood ? null : '#808080' }}>{'Tạo Món'}</Text>
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