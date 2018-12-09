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
var jwtDecode = require('jwt-decode')
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
            modalVisible: false, display: false,
            dropDownSelected: {
                table_no: 'Vui Lòng chọn bàn',
            },
            dropDownSelectedCategory: {
                name: 'Vui Lòng chọn danh mục',
                id: -1
            },
            dropDownSelectedFood: {
                name: 'Vui Lòng chọn sản phẩm',
                id: -1
            },
            dropDownChecked: false,
            dropDownCheckedCategory: false,
            dropDownCheckedFood: false,
            listFoodChooseData: [],
            ListOrders: [],
            ListFoods: [],
            categoriesFood: [],
            statusChooseTable: false,
            isShowListBeverages: false,
            listFoodFilter: [],
            statusChooseCategory: false,
            statusChooseFood: false,
            listFoodAddTemp: [],
            clickAdd: false,
            TextQuantity: '',
            OrdersIdChoose: null,
            OrderListItemChosse: []
        }
        this.ioClient = io.connect(Constant.urlSocket);

    }

    notifyReloadData = (ioClient) => {
        ioClient.emit('on-crud-order-event', {
            payload: 'abc'
        });
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
    _renderCategoryRow(rowData) {

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
    onDropdownWillHideCategory = () => {
        this.setState({
            dropDownCheckedCategory: false
        });
    }

    onDropdownWillShowCategory = () => {
        this.setState({
            dropDownCheckedCategory: true
        });
    }
    onDropdownWillHideFood = () => {
        this.setState({
            dropDownCheckedCFood: false
        });
    }

    onDropdownWillShowFood = () => {
        this.setState({
            dropDownCheckedFood: true
        });
    }
    componentWillMount() {
        var accessToken = this.props.accessToken;
        var that = this;
        try {
            fetch(Constant.urlBeverages, {
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
                        var ordersProcessing = [];
                        var ordersDONE = [];
                        var orders = [];
                        result.result.forEach(function (order) {
                            if (order.status == 'DONE') {
                                ordersDONE.push(order);
                            } else {
                                ordersProcessing.push(order);
                            }
                        })
                        ordersProcessing.forEach(function (order) {
                            orders.push(order)
                        })
                        ordersDONE.forEach(function (order) {
                            orders.push(order)
                        })
                        that.setState({ ListOrders: orders })
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
    getOrder = () => {
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
                        var ordersProcessing = [];
                        var ordersDONE = [];
                        var orders = [];
                        result.result.forEach(function (order) {
                            if (order.status == 'DONE') {
                                ordersDONE.push(order);
                            } else {
                                ordersProcessing.push(order);
                            }
                        })
                        ordersProcessing.forEach(function (order) {
                            orders.push(order)
                        })
                        ordersDONE.forEach(function (order) {
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
        try {
            fetch(Constant.urlBeverages, {
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
            <View style={{ paddingTop: 5, paddingLeft: 10, flexDirection: 'row', flex: 1 }}>
                <Text style={{ flex: 1.5 }}>{item.beverage.name}</Text>
                <Text style={{ flex: 1 }}>{item.beverage.price}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</Text>
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
    ClickTableFood = (item) => {
        this.setState({ statusChooseTable: true, modalVisible: true, dropDownSelected: { table_no: item.table_no }, OrdersIdChoose: item.id, OrderListItemChosse: item.list_menu_item })
        this.getInfo()
        // console.log(JSON.stringify(item))
    }
    renderRow = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.ClickTableFood(item)} style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: item.status == 'DONE' ? '#00CC00' : '#66CCFF', }}>
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
    renderRowListFoodTemp = ({ item, index }) => {
        return (
            <View style={{ padding: 5, margin: 5, borderRadius: 5, backgroundColor: '#125c5f', }}>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600', flex: 1, textAlign: 'left', paddingLeft: 10 }}>{'Tên'}</Text>
                    <Text style={{ fontSize: 16, color: '#fff', flex: 1, textAlign: 'left', paddingLeft: 10 }}>{item.nameFood}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600', flex: 1, textAlign: 'left', paddingLeft: 10 }}>{'Số lượng'}</Text>
                    <Text style={{ fontSize: 16, color: '#fff', flex: 1, textAlign: 'left', paddingLeft: 10 }}>{item.quantity}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600', flex: 1, textAlign: 'left', paddingLeft: 10 }}>{'Tên danh mục'}</Text>
                    <Text style={{ fontSize: 16, color: '#fff', flex: 1, textAlign: 'left', paddingLeft: 10 }}>{item.nameCategory}</Text>
                </View>
            </View>
        );
    };
    getInfo = () => {
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
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        if (visible) {
            this.getInfo();
        }
    }
    filteredCategory = (id) => {
        var foods = [];
        this.state.ListFoods.forEach(function (food) {
            if (food.category.id == id) {
                foods.push(food);
            }
        })
        this.setState({ listFoodFilter: foods })
    }
    renderCategoryFood = () => {
        return (
            <View style={{ height: 50 }}>
                <ModalDropdown style={[{ width: DEVICE_WIDTH, height: 50, }]}
                    options={this.state.categoriesFood}
                    renderRow={this._renderCategoryRow.bind(this)}
                    onDropdownWillShow={this.onDropdownWillShowCategory}
                    onDropdownWillHide={this.onDropdownWillHideCategory}
                    onSelect={(idx, value) => {
                        this.setState({
                            dropDownSelectedCategory: {
                                name: value.name,
                                id: value.id
                            },
                            dropDownSelectedFood: {
                                name: 'Vui Lòng chọn sản phẩm',
                                id: -1
                            },
                            statusChooseCategory: true,
                        }), this.filteredCategory(value.id)
                    }}
                    dropdownStyle={{
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                        shadowOffset: {
                            width: 0,
                            height: 5
                        },
                        shadowRadius: 20,
                        shadowOpacity: 1,
                        height: 50 * (this.state.categoriesFood.length > 6 ? 6 : this.state.categoriesFood.length),
                        width: DEVICE_WIDTH,
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                >
                    <TDropDown checked={this.state.dropDownChecked} textStyle={{ color: '#2c3e50', fontSize: 16, alignItems: 'center', }} style={[{ paddingLeft: 10, paddingRight: 10, alignItems: 'center', }]}
                        title={this.state.dropDownSelectedCategory.name} />
                </ModalDropdown>

                <View>

                </View>

            </View>
        )
    }
    renderListFoods = () => {
        return (
            <View style={{ height: 100 }}>
                <ModalDropdown style={[{ width: DEVICE_WIDTH, height: 50, }]}
                    options={this.state.listFoodFilter}
                    renderRow={this._renderCategoryRow.bind(this)}
                    onDropdownWillShow={this.onDropdownWillShowFood}
                    onDropdownWillHide={this.onDropdownWillHideFood}
                    onSelect={(idx, value) => {
                        this.setState({
                            dropDownSelectedFood: {
                                name: value.name,
                                id: value.id
                            },
                            statusChooseFood: true,
                        })
                    }}
                    dropdownStyle={{
                        shadowColor: "rgba(0, 0, 0, 0.2)",
                        shadowOffset: {
                            width: 0,
                            height: 5
                        },
                        shadowRadius: 20,
                        shadowOpacity: 1,
                        height: 50 * (this.state.listFoodFilter.length > 6 ? 6 : this.state.listFoodFilter.length),
                        width: DEVICE_WIDTH,
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                >
                    <TDropDown checked={this.state.dropDownChecked} textStyle={{ color: '#2c3e50', fontSize: 16, alignItems: 'center', }} style={[{ paddingLeft: 10, paddingRight: 10, alignItems: 'center', }]}
                        title={this.state.dropDownSelectedFood.name} />
                </ModalDropdown>
                <TextInput
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({ TextQuantity: text })}
                    value={this.state.TextQuantity}
                    placeholder={'Số Lượng'}
                    style={styles.inputStyle}
                />
            </View>
        )
    }
    addFoodsList = () => {
        if (this.state.TextQuantity.trim() != '') {
            let params = {
                "quantity": this.state.TextQuantity,
                "beverage": this.state.dropDownSelectedFood.id,
                "nameFood": this.state.dropDownSelectedFood.name,
                "price": this.state.dropDownSelectedFood.price,
                "category": this.state.dropDownSelectedCategory.id,
                "nameCategory": this.state.dropDownSelectedCategory.name
            }
            let listFoods = []
            this.state.listFoodAddTemp.forEach(function (food) {
                listFoods.push(food)
            })
            listFoods.push(params);
            this.setState({
                listFoodAddTemp: listFoods,
                dropDownSelectedCategory: {
                    name: 'Vui Lòng chọn danh mục',
                    id: -1
                },
                dropDownSelectedFood: {
                    name: 'Vui Lòng chọn sản phẩm',
                    id: -1
                },
                statusChooseFood: false,
                statusChooseCategory: false,
                TextQuantity: ''
            })
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn vui lòng nhập đầy đủ thông tin',
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }

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
                this.getOrder();
            }
        });
    }

    CreateOrdersClick = () => {
        var decode = jwtDecode(this.props.accessToken);
        var that = this;
        let listItems = [];
        this.state.listFoodAddTemp.forEach(function (list) {
            let params = {
                quantity: parseInt(list.quantity),
                beverage: list.beverage
            }
            listItems.push(params)
        })
        let params = {
            table_no: this.state.dropDownSelected.table_no,
            user_created: decode.userId,
            list_menu_item: listItems,
            status: "PROCESSING",
        }
        // OrderListItemChosse
        // let httpMethod = 'POST';
        let orderUrl = Constant.urlOrders;
        let httpMethod = 'POST'
        if (this.state.OrdersIdChoose) {
            params.id = this.state.OrdersIdChoose;
            // params.list_menu_item.push()
            this.state.OrderListItemChosse.forEach(function (item) {
                params.list_menu_item.push({
                    quantity: item.quantity,
                    beverage: item.beverage.id
                });
            })
            orderUrl += '/' + this.state.OrdersIdChoose;
            httpMethod = 'PATCH'
        }

        try {
            fetch(orderUrl, {
                method: httpMethod,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.accessToken
                },
                body: JSON.stringify(params),
            })
                .then((response) => {
                    this.setState({ TextInputNameCategory: '' })
                    let str = JSON.parse(response._bodyInit);
                    that.getOrder();
                    if (str.success == true) {
                        that.setState({
                            listFoodAddTemp: [],
                            dropDownSelected: {
                                table_no: 'Vui Lòng chọn bàn',
                            },
                            dropDownSelectedCategory: {
                                name: 'Vui Lòng chọn danh mục',
                                id: -1
                            },
                            dropDownSelectedFood: {
                                name: 'Vui Lòng chọn sản phẩm',
                                id: -1
                            },
                            statusChooseFood: false,
                            statusChooseCategory: false,
                            TextQuantity: '',

                        })
                        Alert.alert(
                            'Thông báo',
                            'Tạo Món Order thành công',
                            [
                                { text: 'OK' },
                            ],
                            { cancelable: false }
                        )
                        that.notifyReloadData(this.ioClient);
                    } else {
                        Alert.alert(
                            'Thông báo',
                            'Tạo Món Order thất bại',
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
                'Tạo Món Order thất bại',
                [
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 9 }}>
                    {this.state.ListOrders.length > 0 ?
                        <FlatList
                            style={{ marginBottom: 40 }}
                            data={this.state.ListOrders}
                            renderItem={this.renderRow} />
                        : null}

                </View>
                <View style={{ padding: 10, flexDirection: 'row', backgroundColor: '#cdcdcd', height: 40 }}>
                    <TouchableOpacity onPress={() => this.setModalVisible(true)} style={{ flex: 1 }}>
                        <Text style={{ textAlign: 'center' }}>Thêm Bàn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isShowListBeverages: true })} style={{ flex: 1 }}>
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
                                statusChooseTable: true,
                            })}
                            dropdownStyle={{
                                shadowColor: "rgba(0, 0, 0, 0.2)",
                                shadowOffset: {
                                    width: 0,
                                    height: 5
                                },
                                shadowRadius: 20,
                                shadowOpacity: 1,
                                height: 50 * (JSON_TABLE.length > 6 ? 6 : JSON_TABLE.length),
                                width: DEVICE_WIDTH,
                                justifyContent: 'center',
                                // alignItems: 'center',
                            }}
                        >
                            <TDropDown checked={this.state.dropDownChecked} textStyle={{ color: '#2c3e50', fontSize: 16, alignItems: 'center', }} style={[{ paddingLeft: 10, paddingRight: 10, alignItems: 'center', }]}
                                title={this.state.dropDownSelected.table_no} />
                        </ModalDropdown>

                        <View style={{ flex: 1 }}>
                            {
                                this.state.statusChooseTable ?
                                    this.renderCategoryFood()
                                    : null
                            }
                            {
                                this.state.statusChooseCategory && this.state.listFoodFilter.length > 0 ?
                                    this.renderListFoods()
                                    : null
                            }
                            {this.state.statusChooseFood ?
                                <TouchableOpacity
                                    style={{ backgroundColor: '#33FFFF', margin: 10, justifyContent: "center", alignItems: "center", height: 45, borderRadius: 20, width: DEVICE_WIDTH / 2 }}
                                    onPress={() => this.addFoodsList()}>
                                    <Text style={{ color: '#3f2949' }}>Thêm</Text>
                                </TouchableOpacity> : null
                            }

                            <FlatList data={this.state.listFoodAddTemp} renderItem={this.renderRowListFoodTemp} />

                        </View>

                        <View style={{ flexDirection: 'row', height: 50, marginBottom: 10 }}>
                            <TouchableOpacity
                                style={{ flex: 1, backgroundColor: this.state.listFoodAddTemp.length > 0 ? '#33FFFF' : '#C0C0C0', margin: 10, justifyContent: "center", alignItems: "center", height: 45, borderRadius: 20, width: DEVICE_WIDTH / 2 }}
                                disabled={this.state.listFoodAddTemp.length > 0 ? false : true}
                                onPress={() => this.CreateOrdersClick()}>
                                <Text style={{ color: '#3f2949' }}>Tạo Orders</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 1, backgroundColor: 'red', margin: 10, justifyContent: "center", alignItems: "center", height: 45, borderRadius: 20, width: DEVICE_WIDTH / 2 }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                    this.setState({
                                        dropDownSelected: {
                                            table_no: 'Vui Lòng chọn bàn',
                                        }, statusChooseTable: false
                                    })
                                }}>
                                <Text style={{ color: '#3f2949' }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
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
                        <FlatList data={this.state.ListFoods} renderItem={this.renderRowListBeverages} ListHeaderComponent={this.renderHeaderBeverages} />

                        <TouchableOpacity
                            style={{ backgroundColor: '#33FFFF', margin: 10, justifyContent: "center", alignItems: "center", height: 45, borderRadius: 20, marginLeft: 30, marginRight: 30 }}
                            onPress={() => this.setState({ isShowListBeverages: false })}>
                            <Text style={{ color: '#3f2949' }}>Xong</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
    renderHeaderBeverages = () => {
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text numberOfLines={1} style={{ flex: 1 }}>{'Tên Món'}</Text>
                <Text numberOfLines={1} style={{ flex: 1 }}>{'Giá'}</Text>
                <Text numberOfLines={1} style={{ flex: 1 }}>{'Đơn vị'}</Text>
                <Text numberOfLines={1} style={{ flex: 1 }}>{'Loại'}</Text>
            </View>
        );
    }
    renderRowListBeverages = ({ item, index }) => {
        // console.log(JSON.stringify(item))
        return (
            <View style={{ padding: 10, flexDirection: 'row', flex: 1 }}>
                <Text numberOfLines={1} style={{ flex: 1 }}>{item.name}</Text>
                <Text numberOfLines={1} style={{ flex: 1 }}>{item.price}</Text>
                <Text numberOfLines={1} style={{ flex: 1 }}>{item.unit}</Text>
                <Text numberOfLines={1} style={{ flex: 1 }}>{'Loại'}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputStyle: {
        color: '#333',
        fontSize: 16,
        lineHeight: 23,
        height: 40,
        borderColor: '#333',
        borderWidth: 0.5,
        fontFamily: 'System',
        margin: 10,
        borderRadius: 5
    }

})
