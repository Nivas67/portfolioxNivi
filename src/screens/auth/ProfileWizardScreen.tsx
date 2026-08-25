import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, Flame, Award, Target, Activity, Dumbbell, ShieldCheck } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';
import { ActivityLevel, EquipmentAccess, ExperienceLevel, Gender, UserGoal } from '../../types';
import { calculateNutritionTargets } from '../../utils/bmrCalculator';
import { GlassCard } from '../../components/common/GlassCard';

interface ProfileWizardScreenProps {
  onFinish: () => void;
}

export const ProfileWizardScreen: React.FC<ProfileWizardScreenProps> = ({ onFinish }) => {
  const { user, completeOnboarding } = useAuthStore();

  const [name, setName] = useState(user?.name || 'Alex Hunter');
  const [age, setAge] = useState(user?.age || 26);
  const [gender, setGender] = useState<Gender>(user?.gender || 'male');
  const [heightCm, setHeightCm] = useState(user?.heightCm || 180);
  const [weightKg, setWeightKg] = useState(user?.weightKg || 82.5);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(user?.activityLevel || 'very_active');
  const [goal, setGoal] = useState<UserGoal>(user?.goal || 'cut');
  const [experience, setExperience] = useState<ExperienceLevel>(user?.experience || 'intermediate');
  const [equipment, setEquipment] = useState<EquipmentAccess>(user?.equipmentAccess || 'full_gym');
  const [daysAvailable, setDaysAvailable] = useState(user?.daysAvailable || 5);

  // Live calculated targets preview
  const liveTargets = calculateNutritionTargets(
    weightKg,
    heightCm,
    age,
    gender,
    activityLevel,
    goal
  );

  const handleComplete = () => {
    completeOnboarding({
      name,
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel,
      goal,
      experience,
      equipmentAccess: equipment,
      daysAvailable,
    });
    onFinish();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Custom Nutrition & Split Engine</Text>
          <Text style={styles.subtitle}>
            We calculate your exact BMR and TDEE using the Mifflin-St Jeor formula to build your daily macro plan.
          </Text>
        </View>

        {/* Live Target Calculation Preview Banner */}
        <GlassCard style={styles.targetPreviewCard} glow>
          <View style={styles.targetPreviewTop}>
            <View>
              <Text style={styles.targetCardTitle}>Calculated Daily Target</Text>
              <Text style={styles.targetTdeeText}>BMR: {liveTargets.bmr} kcal · TDEE: {liveTargets.tdee} kcal</Text>
            </View>
            <Text style={styles.targetCalorieBig}>{liveTargets.targetCalories} kcal</Text>
          </View>

          <View style={styles.macroPillRow}>
            <View style={[styles.macroPill, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
              <Text style={[styles.macroPillLabel, { color: colors.protein }]}>Protein</Text>
              <Text style={styles.macroPillValue}>{liveTargets.proteinGrams}g</Text>
            </View>
            <View style={[styles.macroPill, { backgroundColor: 'rgba(251, 191, 36, 0.15)' }]}>
              <Text style={[styles.macroPillLabel, { color: colors.carbs }]}>Carbs</Text>
              <Text style={styles.macroPillValue}>{liveTargets.carbsGrams}g</Text>
            </View>
            <View style={[styles.macroPill, { backgroundColor: 'rgba(244, 63, 94, 0.15)' }]}>
              <Text style={[styles.macroPillLabel, { color: colors.fat }]}>Fat</Text>
              <Text style={styles.macroPillValue}>{liveTargets.fatGrams}g</Text>
            </View>
            <View style={[styles.macroPill, { backgroundColor: 'rgba(6, 182, 212, 0.15)' }]}>
              <Text style={[styles.macroPillLabel, { color: colors.water }]}>Water</Text>
              <Text style={styles.macroPillValue}>{liveTargets.waterMl}ml</Text>
            </View>
          </View>
        </GlassCard>

        {/* 1. Body Stats */}
        <Text style={styles.sectionTitle}>1. Body Measurements</Text>
        <GlassCard style={styles.card}>
          <View style={styles.genderRow}>
            {(['male', 'female', 'other'] as Gender[]).map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                onPress={() => setGender(g)}
              >
                <Text style={[styles.genderBtnText, gender === g && styles.genderBtnTextActive]}>
                  {g.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.rowInputs}>
            <View style={styles.inputItem}>
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={String(age)}
                onChangeText={(val) => setAge(parseInt(val, 10) || 25)}
              />
            </View>
            <View style={styles.inputItem}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={String(heightCm)}
                onChangeText={(val) => setHeightCm(parseInt(val, 10) || 175)}
              />
            </View>
            <View style={styles.inputItem}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                value={String(weightKg)}
                onChangeText={(val) => setWeightKg(parseFloat(val) || 75)}
              />
            </View>
          </View>
        </GlassCard>

        {/* 2. Fitness Goal */}
        <Text style={styles.sectionTitle}>2. Primary Fitness Goal</Text>
        <View style={styles.optionsList}>
          {[
            { id: 'cut', title: 'Cut & Shred (Fat Loss)', desc: '20% calorie deficit, high protein to preserve muscle' },
            { id: 'bulk', title: 'Clean Hypertrophy (Lean Bulk)', desc: '12% calorie surplus for optimal muscle mass building' },
            { id: 'maintain', title: 'Maintain & Recomp', desc: 'Sustain current weight while improving body composition' },
            { id: 'endurance', title: 'Endurance & Stamina', desc: 'Higher carbohydrate distribution for sustained output' },
          ].map((g) => (
            <TouchableOpacity
              key={g.id}
              style={[styles.optionCard, goal === g.id && styles.optionCardActive]}
              onPress={() => setGoal(g.id as UserGoal)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <Text style={[styles.optionTitle, goal === g.id && styles.optionTitleActive]}>
                  {g.title}
                </Text>
                <Text style={styles.optionDesc}>{g.desc}</Text>
              </View>
              {goal === g.id && <Check size={20} color={colors.primary} strokeWidth={3} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* 3. Activity Level */}
        <Text style={styles.sectionTitle}>3. Daily Activity Level</Text>
        <View style={styles.optionsList}>
          {[
            { id: 'sedentary', title: 'Sedentary', desc: 'Desk job, little intentional movement' },
            { id: 'light', title: 'Light Activity', desc: '1-3 workout days per week or 6,000 steps' },
            { id: 'moderate', title: 'Moderate Activity', desc: '3-5 training sessions per week' },
            { id: 'very_active', title: 'Very Active (Gym Lifestyle)', desc: '6-7 heavy gym sessions weekly' },
          ].map((act) => (
            <TouchableOpacity
              key={act.id}
              style={[styles.optionCard, activityLevel === act.id && styles.optionCardActive]}
              onPress={() => setActivityLevel(act.id as ActivityLevel)}
              activeOpacity={0.7}
            >
              <View style={styles.optionLeft}>
                <Text style={[styles.optionTitle, activityLevel === act.id && styles.optionTitleActive]}>
                  {act.title}
                </Text>
                <Text style={styles.optionDesc}>{act.desc}</Text>
              </View>
              {activityLevel === act.id && <Check size={20} color={colors.primary} strokeWidth={3} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Finish CTA */}
        <TouchableOpacity
          style={styles.finishBtn}
          onPress={handleComplete}
          activeOpacity={0.85}
        >
          <Text style={styles.finishBtnText}>Lock In Targets & Enter App</Text>
          <Check size={20} color={colors.textDark} strokeWidth={3} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  targetPreviewCard: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    backgroundColor: '#121926',
  },
  targetPreviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  targetCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  targetTdeeText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  targetCalorieBig: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  macroPillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  macroPill: {
    flex: 1,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 6,
    alignItems: 'center',
  },
  macroPillLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  macroPillValue: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  card: {
    padding: theme.spacing.md,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: theme.spacing.md,
  },
  genderBtn: {
    flex: 1,
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  genderBtnActive: {
    backgroundColor: 'rgba(0, 245, 155, 0.15)',
    borderColor: colors.primary,
  },
  genderBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  genderBtnTextActive: {
    color: colors.primary,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 10,
  },
  inputItem: {
    flex: 1,
    gap: 4,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  numberInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    paddingVertical: 8,
  },
  optionsList: {
    gap: 8,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: theme.borderRadius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  optionCardActive: {
    backgroundColor: 'rgba(0, 245, 155, 0.08)',
    borderColor: colors.primary,
  },
  optionLeft: {
    flex: 1,
    paddingRight: 8,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  optionTitleActive: {
    color: colors.primary,
  },
  optionDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  finishBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xl,
    gap: 8,
  },
  finishBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
  },
});
