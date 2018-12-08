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
            modalVisible: false, display: false,
            FoodList: [],
            dropDownSelected: {
                table_no: 'Vui Lòng chọn bàn',
            },
            dropDownChecked: false,
            listFoodChooseData: [],
            ListOrders: [],
            ListFoods:[],
            statusChooseTable:false,
            isShowListBeverages:false,
        }
    }
    _renderCountryCodeRow(rowData) {

        const { table_no } = rowData;
        return (
            <View style={{
                justifyContent: 'center',
                width: DEVICE_WIDTH,
                height: 50,
                paddingRight: 10, paddingLeft: 10
            }}>
                <Text numberOfLines={1} style={[{ fontSize: 16, color: '#2c3e50', }]}> {`${table_no}`}</Text>
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
    componentWillMount() {
        var accessToken = this.props.accessToken;
        var that = this;
        try {
            fetch('http://192.168.1.172:8080/rest/beverages', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
            })
                .then((response) => {
                    response.json().then(result => {
                        // console.log(result);
                        that.setState({ FoodList: result.result })
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
        try {
            fetch('http://192.168.1.172:8080/rest/beverages', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
            })
                .then((response) => {
                    response.json().then(result => {
                        that.setState({ ListFoods: result.result })
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
            <View style={{ paddingTop: 5, paddingLeft:10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 1.5 }}>{item.beverage.name}</Text>
                <Text style={{ flex: 1 }}>{item.beverage.price}</Text>
                <Text style={{ flex: 1, textAlign:'center' }}>{item.quantity}</Text>
            </View>
        );
    };
    renderHeader = () => {
        return (
            <View style={{ paddingLeft: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 1.5 }}>{'Tên Món'}</Text>
                <Text style={{ flex: 1 }}>{'Giá'}</Text>
                <Text style={{ flex: 1 }}>{'Số lượng'}</Text>
            </View>
        );
    }
    ClickTableFood = (item)=>{
        this.setState({statusChooseTable:true,modalVisible:true, dropDownSelected:{table_no:item.table_no}})
        // console.log(JSON.stringify(item))
    }
    renderRow = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={()=>this.ClickTableFood(item)}  style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#66CCFF', }}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>{item.table_no}</Text>
                <FlatList
                    data={item.list_menu_item}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderRow2} />
            </TouchableOpacity>
            
        );
    };
    renderRowListFood = ({ item, index }) => {
        return (
            <View style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#125c5f', }}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>{item.table_no}</Text>
            </View>
        );
    };
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    renderListFood = () => {
        return (
            <FlatList data={this.state.listFoodChooseData} renderItem={this.renderRowListFood} />
        )
    }
    listFoodChoose = () => {
        return (
            <View >
                <Text>Loai Mon</Text>
                <Text>Ten Mon</Text>
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
                    : null}

                <View style={{ padding: 10, flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: '#cdcdcd' }}>
                    <TouchableOpacity onPress={() => this.setModalVisible(true)} style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>Thêm Bàn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>this.setState({isShowListBeverages:true})} style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>Thực đơn</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{
                        flex: 1,
                        // alignItems: 'center',
                        // justifyContent:'center',
                        backgroundColor: '#cdcdcd',
                        // padding: 100
                    }}>
                        <ModalDropdown style={[{ width: DEVICE_WIDTH, height: 50, }]}
                            options={JSON_TABLE}
                            renderRow={this._renderCountryCodeRow.bind(this)}
                            onDropdownWillShow={this.onDropdownWillShow}
                            onDropdownWillHide={this.onDropdownWillHide}
                            onSelect={(idx, value) => this.setState({
                                dropDownSelected: {
                                    table_no: value.table_no
                                },
                                statusChooseTable:true,
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
                                title={this.state.dropDownSelected.table_no} />
                        </ModalDropdown>

                        {
                            this.state.statusChooseTable ?
                                this.listFoodChoose()
                                : null
                        }
                        {
                            this.state.statusChooseTable && this.state.listFoodChooseData.length > 0 ?
                                this.renderListFood()
                                : null
                        }
                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible)
                            this.setState({dropDownSelected: {
                                table_no: 'Vui Lòng chọn bàn',
                            }, statusChooseTable:false})
                        }}>
                            <Text style={{ color: '#3f2949', marginTop: 10 }}>Xong</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>

                {/* Module list mon an */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isShowListBeverages}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{
                        flex: 1,
                        // alignItems: 'center',
                        // justifyContent:'center',
                        backgroundColor: '#cdcdcd',
                        // padding: 100
                    }}>
                        <FlatList data={this.state.ListFoods} renderItem={this.renderRowListBeverages} ListHeaderComponent ={this.renderHeaderBeverages} />
                        <TouchableHighlight onPress={() => {

                            this.setState({isShowListBeverages:false})
                        }}>
                            <Text style={{ color: '#3f2949', marginTop: 10 }}>Xong</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        );
    }
    renderHeaderBeverages = () => {
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text numberOfLines={1} style={{ flex: 1 }}>{'Tên Món'}</Text>
                <Text numberOfLines={1}  style={{ flex: 1 }}>{'Giá'}</Text>
                <Text numberOfLines={1}  style={{ flex: 1 }}>{'Đơn vị'}</Text>
                <Text numberOfLines={1}  style={{ flex: 1 }}>{'Loại'}</Text>
            </View>
        );
    }
    renderRowListBeverages = ({ item, index })=>{
        // console.log(JSON.stringify(item))
        return(
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text numberOfLines={1}  style={{ flex: 1 }}>{item.name}</Text>
                <Text numberOfLines={1}  style={{ flex: 1 }}>{item.price}</Text>
                <Text numberOfLines={1}  style={{ flex: 1 }}>{item.unit}</Text>
                <Text numberOfLines={1}  style={{ flex: 1 }}>{'Loại'}</Text>
            </View>
        )
    }
}

