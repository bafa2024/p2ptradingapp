import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MiningOnboardingScreen = ({ navigation }) => {
  console.log('MiningOnboardingScreen: Component rendered');
  
  const handleNext = () => {
    console.log('MiningOnboardingScreen: Next button pressed');
    AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    navigation.replace('Login');
  };

  const handleSkip = () => {
    console.log('MiningOnboardingScreen: Skip button pressed');
    AsyncStorage.setItem('hasCompletedOnboarding', 'true');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Simple Test Content */}
        <View style={styles.testContainer}>
          <Text style={styles.mainTitle}>
            Digital miners that earn
          </Text>
          <Text style={styles.mainTitle}>
            BTC every day
          </Text>
          <Text style={styles.subtitle}>
            Each unique miner is your key to BTC rewards
          </Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {[0, 1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={[
                styles.paginationDot,
                step === 0 && styles.paginationDotActive,
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
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  testContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  nextButton: {
    width: '80%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0B90B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333333',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F0B90B',
  },
});

export default MiningOnboardingScreen;
