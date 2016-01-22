/**
 *
 */


import React from 'react-native';
import Panel from '../baseComponents/Panel';

const { Component, View, Text, ScrollView, Switch, StyleSheet, PropTypes } = React;

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'white',
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5
  },
  barText: {fontSize: 18, color: '#666'},
  barSwitch: {width: 50}
});

class Customer extends Component {

  // 属性类型
  static propTypes = {
    actions: PropTypes.object,
    wealthMessage: PropTypes.object
  };
  
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      s1: props.wealthMessage.registerOpen ? true : false,
      s2: props.wealthMessage.tradeOpen ? true : false
    };

    this.handUpdateSet = this.handUpdateSet.bind(this);
    this.handleRender = this.handleRender.bind(this);
  }

  componentDidMount() {
    this.props.actions.wealthMessages({
      version: 1,
      pageNumber: 0,
      pageSize: 10
    });
    this.props.actions.getSetWealthMessages();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      s1: nextProps.wealthMessage.registerOpen ? true : false,
      s2: nextProps.wealthMessage.tradeOpen ? true : false
    });
  }
  // 修改用户的状态
  handUpdateSet() {
    this.props.actions.setWealthMessages({
      version: '1',
      registerMessageOpen: this.state.s1 ? 1 : 0,
      tradeMessageOpen: this.state.s2 ? 1 : 0
    });
  }

  // 修改一条消息的 是否已经读过 的状态
  handleRender(id) {
    let data = {
      version: 1,
      bArrive: true,
      bRead: true
    };
    this.props.actions.weMessageLogs(id, data);
  }

  // 渲染
  render() {

    let panels = [];
    for (let i = 0; i < this.props.wealthMessage.list.length; i++) {
      let list = this.props.wealthMessage.list[i];
      let panel = {
        mid: list.iWeMessageId,
        title: list.msgTitle,
        content: list.msgContent,
        isRead: list.isRead,
        time: list.createTime,
        handleRender: this.handleRender
      };
      panels.push(<Panel key={i} { ...panel }/>);
    }
    return (
      <View style={{backgroundColor: '#efefef', flex: 1}}>
        <View style={styles.bar}>
          <Text style={styles.barText}>
            客户投资提醒
          </Text>
          <Switch style={styles.barSwitch}
                  onValueChange={ ()=> {
                    this.setState({s1: !this.state.s1});
                    this.handUpdateSet();
                  } }
                  value={this.state.s1}/>
        </View>

        <View style={styles.bar}>
          <Text style={styles.barText}>
            客户注册提醒
          </Text>
          <Switch style={styles.barSwitch}
                  onValueChange={ ()=> {
                    this.setState({s2: !this.state.s2});
                    this.handUpdateSet();
                  } }
                  value={this.state.s2}/>
        </View>

        <View
          style={{flex: 1, /*backgroundColor: 'red', borderWidth: 1, borderColor: 'green'*/}}>
          <ScrollView>
            {panels}
          </ScrollView>
        </View>

      </View>
    );
  }

}
// onValueChange={(e)=>this.setState({s2:!this.state.s2})}
export default Customer;
