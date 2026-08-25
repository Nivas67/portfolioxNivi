import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { darkColors, lightColors } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';

interface ScreenGradientProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  forceLight?: boolean;
}

export const ScreenGradient: React.FC<ScreenGradientProps> = ({ children, style, forceLight }) => {
  const themePref = useAuthStore((s) => s.user?.themePreference);
  const isLight = forceLight || themePref === 'light';

  const gradientColors = isLight
    ? [lightColors.background, lightColors.backgroundMid, lightColors.backgroundEnd]
    : [darkColors.background, darkColors.backgroundMid, darkColors.backgroundEnd];

  return (
    <LinearGradient
      colors={gradientColors as [string, string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
