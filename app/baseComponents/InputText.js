import React from 'react-native';

const {StyleSheet, View, TextInput, Text, PropTypes } = React;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#fff'
  },
  input: {
    height: 43,
    marginLeft: 10,
    flex: 1
  }

});

class InputText extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {borderColor: '#ccc'};
  }

  render() {
    return (
      <View style={[styles.container, this.state, this.props.style]}>
        <TextInput style={[styles.input | this.props.inputStyle]}
                   onChangeText={this.props.onChange}
                   placeholder={this.props.placeholder}
                   secureTextEntry={this.props.secureTextEntry}
                   onFocus={()=>{this._onFocus();}}
                   onBlur={() => {this._onBlur();}}
                   borderColor={this.props.borderColor}
                   focusBorderColor={this.props.focusColor}
                   underlineColorAndroid = {'#fff'}
        />
        {this.props.onGetContainerIcon}
      </View>
    );
  }

  _onFocus() {
    let focusBorderColor = this.props.focusBorderColor ? this.props.focusBorderColor : '#0095d9';
    this.setState({borderColor: focusBorderColor});
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  _onBlur() {
    //失去焦点的时候,改变borderColor 颜色
    let borderColor = this.props.borderColor ? this.props.borderColor : '#0095d9';
    this.setState({borderColor: borderColor});
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

}

export default InputText;
