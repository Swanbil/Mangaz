import React from 'react';
import {View, Dimensions} from 'react-native';
import {Video} from 'expo-av';

const SplashScreenVideo = ({onVideoEnd}) => {

  return (
    <View style={{flex: 1, flexDirection : 'row', flexGrow : 1}}>
      <Video
        source={require('../assets/bochiThePeak.mp4')}
        style ={{
            flex: 1,
            backgroundColor : 'black'
        }}
        resizeMode={'cover'}
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
