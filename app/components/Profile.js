/**
 *
 */

import React from 'react-native';
import Animatable from 'react-native-animatable';
import WebAPI from '../libs/WebAPI';

const { Component, View, Text, Image, StyleSheet, Dimensions, PixelRatio, } = React;
const deviceWidth = Dimensions.get('window').width;

export const px = (pxValue) => pxValue / PixelRatio.get();

function dateFormat(dateStr) {
  if (dateStr) {
    const d = new Date(dateStr);
    return d.getFullYear() + '-' + (d.getMonth()+1).toString() + '-' + d.getDate();
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 134,
    width: deviceWidth - 20,
    height: 265,
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
    height: 220,
    backgroundColor: '#FFF7E6',
  },
  cardItem: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
  }

});


class Customer extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      sName: '',
      sSeatCode: '',
      sOrgName: '',
      dtCreateTime: ''
    };
  }

  componentDidMount() {
    WebAPI.appWealthUserInfos({})
      .then(data => {
        this.setState({
          sName: data.json.sName,
          sSeatCode: data.json.sSeatCode,
          sOrgName: data.json.sOrgName,
          dtCreateTime: dateFormat(data.json.dtCreateTime),
        });
      });

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
                <Text>姓名:</Text>
                <Text>{this.state.sName}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text>登陆帐号:</Text>
                <Text>{this.state.sSeatCode}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text>所属财富机构:</Text>
                <Text>{this.state.sOrgName}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text>成为财富管理人时间:</Text>
                <Text>{this.state.dtCreateTime}</Text>
              </View>
              <View style={[styles.cardItem, {borderBottomWidth: 0, backgroundColor: '#e32936', borderTopWidth: 1, borderTopColor: '#fff' }]}>
                <View style={styles.footersubview}>
                  <Image style={{marginTop: 2, marginRight: 2}}
                         source={require('../../assets/images/Changepassword@2x.png')}
                  />
                  <Text style={styles.footersubtext} onPress={this.props.actions.routes.changePassword()}>
                    修改登录密码
                  </Text>
                </View>
                <View style={styles.footersubview}>
                  <Image style={{marginRight: 2 }}
                         source={require('../../assets/images/gesture@2x.png')} />
                  <Text style={styles.footersubtext}>手势密码</Text>
                </View>
              </View>
            </View>
          </View>
          <Image style = {styles.ropeLine} source={require('../../assets/ropeLine1.png')} />
        </Animatable.View>
      </View>

    );
  }

}


export default Customer;
