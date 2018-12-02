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
    render() {
        return (
            <View >
                <Text>Pha che</Text>
            </View>
        );
    }
}

