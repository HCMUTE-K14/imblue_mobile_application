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
import Constant from '../../config/constant'
const io = require('socket.io-client');
const JSON_TABLE = [
    {
        "table_no": "Bàn 1"
    },
    {
        "table_no": "Bàn 2"
    },
    {
        "table_no": "Bàn 3"
    },
    {
        "table_no": "Bàn 4"
    },
    {
        "table_no": "Bàn 5"
    },
    {
        "table_no": "Bàn 6"
    },
    {
        "table_no": "Bàn 7"
    },
    {
        "table_no": "Bàn 8"
    },
    {
        "table_no": "Bàn 9"
    },
]

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListOrders: [],
            OrdersChoose:[]
        }
        this.ioClient = io.connect(Constant.urlSocket);
    }
    componentDidMount() {

        // this.socket.on('connect', () => {
        //   this.setState({
        //     status: 'Connected'
        //   });
        // });
        this.ioClient.connect();

        this.ioClient.on('on-notify-change-order-event', (data) => {
            if (data.method === 'NEED_RELOAD_ORDER') {
                // this.getOrder();
                console.log('123')
            }
        });
    }
    componentWillMount() {
        var accessToken = this.props.accessToken;
        var that = this;
        try {
            fetch(Constant.urlOrders, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
            })
                .then((response) => {
                    response.json().then(result => {
                        var ordersProcessing=[];
                        var ordersDONE=[];
                        var orders= [];
                        result.result.forEach(function (order){
                            if(order.status =='DONE'){
                                ordersDONE.push(order);
                            }else{
                                ordersProcessing.push(order);
                            }
                        })
                        ordersProcessing.forEach(function (order){
                            orders.push(order)
                        })
                        ordersDONE.forEach(function (order){
                            orders.push(order)
                        })
                        that.setState({ ListOrders: orders })
                        // that.setState({ ListOrders: result.result })
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
    notifyReloadData = (ioClient) => {
        ioClient.emit('on-crud-order-event', {
            payload: 'abc'
        });
    }
    renderRow2 = ({ item, index }) => {
        return (
            <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 1.5 }}>{item.beverage.name}</Text>
                <Text style={{ flex: 1 }}>{item.beverage.price}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</Text>
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
    UpdateOrder = (item)=>{
        var accessToken =this.props.accessToken;
       var that = this;
        try {
            fetch(Constant.urlPayment, {
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
                                    that.componentWillMount();
                                }},
                            ],
                            { cancelable: false }
                        )
                        that.notifyReloadData(this.ioClient);
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
    ClickTableFood = (item) => {
        Alert.alert(
            'Thông báo',
            'Bạn có chắc đơn hàng tạo xong',
            [
                { text: 'OK', onPress: ()=>this.UpdateOrder(item) },
                { text: 'cancle',style:'cancel' },
            ],
            { cancelable: false }
        )
    }
    renderRow = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.ClickTableFood(item)} style={{ padding: 5, margin: 5, borderRadius: 5,backgroundColor:item.status=='DONE'?'#00CC00': '#66CCFF', }}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>{item.table_no}</Text>
                <FlatList
                    data={item.list_menu_item}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderRow2} />
            </TouchableOpacity>

        );
    };

    render() {
        return (
            <View >
                {this.state.ListOrders.length > 0 ?
                    <FlatList
                        data={this.state.ListOrders}
                        renderItem={this.renderRow} />
                    : null
                }
            </View>
        );
    }
}
