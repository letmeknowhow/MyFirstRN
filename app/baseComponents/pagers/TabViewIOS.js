/**
 *  Class: TabViewIOS
 *  Author: Niu Xiaoyu
 *  Date: 15/12/27.
 *  Description: 可横向翻页的tabview
 */
import React from 'react-native';
const {
  Dimensions,
  View,
  Component,
  PanResponder,
  Animated,
  PropTypes,
  } = React;

import StaticRenderer from '../../../node_modules/react-native/Libraries/Components/StaticRenderer';

const deviceWidth = Dimensions.get('window').width;
import ViewPagerDataSource from './ViewPagerDataSource';
import DefaultTabBar from './DefaultTabBar';

class TabViewIOS extends Component {

  static propTypes = {
    ...View.propTypes,
    dataSource: PropTypes.instanceOf(ViewPagerDataSource).isRequired,
    renderPage: PropTypes.func.isRequired,
    onChangePage: PropTypes.func,
    renderTabBar: PropTypes.func,
    tabBarUnderlineColor: PropTypes.string,
    tabBarBackgroundColor: PropTypes.string,
    tabBarActiveTextColor: PropTypes.string,
    tabBarInactiveTextColor: PropTypes.string,
    tabs: PropTypes.array,
    tabHeight: PropTypes.number
  };

  static defaultProps = {};

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      currentPage: 0,
      viewWidth: 0,
      childIndex: 0,
      scrollValue: new Animated.Value(0)
    };
  }

  componentWillMount() {
    let release = (e, gestureState) => {
      let relativeGestureDistance = gestureState.dx / deviceWidth,
      //lastPageIndex = this.props.children.length - 1,
        vx = gestureState.vx;

      let step = 0;
      if (relativeGestureDistance < -0.5 || (relativeGestureDistance < 0 && vx <= 0.5)) {
        step = 1;
      } else if (relativeGestureDistance > 0.5 || (relativeGestureDistance > 0 && vx >= 0.5)) {
        step = -1;
      }

      this.movePage(step);
    };

    this._panResponder = PanResponder.create({
      // Claim responder if it's a horizontal pan
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          if (!this.state.fling) {
            return true;
          }
        }
      },

      // Touch is released, scroll to the one that you're closest to
      onPanResponderRelease: release,
      onPanResponderTerminate: release,

      // Dragging, move the view with the touch
      onPanResponderMove: (e, gestureState) => {
        let dx = gestureState.dx;
        let offsetX = -dx / this.state.viewWidth + this.state.childIndex;
        this.state.scrollValue.setValue(offsetX);
      }
    });
  }

  goToPage(pageNumber) {
    const step = pageNumber - this.state.currentPage;
    this.movePage(step);
  }

  movePage(step) {
    const pageCount = this.props.dataSource.getPageCount();
    let pageNumber = this.state.currentPage + step;

    pageNumber = Math.min(Math.max(0, pageNumber), pageCount - 1);

    let moved = pageNumber !== this.state.currentPage;
    let scrollStep = (moved ? step : 0) + this.state.childIndex;

    moved && this.props.onChangePage && this.props.onChangePage(pageNumber);

    this.state.fling = true;

    let nextChildIdx = 0;
    if (pageNumber > 0) {
      nextChildIdx = 1;
    }

    Animated.spring(this.state.scrollValue, {toValue: scrollStep, friction: 10, tension: 50})
      .start((event) => {
        if (event.finished) {
          this.state.fling = false;
          this.state.childIndex = nextChildIdx;
          this.state.scrollValue.setValue(nextChildIdx);
          this.setState({
            currentPage: pageNumber,
          });
        }
      });
  }

  _getPage(pageIdx:number) {
    const dataSource = this.props.dataSource;
    const pageID = dataSource.pageIdentities[pageIdx];
    return (
      <StaticRenderer
        key={'p_' + pageID}
        shouldUpdate={true}
        render={this.props.renderPage.bind(
          null,
          dataSource.getPageData(pageIdx),
          pageID
        )}
      />
    );
  }

  renderTabBar(props) {
    if (this.props.renderTabBar === false) {
      return null;
    } else if (this.props.renderTabBar) {
      return React.cloneElement(this.props.renderTabBar(), props);
    } else {
      return (<DefaultTabBar {...props} />);
    }
  }

  render() {
    const dataSource = this.props.dataSource;
    const pageIDs = dataSource.pageIdentities;

    let bodyComponents = [];

    let pagesNum = 0;
    let hasLeft = false;
    let viewWidth = this.state.viewWidth;

    if (pageIDs.length > 0 && viewWidth > 0) {
      // left page
      if (this.state.currentPage > 0) {
        bodyComponents.push(this._getPage(this.state.currentPage - 1));
        pagesNum++;
        hasLeft = true;
      }

      // center page
      bodyComponents.push(this._getPage(this.state.currentPage));
      pagesNum++;

      // right page
      if (this.state.currentPage < pageIDs.length - 1) {
        bodyComponents.push(this._getPage(this.state.currentPage + 1));
        pagesNum++;
      }
    }

    const sceneContainerStyle = {
      width: viewWidth * pagesNum,
      flex: 1,
      flexDirection: 'row'
    };

    // this.state.childIndex = hasLeft ? 1 : 0;
    // this.state.scrollValue.setValue(this.state.childIndex);
    let translateX = this.state.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, -viewWidth]
    });

    const tabBarProps = {
      goToPage: this.goToPage.bind(this),
      tabs: this.props.tabs,
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue,
      underlineColor: this.props.tabBarUnderlineColor,
      backgroundColor: this.props.tabBarBackgroundColor,
      activeTextColor: this.props.tabBarActiveTextColor,
      inactiveTextColor: this.props.tabBarInactiveTextColor,
      containerWidth: this.state.viewWidth,
      scrollOffset: this.state.childIndex,
      tabHeight: this.props.tabHeight,
      paddingTop: this.props.paddingTop
    };

    return (
      <View style={{flex: 1}}
        onLayout={(event) => {
          // console.log('ViewPager.onLayout()');
          const containerWidth = event.nativeEvent.layout.width;
          if (!containerWidth || this.state.viewWidth === containerWidth) {
            return;
          }
          this.setState({
            currentPage: this.state.currentPage,
            viewWidth: containerWidth,
          });
        }}
      >
        {this.renderTabBar(tabBarProps)}
        <Animated.View style={[sceneContainerStyle, {transform: [{translateX}]}]}
          {...this._panResponder.panHandlers}
        >
          {bodyComponents}
        </Animated.View>
      </View>
    );
  }
}
TabViewIOS.DataSource = ViewPagerDataSource;
export default TabViewIOS;
