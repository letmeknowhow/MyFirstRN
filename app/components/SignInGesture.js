/**
 *  Class: SignInGesture
 *  Author: Niu Xiaoyu
 *  Date: 16/1/7.
 *  Description: 手势密码
 */
import React from 'react-native';
const {
  Component,
  } = React;

import PasswordGesture from 'react-native-gesture-password';

let Password1 = '';
class SignInGesture extends Component {
  // Example for check password
  onEnd(password) {
    if (password === '123') {
      this.setState({
        status: 'right',
        message: 'Password is right, success.'
      });
      this.props.actions.routes.tabBar.home()();
      // your codes to close this view
    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.'
      });
    }

    this.refs.pg.resetActive();
  }
  onStart() {
    this.setState({
      status: 'normal',
      message: 'Please input your password.'
    });
  }
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      message: 'Please input your password.',
      status: 'normal'
    };
  }
  // Example for set password
  /*
   onEnd: function(password) {
   if ( Password1 === '' ) {
   // The first password
   Password1 = password;
   this.setState({
   status: 'normal',
   message: 'Please input your password secondly.'
   });
   } else {
   // The second password
   if ( password === Password1 ) {
   this.setState({
   status: 'right',
   message: 'Your password is set to ' + password
   });

   Password1 = '';
   // your codes to close this view
   } else {
   this.setState({
   status: 'wrong',
   message:  'Not the same, try again.'
   });
   }
   }
   },
   onStart: function() {
   if ( Password1 === '') {
   this.setState({
   message: 'Please input your password.'
   });
   } else {
   this.setState({
   message: 'Please input your password secondly.'
   });
   }
   },
   */

  render() {
    return (
      <PasswordGesture
        ref='pg'
        status={this.state.status}
        message={this.state.message}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
      />
    );
  }
}

export default SignInGesture;
