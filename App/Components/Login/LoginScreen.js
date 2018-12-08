import React, { Component } from 'react';

import { StyleSheet, View, TextInput, Image, Dimensions, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import usernameImg from '../../Images/username.png';
import passwordImg from '../../Images/password.png';
import eyeImg from '../../Images/eye_black.png';
import logoImg from '../../Images/logo.png';
import Background from '../../Images/wallpaper.png';
import { Actions } from 'react-native-router-flux';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPass: true,
            UserName: '',
            Password: '',
            dataDemo: [],
            resultLogin: '',
        };
        this.showPass = this.showPass.bind(this);
    }
    showPass() {
        this.setState({ showPass: !this.state.showPass })
    }
    LoginOnClick = () => {
        if (this.state.UserName.trim() == '' || this.state.Password.trim() == '') {
            if (this.state.UserName.trim() == '') {
                Alert.alert(
                    'Notification',
                    'Enter an username ',
                    [
                        { text: 'Cancel', onPress: () => this.setState({ UserName: '', Password: '' }), style: 'cancel' },
                        { text: 'OK', },
                    ],
                    { cancelable: false }
                )
            } else {
                Alert.alert(
                    'Notification',
                    'Enter an password ',
                    [
                        { text: 'Cancel', onPress: () => this.setState({ UserName: '', Password: '' }), style: 'cancel' },
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                )
            }

        } else {
            // Actions.HomeScreen()
            var params = {
                username: this.state.UserName,
                password: this.state.Password,
            }
            console.log(JSON.stringify(params));
            this.loginRequest(params);
        }

    }
    loginRequest = (data) => {
        try {
            fetch('http://192.168.1.172:8080/rest/auth/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => {

                    console.log(JSON.parse(response._bodyInit));
                    let str = JSON.parse(response._bodyInit);
                    // this.setState({resultLogin:str})
                    if (str.sucess == true) {
                        Actions.HomeScreen({ accessToken: str.accessToken });
                    } else {
                        Alert.alert(
                            'Thông báo',
                            'Đăng nhập thất bại',
                            [
                                { text: 'Cancel', style: 'cancel' },
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
                'Đăng nhập thất bại',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK' },
                ],
                { cancelable: false }
            )
        }
    }
    componentDidMount() {

        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    // isLoading: false,
                    dataDemo: responseJson.movies,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1 }}>
                    <Image source={Background} style={{
                        height: DEVICE_HEIGHT,
                        resizeMode: 'cover',
                    }} />
                    <View style={{ flex: 1, position: 'absolute' }}>
                        <View style={{ height: DEVICE_HEIGHT / 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={logoImg} style={{ height: DEVICE_WIDTH / 3, width: DEVICE_WIDTH / 3 }} />
                            <Text style={{ fontSize: 22, color: '#ffffff', marginTop: 10 }}>Teen Quans</Text>
                        </View>
                        <View style={styles.containerInput}>
                            <Image source={usernameImg} style={[{ width: 22, height: 22, flex: 1, marginTop: 5, }]} />
                            <TextInput
                                style={[styles.input, { flex: 10 }]}
                                placeholder="Username"
                                placeholderTextColor="white"
                                underlineColorAndroid="transparent"
                                autoCapitalize={'none'}
                                onChangeText={(text) => this.setState({ UserName: text })}
                                value={this.state.UserName}
                                returnKeyType={'done'}
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.containerInput}>
                            <Image source={passwordImg} style={[{ width: 22, height: 22, flex: 1, marginTop: 5 }]} />
                            <TextInput
                                style={[styles.input, { flex: 10 }]}
                                placeholder="Password"
                                placeholderTextColor="white"
                                underlineColorAndroid="transparent"
                                autoCapitalize={'none'}
                                returnKeyType={'done'}
                                onChangeText={(text) => this.setState({ Password: text })}
                                value={this.state.Password}
                                secureTextEntry={this.state.showPass}
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[styles.btnEye, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
                                onPress={this.showPass}>
                                <Image source={eyeImg} style={[styles.iconEye]} />
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#cdcdcd', margin: 30, justifyContent: "center", alignItems: "center", height: 45, borderRadius: 20 }}
                            onPress={() => this.LoginOnClick()}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        borderRadius: 20,
        height: 45,
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        padding: 5,
        flexDirection: 'row'
    },
    input: {
        height: 35,
        paddingLeft: 5,
        color: '#ffffff',
    },

    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});