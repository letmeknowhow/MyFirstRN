/**
 *
 */

import React from 'react-native';
import Button from '../baseComponents/Button';

const { Component, View, Text, TextInput, PixelRatio, TouchableOpacity, StyleSheet, ListView, Alert } = React;

import Animatable from 'react-native-animatable';


import WebAPI from '../libs/WebAPI';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1 / PixelRatio.get()
  },
  sectionHeader: {
    backgroundColor: 'white',
    height: 50,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  sectionHeaderText: {
    fontSize: 18, color: '#666'
  },
  sectionHeaderDateTime: {
    fontSize: 12, color: '#ccc'
  },

  sectionContent: {
    padding: 10,
  },

  col3: {
    flex: 3,
  },
  col1: {
    flex: 1
  },
  subBtn: {
    marginBottom: 0, 
    borderWidth: 0, 
    height: 40, 
    marginTop: 20
  },
  subBtnView:{
    backgroundColor: 'red', 
    height: 40, 
    borderRadius: 8, 
    alignSelf: 'stretch', 
    marginHorizontal: 10
  },
  subBtnText: {
    marginTop: 10, 
    alignSelf: 'center', 
    color: 'white'
  }
});
let dataSource = new ListView.DataSource({
  rowHasChanged: (p1, p2) => p1 !== p2,
});
class Customer extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      mockData: dataSource.cloneWithRows([]),
      sMsgContent: '',
    };
  }

  componentDidMount() {
    WebAPI.messageBoards({
      version: 1,
      pageNumber: 0,
      pageSize: 300
    })
    .then(data => {
      console.log('0000000000000');
      console.log(data.json)
      this.setState({
        mockData: dataSource.cloneWithRows(data.json.list),
      });
    });
  }

  renderItem() {
    return this.state.mockData.map((item, index) => {
      return (
        <View key={index} style={styles.sectionHeader}>
          <View style={styles.col3}>
            <Text style={[styles.sectionHeaderText, {color: '#000'}]}>{item.sMsgContent}</Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.sectionHeaderDateTime}>{item.dtMsgTime}</Text>
          </View>
        </View>
      );
    });
  }
  
  _submit() {
    if(this.state.sMsgContent !== ''){
      WebAPI.updateMessageBoards({
        version: 1,
        sMsgContent: this.state.sMsgContent,
        iRootMsgId: 0
      })
      .then(data => {
          //Alert.alert(data.json.message);
          this.componentDidMount();
          this.setState({sMsgContent: ''});
      });
    }
  }

  _renderRow(data,sectionID,rowId) {
    const { actions } = this.props;
    return(
      <TouchableOpacity style={styles.sectionHeader} onPress={actions.routes.feedbackMessage([data,rowId])}>
        <View style={styles.col3}>
          <Text style={[styles.sectionHeaderText, {color: '#000'}]}>{data.sMsgContent}</Text>
        </View>
        <View style={styles.col2}>
          <Text style={styles.sectionHeaderDateTime}>{data.dtMsgTime}</Text>
        </View>
      </TouchableOpacity>
    );
    
  }
  
  // 渲染
  render() {
    return (
      <View style={[{flex: 1, backgroundColor: '#efefef'}]}>
        <View style={{padding: 10}}>
          <TextInput
            style={[styles.input, {height: 120}]}
            placeholder={'请输入您的反馈信息'}
            numberOfLines = {4}
            multiline={true}
            maxLength={300}
            onChangeText={(text) => this.setState({sMsgContent: text})}
            value={this.state.sMsgContent}
          />
        </View>
        <Button style={styles.subBtn} onPress={this._submit.bind(this)}>
          <View style={styles.subBtnView}>
            <Text style={styles.subBtnText}>提交</Text>
          </View>
        </Button>

        <View style={{padding: 10}}>
          <Text>
            我的问题
          </Text>
        </View>
        <View style={{padding: 10, flex: 1}}>
          <ListView dataSource={this.state.mockData} renderRow={this._renderRow.bind(this)}  />
        </View>
      </View>
    );
  }

}

export default Customer;
