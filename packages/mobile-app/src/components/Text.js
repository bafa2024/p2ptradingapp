import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Typography from '../constants/Typography';

const Text = ({ children, style, variant = 'body', ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'body':
        return styles.body;
      case 'caption':
        return styles.caption;
      case 'button':
        return styles.button;
      default:
        return styles.body;
    }
  };

  return (
    <RNText style={[styles.base, getVariantStyles(), style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    color: Colors.textPrimary,
    fontFamily: Typography.fontFamily.regular,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold,
    lineHeight: Typography.fontSizes.xxl * 1.2,
  },
  subtitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    lineHeight: Typography.fontSizes.lg * 1.3,
  },
  body: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.regular,
    lineHeight: Typography.fontSizes.md * 1.5,
  },
  caption: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.regular,
    color: Colors.textSecondary,
    lineHeight: Typography.fontSizes.sm * 1.4,
  },
  button: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
  },
});

export default Text;