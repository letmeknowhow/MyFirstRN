/**
 *
 */

import React from 'react-native';

import Button from '../baseComponents/Button';

const { Component, PropTypes, View, Text, Image, TextInput, Alert, StyleSheet, ScrollView, Dimensions } = React;

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#efefef',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 43,
    margin: 10,
    borderRadius: 9,
    paddingLeft: 5
  }
});
class Customer extends Component {
// 属性类型
  static propTypes = {
    actions: PropTypes.object,
    style: PropTypes.object
  };
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      userName: '',
      pwd: '',
      statusText: '马上登陆',
      isDisabled: false,
      atPassword: true,
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    try {
      // 清除本地token
      this.props.actions.deleteSessionToken();
    }
    catch (e) {
      console.log('清除本地token失败');
    }
  }
  

  // 登录
  login() {
    // 数据较验
    let {userName, pwd} = this.state;
    if (userName.length < 8 || pwd.length === 0) {
      Alert.alert('提示', '请输入帐号和密码');
      return false;
    }

    // 登陆按钮显示loading状态
    this.setState({isDisabled: true, statusText: '登陆中'});

    // 异步登陆
    this.props.actions.login(userName, pwd).then(function (data) {
      if (!data.response) {
        this.setState({isDisabled: false, statusText: '马上登陆'});
      } else if (data.response.status !== 200 && data.response.status !== 201) {
        Alert.alert('提示', '登录失败, 请重试!', [
          {text: '确定', onPress: () => this.setState({isDisabled: false, statusText: '马上登陆'})}
        ]);
      }
    }.bind(this));
  }

  // 渲染
  render() {
    return (
    <ScrollView
      keyboardShouldPersistTaps={this.state.atPassword}
      style={styles.container}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('../../assets/logo.png')}
        />
        
        <TextInput
          style={[styles.input, this.props.style]}
          keyboardType="numeric"
          placeholder="请输入帐号"
          maxLength={11}
          onEndEditing={()=>{this.setState({atPassword: true})}}
          onChangeText={(text) => this.setState({userName: text})}
          value={this.state.userName}
        />
        <TextInput style={[styles.input, this.props.style]}
                   placeholder="请输入密码"
                   secureTextEntry={true}
                   maxLength={11}
                   onEndEditing={()=>{this.setState({atPassword: true})}}
                   onChangeText={(text) => this.setState({pwd: text})}
                   value={this.state.pwd}
        />
        <Button style={{ marginBottom: 0, borderWidth: 0, height: 40, marginTop: 30}}
                isDisabled={this.state.isDisabled}
                onPress={this.login}>
          <View
            style={{backgroundColor: 'red', height: 40, borderRadius: 4, 
                justifyContent: 'center',
                alignSelf: 'stretch', marginHorizontal: 0}}
          >
            <Text style={{ alignSelf: 'center', color: 'white'}}>{this.state.statusText}</Text>
          </View>
        </Button>

    </ScrollView>
      
    );
  }
}

export default Customer;
