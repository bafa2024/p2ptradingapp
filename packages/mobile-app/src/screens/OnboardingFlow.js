import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IQXOnboardingScreen from './OnboardingScreen';

const OnboardingFlow = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = async () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    } else {
      // Mark onboarding as completed
      try {
        await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
        // Navigate to authentication screen (login/signup)
        navigation.replace('Auth');
      } catch (error) {
        console.error('Error saving onboarding status:', error);
        navigation.replace('Auth');
      }
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      // Skip to authentication screen
      navigation.replace('Auth');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      navigation.replace('Auth');
    }
  };

  return (
    <IQXOnboardingScreen
      navigation={navigation}
      currentPage={currentPage}
      onNext={handleNext}
      onSkip={handleSkip}
    />
  );
};

export default OnboardingFlow;
