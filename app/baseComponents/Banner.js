import React from 'react-native';
import ViewPager from './pagers/ViewPager';
import WebAPI from '../libs/WebAPI';
import global from '../config/global';
const { Component, Dimensions, View, Image, TouchableOpacity, InteractionManager } = React;

const deviceWidth = Dimensions.get('window').width;

let dataSource = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => p1.newsID !== p2.newsID,
});

class Banner extends Component {

  // 构造
  constructor(props) {
    super(props);
    
    // 初始状态
    this.state = {
      dataSource: dataSource.cloneWithPages([]),
      isLoaded: false,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      WebAPI.banners({
          version: 1,
          pageNumber: 0,
          bOpened: true,
          pageSize: 5
        })
        .then(data => {
          const IMGS = [];
          data.json.list.map(item => {
            IMGS.push({
              url: global.imgBaseURL + '/' + item.sTitleImg,
              newsID: item.iArticleId || '-1'
            });
          });
          this.setState({
            dataSource: dataSource.cloneWithPages(IMGS),
            isLoaded: true,
            isLoop: IMGS.length > 1
          });

        });
    });
    
  }

  _renderPage(data, pageID) {
    return (
      <TouchableOpacity onPress={this.props.actions.routes.newsDetail(data.newsID)}>
        <Image
          source={{uri: data.url}}
          style={{width: deviceWidth, height:140, resizeMode: Image.resizeMode.cover}}/>
      </TouchableOpacity>
    );
  }


  _renderViewPager() {

    return (
      <ViewPager
        dataSource={this.state.dataSource}
        renderPage={this._renderPage.bind(this)}
        isLoop={this.state.isLoop}
        autoPlay={true}/>
    );

  }

// 渲染
  render() {
    return (
      <View style={this.props.style}>
        {this._renderViewPager()}
      </View>
    );
  }


}

export default Banner;
