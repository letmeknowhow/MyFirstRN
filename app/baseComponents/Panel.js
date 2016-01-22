/**
 * Created by gaoletian on 15/12/18.
 */
import React from 'react-native';

const { Component, PropTypes, View, Text, StyleSheet, PixelRatio, TouchableOpacity, Alert } = React;

const styles = StyleSheet.create({
  panel: {
    borderRadius: 5,
    borderWidth: 5,
    borderColor: '#dd2b37',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#fff',
    margin: 10,
  },
  reader:{
    borderColor: '#000'
  },
  panelHead: {
    backgroundColor: '#fefefe',
    padding: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headTitle: {fontSize: 18, color: '#666'},
  headDate: {color: '#666'},
  panelBody: {
    padding: 10,
    borderWidth: 5,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: '#fff',
  }
});

class Panel extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {
    mid: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    isRead: PropTypes.number,
    time: PropTypes.string,
    handleReader: PropTypes.func

  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isReadState: props.isRead ? true : false,
      lines: 3,
    };
    this.handleReader = this.handleReader.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isReadState: nextProps.isRead ? true : false
    });
  }

  // 自定义方法
  handle() {

  }
  handleReader(){
    if(!this.state.isReadState){this.props.handleRender(this.props.mid)};
    this.setState({
      isReadState: true,
      lines: this.state.lines === 3 ? 20 : 3
    });
  }
  // 渲染
  render() {
    let panelstyle = [styles.panel];
    if(this.state.isReadState) {panelstyle.push(styles.reader)}
    return (
      <View style={panelstyle} >

        <View style={styles.panelHead}>
          <Text style={styles.headTitle}>
            { this.props.title || '活动提醒'}
          </Text>
          <Text style={styles.headDate}>{this.props.time}</Text>
        </View>
        <TouchableOpacity onPress={this.handleReader} >
          <View style={styles.panelBody} >
            <Text style={{color: '#999'}} numberOfLines={this.state.lines}>
              {this.props.content}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

export default Panel;
