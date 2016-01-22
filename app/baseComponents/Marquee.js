/**
 * class: Marquee
 * author: Niu Xiaoyu
 * date: 2016-1-3
 * description: 跑马灯组件,循环滚动播放容器内容
 *              暂时只支持纵向向上滚动,如果后续有其他类似功能可扩展该组件
 */
import React from 'react-native';
const { Component, View, Text, PropTypes, StyleSheet } = React;
const styles = StyleSheet.create({
  marquee: {
    position: 'absolute',
    backgroundColor: 'transparent'
  }
});

export default class Marquee extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    containerHeight: PropTypes.number,
    rowHeight: PropTypes.number
  };
  static defaultProps = {
    data: []
  };
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  slideUp() {
    let dataHeight = this.props.data.length * this.props.rowHeight;
    if (this._defaultTop < (0 - dataHeight)) {
      this._defaultTop = this.props.containerHeight;
    }
    this._defaultTop -= 0.5;
    this._circleStyles.style.top = this._defaultTop;
    this._viewRef && this._viewRef.setNativeProps(this._circleStyles);
  }

  componentWillMount() {
    this._defaultTop = this.props.containerHeight;
    this._circleStyles = {
      style: {
        top: this._defaultTop
      }
    };
  }
  
  componentDidMount() {
    this._timer = setInterval(() => this.slideUp(), 20);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  renderItem() {
    return this.props.data.map((item, index) => {
      return (
        <View key={index} style={{ height: this.props.rowHeight, backgroundColor: 'transparent'}}>
          <Text>{item}</Text>
        </View>
      );
    });
  }

  render() {
    return (
      <View
        ref={ref => this._viewRef = ref}
        style={ style=styles.marquee }>
        {this.renderItem()}
      </View>
    );
  }
}
