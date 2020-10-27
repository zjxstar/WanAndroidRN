import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Image, Button } from 'react-native-elements';
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color';
import globalStyles from '../../styles/globalStyles'
import { getRealDP as dp } from '../../utils/screenUtil';
import { connect } from 'react-redux';
import { toRegister } from '../../actions';

let username = ''
let password = ''
let repassword = ''

/**
 * 注册页面
 */
class RegisterScreen extends Component {

    constructor(props) {
        super(props)

        this.toLoginPage = this.toLoginPage.bind(this)
        this.onUserNameInput = this.onUserNameInput.bind(this)
        this.onPasswordInput = this.onPasswordInput.bind(this)
        this.onRePasswordInput = this.onRePasswordInput.bind(this)
        this.goToRegister = this.goToRegister.bind(this)
    }

    toLoginPage() {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    onUserNameInput(value) {
        username = value
    }

    onPasswordInput(value) {
        password = value
    }

    onRePasswordInput(value) {
        repassword = value
    }

    goToRegister() {
        if (username === '' || password === '' || repassword === '') {
            return
        }
        this.props.reqRegister(username, password, repassword, this.props.navigation)
    }

    render() {
        const { navigation, isLoading } = this.props

        return (
            <View style={StyleSheet.flatten([globalStyles.container, { backgroundColor: Color.WHITE }])}>
                <HeaderBar title='注册' navigation={navigation} type='back' />
                <View style={styles.imgArea}>
                    <Image
                        source={require('../../images/ic_launcher.png')}
                        style={{ width: dp(200), height: dp(200) }} />
                </View>
                <View style={styles.inputArea}>
                    <Input label="用户名" placeholder="请输入用户名" leftIcon={
                        <Icon
                            name='user'
                            size={24}
                            color={Color.ICON_DEFAULT}
                        />
                    }
                        inputStyle={styles.inputStyle}
                        onChangeText={value => this.onUserNameInput(value)} />
                    <Input label="密码" placeholder="请输入密码" secureTextEntry={true} leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color={Color.ICON_DEFAULT}
                        />
                    }
                        inputStyle={styles.inputStyle}
                        onChangeText={value => this.onPasswordInput(value)} />
                    <Input label="确认密码" placeholder="请再次确认密码" secureTextEntry={true} leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color={Color.ICON_DEFAULT}
                        />
                    }
                        inputStyle={styles.inputStyle}
                        onChangeText={value => this.onRePasswordInput(value)} />
                </View>
                <View style={styles.btnArea}>
                    <Button
                        title="注册"
                        buttonStyle={{ backgroundColor: Color.THEME }}
                        loading={isLoading}
                        onPress={() => this.goToRegister()}
                    />
                </View>
                
                <View style={styles.linkArea}>
                    <TouchableWithoutFeedback onPress={() => this.toLoginPage()}>
                        <Text style={styles.linkText}>去登录</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgArea: {
        marginTop: dp(20),
        alignItems: 'center',
    },
    inputArea: {
        marginTop: dp(60)
    },
    inputStyle: {
        fontSize: dp(28)
    },
    btnArea: {
        paddingHorizontal: dp(16),
        marginTop: dp(20),
    },
    linkArea: {
        alignItems: 'flex-end',
        paddingHorizontal: dp(16),
        marginTop: dp(30),
    },
    linkText: {
        color: Color.THEME,
        borderBottomWidth: dp(1),
        borderBottomColor: Color.THEME,
        fontSize: dp(30)
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.user.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqRegister: (username, password, repassword, navigation) => 
            dispatch(toRegister(username, password, repassword, navigation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)