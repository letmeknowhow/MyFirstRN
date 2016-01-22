/**
 *  Class: DefaultTabHeader
 *  Author: Niu Xiaoyu
 *  Date: 15/12/27.
 *  Description: TabViewIOS的默认tabbar
 */

import React from 'react-native';
const { StyleSheet, Text, TouchableOpacity, View, Animated, Component} = React;


const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: 10,
  },

  tabContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
  },
});

class DefaultTabBar extends Component {
  static defaultProps = {
    tabHeight: 50,
    backgroundColor: 'white',
    paddingTop: 0
  };

  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    containerWidth: React.PropTypes.number,
    scrollOffset: React.PropTypes.number,
    tabHeight: React.PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const activeTextColor = this.props.activeTextColor || 'navy';
    const inactiveTextColor = this.props.inactiveTextColor || 'black';
    return (
      <TouchableOpacity style={[styles.tab]} key={page} onPress={() => this.props.goToPage(page)}>
        <View>
          <Text style={{color: isTabActive ? activeTextColor : inactiveTextColor,
            fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const itemWidth = containerWidth / numberOfTabs;

    const offsetX = itemWidth * (this.props.activeTab - this.props.scrollOffset);
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
    });
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: this.props.underlineColor || 'navy',
      bottom: 0,
    };
    return (
      <View style={[styles.tabContainer, {backgroundColor: this.props.backgroundColor, height: this.props.tabHeight, paddingTop: this.props.paddingTop}]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, {left}]}/>
      </View>
    );
  }
}

export default DefaultTabBar;
