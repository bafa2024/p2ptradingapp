import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Platform,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, Rect, G } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate logo appearance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main screen after delay
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  // Play button icon component
  const PlayIcon = ({ size = 40, color = "#000000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect 
        x="3" 
        y="3" 
        width="18" 
        height="18" 
        rx="4" 
        stroke={color} 
        strokeWidth="2"
      />
      <Path 
        d="M10 8L16 12L10 16V8Z" 
        fill={color}
      />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor="#F0B90B" 
        barStyle="dark-content"
        translucent={false}
      />
      
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <Text style={styles.logoText}>IQX</Text>
            <View style={styles.playIconContainer}>
              <PlayIcon size={45} color="#000000" />
            </View>
          </View>
        </Animated.View>

        {/* Optional: Add a loading indicator below the logo */}
        <Animated.View 
          style={[
            styles.loadingContainer,
            { opacity: fadeAnim }
          ]}
        >
          {/* You can add a progress bar or spinner here if needed */}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0B90B', // IQX Yellow
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 72,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -2,
    marginRight: 5,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif-black',
    }),
  },
  playIconContainer: {
    marginLeft: -5,
    marginTop: 2,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
});

export default SplashScreen;
