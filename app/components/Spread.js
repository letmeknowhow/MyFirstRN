import React from 'react-native';
import Button from '../baseComponents/Button';
const { Component, View, Text, StyleSheet, Image,PixelRatio } = React;
import Grid from '../baseComponents/Grid';
import Modal from '../baseComponents/ModalBox';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
  },
  button: {flex: 1, marginBottom: 0, borderWidth: 0},
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 140,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    marginBottom: 0,
  },
  conner: {
    position: 'absolute',
    height: 44 / PixelRatio.get(),
    width: 44 / PixelRatio.get(), 
  }
});

const mockData = [
  <Button style={styles.button} onPress={()=>{}}>
    <Text>
      邀请二维码
    </Text>
  </Button>,
  <Button style={styles.button} onPress={()=>{}}>
    <Text>
      App二维码
    </Text>
  </Button>,

];

const shareData = [
  <Button style={styles.button} onPress={()=>{}}>
    <Text>
      朋友
    </Text>
  </Button>,
  <Button style={styles.button} onPress={()=>{}}>
    <Text>
      朋友圈
    </Text>
  </Button>,
  <Button style={styles.button} onPress={()=>{}}>
    <Text>
      微博
    </Text>
  </Button>,


];

class Spread extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  // 自定义方法
  handle() {

  }

  gridData() {
    const { actions } = this.props;
    return mockData.map(item => {
      return (
        <Button style={styles.button} onPress={actions.routes[item.route]('abc')}>
          <Image source={item.icon}>
            { item.badge && (<View style={styles.badge}/>) }
          </Image>
          <Text style={{marginTop: 10}}>
            {item.name}
          </Text>
        </Button>
      );
    });
  }

  openModal() {
    this.refs.shareBox.open();
  }


  // 渲染
  render() {
    return (
      <View style={styles.container}>
        <View style={{width: 250, height: 400, /*backgroundColor: 'white',*/ marginBottom: 50}}>

          <View style={{height: 50/*, backgroundColor: 'blue'*/}}>
            <Grid marginBottom={0} column={2} gridLine={false} gridData={mockData} scroll={false}/>
          </View>
          <View
            style={{flex: 1, /*borderColor: 'gray', borderWidth: 1,*/  alignItems: 'center', justifyContent: 'center'}}>

            <Image source={require('../../assets/corner.png')} style={[styles.conner,{left: 0, top: 0, transform:[{rotate: '270deg'}]}]}/>
            <Image source={require('../../assets/corner.png')} style={[styles.conner,{right: 0, top: 0}]}/>
            <Image source={require('../../assets/corner.png')} style={[styles.conner,{left: 0, bottom: 0, transform:[{rotate: '180deg'}]}]}/>
            <Image source={require('../../assets/corner.png')} style={[styles.conner,{right: 0, bottom: 0, transform:[{rotate: '90deg'}]}]}/>
            
            <Image style={{width: 200, height:200}} source={require('../../assets/QR.jpg')}/>
            
          </View>
          <View style={{height: 80/*, backgroundColor: 'yellow' */}}>
            <Button style={{ marginBottom: 0, borderWidth: 0, height: 40, marginTop: 30}}
                    onPress={(e)=>this.openModal(e)}>
              <View
                style={{backgroundColor: 'red', height: 40, borderRadius: 4, 
                justifyContent: 'center',
                alignSelf: 'stretch', marginHorizontal: 0}}>
                <Text style={{ alignSelf: 'center', color: 'white'}}>分享</Text>
              </View>
            </Button>
          </View>
        </View>

        <Modal style={[styles.modal]} position={"center"} ref={"shareBox"}>
          <View style={{flex: 1, width: 300, flexDirection: 'row', /*backgroundColor: 'red'*/}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../assets/gold.png')}/>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../assets/loan.png')}/>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../assets/vehicle.png')}/>
            </View>
          </View>
          <View
            style={{position: 'absolute', right: 0, top: 0, width: 70 / PixelRatio.get(), height: 80 / PixelRatio.get(),  borderRadius: 4}}>
            <Image style={{height: 80 / PixelRatio.get(), width: 70 / PixelRatio.get()}}
                   source={require('../../assets/close.png')}/>
          </View>
        </Modal>
      </View>
    );
  }

}

export default Spread;
