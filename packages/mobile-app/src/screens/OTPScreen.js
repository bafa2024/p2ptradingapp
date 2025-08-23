import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import { Spacing, BorderRadius, Shadows } from '../constants/Spacing';

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      // TODO: Implement OTP verification logic
      console.log('OTP verification:', otpString);
      // Set user token to indicate successful login
      AsyncStorage.setItem('userToken', 'verified');
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'Please enter the complete 4-digit OTP');
    }
  };

  const handleResendOTP = () => {
    // TODO: Implement resend OTP logic
    console.log('Resending OTP...');
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <Ionicons name="shield-checkmark" size={48} color={Colors.colorBuy} />
              </View>
              <Text style={styles.titleText}>Verify Your Account</Text>
              <Text style={styles.subtitleText}>
                We've sent a 4-digit verification code to your email
              </Text>
            </View>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            <Text style={styles.otpLabel}>Enter Verification Code</Text>
            <View style={styles.otpInputContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit && styles.otpInputFilled,
                    index === 0 && styles.otpInputFirst,
                    index === 3 && styles.otpInputLast,
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              ))}
            </View>
          </View>

          {/* Timer and Resend */}
          <View style={styles.timerContainer}>
            {!canResend ? (
              <Text style={styles.timerText}>
                Resend code in {timer}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendText}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            style={[styles.verifyButton, !isOtpComplete && styles.verifyButtonDisabled]} 
            onPress={handleVerify}
            disabled={!isOtpComplete}
          >
            <LinearGradient
              colors={[Colors.gradientStart, Colors.gradientEnd]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.verifyButtonText}>Verify Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Help Text */}
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              Didn't receive the code? Check your spam folder or{' '}
              <Text style={styles.helpLink}>contact support</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.glow,
  },
  titleText: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.normal,
    paddingHorizontal: Spacing.md,
  },
  otpContainer: {
    marginBottom: Spacing.xl,
  },
  otpLabel: {
    fontSize: Typography.lg,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.inputBackground,
    textAlign: 'center',
    fontSize: Typography['2xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  otpInputFilled: {
    borderColor: Colors.colorBuy,
    backgroundColor: Colors.bgCard,
  },
  otpInputFirst: {
    marginLeft: 0,
  },
  otpInputLast: {
    marginRight: 0,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  timerText: {
    fontSize: Typography.base,
    color: Colors.textMuted,
  },
  resendText: {
    fontSize: Typography.base,
    color: Colors.colorInfo,
    fontWeight: Typography.fontWeights.medium,
  },
  verifyButton: {
    height: 56,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
    ...Shadows.glow,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: Typography.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.white,
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.normal,
    paddingHorizontal: Spacing.md,
  },
  helpLink: {
    color: Colors.colorInfo,
    fontWeight: Typography.fontWeights.medium,
  },
});

export default OTPScreen;
