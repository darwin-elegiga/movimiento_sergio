import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const testimonioVideos = [
  require('../assets/videos/Testimonio1.mp4'),
  require('../assets/videos/Testimonio2.mp4'),
  require('../assets/videos/Testimonio3.mp4'),
];

export default function TestimoniosScreen() {
  const [playingStates, setPlayingStates] = useState([false, false, false]);
  const [fullscreenStates, setFullscreenStates] = useState([false, false, false]);
  const [mutedStates, setMutedStates] = useState([false, false, false]);
  const [rotations, setRotations] = useState([0, 0, 0]);
  const [showControls, setShowControls] = useState([true, true, true]);
  const [durations, setDurations] = useState([0, 0, 0]);
  const [positions, setPositions] = useState([0, 0, 0]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const timers = showControls.map((show, index) => {
      if (playingStates[index] && show) {
        return setTimeout(() => {
          setShowControls(prev => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
          });
        }, 2000);
      }
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [playingStates, showControls]);

  const togglePlayPause = async (index) => {
    if (videoRefs.current[index]) {
      const newPlayingStates = [...playingStates];
      if (playingStates[index]) {
        await videoRefs.current[index].pauseAsync();
      } else {
        await videoRefs.current[index].playAsync();
      }
      newPlayingStates[index] = !newPlayingStates[index];
      setPlayingStates(newPlayingStates);
      setShowControls(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  const skipForward = async (index) => {
    if (videoRefs.current[index]) {
      const status = await videoRefs.current[index].getStatusAsync();
      await videoRefs.current[index].setPositionAsync(status.positionMillis + 10000);
      setShowControls(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  const skipBackward = async (index) => {
    if (videoRefs.current[index]) {
      const status = await videoRefs.current[index].getStatusAsync();
      await videoRefs.current[index].setPositionAsync(status.positionMillis - 10000);
      setShowControls(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  const toggleMute = async (index) => {
    if (videoRefs.current[index]) {
      const newMutedStates = [...mutedStates];
      newMutedStates[index] = !newMutedStates[index];
      await videoRefs.current[index].setIsMutedAsync(newMutedStates[index]);
      setMutedStates(newMutedStates);
      setShowControls(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  const toggleFullscreen = (index) => {
    const newFullscreenStates = [...fullscreenStates];
    newFullscreenStates[index] = !newFullscreenStates[index];
    setFullscreenStates(newFullscreenStates);

    const newRotations = [...rotations];
    newRotations[index] = newFullscreenStates[index] ? 90 : 0;
    setRotations(newRotations);

    setShowControls(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleVideoPress = (index) => {
    setShowControls(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const onPlaybackStatusUpdate = (status, index) => {
    if (status.isLoaded) {
      setPositions(prev => {
        const newPositions = [...prev];
        newPositions[index] = status.positionMillis;
        return newPositions;
      });
      if (status.durationMillis !== durations[index]) {
        setDurations(prev => {
          const newDurations = [...prev];
          newDurations[index] = status.durationMillis;
          return newDurations;
        });
      }
    }
  };

  const onSliderValueChange = (value, index) => {
    if (videoRefs.current[index]) {
      const newPosition = value * durations[index];
      videoRefs.current[index].setPositionAsync(newPosition);
    }
  };

  return (
    <ImageBackground  
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
    <ScrollView>
      {testimonioVideos.map((video, index) => (
        <View key={index} style={[
          styles.videoContainer,
          fullscreenStates[index] && styles.fullscreenVideoContainer
        ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleVideoPress(index)}
            style={styles.videoWrapper}
          >
            <Video
              ref={(ref) => (videoRefs.current[index] = ref)}
              source={video}
              rate={1.0}
              volume={1.0}
              isMuted={mutedStates[index]}
              resizeMode={fullscreenStates[index] ? "contain" : "cover"}
              shouldPlay={playingStates[index]}
              isLooping
              style={[
                styles.video,
                fullscreenStates[index] && styles.fullscreenVideo,
                { transform: [{ rotate: `${rotations[index]}deg` }] }
              ]}
              onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(status, index)}
            />
            {showControls[index] && (
              <View style={[
                styles.controls,
                fullscreenStates[index] && styles.fullscreenControls,
              ]}>
                <Slider
                  style={styles.progressBar}
                  minimumValue={0}
                  maximumValue={1}
                  value={positions[index] / durations[index] || 0}
                  onValueChange={(value) => onSliderValueChange(value, index)}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FFFFFF"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => skipBackward(index)}>
                    <Ionicons name="play-back" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => togglePlayPause(index)}>
                    <Ionicons name={playingStates[index] ? "pause" : "play"} size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => skipForward(index)}>
                    <Ionicons name="play-forward" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleMute(index)}>
                    <Ionicons name={mutedStates[index] ? "volume-mute" : "volume-high"} size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => toggleFullscreen(index)}>
                    <Ionicons name={fullscreenStates[index] ? "contract" : "expand"} size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  videoContainer: {
    marginTop:20,
    width: width - 20,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  fullscreenVideoContainer: {
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: -360,
    left: -150,
    width: width * 1.8,
    height: height * 1.8,
    marginTop: 0,
    borderRadius: 0,
    zIndex: 1000,
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  fullscreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  fullscreenControls: {
    transform: [{ rotate: '90deg' }],
    width: height - 140,
    height: 80,
    left: -168,
    top: 707,
  },
  progressBar: {
    width: '100%',
    height: 2,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
});

