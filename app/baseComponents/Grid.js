import React from 'react-native';
import Dimensions from 'Dimensions';

const { Component, PropTypes, StyleSheet, ScrollView, View, Text, PixelRatio } = React;

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
  }
});

class Grid extends Component {
  // 默认属性
  static defaultProps = {
    column: 2,
    gridLine: true,
    gridData: [],
    scroll: true,
  };

  static propTypes = {
    column: PropTypes.number,
    gridLine: PropTypes.bool,
    gridData: PropTypes.any,
    cellHeight: PropTypes.number,
    marginBottom: PropTypes.number,
    scroll: PropTypes.bool,
  };


  // 构造
  constructor(props) {
    super(props);
    this.props = {...props};
    this.state = {
      width: 0,
      height: 0,
    };
  }

  // 当组件挂载时触发,当布局发布变化时触发

  onLayoutChange(e) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }


  /**
   * 计算单元格宽度
   */
  calculatedSize() {
    let cellWidth = this.state.width / this.props.column;
    return {width: cellWidth};
  }

  /** 渲染单元格 */
  renderCell() {
    const data = this.props.gridData;
    const rowCount = Math.ceil(this.props.gridData.length / this.props.column);

    let cellStyle = Object.assign(
      {
        width: 100,
        height: this.props.cellHeight || this.state.height / rowCount,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center'
      },
      this.calculatedSize()
    );

    if (!this.props.gridLine) {
      cellStyle = Object.assign(cellStyle, {
        borderWidth: 0,
      });
    }

    return data.map((item,key) => {
      return (
        <View key={key} style={cellStyle}>
          {item}
        </View>
      );
    });
  }

  renderScroll() {
    return (

      <View style={[styles.grid, this.props.style]} onLayout={(e) => this.onLayoutChange(e)}>
        <ScrollView
          contentContainerStyle={[styles.grid]}
          automaticallyAdjustContentInsets={false}>
          {this.renderCell()}
        </ScrollView>
      </View>
    );
  }

  renderView() {
    return (
      <View style={[styles.grid, this.props.style]} onLayout={(e) => this.onLayoutChange(e)}>
        {this.renderCell()}
      </View>
    );
  }

  // 渲染
  render() {
    return (
      this.props.scroll ? this.renderScroll() : this.renderView()
    );
  }

}

export default Grid;
