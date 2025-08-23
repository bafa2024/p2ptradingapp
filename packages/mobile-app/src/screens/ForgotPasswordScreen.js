import React, { useState } from 'react';
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
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import { Spacing, BorderRadius, Shadows } from '../constants/Spacing';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    // TODO: Implement password reset logic
    console.log('Password reset requested for:', email);
    Alert.alert(
      'Reset Link Sent',
      'If an account with that email exists, we have sent a password reset link.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
                <Ionicons name="lock-open-outline" size={48} color={Colors.colorInfo} />
              </View>
              <Text style={styles.titleText}>Forgot Password?</Text>
              <Text style={styles.subtitleText}>
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={Colors.textMuted} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Back to Login */}
            <View style={styles.backToLoginContainer}>
              <Text style={styles.backToLoginText}>Remember your password? </Text>
              <TouchableOpacity onPress={handleBack}>
                <Text style={styles.backToLoginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.xl,
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
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: Spacing.xl,
  },
  inputLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  textInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Typography.base,
    color: Colors.textPrimary,
  },
  resetButton: {
    height: 56,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
    ...Shadows.glow,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: Typography.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.white,
  },
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  backToLoginText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  backToLoginLink: {
    fontSize: Typography.base,
    color: Colors.colorBuy,
    fontWeight: Typography.fontWeights.semibold,
  },
});

export default ForgotPasswordScreen;
