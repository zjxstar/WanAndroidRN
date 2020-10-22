import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Image, Button } from 'react-native-elements';
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color';
import globalStyles from '../../styles/globalStyles'
import { getRealDP as dp } from '../../utils/screenUtil';
import { connect } from 'react-redux';
import { toLogin } from '../../actions';

let username = ''
let password = ''

/**
 * 登录页面
 */
class LoginScreen extends PureComponent {

    constructor(props) {
        super(props)

        this.toRegisterPage = this.toRegisterPage.bind(this)
        this.onUserNameInput = this.onUserNameInput.bind(this)
        this.onPasswordInput = this.onPasswordInput.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
    }

    toRegisterPage() {
        const { navigation } = this.props
        navigation.navigate('Register')
    }

    onUserNameInput(value) {
        username = value
    }

    onPasswordInput(value) {
        password = value
    }

    goToLogin() {
        if (username === '' || password === '') {
            return
        }
        this.props.reqLogin(username, password, this.props.navigation)
    }

    render() {
        const { navigation, isLoading } = this.props

        return (
            <View style={StyleSheet.flatten([globalStyles.container, {backgroundColor: Color.WHITE}])}>
                <HeaderBar title='登录' navigation={navigation} type='back' />
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
                        onChangeText={value => this.onUserNameInput(value)} />
                    <Input label="密码" placeholder="请输入密码" secureTextEntry={true} leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color={Color.ICON_DEFAULT}
                        />
                    }
                        onChangeText={value => this.onPasswordInput(value)} />
                </View>
                <View style={styles.btnArea}>
                    <Button
                        title="登录"
                        buttonStyle={{backgroundColor: Color.THEME}}
                        onPress={() => this.goToLogin()}
                        loading={isLoading}
                    />
                </View>

                <View style={styles.linkArea}>
                    <TouchableWithoutFeedback onPress={() => this.toRegisterPage()}>
                        <Text style={styles.linkText}>去注册</Text>
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
        reqLogin: (username, password, navigation) => dispatch(toLogin(username, password, navigation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)