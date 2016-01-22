var {Navigator,Dimensions,PixelRatio,Platform} = require('react-native');
var buildStyleInterpolator = require('react-native/Libraries/Utilities/buildStyleInterpolator');
var FlatFloatFromRight = Object.assign({}, Navigator.SceneConfigs.HorizontalSwipeJump);
//var FlatFloatFromRight = Object.assign({}, Navigator.SceneConfigs.FloatFromRight);
var FlatFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottomAndroid);

FlatFloatFromRight.gestures = {};


//FlatFloatFromRight.springFriction = 6;
//FlatFloatFromRight.springTension = 200;

// 默认变换速度
FlatFloatFromRight.defaultTransitionVelocity = 16;

var FlatFadeToTheLeft = {
  opacity: {
    extrapolate: true,
    from: 1,
    to: 0,
    max: 1,
    min: 0,
    round: 100,
    type: 'linear',
  },
  transformTranslate: {
    extrapolate: true,
    from: {x: 0, y: 0, z: 0},
    to: {x: -Math.round(Dimensions.get('window').width * 0.3), y: 0, z: 0},
    max: 1,
    min: 0,
    round: 200,
    type: 'linear'
  },
};

var FlatFadeToTheUp = {
  opacity: {
    type: 'constant',
    value: 1.0,
  },
  translateY: {
    extrapolate: true,
    from: 0,
    max: 1,
    min: 0,
    round: PixelRatio.get(),
    to: -Math.round(Dimensions.get('window').height * 0.3),
    type: 'linear',
  },
};

FlatFloatFromBottom.animationInterpolators.out = buildStyleInterpolator(FlatFadeToTheUp);
//FlatFloatFromRight.animationInterpolators.out = buildStyleInterpolator(FlatFadeToTheLeft);

var None = {
  animationInterpolators: {
    into: buildStyleInterpolator(FlatFadeToTheUp),
    out: buildStyleInterpolator(FlatFadeToTheUp),
  },
  defaultTransitionVelocity: 2.5,
  gestures: {},
  springFriction: 0,
  springTension: 2000,
};

module.exports = {
  FlatFloatFromBottom,
  FlatFloatFromRight,
  None,
};
