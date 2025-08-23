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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import { Spacing, BorderRadius, Shadows } from '../constants/Spacing';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = () => {
    // TODO: Implement signup logic
    console.log('Signup attempt:', { 
      fullName, 
      email, 
      phone, 
      password, 
      confirmPassword, 
      agreeToTerms 
    });
    navigation.replace('OTP');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google signup
    console.log('Google signup attempt');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const isFormValid = () => {
    return fullName && email && phone && password && confirmPassword && agreeToTerms;
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
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.subtitleText}>Join the P2P trading community</Text>
            </View>
          </View>

          {/* Sign Up Form */}
          <View style={styles.formContainer}>
            {/* Full Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color={Colors.textMuted} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.textMuted}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

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

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color={Colors.textMuted} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your phone number"
                  placeholderTextColor={Colors.textMuted}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.textMuted} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Create a password"
                  placeholderTextColor={Colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color={Colors.textMuted} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.textMuted} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm your password"
                  placeholderTextColor={Colors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color={Colors.textMuted} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms Agreement */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.termsCheckboxContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={16} color={Colors.white} />
                  )}
                </View>
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>
                    I agree to the{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                    {' '}and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.signUpButton, !isFormValid() && styles.signUpButtonDisabled]} 
              onPress={handleSignUp}
              disabled={!isFormValid()}
            >
              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.signUpButtonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign Up Button */}
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
              <Ionicons name="logo-google" size={20} color={Colors.textPrimary} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLink}>Sign In</Text>
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
    marginTop: Spacing.xl,
    marginBottom: Spacing['2xl'],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: Typography.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
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
  eyeButton: {
    padding: Spacing.xs,
  },
  termsContainer: {
    marginBottom: Spacing.xl,
  },
  termsCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    marginRight: Spacing.sm,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.colorBuy,
    borderColor: Colors.colorBuy,
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.normal,
  },
  termsLink: {
    color: Colors.colorInfo,
    fontWeight: Typography.fontWeights.medium,
  },
  signUpButton: {
    height: 56,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
    ...Shadows.glow,
  },
  signUpButtonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: Typography.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderColor,
  },
  dividerText: {
    fontSize: Typography.sm,
    color: Colors.textMuted,
    marginHorizontal: Spacing.md,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: BorderRadius.md,
    height: 56,
    marginBottom: Spacing.xl,
  },
  googleButtonText: {
    fontSize: Typography.lg,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
    marginLeft: Spacing.sm,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  loginText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: Typography.base,
    color: Colors.colorBuy,
    fontWeight: Typography.fontWeights.semibold,
  },
});

export default SignUpScreen;
