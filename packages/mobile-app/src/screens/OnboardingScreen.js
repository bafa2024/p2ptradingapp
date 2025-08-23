import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle, G, Polygon, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const IQXOnboardingScreen = ({ navigation, onSkip, onNext, currentPage = 0 }) => {
  // Animation values for floating tokens
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const floatAnim4 = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Floating animations for tokens
    const createFloatingAnimation = (animValue, delay = 0) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 3000 + delay,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 3000 + delay,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Rotation animation
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    createFloatingAnimation(floatAnim1, 0).start();
    createFloatingAnimation(floatAnim2, 500).start();
    createFloatingAnimation(floatAnim3, 1000).start();
    createFloatingAnimation(floatAnim4, 1500).start();
    rotationAnimation.start();
  }, []);

  // Icon Components
  const GlobeIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2"/>
      <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="black" strokeWidth="2"/>
    </Svg>
  );

  // IQX Logo Icon - Center piece
  const IQXIcon = ({ size = 60 }) => (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="30" fill="#F0B90B"/>
      <Text 
        x="20" 
        y="38" 
        fontSize="12" 
        fontWeight="900" 
        fill="black" 
        textAnchor="middle"
      >
        IQX
      </Text>
      <Rect 
        x="42" 
        y="25" 
        width="8" 
        height="8" 
        rx="2" 
        stroke="black" 
        strokeWidth="1.5"
      />
      <Path 
        d="M44 27L48 31L44 35V27Z" 
        fill="black"
      />
    </Svg>
  );

  const BitcoinIcon = ({ size = 40 }) => (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="30" fill="#F7931A"/>
      <Path 
        d="M25 20 L39 20 C42 20 44 22 44 25 C44 27 43 28 41 29 C43 30 44 32 44 35 C44 38 42 40 39 40 L25 40 L25 20 Z M30 25 L30 35 L35 35 C37 35 38 34 38 32 C38 30 37 29 35 29 L30 29 L30 25 Z" 
        fill="white"
      />
    </Svg>
  );

  const EthereumIcon = ({ size = 40 }) => (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="30" fill="#627EEA"/>
      <Path d="M32 8 L32 28 L20 32 Z" fill="white" opacity="0.6"/>
      <Path d="M32 8 L32 28 L44 32 Z" fill="white"/>
      <Path d="M32 36 L32 56 L20 40 Z" fill="white" opacity="0.6"/>
      <Path d="M32 36 L32 56 L44 40 Z" fill="white"/>
    </Svg>
  );

  const USDTIcon = ({ size = 40 }) => (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="30" fill="#26A17B"/>
      <Text 
        x="32" 
        y="38" 
        fontSize="16" 
        fontWeight="bold" 
        fill="white" 
        textAnchor="middle"
      >
        ₮
      </Text>
    </Svg>
  );

  const BNBIcon = ({ size = 40 }) => (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="30" fill="#F3BA2F"/>
      <Polygon 
        points="32,12 42,22 52,22 42,32 52,42 42,42 32,52 22,42 12,42 22,32 12,22 22,22" 
        fill="white"
      />
    </Svg>
  );

  const interpolateFloat = (animValue, outputRange) => {
    return animValue.interpolate({
      inputRange: [0, 1],
      outputRange: outputRange,
    });
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor="#000000" 
        barStyle="light-content"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.languageButton}>
          <GlobeIcon />
          <Text style={styles.languageText}>EN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Crypto Tokens */}
      <View style={styles.tokensContainer}>
        {/* IQX Token - Center Large */}
        <Animated.View 
          style={[
            styles.tokenCenter,
            {
              opacity: fadeAnim,
              transform: [
                { rotate: rotation },
                { scale: interpolateFloat(floatAnim1, [1, 1.1]) }
              ],
            },
          ]}
        >
          <View style={styles.iqxTokenWrapper}>
            <IQXIcon size={100} />
          </View>
        </Animated.View>

        {/* Bitcoin Token - Top Left */}
        <Animated.View 
          style={[
            styles.tokenTopLeft,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: interpolateFloat(floatAnim2, [0, -15]) },
                { translateX: interpolateFloat(floatAnim2, [0, 5]) },
              ],
            },
          ]}
        >
          <View style={styles.tokenSmall}>
            <BitcoinIcon size={45} />
          </View>
        </Animated.View>

        {/* Ethereum Token - Bottom Left */}
        <Animated.View 
          style={[
            styles.tokenBottomLeft,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: interpolateFloat(floatAnim3, [0, -20]) },
                { translateX: interpolateFloat(floatAnim3, [0, -5]) },
              ],
            },
          ]}
        >
          <View style={styles.tokenSmall}>
            <EthereumIcon size={50} />
          </View>
        </Animated.View>

        {/* USDT Token - Bottom Right */}
        <Animated.View 
          style={[
            styles.tokenBottomRight,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: interpolateFloat(floatAnim4, [0, -10]) },
                { translateX: interpolateFloat(floatAnim4, [0, 10]) },
              ],
            },
          ]}
        >
          <View style={styles.tokenSmall}>
            <USDTIcon size={48} />
          </View>
        </Animated.View>

        {/* BNB Token - Top Right */}
        <Animated.View 
          style={[
            styles.tokenTopRight,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.8],
              }),
              transform: [
                { translateY: interpolateFloat(floatAnim1, [0, -8]) },
              ],
            },
          ]}
        >
          <View style={styles.tokenSmall}>
            <BNBIcon size={42} />
          </View>
        </Animated.View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>
            Trade crypto with{'\n'}confidence on IQX
          </Text>
          <Text style={styles.subtitle}>
            Your secure P2P trading platform for seamless crypto transactions
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={onNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {[0, 1, 2, 3, 4].map((index) => (
            <View 
              key={index}
              style={[
                styles.paginationDot,
                currentPage === index && styles.paginationDotActive
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    zIndex: 10,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  languageText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    color: '#F0B90B',
    fontSize: 16,
    fontWeight: '500',
  },
  tokensContainer: {
    flex: 1,
    position: 'relative',
    marginTop: -20,
  },
  tokenCenter: {
    position: 'absolute',
    top: height * 0.15,
    left: width / 2 - 50,
    zIndex: 5,
  },
  iqxTokenWrapper: {
    shadowColor: '#F0B90B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 15,
  },
  tokenTopLeft: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.15,
    zIndex: 3,
  },
  tokenBottomLeft: {
    position: 'absolute',
    top: height * 0.28,
    left: width * 0.1,
    zIndex: 3,
  },
  tokenBottomRight: {
    position: 'absolute',
    top: height * 0.3,
    right: width * 0.12,
    zIndex: 3,
  },
  tokenTopRight: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.2,
    zIndex: 2,
  },
  tokenSmall: {
    shadowColor: '#F0B90B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    paddingHorizontal: 30,
    marginTop: height * 0.05,
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    marginTop: 'auto',
  },
  nextButton: {
    backgroundColor: '#F0B90B',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3A3A3C',
  },
  paginationDotActive: {
    backgroundColor: '#F0B90B',
    width: 24,
  },
});

export default IQXOnboardingScreen;
