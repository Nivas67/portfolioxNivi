import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Platform,
  AccessibilityInfo,
  Pressable,
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '../../theme/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  glow?: boolean;
  glowColor?: string;
  intensity?: number;
  tint?: 'dark' | 'light' | 'default';
  isLightMode?: boolean;
  onPress?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  glow = false,
  glowColor = colors.primary,
  intensity = 45,
  tint = 'dark',
  isLightMode = false,
  onPress,
}) => {
  const [reduceTransparency, setReduceTransparency] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (Platform.OS !== 'web' && typeof AccessibilityInfo?.isReduceTransparencyEnabled === 'function') {
      try {
        AccessibilityInfo.isReduceTransparencyEnabled()
          .then((enabled) => setReduceTransparency(!!enabled))
          .catch(() => setReduceTransparency(false));

        const subscription = AccessibilityInfo.addEventListener?.(
          'reduceTransparencyChanged',
          (enabled: boolean) => setReduceTransparency(!!enabled)
        );

        return () => {
          subscription?.remove?.();
        };
      } catch {
        setReduceTransparency(false);
      }
    }
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.985,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const glowStyle = glow
    ? {
        shadowColor: glowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        borderColor: glowColor,
      }
    : undefined;

  if (reduceTransparency) {
    return (
      <View
        style={[
          styles.solidCard,
          isLightMode ? styles.solidCardLight : styles.solidCardDark,
          glowStyle,
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  const content = (
    <View
      style={[
        styles.outerContainer,
        glowStyle,
        isLightMode ? styles.outerLight : styles.outerDark,
        style,
      ]}
    >
      <BlurView
        intensity={intensity}
        tint={isLightMode ? 'light' : tint}
        style={styles.blurView}
      >
        <LinearGradient
          colors={
            isLightMode
              ? ['rgba(255, 255, 255, 0.75)', 'rgba(255, 255, 255, 0.55)']
              : ['rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.gradientFill}
        >
          {/* Watery Refraction Top Highlight Sheen */}
          <LinearGradient
            colors={[
              'rgba(120, 200, 255, 0.35)',
              'rgba(255, 255, 255, 0.10)',
              'transparent',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.waterySheen}
          />
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
        >
          {content}
        </Animated.View>
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      } as any,
      default: {},
    }),
  },
  outerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.16)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },
  outerLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.85)',
    shadowColor: '#302B63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  blurView: {
    width: '100%',
  },
  gradientFill: {
    width: '100%',
    position: 'relative',
  },
  waterySheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  solidCard: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
  },
  solidCardDark: {
    backgroundColor: '#181636',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  solidCardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(26, 26, 46, 0.12)',
  },
});
