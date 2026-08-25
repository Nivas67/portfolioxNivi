import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Bell,
  Watch,
  Shield,
  Scale,
  LogOut,
  RefreshCw,
  ChevronRight,
  Moon,
  Sun,
  Sparkles,
  Mail,
  Edit3,
  Check,
  X,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Music,
  Crown,
  Layers,
} from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';
import { useWearableStore } from '../../store/useWearableStore';
import { useMusicStore } from '../../store/useMusicStore';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { MusicService, TrainingTier } from '../../types';

interface SettingsScreenProps {
  onOpenWizard: () => void;
  onNavigateTab: (tabName: string) => void;
  onLogout: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onOpenWizard,
  onNavigateTab,
  onLogout,
}) => {
  const { user, nutritionTargets, toggleUnitSystem, loginDemoUser, updateProfile } = useAuthStore();
  const { activePrimarySource, universalCalibrationStatus } = useWearableStore();
  const { defaultService, setDefaultService } = useMusicStore();
  const { activePlanId, plans, setActivePlan } = useWorkoutStore();

  const [workoutReminder, setWorkoutReminder] = useState(true);
  const [hydrationReminder, setHydrationReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);

  // Edit Profile Modal
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || 'Alex Hunter');
  const [editEmail, setEditEmail] = useState(user?.email || 'alex.hunter@pro-athlete.com');
  const [editPhone, setEditPhone] = useState(user?.phone || '+91 98765 43210');

  const currentTheme = user?.themePreference || 'dark';

  const handleSaveProfile = () => {
    if (!editEmail.trim()) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    updateProfile({
      name: editName.trim() || 'Athlete',
      email: editEmail.trim(),
      phone: editPhone.trim() || '+91 98765 43210',
      isPhoneVerified: true,
    });
    setShowEditProfileModal(false);
    Alert.alert('Profile Updated', 'Connected Email & Phone successfully saved.');
  };

  const handleToggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateProfile({ themePreference: nextTheme });
  };

  const handleSelectTier = (tier: TrainingTier) => {
    const matchingPlan = plans.find((p) => p.tier === tier);
    if (matchingPlan) {
      setActivePlan(matchingPlan.id);
      updateProfile({ trainingTier: tier });
      Alert.alert('Training Tier Updated', `Active routine changed to ${matchingPlan.name}`);
    }
  };

  const handleResetDemo = () => {
    loginDemoUser();
    Alert.alert('Demo Data Reset', 'Pre-seeded workout splits, diet logs, and progress charts have been reloaded.');
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Account & Preferences</Text>
          <Text style={styles.subtitle}>Connected email, mobile, liquid-glass theme & precision sync</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <GlassCard style={styles.profileCard} glow glowColor={colors.primary}>
            <View style={styles.profileTop}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <View style={styles.nameRow}>
                  <Text style={styles.profileName}>{user?.name || 'Alex Hunter'}</Text>
                  <TouchableOpacity
                    style={styles.editPencilBtn}
                    onPress={() => {
                      setEditName(user?.name || '');
                      setEditEmail(user?.email || '');
                      setEditPhone(user?.phone || '+91 98765 43210');
                      setShowEditProfileModal(true);
                    }}
                    activeOpacity={0.7}
                  >
                    <Edit3 size={14} color={colors.primary} />
                  </TouchableOpacity>
                </View>

                {/* Connected Email & Phone */}
                <View style={styles.contactRow}>
                  <Mail size={12} color={colors.textSecondary} />
                  <Text style={styles.profileEmail}>{user?.email || 'alex.hunter@pro-athlete.com'}</Text>
                </View>

                <View style={styles.contactRow}>
                  <Phone size={12} color={colors.primary} />
                  <Text style={styles.profilePhone}>{user?.phone || '+91 98765 43210'}</Text>
                  <View style={styles.verifiedBadge}>
                    <Check size={10} color={colors.primary} strokeWidth={3} />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>

                <View style={styles.tagsRow}>
                  <StatBadge label={`Tier: ${(user?.trainingTier || 'intermediate').toUpperCase()}`} color={colors.primary} size="sm" />
                  <StatBadge label={`Goal: ${user?.goal || 'cut'}`} color={colors.secondary} size="sm" />
                  <StatBadge label="PRO ATHLETE" color={colors.accentOrange} size="sm" />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.recalculateBtn}
              onPress={onOpenWizard}
              activeOpacity={0.8}
            >
              <Sparkles size={16} color={colors.textDark} />
              <Text style={styles.recalculateBtnText}>Recalculate BMR / TDEE & Goals</Text>
            </TouchableOpacity>
          </GlassCard>

          {/* Liquid Glass Theme Appearance */}
          <GlassCard style={styles.settingGroupCard}>
            <Text style={styles.sectionTitle}>Liquid-Glass Material Theme</Text>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                {currentTheme === 'dark' ? (
                  <Moon size={18} color={colors.primary} />
                ) : (
                  <Sun size={18} color={colors.accentOrange} />
                )}
                <View>
                  <Text style={styles.settingLabel}>Appearance Mode</Text>
                  <Text style={styles.settingSub}>
                    {currentTheme === 'dark' ? 'Dark Mode (Deep Space Gradient)' : 'Light Mode (Soft Sky & Lavender)'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.themeToggleBtn} onPress={handleToggleTheme}>
                <Text style={styles.themeToggleText}>
                  Switch to {currentTheme === 'dark' ? 'Light' : 'Dark'}
                </Text>
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* Training Tier Selector */}
          <GlassCard style={styles.settingGroupCard} glow glowColor={colors.accentYellow}>
            <View style={styles.sectionHeaderRow}>
              <Crown size={16} color={colors.accentYellow} />
              <Text style={styles.sectionTitle}>Progression Tier</Text>
            </View>

            <View style={styles.tierSelectorGrid}>
              {(['beginner', 'intermediate', 'advanced', 'master'] as TrainingTier[]).map((t) => {
                const isSelected = user?.trainingTier === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[styles.tierOptionPill, isSelected && styles.tierOptionPillActive]}
                    onPress={() => handleSelectTier(t)}
                  >
                    <Text style={[styles.tierOptionText, isSelected && styles.tierOptionTextActive]}>
                      {t.toUpperCase()}
                    </Text>
                    {isSelected && <Check size={12} color={colors.textDark} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </GlassCard>

          {/* Music Streaming Integration */}
          <GlassCard style={styles.settingGroupCard}>
            <View style={styles.sectionHeaderRow}>
              <Music size={16} color={colors.primary} />
              <Text style={styles.sectionTitle}>Workout Music Service</Text>
            </View>
            <View style={styles.musicServicesRow}>
              {[
                { id: 'spotify' as MusicService, label: 'Spotify', icon: '🟢' },
                { id: 'apple_music' as MusicService, label: 'Apple Music', icon: '🍎' },
                { id: 'amazon_music' as MusicService, label: 'Amazon', icon: '📦' },
              ].map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.musicServiceBtn, defaultService === s.id && styles.musicServiceBtnActive]}
                  onPress={() => setDefaultService(s.id)}
                >
                  <Text style={{ fontSize: 13 }}>{s.icon}</Text>
                  <Text style={[styles.musicServiceLabel, defaultService === s.id && styles.musicServiceLabelActive]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </GlassCard>

          {/* Precision Wearables Sync (Health Connect & HealthKit) */}
          <GlassCard style={styles.settingGroupCard} glow glowColor={colors.secondary}>
            <TouchableOpacity
              style={styles.wearableLinkRow}
              onPress={() => onNavigateTab('Wearables')}
              activeOpacity={0.7}
            >
              <View style={styles.settingLeft}>
                <Watch size={20} color={colors.secondary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>Health Connect & HealthKit Sync</Text>
                  <Text style={styles.settingSub}>
                    Source: {activePrimarySource.replace('_', ' ').toUpperCase()}
                  </Text>
                  <View style={styles.accuracyTag}>
                    <CheckCircle2 size={11} color={colors.primary} />
                    <Text style={styles.accuracyText}>Anti-Duplicate Calorie Priority & Sanity Filter Active</Text>
                  </View>
                </View>
              </View>
              <ChevronRight size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </GlassCard>

          {/* Units & Measurement Toggle */}
          <GlassCard style={styles.settingGroupCard}>
            <Text style={styles.sectionTitle}>Units & Display</Text>
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Scale size={18} color={colors.primary} />
                <View>
                  <Text style={styles.settingLabel}>Unit System</Text>
                  <Text style={styles.settingSub}>
                    {user?.unitSystem === 'imperial' ? 'Imperial (lbs, in)' : 'Metric (kg, cm)'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.unitToggleBtn} onPress={toggleUnitSystem}>
                <Text style={styles.unitToggleText}>
                  Switch to {user?.unitSystem === 'imperial' ? 'Metric' : 'Imperial'}
                </Text>
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* Notifications */}
          <GlassCard style={styles.settingGroupCard}>
            <Text style={styles.sectionTitle}>Discipline Notifications</Text>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Bell size={18} color={colors.primary} />
                <View>
                  <Text style={styles.settingLabel}>Workout Reminders</Text>
                  <Text style={styles.settingSub}>Daily scheduled alert before training</Text>
                </View>
              </View>
              <Switch
                value={workoutReminder}
                onValueChange={setWorkoutReminder}
                trackColor={{ false: colors.cardBorder, true: colors.primary }}
                thumbColor={colors.textPrimary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Bell size={18} color={colors.protein} />
                <View>
                  <Text style={styles.settingLabel}>Meal Logging Nudges</Text>
                  <Text style={styles.settingSub}>Reminders for breakfast, lunch & dinner</Text>
                </View>
              </View>
              <Switch
                value={mealReminder}
                onValueChange={setMealReminder}
                trackColor={{ false: colors.cardBorder, true: colors.primary }}
                thumbColor={colors.textPrimary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Bell size={18} color={colors.water} />
                <View>
                  <Text style={styles.settingLabel}>Hydration Reminders</Text>
                  <Text style={styles.settingSub}>Periodic 250ml water check-ins</Text>
                </View>
              </View>
              <Switch
                value={hydrationReminder}
                onValueChange={setHydrationReminder}
                trackColor={{ false: colors.cardBorder, true: colors.primary }}
                thumbColor={colors.textPrimary}
              />
            </View>
          </GlassCard>

          {/* Developer & Demo Reset */}
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={handleResetDemo}
            activeOpacity={0.7}
          >
            <RefreshCw size={16} color={colors.accentOrange} />
            <Text style={styles.resetBtnText}>Reload Demo Workouts & Diet Seed Data</Text>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={onLogout}
            activeOpacity={0.7}
          >
            <LogOut size={16} color={colors.accentRed} />
            <Text style={styles.logoutBtnText}>Sign Out of FitTrack</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Edit Pro Profile Modal */}
        <Modal visible={showEditProfileModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard} glow glowColor={colors.primary}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderLeft}>
                  <User size={20} color={colors.primary} />
                  <Text style={styles.modalTitle}>Update Connected Profile</Text>
                </View>
                <TouchableOpacity onPress={() => setShowEditProfileModal(false)}>
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Athlete Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Your full name"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Pro Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="your.name@pro-domain.com"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Connected Mobile Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={editPhone}
                  onChangeText={setEditPhone}
                  keyboardType="phone-pad"
                  placeholder="+91 98765 43210"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              <TouchableOpacity style={styles.saveProfileBtn} onPress={handleSaveProfile} activeOpacity={0.85}>
                <Check size={18} color={colors.textDark} strokeWidth={3} />
                <Text style={styles.saveProfileBtnText}>Save Connected Profile</Text>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </Modal>
      </SafeAreaView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  profileCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  editPencilBtn: {
    padding: 6,
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderRadius: theme.borderRadius.full,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  profileEmail: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  profilePhone: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 2,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  recalculateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    gap: 6,
    ...theme.shadows.glowMint,
  },
  recalculateBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: colors.textDark,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  tierSelectorGrid: {
    flexDirection: 'row',
    gap: 6,
  },
  tierOptionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 4,
  },
  tierOptionPillActive: {
    backgroundColor: colors.accentYellow,
    borderColor: colors.accentYellow,
  },
  tierOptionText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  tierOptionTextActive: {
    color: colors.textDark,
    fontWeight: '900',
  },
  musicServicesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  musicServiceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  musicServiceBtnActive: {
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderColor: colors.primary,
  },
  musicServiceLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  musicServiceLabelActive: {
    color: colors.primary,
    fontWeight: '900',
  },
  settingGroupCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  wearableLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settingSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  accuracyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  accuracyText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  themeToggleBtn: {
    backgroundColor: colors.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  themeToggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  unitToggleBtn: {
    backgroundColor: colors.inputBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  unitToggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
    gap: 8,
  },
  resetBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.accentOrange,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 12,
    gap: 8,
    marginBottom: theme.spacing.lg,
  },
  logoutBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.accentRed,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  modalCard: {
    padding: theme.spacing.lg,
    gap: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  textInput: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
  },
  saveProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: theme.borderRadius.md,
    gap: 6,
    marginTop: 6,
    ...theme.shadows.glowMint,
  },
  saveProfileBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textDark,
  },
});
