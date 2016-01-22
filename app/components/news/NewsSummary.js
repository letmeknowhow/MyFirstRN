/**
 *  Class: NewsSummary
 *  Author: Niu Xiaoyu
 *  Date: 16/1/7.
 *  Description:
 */
import React from 'react-native';

const { Component, View, Text, TouchableOpacity, Image, StyleSheet, PropTypes } = React;
import global from '../../config/global';
const myStyles = StyleSheet.create({
  row: {
    alignItems: 'center',
    height: 80,
    //backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(206,206,206,1)',
    padding: 10,
    flexDirection: 'row',
  },
  textContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  newsPic: {
    width: 90,
    height: 60,
    margin: 10,
    marginLeft: 0,
  },
  title: {
    color: '#4f4f4f',
    fontSize: 14,
    textAlign: 'left',
    //marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#bababa',
    fontSize: 12,
    textAlign: 'left',

  }
});
class NewsSummary extends Component {
  static defaultProps = {};

  static propTypes = {
    data: PropTypes.any.isRequired,
    onShowDetail: PropTypes.func,
    actions: PropTypes.any
  };

  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  // 渲染
  render() {
    const summary = this.props.data;
    return (
      <TouchableOpacity onPress={this.props.actions.routes.newsDetail(summary.pkISid)}>
        <View style={myStyles.row}>
          <Image style={myStyles.newsPic} source={{uri: global.imgBaseURL + '/' + summary.sTitleImg}} />
          <View style={myStyles.textContainer}>
            <Text style={myStyles.title}>{summary.sTitle}</Text>
            <Text style={myStyles.subtitle}>{`${summary.teContent.substring(0, 30)}...`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default NewsSummary;
