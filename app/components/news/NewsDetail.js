/**
 *  Class: NewsDetail
 *  Author: Niu Xiaoyu
 *  Date: 15/12/24.
 *  Description:
 */
import React from 'react-native';

const { Component, View, Text, StyleSheet, Image, ScrollView } = React;
import WebAPI from '../../libs/WebAPI';
import global from '../../config/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    alignItems: 'center',
    padding: 10
  },
  titleText: {
    fontSize: 16
  },
  date: {
    height: 30,
    alignItems: 'center',
    padding: 10
  },
  dateText: {
    fontSize: 12,
  },
  pic: {
    height: 200
  },
  contentText: {
    color: '#666',
    lineHeight: 20
  }
});


class NewsDetail extends Component {
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

  componentDidMount() {
    WebAPI.newsInfoDetails(this.props.routerData.data, {})
      .then(data => {
        let news = data.json;
        this.setState({
          title: news.sTitle,
          time: news.dtCreateTime,
          img: global.imgBaseURL + '/' + news.sAppcontImg,
          content: news.teContent
        });
      });
  }

  // 渲染
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            {this.state.title}
          </Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.dateText}>
            {this.state.time}
          </Text>
        </View>
        <View style={styles.pic}>
          <Image style={{flex: 1}} resizeMode="contain" source={{uri: this.state.img}} />
        </View>
        <Text style={styles.contentText}>
          {this.state.content}
        </Text>
      </ScrollView>
    );
  }

}

export default NewsDetail;
