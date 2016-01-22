/**
 *  Class: DatePicker
 *  Author: Niu Xiaoyu
 *  Date: 15/12/22.
 *  Description: 时间选择
 */
import React from 'react-native';
const { StyleSheet, PropTypes, View, Text, Animated, Platform, Dimensions, PickerIOS } = React;

import PickerAndroid from 'react-native-picker-android';

let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;
let width = Dimensions.get('window').width;
//let height = Dimensions.get('window').height;

let styles = StyleSheet.create({
  picker: {
    width: width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#bdc0c7',
    overflow: 'hidden'
  },
  pickerWrap: {
    width: width,
    flexDirection: 'row'
  },
  pickerWheel: {
    flex: 1
  },
  pickerToolbar: {
    height: 30,
    width: width,
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#c3c3c3'
  },
  pickerBtnView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  pickerMoveBtn: {
    color: '#149be0',
    fontSize: 16,
    marginLeft: 20
  },
  pickerFinishBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20
  },
  pickerFinishBtnTextDone: {
    flex: 1,
    fontSize: 16,
    color: '#149be0',
    textAlign: 'right'
  },
  pickerFinishBtnTextCancel: {
    flex: 1,
    fontSize: 16,
    color: '#149be0',
    textAlign: 'left'
  }
});


export default class DatePicker extends React.Component {

  static propTypes = {
    pickerBtnText: PropTypes.string,
    pickerBtnStyle: PropTypes.any,
    pickerToolBarStyle: PropTypes.any,
    pickerItemStyle: PropTypes.any,
    pickerHeight: PropTypes.number,
    showDuration: PropTypes.number,
    pickerData: PropTypes.any.isRequired,
    selectedValue: PropTypes.any.isRequired,
    onPickerDone: PropTypes.func
  };

  static defaultProps = {
    pickerBtnText: '完成',
    pickerHeight: 250,
    showDuration: 300,
    onPickerDone: ()=> {
    }
  };

  constructor(props, context) {
    super(props, context);
    //the pickedValue must looks like [wheelone's, wheeltwo's, ...]
    //this.state.selectedValue may be the result of the first pickerWheel 
    let pickedValue = this.props.selectedValue;
    let pickerData = this.props.pickerData;
    let pickerStyle = pickerData.constructor === Array ? 'parallel' : 'cascade';
    let firstWheelData;
    let firstPickedData;
    let secondPickedData;
    let cascadeData = {};
    if (pickerStyle === 'parallel') {
      //compatible single wheel sence
      if (pickedValue.constructor !== Array) {
        pickedValue = [pickedValue];
      }
      if (pickerData[0].constructor !== Array) {
        pickerData = [pickerData];
      }
    } else if (pickerStyle === 'cascade') {
      //only support three stage
      firstWheelData = Object.keys(pickerData);
      firstPickedData = this.props.selectedValue[0];
      secondPickedData = this.props.selectedValue[1];
      cascadeData = this._getCascadeData(pickerData, pickedValue, firstPickedData, secondPickedData, true);
    }
    this.state = {
      slideAnim: new Animated.Value(-this.props.pickerHeight),
      pickerData,
      selectedValue: pickedValue,
      //list of first wheel data
      firstWheelData,
      //first wheel selected value
      firstPickedData,
      //list of second wheel data and pickedDataIndex
      secondWheelData: cascadeData.secondWheelData,
      secondPickedDataIndex: cascadeData.secondPickedDataIndex,
      //third wheel selected value and pickedDataIndex
      thirdWheelData: cascadeData.thirdWheelData,
      thirdPickedDataIndex: cascadeData.thirdPickedDataIndex
    };
    this.pickedValue = pickedValue;
    this.pickerStyle = pickerStyle;
  }

