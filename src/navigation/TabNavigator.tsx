import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  Sparkles,
  TrendingUp,
  Watch,
  Trophy,
  Layers,
  Settings,
  Music,
  Camera,
} from 'lucide-react-native';
import { colors, theme } from '../theme/colors';
import { HomeScreen } from '../screens/dashboard/HomeScreen';
import { WorkoutsScreen } from '../screens/workouts/WorkoutsScreen';
import { DietScreen } from '../screens/diet/DietScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';
import { PhotoCheckInScreen } from '../screens/progress/PhotoCheckInScreen';
import { MusicScreen } from '../screens/music/MusicScreen';
import { WearableConnectScreen } from '../screens/wearables/WearableConnectScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { AICoachScreen } from '../screens/ai/AICoachScreen';
import { PlateCalculatorScreen } from '../screens/tools/PlateCalculatorScreen';
import { ArenaScreen } from '../screens/arena/ArenaScreen';
import { MealType } from '../types';
import { useWorkoutStore } from '../store/useWorkoutStore';

interface TabNavigatorProps {
  onStartLiveWorkout: () => void;
  onOpenBuilder: () => void;
  onOpenLibrary: () => void;
  onOpenWizard: () => void;
  onOpenFoodSearch?: (mealType: MealType) => void;
  onLogout: () => void;
}

export type TabName = 'Home' | 'Workouts' | 'Diet' | 'AICoach' | 'Music' | 'Studio' | 'PlateMath' | 'Arena' | 'Progress' | 'Wearables' | 'Settings';

export const TabNavigator: React.FC<TabNavigatorProps> = ({
  onStartLiveWorkout,
  onOpenBuilder,
  onOpenLibrary,
  onOpenWizard,
  onOpenFoodSearch = () => {},
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const { activeSession } = useWorkoutStore();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onStartWorkout={onStartLiveWorkout} onNavigateTab={(t) => setActiveTab(t as TabName)} />;
      case 'Workouts':
        return (
          <WorkoutsScreen
            onStartSession={onStartLiveWorkout}
            onOpenBuilder={onOpenBuilder}
            onOpenLibrary={onOpenLibrary}
          />
        );
      case 'Diet':
        return <DietScreen onOpenFoodSearch={onOpenFoodSearch} />;
      case 'AICoach':
        return <AICoachScreen />;
      case 'Music':
        return <MusicScreen />;
      case 'Studio':
        return <PhotoCheckInScreen onBack={() => setActiveTab('Progress')} />;
      case 'PlateMath':
        return <PlateCalculatorScreen />;
      case 'Arena':
        return <ArenaScreen />;
      case 'Progress':
        return <ProgressScreen />;
      case 'Wearables':
        return <WearableConnectScreen />;
      case 'Settings':
        return (
          <SettingsScreen
            onOpenWizard={onOpenWizard}
            onNavigateTab={(t) => setActiveTab(t as TabName)}
            onLogout={onLogout}
          />
        );
      default:
        return <HomeScreen onStartWorkout={onStartLiveWorkout} onNavigateTab={(t) => setActiveTab(t as TabName)} />;
    }
  };

  const tabs = [
    { name: 'Home' as TabName, label: 'Home', icon: LayoutDashboard },
    { name: 'Workouts' as TabName, label: 'Workouts', icon: Dumbbell },
    { name: 'Diet' as TabName, label: 'Diet', icon: Utensils },
    { name: 'AICoach' as TabName, label: 'Coach Nivi', icon: Sparkles },
    { name: 'Music' as TabName, label: 'Music', icon: Music },
    { name: 'Studio' as TabName, label: 'Studio', icon: Camera },
    { name: 'Progress' as TabName, label: 'Progress', icon: TrendingUp },
  ];

  return (
    <View style={styles.container}>
      {/* Active Screen Body */}
      <View style={styles.screenContent}>{renderActiveScreen()}</View>

      {/* Floating Liquid-Glass Dock Navigation Bar */}
      <View style={styles.dockWrapper}>
        <BlurView intensity={55} tint="dark" style={styles.dockBlur}>
          <View style={styles.dockBar}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                  onPress={() => setActiveTab(tab.name)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
                    <Icon
                      size={19}
                      color={isActive ? colors.primary : colors.textMuted}
                      strokeWidth={isActive ? 2.5 : 1.8}
                    />
                    {isActive && <View style={styles.activeGlowDot} />}
                  </View>
                  <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContent: {
    flex: 1,
  },
  dockWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 12,
    left: 8,
    right: 8,
    alignItems: 'center',
  },
  dockBlur: {
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    width: '100%',
    maxWidth: 520,
    backgroundColor: 'rgba(15, 12, 41, 0.70)',
    ...theme.shadows.glassCard,
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10,
  },
  dockBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 6,
    width: '100%',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 20,
    minWidth: 42,
  },
  tabItemActive: {
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainerActive: {
    transform: [{ scale: 1.08 }],
  },
  activeGlowDot: {
    position: 'absolute',
    bottom: -3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '900',
  },
});
