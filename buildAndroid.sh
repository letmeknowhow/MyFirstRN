#!/usr/bin/env bash

cd android && ./gradlew assembleRelease

cd ..

open android/app/build/outputs/apk