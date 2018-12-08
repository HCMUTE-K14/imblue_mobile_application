/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, TouchableOpacity, FlatList, Dimensions } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width
import ModalDropdown from 'react-native-modal-dropdown';
import TDropDown from '../../Modal/TDropdown'



export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            FoodList: [],
            ListOrders: [],
            PaymentTable: null,
        }
    }
    componentWillMount() {
        var accessToken = this.props.accessToken;
        var that = this;

        try {
            fetch('http://192.168.1.172:8080/rest/orders', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
            })
                .then((response) => {
                    response.json().then(result => {
                        that.setState({ ListOrders: result.result })
                    });

                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (e) {
            Alert.alert(
                'Notification',
                'Login fail',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }
    }
    renderRow2 = ({ item, index }) => {
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 1.5 }}>{item.beverage.name}</Text>
                <Text style={{ flex: 1 }}>{item.beverage.price}</Text>
                <Text style={{ flex: 1 }}>{item.quantity}</Text>
            </View>
        );
    };
    renderHeader = () => {
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 1.5 }}>{'Tên Món'}</Text>
                <Text style={{ flex: 1 }}>{'Giá'}</Text>
                <Text style={{ flex: 1 }}>{'Số lượng'}</Text>
            </View>
        );
    }
    ClickTableFood = (item) => {
        this.setState({ modalVisible: true, PaymentTable: item })
    }
    renderRow = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.ClickTableFood(item)} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#66CCFF', }}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>{item.table_no}</Text>
                <FlatList
                    data={item.list_menu_item}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderRow2} />
            </TouchableOpacity>

        );
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible,  PaymentTable: null, });
    }
    renderHeaderPayment = () => {
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 0.5 }}>{'STT'}</Text>
                <Text style={{ flex: 1 }}>{'Tên món'}</Text>
                <Text style={{ flex: 1 }}>{'Số Lượng'}</Text>
                <Text style={{ flex: 1 }}>{'Giá'}</Text>
            </View>
        );
    }
    renderItemPayment = ({ item, index }) => {
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 0.5 }}>{index}</Text>
                <Text style={{ flex: 1 }}>{item.beverage.name}</Text>
                <Text style={{ flex: 1 }}>{item.quantity}</Text>
                <Text style={{ flex: 1 }}>{item.quantity * item.beverage.price}</Text>
            </View>
        );
    }
    renderInforPayment = (item) => {
        return (
            <View>
                <Text style={{ fontSize: 20 }}>{'Tên Bàn: ' + item.table_no}</Text>
                <FlatList
                    data={item.list_menu_item}
                    ListHeaderComponent={this.renderHeaderPayment}
                    renderItem={this.renderItemPayment} />

            </View>
        )
    }
    render() {
        return (
            <View >
                {this.state.ListOrders.length > 0 ?
                    <FlatList
                        data={this.state.ListOrders}
                        renderItem={this.renderRow} />
                    : null
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#cdcdcd',
                    }}>
                        <View style = {{flex:4}}>
                            {this.state.PaymentTable != null ? this.renderInforPayment(this.state.PaymentTable) : null}
                        </View>
                       
                        <View style={{ flex:1}}>
                            {this.state.PaymentTable != null ? <Text style={{ fontSize: 20, height:50, marginLeft:10 }}>{'Tổng cộng: ' + this.state.PaymentTable.totalPrice + ' vnđ'}</Text> : null}

                            <View style={{ flexDirection: 'row', flex:1 }}>
                                <TouchableOpacity
                                 style={{flex:1, backgroundColor: '#33FFFF', margin: 10, justifyContent: "center", alignItems: "center", height: 45, borderRadius: 20, width:DEVICE_WIDTH/2 }}
                                    onPress={() => {
                                        this.ClickPayment(this.state.PaymentTable)
                                    }}>
                                    <Text style={{ color: '#3f2949' }}>Thanh Toán</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                 style={{flex:1, backgroundColor: 'red', margin: 10, justifyContent: "center", alignItems: "center", height: 45, borderRadius: 20, width:DEVICE_WIDTH/2 }}
                                  onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <Text style={{ color: '#3f2949' }}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>
            </View>
        );
    }
    ClickPayment = (item)=>{
       var accessToken =this.props.accessToken;
       var that = this;
        try {
            fetch('http://192.168.1.172:8080/rest/orders/changeStatus', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    orderId: item.id,
                    status: 'DONE'
                }),
            })
                .then((response) => {
                    response.json().then(result => {
                        Alert.alert(
                            'Thông báo',
                            'Thanh Toán thành công',
                            [
                                { text: 'OK' , onPress: () => {
                                    that.setModalVisible(false);
                                    that.componentWillMount();
                                }},
                            ],
                            { cancelable: false }
                        )
                    });

                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (e) {
            Alert.alert(
                'Thông báo',
                'Thanh Toán thất bại',
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }
    }
}
