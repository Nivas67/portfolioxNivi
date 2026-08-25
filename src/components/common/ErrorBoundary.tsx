import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[FitTrack ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>FitTrack Recovery Shield</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </Text>

          {this.state.error && (
            <ScrollView style={styles.debugBox}>
              <Text style={styles.debugText}>
                {this.state.error.stack || this.state.error.toString()}
              </Text>
            </ScrollView>
          )}

          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Reload Application</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0C29',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 44,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  message: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  debugBox: {
    maxHeight: 120,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  debugText: {
    fontSize: 10,
    color: '#39FF88',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#39FF88',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0A0C16',
  },
});
