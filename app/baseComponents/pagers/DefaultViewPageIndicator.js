/**
 *  Class: DefaultViewPageIndicator
 *  Author: Niu Xiaoyu
 *  Date: 15/12/27.
 *  Description: 参考"react-native-viewpager"的"DefaultViewPageIndicator"
 */
import React from 'react-native';
const {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Component
  } = React;

const deviceWidth = Dimensions.get('window').width;
const DOT_SIZE = 6;
const DOT_SAPCE = 3;

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
  },

  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(100,100,100,0.5)',
    marginLeft: DOT_SAPCE,
    marginRight: DOT_SAPCE,
  },

  curDot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'rgba(250,250,250,0.8)',
    margin: DOT_SAPCE,
    bottom: 0,
  },
});

class DefaultViewPageIndicator extends Component {
  static propTypes = {
    goToPage: React.PropTypes.func,
    activePage: React.PropTypes.number,
    pageCount: React.PropTypes.number
  };
  
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      viewWidth: 0,
    };
  }

  renderIndicator(page) {
    //var isTabActive = this.props.activePage === page;
    return (
      <TouchableOpacity style={styles.tab} key={'idc_' + page} onPress={() => this.props.goToPage(page)}>
        <View style={styles.dot} />
      </TouchableOpacity>
    );
  }

  render() {
    const pageCount = this.props.pageCount;
    const itemWidth = DOT_SIZE + (DOT_SAPCE * 2);
    var offset = (this.state.viewWidth - itemWidth * pageCount) / 2 + itemWidth * this.props.activePage;

    //var left = offset;
    const offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
    let left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    });

    var indicators = [];
    for (let i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i))
    }

    return (
      <View style={styles.tabs}
            onLayout={(event) => {
            let containerWidth = event.nativeEvent.layout.width;
            if (!containerWidth || this.state.viewWidth === containerWidth) {
              return;
            }
            this.setState({
              viewWidth: containerWidth,
            });
          }}>
        {indicators}
        <Animated.View style={[styles.curDot, {left}]} />
      </View>
    );
  }
}

export default DefaultViewPageIndicator;
