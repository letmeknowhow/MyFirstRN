/**
 *  Class: CustomerHeader
 *  Author: Niu Xiaoyu
 *  Date: 15/12/18.
 *  Description: 客户页头
 */
import React from 'react-native';
const {StyleSheet, Text, TouchableOpacity, View, Animated, Component } = React;


const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: 10,
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc',
    paddingTop: 0
  },
});

class CustomerHeader extends Component {
  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    headerBackgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    containerWidth: React.PropTypes.number
  };

  renderTabOption(name, page) {
    let isTabActive = this.props.activeTab === page;
    let activeTextColor = this.props.activeTextColor || 'white';
    let inactiveTextColor = this.props.inactiveTextColor || '#DDD';
    return (
      <TouchableOpacity style={[styles.tab]} key={name} onPress={() => this.props.goToPage(page)}>
        <View>
          <Text style={{color: isTabActive ? activeTextColor : inactiveTextColor,
            fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let containerWidth = this.props.containerWidth;
    let numberOfTabs = this.props.tabs.length;
    let tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: this.props.underlineColor || 'navy',
      bottom: 0,
    };

    let left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });

    return (
      <View style={[styles.tabs, {backgroundColor: (this.props.headerBackgroundColor || null)}]}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        <Animated.View style={[tabUnderlineStyle, {left}]}/>
      </View>
    );
  }
}

export default CustomerHeader;
