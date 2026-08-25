import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, Utensils, Watch, Flame, ChevronRight, Check } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Precision Workout Splits & Overload',
    subtitle: 'Follow proven PPL, Upper/Lower, or custom splits with 100+ exercises, live set tracking, rest timers, and auto-progression.',
    icon: Dumbbell,
    accent: colors.primary,
  },
  {
    id: 2,
    title: 'Smart Diet & Barcode Food Logging',
    subtitle: 'Hit exact daily calories & macros calculated from your BMR/TDEE. Search millions of foods via Open Food Facts or scan barcodes.',
    icon: Utensils,
    accent: colors.protein,
  },
  {
    id: 3,
    title: 'Unified Smartwatch Sync',
    subtitle: 'Connect Apple Health, Google Fit, or Fitbit. Merge your real-time steps, active burn, heart rate, and sleep into your daily balance.',
    icon: Watch,
    accent: colors.accentPurple,
  },
  {
    id: 4,
    title: 'Unbreakable Daily Discipline',
    subtitle: 'Track your daily discipline checklist, build streaks, earn achievement badges, and watch your 1RM strength skyrocket.',
    icon: Flame,
    accent: colors.accentOrange,
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = SLIDES[currentSlide];
  const IconComponent = slide.icon;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>FIT<Text style={styles.logoAccent}>TRACK</Text></Text>
        <TouchableOpacity onPress={onComplete}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: `${slide.accent}15`, borderColor: `${slide.accent}40` }]}>
          <IconComponent size={64} color={slide.accent} />
        </View>

        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === currentSlide ? [styles.dotActive, { backgroundColor: slide.accent }] : null,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: slide.accent }]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextButtonText}>
            {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          {currentSlide === SLIDES.length - 1 ? (
            <Check size={18} color={colors.textDark} strokeWidth={3} />
          ) : (
            <ChevronRight size={18} color={colors.textDark} strokeWidth={3} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  logo: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  logoAccent: {
    color: colors.primary,
  },
  skipText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.glowMint,
  },
  slideTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  slideSubtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    gap: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  dotActive: {
    width: 24,
    borderRadius: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: theme.borderRadius.lg,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
  },
});
