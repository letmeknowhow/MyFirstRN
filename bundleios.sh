#!/usr/bin/env bash

rm -rf ./release/ios/*

react-native bundle \
--platform ios \
--entry-file index.ios.js \
--bundle-output ./release/ios/main.jsbundle \
--dev false
# ios下codepush支持文件夹发布
code-push release wealth-ios  ./release/ios  1.0.0
