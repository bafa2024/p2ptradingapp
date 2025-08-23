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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login attempt:', { email, password, rememberMe });
    navigation.replace('OTP');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login attempt');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
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
              <Text style={styles.welcomeText}>Welcome back!</Text>
              <Text style={styles.subtitleText}>Sign in to continue trading</Text>
            </View>
          </View>

          {/* Login Form */}
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

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={Colors.textMuted} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && (
                    <Ionicons name="checkmark" size={16} color={Colors.white} />
                  )}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.loginButtonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Login Button */}
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
              <Ionicons name="logo-google" size={20} color={Colors.textPrimary} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.inputBorder,
    marginRight: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.colorBuy,
    borderColor: Colors.colorBuy,
  },
  rememberMeText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  forgotPasswordText: {
    fontSize: Typography.sm,
    color: Colors.colorInfo,
    fontWeight: Typography.fontWeights.medium,
  },
  loginButton: {
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
  loginButtonText: {
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
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  signUpText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  signUpLink: {
    fontSize: Typography.base,
    color: Colors.colorBuy,
    fontWeight: Typography.fontWeights.semibold,
  },
});

export default LoginScreen;
