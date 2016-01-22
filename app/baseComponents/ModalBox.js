import React from 'react-native';
const { View, StyleSheet, PanResponder, Animated, TouchableWithoutFeedback, Dimensions, Easing } = React;

const screen = Dimensions.get('window');

const styles = StyleSheet.create({

  wrapper: {
    backgroundColor: 'white'
  },

  transparent: {
    backgroundColor: 'rgba(0,0,0,0)'
  },

  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

});

class ModalBox extends React.Component {

  static defaultProps = {
    swipeToClose: true,
    swipeThreshold: 50,
    position: 'center',
    backdrop: true,
    backdropOpacity: 0.5,
    backdropColor: 'black',
    backdropContent: null,
    animationDuration: 400
  };

  static propTypes = {
    isOpen: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    swipeToClose: React.PropTypes.bool,
    swipeThreshold: React.PropTypes.number,
    swipeArea: React.PropTypes.number,
    position: React.PropTypes.string,
    backdrop: React.PropTypes.bool,
    backdropOpacity: React.PropTypes.number,
    backdropColor: React.PropTypes.string,
    backdropContent: React.PropTypes.element,
    animationDuration: React.PropTypes.number,

    onClosed: React.PropTypes.func,
    onOpened: React.PropTypes.func,
    onClosingState: React.PropTypes.func,
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      position: new Animated.Value(screen.height),
      backdropOpacity: new Animated.Value(0),
      isOpen: false,
      isAnimateClose: false,
      isAnimateOpen: false,
      swipeToClose: false,
      height: screen.height,
      width: screen.width
    };
  }

  componentDidMount() {
    if (this.props.swipeToClose) {
      this.createPanResponder();
    }
  }

  componentWillReceiveProps(props) {
    if (typeof props.isOpen === 'undefined') return;
    if (props.isOpen === true) {
      this.open();
    } else {
      this.close(); 
    }
  }

  /****************** ANIMATIONS **********************/

  /*
   * Open animation for the backdrop, will fade in
   */
  animateBackdropOpen() {
    if (this.state.isAnimateBackdrop) {
      this.state.animBackdrop.stop();
      this.state.isAnimateBackdrop = false;
    }

    this.state.isAnimateBackdrop = true;
    this.state.animBackdrop = Animated.timing(
      this.state.backdropOpacity,
      {
        toValue: 1,
        duration: this.props.animationDuration
      }
    );
    this.state.animBackdrop.start(() => {
      this.state.isAnimateBackdrop = false;
    });
  }

  /*
   * Close animation for the backdrop, will fade out
   */
  animateBackdropClose() {
    if (this.state.isAnimateBackdrop) {
      this.state.animBackdrop.stop();
      this.state.isAnimateBackdrop = false;
    }

    this.state.isAnimateBackdrop = true;
    this.state.animBackdrop = Animated.timing(
      this.state.backdropOpacity,
      {
        toValue: 0,
        duration: this.props.animationDuration
      }
    );
    this.state.animBackdrop.start(() => {
      this.state.isAnimateBackdrop = false;
    });
  }

  /*
   * Open animation for the modal, will move up
   */
  animateOpen() {
    if (this.state.isAnimateClose) {
      this.state.animClose.stop();
      this.state.isAnimateClose = false;
    }

    // Backdrop fadeIn
    if (this.props.backdrop) {
      this.animateBackdropOpen();
    }

    // Detecting modal position
    this.state.positionDest = 0;
    if (this.props.position === 'bottom') {
      this.state.positionDest = screen.height - this.state.height;
    } else if (this.props.position === 'center') {
      this.state.positionDest = screen.height / 2 - this.state.height / 2;
    }


    this.state.isAnimateOpen = true;
    this.state.animOpen = Animated.timing(
      this.state.position,
      {
        toValue: this.state.positionDest,
        duration: this.props.animationDuration,
        easing: Easing.elastic(0.8)
      }
    );
    this.state.animOpen.start(() => {
      this.state.isAnimateOpen = false;
      this.state.isOpen = true;
      if (this.props.onOpened) this.props.onOpened();
    });
  }

  /*
   * Close animation for the modal, will move down
   */
  animateClose() {
    if (this.state.isAnimateOpen) {
      this.state.animOpen.stop();
      this.state.isAnimateOpen = false;
    }

    // Backdrop fadeout
    if (this.props.backdrop) this.animateBackdropClose();

    this.state.isAnimateClose = true;
    this.state.animClose = Animated.timing(
      this.state.position,
      {
        toValue: screen.height,
        duration: this.props.animationDuration
      }
    );
    this.state.animClose.start(() => {
      this.state.isAnimateClose = false;
      this.state.isOpen = false;
      this.setState({});
      if (this.props.onClosed) this.props.onClosed();
    });
  }

  /*
   * Create the pan responder to detect gesture
   * Only used if swipeToClose is enabled
   */
  createPanResponder() {
    let closingState = false;
    let inSwipeArea = true;

    let onPanRelease = (evt, state) => {
      if (!inSwipeArea) return;
      if (state.dy > this.props.swipeThreshold) {
        this.animateClose();
      } else {
        this.animateOpen();
      }
    };

    let animEvt = Animated.event([null, {customY: this.state.position}]);

    let onPanMove = (evt, state) => {
      let newClosingState = (state.dy > this.props.swipeThreshold) ? true : false;
      if (state.dy < 0) return;
      if (newClosingState !== closingState && this.props.onClosingState) {
        this.props.onClosingState(newClosingState);
      }
      closingState = newClosingState;
      state.customY = state.dy + this.state.positionDest;

      animEvt(evt, state);
    };

    let onPanStart = (evt, state) => {
      if (this.props.isDisabled || (this.props.swipeArea && (evt.nativeEvent.pageY - this.state.positionDest) > this.props.swipeArea)) {
        inSwipeArea = false;
        return false;
      }
      inSwipeArea = true;
      return true;
    };

    /* Fix 3d touch bug related issue https://github.com/facebook/react-native/issues/3082*/
    let onPanShouldMove = (evt, state) => {
      if (state.dx === 0 || state.dy === 0) {
        return false;
      }
      return inSwipeArea;
    };

    this.state.pan = PanResponder.create({
      onStartShouldSetPanResponder: onPanStart,
      onMoveShouldSetPanResponder: onPanShouldMove,
      onPanResponderMove: onPanMove,
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    });
  }

  /*
   * Event called when the modal view layout is calculated
   */
  onViewLayout(evt) {
    this.state.height = evt.nativeEvent.layout.height;
    this.state.width = evt.nativeEvent.layout.width;

    if (this.onViewLayoutCalculated) this.onViewLayoutCalculated();
  }

  /*
   * Render the backdrop element
   */
  renderBackdrop() {
    let backdrop = [];
    let size = {height: screen.height, width: screen.width};

    if (this.props.backdrop) {
      backdrop = (
        <TouchableWithoutFeedback onPress={this.close}>
          <Animated.View style={[styles.absolute, size, {opacity: this.state.backdropOpacity}]}>
            <View
              style={[styles.absolute, {backgroundColor: this.props.backdropColor, opacity: this.props.backdropOpacity}]}/>
            {this.props.backdropContent || []}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }

    return backdrop;
  }

  /** 渲染组件 */
  render() {
    let visible = this.state.isOpen || this.state.isAnimateOpen || this.state.isAnimateClose;
    let pan = this.state.pan ? this.state.pan.panHandlers : {};
    let offsetX = (screen.width - this.state.width) / 2;
    let backdrop = this.renderBackdrop();

    if (!visible) return <View/>;

    return (
      <View style={[styles.transparent, styles.absolute]} pointerEvents={'box-none'}>
        {backdrop}
        <Animated.View
          onLayout={(e)=>this.onViewLayout(e)}
          style={[styles.wrapper, {height: screen.height, width: screen.width}, this.props.style, {transform: [{translateY: this.state.position}, {translateX: offsetX}]} ]}
          {...pan}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }


  /****************** PUBLIC METHODS **********************/

  open = () => {
    if (this.props.isDisabled) return;
    if (!this.state.isAnimateOpen && (!this.state.isOpen || this.state.isAnimateClose)) {
      this.onViewLayoutCalculated = () => {
        this.setState({});
        this.animateOpen();
      };
      this.setState({isAnimateOpen: true});
    }
  }

  close = () => {
    if (this.props.isDisabled) return;
    if (!this.state.isAnimateClose && (this.state.isOpen || this.state.isAnimateOpen)) {
      this.animateClose();
    }
  }


}

export default ModalBox;