  _slideUp() {
    this.isMoving = true;
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: 0,
        duration: this.props.showDuration,
      }
    ).start((evt) => {
      if (evt.finished) {
        this.isMoving = false;
        this.isPickerShow = true;
      }
    });
  }

  _slideDown() {
    this.isMoving = true;
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: -this.props.pickerHeight,
        duration: this.props.showDuration,
      }
    ).start((evt) => {
      if (evt.finished) {
        this.isMoving = false;
        this.isPickerShow = false;
      }
    });
  }

  _toggle() {
    if (this.isMoving) {
      return;
    }
    if (this.isPickerShow) {
      this._slideDown();
    } else {
      this._slideUp();
    }
  }

  //向父组件提供方法
  toggle() {
    this._toggle();
  }

  _prePressHandle(callback) {
    //通知子组件往上滚
    this.pickerWheel.moveUp();
  }

  _nextPressHandle(callback) {
    //通知子组件往下滚
    this.pickerWheel.moveDown();
  }

  _pickerFinish() {
    this._toggle();
    this.props.onPickerDone(this.pickedValue);
  }

  _renderParallelWheel(pickerData) {
    let me = this;
    return pickerData.map((item, index) => {
      return (
        <View style={styles.pickerWheel} key={index}>
          <Picker
            selectedValue={me.state.selectedValue[index]}
            onValueChange={value => {
              me.pickedValue.splice(index, 1, value);
              me.setState({
                selectedValue: me.pickedValue
              });
            }} 
          >
            {item.map((value, indexInner) => (
              <PickerItem
                key={indexInner}
                value={value}
                label={value}
              />)
            )}
          </Picker>
        </View>
      );
    });
  }

  _getCascadeData(pickerData, pickedValue, firstPickedData, secondPickedData, onInit) {
    let secondWheelData;
    let secondPickedDataIndex;
    let thirdWheelData;
    let thirdPickedDataIndex;
    //only support two and three stage
    for (let key in pickerData) {
      //two stage
      if (pickerData[key].constructor === Array) {
        secondWheelData = pickerData[firstPickedData];
        if (onInit) {
          secondWheelData.forEach(function (v, k) {
            if (v === pickedValue[1]) {
              secondPickedDataIndex = k;
            }
          }.bind(this));
        } else {
          secondPickedDataIndex = 0;
        }
        break;
      } else { //three stage
        secondWheelData = Object.keys(pickerData[firstPickedData]);
        if (onInit) {
          secondWheelData.forEach(function (v, k) {
            if (v === pickedValue[1]) {
              secondPickedDataIndex = k;
            }
          }.bind(this));
        } else {
          secondPickedDataIndex = 0;
        }
        thirdWheelData = pickerData[firstPickedData][secondPickedData];
        if (onInit) {
          thirdWheelData.forEach(function (v, k) {
            if (v === pickedValue[2]) {
              thirdPickedDataIndex = k;
            }
          });
        } else {
          thirdPickedDataIndex = 0;
        }
        break;
      }
    }

    return {
      secondWheelData,
      secondPickedDataIndex,
      thirdWheelData,
      thirdPickedDataIndex
    };
  }

  _renderCascadeWheel(pickerData) {
    let me = this;
    let thirdWheel = me.state.thirdWheelData && (
        <View style={styles.pickerWheel}>
          <Picker
            ref={'thirdWheel'}
            selectedValue={me.state.thirdPickedDataIndex}
            onValueChange={(index) => {
              //on ios platform 'this' refers to Picker?
              me.pickedValue.splice(2, 1, me.state.thirdWheelData[index]);
              me.setState({
                thirdPickedDataIndex: index
              });
            }}
          >
            {me.state.thirdWheelData.map((value, index) => (
              <PickerItem
                key={index}
                value={index}
                label={value}
              />)
            )}
          </Picker>
        </View>
      );

    return (
      <View style={styles.pickerWrap}>
        <View style={styles.pickerWheel} >
          <Picker
            ref={'firstWheel'}
            selectedValue={me.state.firstPickedData}
            onValueChange={value => {
              let secondWheelData = Object.keys(pickerData[value]);
              let cascadeData = me._getCascadeData(pickerData, me.pickedValue, value, secondWheelData[0]);
              //when onPicked, this.pickedValue will pass to the parent
              //when firstWheel changed, second and third will also change
              if (cascadeData.thirdWheelData) {
                me.pickedValue.splice(0, 3, value, cascadeData.secondWheelData[0], cascadeData.thirdWheelData[0]);
              } else {
                me.pickedValue.splice(0, 2, value, cascadeData.secondWheelData[0]);
              }
              
              me.setState({
                selectedValue: value,
                firstPickedData: value,
                secondWheelData: cascadeData.secondWheelData,
                secondPickedDataIndex: 0,
                thirdWheelData: cascadeData.thirdWheelData,
                thirdPickedDataIndex: 0
              });
              me.refs.secondWheel && me.refs.secondWheel.moveTo && me.refs.secondWheel.moveTo(0);
              me.refs.thirdWheel && me.refs.thirdWheel.moveTo && me.refs.thirdWheel.moveTo(0);
            }}>
            {me.state.firstWheelData.map((value, index) => (
              <PickerItem
                key={index}
                value={value}
                label={value}
              />)
            )}
          </Picker>
        </View>
        <View style={styles.pickerWheel} >
          <Picker
            ref={'secondWheel'}
            selectedValue={me.state.secondPickedDataIndex}
            onValueChange={(index) => {
              let thirdWheelData = pickerData[me.state.firstPickedData][me.state.secondWheelData[index]];
              if (thirdWheelData) {
                me.pickedValue.splice(1, 2, me.state.secondWheelData[index], thirdWheelData[0]);  
              } else {
                me.pickedValue.splice(1, 1, me.state.secondWheelData[index]);
              }
              
              me.setState({
                secondPickedDataIndex: index,
                thirdWheelData,
                thirdPickedDataIndex: 0
              });
              me.refs.thirdWheel && me.refs.thirdWheel.moveTo && me.refs.thirdWheel.moveTo(0);
            }}>
            {me.state.secondWheelData.map((value, index) => (
              <PickerItem
                key={index}
                value={index}
                label={value}
              />)
            )}
          </Picker>
        </View>
        {thirdWheel}
      </View>
    );
  }

  _renderWheel(pickerData) {
    let wheel = null;
    if (this.pickerStyle === 'parallel') {
      wheel = this._renderParallelWheel(pickerData);
    } else if (this.pickerStyle === 'cascade') {
      wheel = this._renderCascadeWheel(pickerData);
    }
    return wheel;
  }

  render() {
    //let pickerBtn = null;
    return (
      <Animated.View style={[styles.picker, {
        height: this.props.pickerHeight,
        bottom: this.state.slideAnim}]}
      >
        <View style={[styles.pickerToolbar, this.props.pickerToolBarStyle]}>
          
          <View style={styles.pickerFinishBtn}>
            <Text style={[styles.pickerFinishBtnTextCancel, {position: 'relative', left: 5}, this.props.pickerBtnStyle]}
              onPress={this._toggle.bind(this)}
            >
              取消
            </Text>
            <Text style={[styles.pickerFinishBtnTextDone, this.props.pickerBtnStyle]}
              onPress={this._pickerFinish.bind(this)}
            >
              {this.props.pickerBtnText}
            </Text>
          </View>
        </View>
        <View style={styles.pickerWrap}>
          {this._renderWheel(this.state.pickerData)}
        </View>
      </Animated.View>
    );
  }
}
