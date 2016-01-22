import NavigationBar from '../../../baseComponents/NaviBar';
import React, { Component, StyleSheet } from 'react-native';

const leftButton = (props = {}, transitioning) => {
  if (props.navLeft && props.navLeft._isReactElement) {
    return props.navLeft;
  }

  let handler = () => {};
  let title = '';

  if (!transitioning && props.router && props.router.routes.length > 1) {
    handler = props.actions.pop;
    title = '返回';
  }

  return {
    handler: props.navLeftHandler || handler,
    style: props.navLeftStyle || {},
    tintColor: props.navLeftColor || '#037AFF',
    title: props.navLeftTitle || title,
  };
};

const rightButton = (props = {}) => {
  if (props.navRight && props.navRight._isReactElement) {
    return props.navRight;
  }

  return {
    handler: props.navRightHandler || (() => {}),
    style: props.navRightStyle || {},
    tintColor: props.navRightColor || '#037AFF',
    title: props.navRightTitle || ''
  };
};

const statusBar = props => ({
  hidden: props.statusHidden || false,
  style: props.statusStyle || 'default',
});

const title = props => {
  if (props.navTitle && props.navTitle._isReactElement) {
    return props.navTitle;
  }

  return props.title;
};

class NavBarBase extends Component {
  componentWillMount() {
    this.onDidFocusNavigationSub =
      this.props.navigator.navigationContext.addListener(
        'didfocus', this.onDidFocus.bind(this)
      );
    this.onWillFocusNavigationSub =
      this.props.navigator.navigationContext.addListener(
        'willfocus', this.onWillFocus.bind(this)
      );
  }

  componentWillUnmount() {
    if (this.onDidFocusNavigationSub) {
      this.onDidFocusNavigationSub.remove();
      this.onDidFocusNavigationSub = null;
    }

    if (this.onWillFocusNavigationSub) {
      this.onWillFocusNavigationSub.remove();
      this.onWillFocusNavigationSub = null;
    }
  }

  render() {
    return (
      <NavigationBar
        leftButton={leftButton(this.props, this.transitioning)}
        backFunc={this.props.actions.pop}
        actionFunc={this.props.actions.deleteSessionToken}
        backIconHidden = {this.props.router.routes.length < 2}
        actionName = {'退出'}
        statusBar={statusBar(this.props)}
        barTintColor={'#39444F'}
        actionTextColor={'white'}
        titleTextColor={'white'}
        tintColor={'white'}
        title={title(this.props)}
        />
    );
  }

  onDidFocus(event) {
    this.transitioning = false;
  }

  onWillFocus(event) {
    this.transitioning = true;
  }
}

class NavBar extends Component {
  render() {
    return <NavBarBase {...this.props} />;
  }
}

module.exports = { NavBar };
