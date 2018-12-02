/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import Cast from './Cast'
import Orders from './Orders'
import PhaChe from './PhaChe'

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
      isChooseTab: 0,
    }
  }
  renderRow2 = ({ item }) => {
    return (
      <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
        <Text style={{ flex: 3 }}>{item.TenMon}</Text>
        <Text style={{ flex: 1 }}>{item.SoLuong}</Text>
        <Text style={{ flex: 1 }}>{item.TinhTrang}</Text>
      </View>
    );
  };
  renderRow = ({ item }) => {
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
      <View style={{ paddingTop: 100, flex: 1 }}>
        <View style={{ flex: 1, padding: 10, flexDirection: 'row', position: 'absolute', top: 50, }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: this.state.isChooseTab==0? '#cdcdcd':'#fff' }}
            onPress={() => this.setState({ isChooseTab: 0 })}>
            <Text style={{ textAlign: 'center' }}>Gọi Món</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignContent: 'center',backgroundColor: this.state.isChooseTab==1? '#cdcdcd':'#fff'  }}
            onPress={() => this.setState({ isChooseTab: 1 })}>
            <Text style={{ textAlign: 'center' }}>Pha Chế</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: this.state.isChooseTab==2? '#cdcdcd':'#fff' }}
            onPress={() => this.setState({ isChooseTab: 2 })}>
            <Text style={{ textAlign: 'center' }}>Thanh Toán</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5 }}>
          {
            this.state.isChooseTab == 0 ? <Orders /> : this.state.isChooseTab == 1 ? <PhaChe /> : <Cast />
          }
        </View>
      </View>
    );
  }
}

