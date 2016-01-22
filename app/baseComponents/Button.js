import React from 'react-native';

import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType';
import TextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes';

const {
  Component, View, Text, TouchableOpacity, StyleSheet, Platform, PropTypes,
  ActivityIndicatorIOS, ProgressBarAndroid
  } = React;

const styles = StyleSheet.create({
  button: {
    height: 30,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 18,
    alignSelf: 'center',
  },
  spinner: {
    alignSelf: 'center'
  },
  opacity: {
    opacity: 0.5
  }
});

class Button extends Component {
  // 默认属性
  static defaultProps = Object.assign({},
    TouchableOpacity.propTypes,
    {
      isLoading: false,
      isDisabled: false,
    }
  );

  // 属性类型
  //static propTypes = Object.assign({},
  //  TouchableOpacity.propTypes,
  //  {
  //    isLoading: PropTypes.bool,
  //    isDisabled: PropTypes.bool,
  //    activityIndicatorColor: PropTypes.string
  //  }
  //);

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }
  
  
  _renderInnerText() {
    if (this.props.isLoading) {
      if (Platform.OS !== 'android') {
        return (
          <ActivityIndicatorIOS
            animating={true}
            size="small"
            style={styles.spinner}
            color={this.props.activityIndicatorColor || 'black'}
          />
        );
      } else {
        return (
          <ProgressBarAndroid
            style={[{
              height: 20,
            }, styles.spinner]}
            styleAttr= "Inverse"
          />
        );
      }
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {this.props.children}
      </View>
    );
  }

  // 渲染
  render() {
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };

    if (this.props.isDisabled === true || this.props.isLoading === true) {
      return (
        <View style={[styles.button, this.props.style, styles.opacity]}>
          {this._renderInnerText()}
        </View>
      );
    } else {
      return (
        <TouchableOpacity {...touchableProps}
          style={[styles.button, this.props.style]}>
          {this._renderInnerText()}
        </TouchableOpacity>
        
      );
    }
  }

}


export default Button;
