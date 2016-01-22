/**
 * Created by 斌 on 2015/12/29.
 */
import React from 'react-native';
import Animatable from 'react-native-animatable';
import WebAPI from '../libs/WebAPI';

const { Component, View, Text, Image, StyleSheet,Dimensions, PixelRatio,TextInput,Alert, TouchableHighlight } = React;
const deviceWidth = Dimensions.get('window').width;

export const px = (pxValue) => pxValue / PixelRatio.get();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 134,
    width: deviceWidth - 20,
    height: 235,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#ccc',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 20,
    shadowOffset: {width: 200, height: 60},
    borderWidth: 2 / PixelRatio.get()
  },
  cardHead: {
    height: 45,
    borderBottomColor: '#e4e4e4 ',
    borderBottomWidth: 1,
  },
  cardBody: {
    height: 190,
    backgroundColor: '#FFF7E6',
  },
  cardItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  ropeLine: {
    position: 'absolute',
    width: 80,
    height: 200,
    resizeMode: Image.resizeMode.stretch,
    top: -40,
    left: deviceWidth / 2 - 50,
  },
  footersubview: {
    flexDirection: 'row',
  },
  footersubtext: {
    paddingLeft: 4,
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: '#e32936', 
    height: 40, 
    justifyContent: 'center',
  },
  passInput: {
    backgroundColor: '#fff',
    width: 150,
    height: 30,
    borderRadius: 5,
    alignSelf: 'center',
  }
});


class ChangePassword extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
    };
  }
  
  passSubmit() {
    if (this.state.newPassword === this.state.repeatPassword){
      WebAPI.settingPassword({
        version: 1,
        currentPassword: this.state.currentPassword,
        newPassword: this.state.newPassword
      })
      .then(data => {
        console.log(data);
        var _message = JSON.parse(data.response._bodyText);
        Alert.alert('提示', _message.message);
        this.setState({
          currentPassword: '',
          newPassword: '',
          repeatPassword: '',
        });
      });
    }else{
      Alert.alert('提示', '密码不一致!');
    }
    
  }
  
  // 渲染
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#efefef', overflow: 'hidden'}}>
        <Animatable.View animation={'bounceInDown'} style={{flex: 1, backgroundColor: 'transparent'}}>
          <View style={styles.card}>
            <View style={styles.cardHead} />
            <View style={styles.cardBody}>
              <View style={styles.cardItem}>
                <Text>输入原密码</Text>
                <TextInput 
                  onChangeText={(text) => this.setState({currentPassword: text})}
                  value={this.state.currentPassword} 
                  style={styles.passInput}
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.cardItem}>
                <Text>输入新密码</Text>
                <TextInput
                  onChangeText={(text) => this.setState({newPassword: text})}
                  value={this.state.newPassword}
                  style={styles.passInput}
                  secureTextEntry={true}
                   />
              </View>
              <View style={styles.cardItem}>
                <Text>确认新密码</Text>
                <TextInput
                  onChangeText={(text) => this.setState({repeatPassword: text})}
                  value={this.state.repeatPassword}
                  style={styles.passInput}
                  secureTextEntry={true}
                   />
              </View>
              <TouchableHighlight style={styles.saveBtn} onPress = {this.passSubmit.bind(this)}>
                <Text style={{ alignSelf: 'center', color: 'white'}}>确认</Text>
              </TouchableHighlight>
            </View>
          </View>
          <Image style = {styles.ropeLine} source={require('../../assets/ropeLine1.png')} />
        </Animatable.View>
      </View>

    );
  }

}


export default ChangePassword;
