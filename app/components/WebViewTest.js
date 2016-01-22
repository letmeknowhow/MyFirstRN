/**
 * Created by gaoletian on 15/12/30.
 */
import React from 'react-native';

const { Component, View, Text, WebView } = React;

const WEBVIEW_REF = 'webview';

class WebViewTest extends Component {
  // 默认属性
  static defaultProps = {};

  // 属性类型
  static propTypes = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      url: 'http://www.cltc.net'
    };
  }

  // 渲染
  render() {
    return (
      <View>
        <View style={{height: 50, backgroundColor: 'black', marginTop:20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color:'white'}} onPress={()=> this.setState({url:'http://www.baidu.com'})}>
              百度
          </Text>
          <Text  style={{color:'white'}}  onPress={()=> this.setState({url:'http://www.sina.com.cn'})}>
              新浪
          </Text>
          
        </View>
        
        <WebView
          refs={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={{height: 500, marginTop: 10}}
          url={this.state.url}
          javaScriptEnabledAndroid={true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    );
  }

}

export default WebViewTest;
