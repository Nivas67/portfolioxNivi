import React, { useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { colors } from './src/theme/colors';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.body.style.backgroundColor = '#0F0C29';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      const root = document.getElementById('root');
      if (root) {
        root.style.backgroundColor = '#0F0C29';
        root.style.minHeight = '100vh';
        root.style.height = '100%';
        root.style.display = 'flex';
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider
        initialMetrics={initialWindowMetrics}
        style={styles.safeArea}
      >
        <View style={styles.container}>
          <StatusBar style="light" backgroundColor={colors.background} />
          <AppNavigator />
        </View>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
  },
});
