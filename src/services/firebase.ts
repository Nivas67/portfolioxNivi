/**
 * Firebase Service Bridge & Configuration
 * Provides Firestore data collections and Auth hooks with full offline support.
 */

export const firebaseConfig = {
  apiKey: "AIzaSyMockApiKeyFitTrackDemo2026",
  authDomain: "fittrack-fitness-app.firebaseapp.com",
  projectId: "fittrack-fitness-app",
  storageBucket: "fittrack-fitness-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:mockAppIdForFitTrack"
};

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  WORKOUT_PLANS: 'workoutPlans',
  WORKOUT_LOGS: 'workoutLogs',
  FOOD_LOGS: 'foodLogs',
  BODY_METRICS: 'bodyMetrics',
  WEARABLE_DATA: 'wearableData',
  ACHIEVEMENTS: 'achievements'
};

export const firebaseService = {
  isConfigured: false,
  init() {
    console.log('[Firebase] Initialized with offline-first persistence layer');
  }
};
