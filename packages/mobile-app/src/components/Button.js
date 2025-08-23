import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import Text from './Text';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';
import Spacing from '../constants/Spacing';

const Button = ({ 
  label, 
  onPress, 
  loading = false, 
  style, 
  variant = 'primary', 
  disabled = false,
  size = 'medium',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      default:
        return styles.primary;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'medium':
        return styles.medium;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getTextColor = () => {
    if (variant === 'primary') return Colors.white;
    if (variant === 'outline') return Colors.colorBuy;
    return Colors.textPrimary;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        getVariantStyles(),
        getSizeStyles(),
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: Colors.colorBuy,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.colorBuy,
    backgroundColor: 'transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  small: {
    height: 36,
    paddingHorizontal: Spacing.md,
  },
  medium: {
    height: 48,
    paddingHorizontal: Spacing.lg,
  },
  large: {
    height: 56,
    paddingHorizontal: Spacing.xl,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
  },
});

export default Button;