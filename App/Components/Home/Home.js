
import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import OrderScreen from './OrderScreen'
import PaymentScreen from './PaymentScreen'
import PreparationScreen from './PreparationScreen'
import AddFoodScreen from './AddFoodScreen'
import { Actions } from 'react-native-router-flux';
var jwtDecode = require('jwt-decode')

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChooseTab: 0,
            display: false,
        }
    }

    renderScreen = () => {
        var { isChooseTab } = this.state
        if (isChooseTab == 0) {
            return (
                <OrderScreen accessToken={this.props.accessToken} />
            )
        }
        if (isChooseTab == 1) {
            return (
                <PreparationScreen accessToken={this.props.accessToken} />
            )
        }
        if (isChooseTab == 2) {
            return (
                <PaymentScreen accessToken={this.props.accessToken} />
            )
        }
        if (isChooseTab == 3) {
            return (
                <AddFoodScreen accessToken={this.props.accessToken} />
            )
        }
    }
    render() {
        var decode = jwtDecode(this.props.accessToken)
        return (
            <View style={{ flex: 1 }} >
                <View style={{ height: 40, flexDirection: 'row', backgroundColor: '#03A9F4', justifyContent: "center" , alignContent:'center',}}>
                    <Text style={{ flex: 3, fontSize: 20, paddingTop:10 }}>{'Tên Nhân viên: ' + decode.displayName}</Text>
                    <TouchableOpacity onPress={() => Actions.LoginScreen()} style={{ flex: 1, backgroundColor: '#cdcdcd', justifyContent: 'center', alignContent: 'center', paddingTop:10 }}>
                        <Text style={{ flex: 1, textAlign:"center"}}>{'Đăng xuất'}</Text>
                    </TouchableOpacity >
                </View>
                <View style={{ flex: 1, marginBottom: 40 }}>
                    {this.renderScreen()}
                </View>
                <View style={{ padding: 10, flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: '#fff' }}>
                    <TouchableOpacity onPress={() => this.setState({ isChooseTab: 0 })} style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', color: this.state.isChooseTab == 0 ? 'red' : 'black' }}>Thêm Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isChooseTab: 1 })} style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', color: this.state.isChooseTab == 1 ? 'red' : 'black' }}>Pha Chế</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isChooseTab: 2 })} style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center', color: this.state.isChooseTab == 2 ? 'red' : 'black' }}>Thanh Toán</Text>
                    </TouchableOpacity>
                    {
                        decode.isAdmin == true ?
                            <TouchableOpacity onPress={() => this.setState({ isChooseTab: 3 })} style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'center', color: this.state.isChooseTab == 3 ? 'red' : 'black' }}>Tạo Món</Text>
                            </TouchableOpacity> : null
                    }
                </View>

            </View>
        );
    }
}

