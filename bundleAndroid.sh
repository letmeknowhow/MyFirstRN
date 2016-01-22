#!/usr/bin/env bash

rm -rf ./release/android/*

react-native bundle \
--platform android \
--entry-file index.android.js \
--bundle-output ./release/android/index.android.bundle \
--assets-dest ./release/android \
--dev false
# 因为codepush尚不支持 文件夹发布,所以不能以文件夹的方式发布
code-push release wealth-android  ./release/android/index.android.bundle  1.0.0
