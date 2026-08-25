import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Modal } from 'react-native';
import { colors } from '../theme/colors';
import { useAuthStore } from '../store/useAuthStore';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { ProfileWizardScreen } from '../screens/auth/ProfileWizardScreen';
import { LiveWorkoutScreen } from '../screens/workouts/LiveWorkoutScreen';
import { WorkoutBuilderScreen } from '../screens/workouts/WorkoutBuilderScreen';
import { ExerciseLibraryScreen } from '../screens/workouts/ExerciseLibraryScreen';
import { FoodSearchScreen } from '../screens/diet/FoodSearchScreen';
import { TabNavigator } from './TabNavigator';
import { MealType } from '../types';

export const AppNavigator: React.FC = () => {
  const { user } = useAuthStore();
  const [showOnboarding, setShowOnboarding] = useState(!user?.onboarded);
  const [showWizard, setShowWizard] = useState(false);

  // Full Screen Modals
  const [showLiveWorkout, setShowLiveWorkout] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [activeSearchMeal, setActiveSearchMeal] = useState<MealType | null>(null);

  // If user is not logged in / not onboarded
  if (!user) {
    if (showOnboarding) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={colors.background} />
          <OnboardingScreen onComplete={() => setShowOnboarding(false)} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <AuthScreen
          onLoginSuccess={() => {}}
          onGoToWizard={() => setShowWizard(true)}
        />
      </View>
    );
  }

  // If newly registered user needing profile setup wizard
  if (!user.onboarded || showWizard) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <ProfileWizardScreen onFinish={() => setShowWizard(false)} />
      </View>
    );
  }

  // Main App Navigation
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <TabNavigator
        onStartLiveWorkout={() => setShowLiveWorkout(true)}
        onOpenBuilder={() => setShowBuilder(true)}
        onOpenLibrary={() => setShowLibrary(true)}
        onOpenWizard={() => setShowWizard(true)}
        onOpenFoodSearch={(mealType) => setActiveSearchMeal(mealType)}
        onLogout={() => setShowOnboarding(true)}
      />

      {/* Live Workout Session Modal */}
      <Modal visible={showLiveWorkout} animationType="slide" presentationStyle="fullScreen">
        <LiveWorkoutScreen onClose={() => setShowLiveWorkout(false)} />
      </Modal>

      {/* Workout Builder Modal */}
      <Modal visible={showBuilder} animationType="slide">
        <WorkoutBuilderScreen
          onBack={() => setShowBuilder(false)}
          onSaved={() => setShowBuilder(false)}
        />
      </Modal>

      {/* Exercise Library Modal */}
      <Modal visible={showLibrary} animationType="slide">
        <ExerciseLibraryScreen onBack={() => setShowLibrary(false)} />
      </Modal>

      {/* Food Search Modal */}
      <Modal visible={activeSearchMeal !== null} animationType="slide">
        {activeSearchMeal && (
          <FoodSearchScreen
            initialMealType={activeSearchMeal}
            onBack={() => setActiveSearchMeal(null)}
            onFoodAdded={() => setActiveSearchMeal(null)}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
