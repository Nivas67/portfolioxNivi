import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Watch,
  Footprints,
  Flame,
  Heart,
  Moon,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity,
  Check,
  Sliders,
} from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useWearableStore } from '../../store/useWearableStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useDietStore } from '../../store/useDietStore';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import { wearableService } from '../../services/wearableService';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { getTodayDateString } from '../../utils/dateUtils';
import { WearableSource } from '../../types';

export const WearableConnectScreen: React.FC = () => {
  const {
    connectedSources,
    connectSource,
    disconnectSource,
    syncTodayData,
    isSyncing,
    getTodayWearableData,
    liveHeartRate,
    simulateStepsAdd,
    universalCalibrationStatus,
  } = useWearableStore();

  const user = useAuthStore((s) => s.user);
  const { workoutLogs } = useWorkoutStore();
  const { getDailySummary } = useDietStore();
  const todayStr = getTodayDateString();
  const dietSummary = getDailySummary(todayStr);
  const data = getTodayWearableData(workoutLogs);

  const hrZones = wearableService.calculateHeartRateZones(user?.age || 25, 55);
  const netCalories = dietSummary.calories - (data.totalCalories || 2280);

  const devices: { id: WearableSource; name: string; icon: string; brand: string; desc: string }[] = [
    {
      id: 'health_connect',
      name: 'Android Health Connect (Pixel & Galaxy Watch)',
      brand: 'Health Connect API',
      icon: '🤖',
      desc: 'Official Android Health Connect API. Syncs Samsung Galaxy Watch 4/5/6/7 & Pixel Watch with zero double-counting.',
    },
    {
      id: 'healthkit',
      name: 'Apple Watch Series, Ultra & SE',
      brand: 'Apple HealthKit',
      icon: '🍎',
      desc: 'Native Apple HealthKit. Syncs active calorie rings, live workout HR, and sleep stages.',
    },
    {
      id: 'fitbit',
      name: 'Fitbit Sense, Versa & Charge',
      brand: 'Fitbit Web API (OAuth2)',
      icon: '🔋',
      desc: 'Cloud-to-cloud OAuth2 integration with continuous resting HR & readiness telemetry.',
    },
  ];

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Precision Wearable Sync</Text>
            <Text style={styles.subtitle}>Health Connect, HealthKit & Anti-Duplicate Calorie Engine</Text>
          </View>

          <TouchableOpacity
            style={[styles.syncBtn, isSyncing && styles.syncBtnActive]}
            onPress={() => syncTodayData(workoutLogs)}
            disabled={isSyncing}
            activeOpacity={0.7}
          >
            {isSyncing ? (
              <ActivityIndicator size="small" color={colors.textDark} />
            ) : (
              <>
                <RefreshCw size={14} color={colors.textDark} />
                <Text style={styles.syncBtnText}>Sync All</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Universal Accuracy Banner */}
          <GlassCard style={styles.accuracyBanner} glow glowColor={colors.primary}>
            <View style={styles.accuracyHeader}>
              <View style={styles.shieldIconWrap}>
                <ShieldCheck size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.accuracyTitle}>Anti-Duplicate Calorie Priority Engine</Text>
                <Text style={styles.accuracySub}>
                  FitTrack logged workouts take 100% priority over watch active calorie estimates during matching time windows ($\pm 10$ min), eliminating double counting.
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Net Calorie Balance Card (Calories In vs Out) */}
          <GlassCard style={styles.balanceCard} glow>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceTitle}>Daily Energy Balance (In vs Out)</Text>
              <StatBadge label="Sanitized & Unified" color={colors.primary} size="sm" />
            </View>

            <View style={styles.balanceRow}>
              <View style={styles.balanceCol}>
                <Text style={styles.balanceNumberGreen}>+{dietSummary.calories}</Text>
                <Text style={styles.balanceLabel}>Diet In (kcal)</Text>
              </View>

              <Text style={styles.balanceOp}>-</Text>

              <View style={styles.balanceCol}>
                <Text style={styles.balanceNumberOrange}>-{data.totalCalories || 2280}</Text>
                <Text style={styles.balanceLabel}>Total Burn Out</Text>
                <Text style={styles.balanceSub}>({data.activeCalories} active + 1720 BMR)</Text>
              </View>

              <Text style={styles.balanceOp}>=</Text>

              <View style={styles.balanceCol}>
                <Text
                  style={[
                    styles.balanceNumberNet,
                    netCalories <= 0 ? styles.textGreen : styles.textOrange,
                  ]}
                >
                  {netCalories > 0 ? `+${netCalories}` : `${netCalories}`}
                </Text>
                <Text style={styles.balanceLabel}>Net Deficit/Surplus</Text>
              </View>
            </View>
          </GlassCard>

          {/* Live Watch Telemetry Card */}
          <GlassCard style={styles.telemetryCard}>
            <View style={styles.telemetryHeader}>
              <View style={styles.liveIndicator}>
                <View style={styles.pulseDot} />
                <Text style={styles.liveText}>Normalized Sensor Telemetry</Text>
              </View>
              <TouchableOpacity
                style={styles.simStepBtn}
                onPress={() => simulateStepsAdd(500)}
              >
                <Zap size={12} color={colors.primary} />
                <Text style={styles.simStepText}>+500 Steps (Test)</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.telemetryGrid}>
              <View style={styles.telemetryBox}>
                <Footprints size={18} color={colors.primary} />
                <Text style={styles.telemetryVal}>{data.steps.toLocaleString()}</Text>
                <Text style={styles.telemetryLbl}>Steps Today</Text>
              </View>
              <View style={styles.telemetryBox}>
                <Flame size={18} color={colors.accentOrange} />
                <Text style={styles.telemetryVal}>{data.activeCalories} kcal</Text>
                <Text style={styles.telemetryLbl}>Active Energy</Text>
              </View>
              <View style={styles.telemetryBox}>
                <Heart size={18} color={colors.accentRed} />
                <Text style={styles.telemetryVal}>{liveHeartRate} bpm</Text>
                <Text style={styles.telemetryLbl}>Current Heart Rate</Text>
              </View>
              <View style={styles.telemetryBox}>
                <Moon size={18} color={colors.accentPurple} />
                <Text style={styles.telemetryVal}>
                  {Math.floor(data.sleepMinutes / 60)}h {data.sleepMinutes % 60}m
                </Text>
                <Text style={styles.telemetryLbl}>Sleep Logged</Text>
              </View>
            </View>
          </GlassCard>

          {/* Heart Rate Training Zones breakdown */}
          <GlassCard style={styles.zonesCard}>
            <Text style={styles.sectionTitle}>Heart Rate Training Zones</Text>
            <Text style={styles.zonesSubtitle}>
              Based on maximum HR (est. {220 - (user?.age || 25)} bpm)
            </Text>

            <View style={styles.zonesList}>
              {hrZones.map((z) => (
                <View key={z.zone} style={styles.zoneRow}>
                  <View style={styles.zoneLeft}>
                    <View style={[styles.zoneColorBar, { backgroundColor: z.color }]} />
                    <View>
                      <Text style={styles.zoneName}>Zone {z.zone}: {z.name}</Text>
                      <Text style={styles.zoneBpmRange}>{z.minBpm} - {z.maxBpm} bpm</Text>
                    </View>
                  </View>
                  <Text style={[styles.zoneMinutes, { color: z.color }]}>
                    {z.minutesInZone} mins
                  </Text>
                </View>
              ))}
            </View>
          </GlassCard>

          {/* Wearable Account Connections */}
          <Text style={styles.sectionHeaderTitle}>Supported Sensor Frameworks</Text>
          <View style={styles.devicesList}>
            {devices.map((device) => {
              const isConnected = connectedSources[device.id] ?? false;
              return (
                <GlassCard key={device.id} style={styles.deviceCard}>
                  <View style={styles.deviceTop}>
                    <View style={styles.deviceLeft}>
                      <Text style={styles.deviceEmoji}>{device.icon}</Text>
                      <View style={styles.deviceInfo}>
                        <Text style={styles.deviceName}>{device.name}</Text>
                        <Text style={styles.deviceBrand}>{device.brand}</Text>
                        <Text style={styles.deviceDesc}>{device.desc}</Text>
                      </View>
                    </View>
                    <Switch
                      value={isConnected}
                      onValueChange={(val) => {
                        if (val) {
                          connectSource(device.id);
                        } else {
                          disconnectSource(device.id);
                        }
                      }}
                      trackColor={{ false: colors.cardBorder, true: colors.primary }}
                      thumbColor={colors.textPrimary}
                    />
                  </View>
                  {isConnected && (
                    <View style={styles.connectedStatusRow}>
                      <CheckCircle2 size={12} color={colors.primary} />
                      <Text style={styles.connectedStatusText}>
                        Connected & Calibrated (Sanity Filter: 30–220 bpm, &lt; 50k steps)
                      </Text>
                    </View>
                  )}
                </GlassCard>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.md,
    gap: 6,
    ...theme.shadows.glowMint,
  },
  syncBtnActive: {
    opacity: 0.8,
  },
  syncBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textDark,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  accuracyBanner: {
    padding: theme.spacing.md,
  },
  accuracyHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  shieldIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accuracyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  accuracySub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  balanceCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBg,
    padding: 12,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  balanceCol: {
    alignItems: 'center',
    flex: 1,
  },
  balanceNumberGreen: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.protein,
  },
  balanceNumberOrange: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.accentOrange,
  },
  balanceNumberNet: {
    fontSize: 17,
    fontWeight: '900',
  },
  textGreen: {
    color: colors.success,
  },
  textOrange: {
    color: colors.warning,
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 2,
  },
  balanceSub: {
    fontSize: 8,
    color: colors.textMuted,
    marginTop: 1,
  },
  balanceOp: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textMuted,
    paddingHorizontal: 4,
  },
  telemetryCard: {
    padding: theme.spacing.md,
    gap: 12,
  },
  telemetryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  liveText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  simStepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    gap: 4,
  },
  simStepText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  telemetryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  telemetryBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    gap: 4,
  },
  telemetryVal: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  telemetryLbl: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  zonesCard: {
    padding: theme.spacing.md,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  zonesSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  zonesList: {
    gap: 8,
    marginTop: 4,
  },
  zoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    padding: 10,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  zoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  zoneColorBar: {
    width: 4,
    height: 28,
    borderRadius: 2,
  },
  zoneName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  zoneBpmRange: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  zoneMinutes: {
    fontSize: 13,
    fontWeight: '800',
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  devicesList: {
    gap: 10,
  },
  deviceCard: {
    padding: 12,
    gap: 8,
  },
  deviceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  deviceEmoji: {
    fontSize: 24,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  deviceBrand: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 1,
  },
  deviceDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  connectedStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderColor: colors.cardBorder,
    paddingTop: 8,
  },
  connectedStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
});
