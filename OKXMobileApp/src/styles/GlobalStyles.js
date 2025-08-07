import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Typography from '../constants/Typography';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Layout.borderRadius.xl,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Text Styles
  h1: {
    fontSize: Typography.fontSizes.xxxl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.tight * Typography.fontSizes.xxxl,
  },
  
  h2: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.tight * Typography.fontSizes.xxl,
  },
  
  h3: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.xl,
  },
  
  bodyText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.normal,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.md,
  },
  
  bodyTextSecondary: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.normal,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.md,
  },
  
  smallText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.normal,
    color: Colors.textMuted,
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.sm,
  },
  
  // Button Styles
  button: {
    borderRadius: Layout.borderRadius.md,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: Colors.colorBuy,
  },
  
  buttonSecondary: {
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  
  buttonSell: {
    backgroundColor: Colors.colorSell,
  },
  
  buttonText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.white,
  },
  
  buttonTextSecondary: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
});

export default GlobalStyles;
