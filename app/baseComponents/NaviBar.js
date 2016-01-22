import React from 'react-native';

const {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PropTypes,
  Platform
  } = React;

const STATUS_BAR_HEIGHT = 20;
const HEIGHT = 39;

const styles = StyleSheet.create({
  navbar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d4d4d4',
    borderBottomWidth: 0,
    height: HEIGHT
  },

  iconWrapper: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: 6
  },

  icon: {
    width: 14,
    height: 14,
    borderColor: '#666',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{rotate: '45deg'}]
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  actionBtn: {
    position: 'absolute',
    right: 10,
    bottom: 12
  },

  actionName: {
    fontSize: 14
  }
});

class NaviBar extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    backFunc: PropTypes.func,
    tintColor: PropTypes.string,
    titleTextColor: PropTypes.string,
    barTintColor: PropTypes.string,
    actionName: PropTypes.string,
    actionFunc: PropTypes.func,
    actionTextColor: PropTypes.string,
    backIconHidden: PropTypes.bool,
    statusbarPadding: PropTypes.bool
  };

  static defaultProps = {
    title: 'title',
    backFunc: ()=> {
      console.log('press back');
    },
    tintColor: '#777',
    titleTextColor: '#333',
    barTintColor: 'white',
    actionName: '',
    actionFunc: ()=> {
    },
    actionTextColor: '#666',
    backIconHidden: false,
    statusbarPadding: true
  };

  // 构造
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={
          [styles.navbar,
            {backgroundColor: this.props.barTintColor, height: Platform.OS === 'ios' ? 65 : 45},
            Platform.OS === 'ios' ? { paddingTop: STATUS_BAR_HEIGHT } : {}]}>
        {!this.props.backIconHidden ?
          <TouchableOpacity style={styles.iconWrapper} onPress={this.props.backFunc}>
            <View style={[styles.icon, {borderColor: this.props.tintColor}]}/>
          </TouchableOpacity> : null}
        <Text style={[styles.title, {color: this.props.titleTextColor}]}>{this.props.title}</Text>
        {this.props.actionName ?
          <TouchableOpacity style={styles.actionBtn} onPress={this.props.actionFunc.bind(this)}>
            <Text style={[styles.actionName, { color: this.props.actionTextColor }]}>{this.props.actionName}</Text>
          </TouchableOpacity> : null}
      </View>
    );
  }
}

export default NaviBar;
