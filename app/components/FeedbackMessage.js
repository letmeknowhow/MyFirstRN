/**
 * Created by Richard on 16/1/7.
 */
import React from 'react-native';
import WebAPI from '../libs/WebAPI';

const { Component, View, Text, Image, TextInput, StyleSheet, PixelRatio, Dimensions, TouchableHighlight, ListView } = React;
const deviceWidth = Dimensions.get('window').width;

//export const px = (pxValue) => pxValue / PixelRatio.get();

const styles = StyleSheet.create({
  msgBox: {
    marginTop: 20,
    borderRadius: 5,
    borderColor: '#ccc',
    overflow: 'hidden',
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    marginLeft: 20,
    marginRight: 20
  },
  textBox: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: deviceWidth,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
  },
  flowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#ccc',
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    padding: 5,
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    width: deviceWidth - 80,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#48BBEC',
    backgroundColor: '#fff'
  },
});
const dataSource = new ListView.DataSource({
  rowHasChanged: (p1, p2) => p1 !== p2,
});
class FeedbackDetail extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      replyQuestions: dataSource.cloneWithRows([]),
      sMsgContent: '',
      messageId: '',
    };
  }

  componentDidMount() {
    
    WebAPI.messageBoards({
        version: 1,
        pageNumber: 0,
        pageSize: 300
      })
      .then(data => {
        const thisIndex = Number(this.props.routerData[1]);
        const dataArr = data.json.list[thisIndex];
        const dataObj = {pkINid: dataArr.pkINid,
          iUserId: dataArr.iUserId,
          sMsgContent: dataArr.sMsgContent,
        };
        dataArr.replyMessageList.unshift(dataObj);
        this.setState({
          replyQuestions: dataSource.cloneWithRows(dataArr.replyMessageList),
          questionId: dataArr.pkINid,
          _iUserId: dataArr.iUserId,
        });
      });
  }

  _renderRow(data) {
    if (data.iUserId === this.state._iUserId){
      return this.loadMe(data);
    }else{
      return this.loadOthers(data);
    }
  }

  loadMe(data) {
    return(
      <View style={[styles.msgBox, {alignSelf: 'flex-end', backgroundColor: 'green'}]}>
        <Text>{data.sMsgContent}</Text>
      </View>
    );
  }

  loadOthers(data) {
    return(
      <View style={[styles.msgBox, {alignSelf: 'flex-start', backgroundColor: 'white'}]}>
        <Text>{data.sMsgContent}</Text>
      </View>
    );
  }

  _addAsk() {
    if (this.state.sMsgContent !== '' ){
      WebAPI.updateMessageBoards({
          version: 1,
          sMsgContent: this.state.sMsgContent,
          iRootMsgId: this.state.questionId,
        })
        .then(data => {
          if (data.json.code === 0){
            this.setState({sMsgContent: ''});
            return this.componentDidMount();
          }
        });
    }

  }

  // 渲染
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#efefef', overflow: 'hidden'}}>
        <View style={{padding: 10, flex: 1}}>
          <ListView dataSource={this.state.replyQuestions} renderRow={this._renderRow.bind(this)}  />
        </View>
        <View style={styles.textBox}>
          <View style={styles.flowBottom}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => this.setState({sMsgContent: text})}
              value={this.state.sMsgContent}
              placeholder= "输入补充内容" />
            <TouchableHighlight style={styles.button} underlayColor="#ccc" onPress={this._addAsk.bind(this)}>
              <Text style={styles.buttonText}>发送</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

}

export default FeedbackDetail;
