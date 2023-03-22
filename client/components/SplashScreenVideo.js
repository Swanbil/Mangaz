// SplashScreenVideo.js
import React from 'react';
import {View} from 'react-native';
import {Video} from 'expo-av';

const SplashScreenVideo = ({onVideoEnd}) => {
  return (
    <View style={{flex: 1}}>
      <Video
        source={require('../assets/bochiThePeak.mp4')}
        style={{flex: 1}}
        resizeMode={Video.RESIZE_MODE_COVER}
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            onVideoEnd();
          }
        }}
      />
    </View>
  );
};

export default SplashScreenVideo;
