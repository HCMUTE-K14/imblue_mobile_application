// import React, { Component } from 'react';
// import { Text, View, FlatList, TouchableOpacity } from 'react-native';
// import SolveScreen from './Cast'
// import OrdersScreen from './Orders'
// import PreparationScreen from './PhaChe'

// import { createBottomTabNavigator, createAppContainer ,createMaterialTopTabNavigator} from 'react-navigation';
// const TabNavigator = createMaterialTopTabNavigator({
//   Order: OrdersScreen,
//   Preparation: PreparationScreen,
//   Solve: SolveScreen,
// });

// export default createAppContainer(TabNavigator);
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';


const JSON_TEST = [
    {
        "id": "123", "TENBAN": "Bàn 1", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "456", "TENBAN": "Bàn 2", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "123", "TENBAN": "Bàn 1", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "456", "TENBAN": "Bàn 2", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "123", "TENBAN": "Bàn 1", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "456", "TENBAN": "Bàn 2", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "123", "TENBAN": "Bàn 1", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "456", "TENBAN": "Bàn 2", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    }
    , {
        "id": "123", "TENBAN": "Bàn 1", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    },
    {
        "id": "456", "TENBAN": "Bàn 2", "listMon": [{ "TenMon": "Mon1", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" },
        { "TenMon": "Mon2", "SoTien": 1230, "SoLuong": 2, "TinhTrang": "vi du" }]
    }
]

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderRow2 = ({ item, index }) => {
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 3 }}>{item.TenMon}</Text>
                <Text style={{ flex: 1 }}>{item.SoLuong}</Text>
                <Text style={{ flex: 1 }}>{item.TinhTrang}</Text>
            </View>
        );
    };
    renderRow = ({ item, index }) => {
        return (
            <View style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#125c5f', }}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>{item.TENBAN}</Text>
                <FlatList
                    data={item.listMon}
                    renderItem={this.renderRow2} />

            </View>
        );
    };
    render() {
        return (
            <View >
                <FlatList
                    data={JSON_TEST}
                    renderItem={this.renderRow} />
                <View style={{ padding: 10, flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: '#cdcdcd' }}>
                    <TouchableOpacity style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>Thêm Món</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>Thực đơn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

