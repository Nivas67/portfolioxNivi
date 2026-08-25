import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Zap,
  Check,
  KeyRound,
  Sparkles,
  ShieldCheck,
  Link2,
  Globe,
  Apple,
} from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';
import { GlassCard } from '../../components/common/GlassCard';
import { ScreenGradient } from '../../components/common/ScreenGradient';

interface AuthScreenProps {
  onLoginSuccess: () => void;
  onGoToWizard: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onGoToWizard }) => {
  const [authMode, setAuthMode] = useState<'social_phone' | 'unified' | 'mobile_otp'>('social_phone');
  const [isRegister, setIsRegister] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('alex.hunter@pro-athlete.com');
  const [password, setPassword] = useState('••••••••');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('98765 43210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const { login, loginDemoUser } = useAuthStore();

  const handleGoogleSignIn = () => {
    login('alex.hunter@gmail.com', 'Alex Hunter (Google)', '+91 98765 43210');
    Alert.alert('Google Sign-In', 'Authenticated as alex.hunter@gmail.com');
    onLoginSuccess();
  };

  const handleAppleSignIn = () => {
    login('alex.hunter@icloud.com', 'Alex Hunter (Apple)', '+91 98765 43210');
    Alert.alert('Apple Sign-In', 'Authenticated with Apple ID.');
    onLoginSuccess();
  };

  const handleUnifiedSubmit = () => {
    if (!email.trim()) {
      Alert.alert('Email Required', 'Please enter your pro email address.');
      return;
    }
    const fullPhone = phoneNumber.trim() ? `${countryCode} ${phoneNumber.trim()}` : '+91 98765 43210';
    login(email.trim(), name.trim() || 'Alex Hunter', fullPhone);
    if (isRegister) {
      onGoToWizard();
    } else {
      onLoginSuccess();
    }
  };

  const handleSendOtp = () => {
    if (!phoneNumber.trim() || phoneNumber.length < 7) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid mobile number.');
      return;
    }
    setOtpSent(true);
    Alert.alert('OTP Sent!', `6-digit security code sent to ${countryCode} ${phoneNumber}.\n(Demo Code: 789456)`);
  };

  const handleVerifyOtp = () => {
    if (!otpCode.trim() || otpCode.length < 4) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit verification code sent to your mobile.');
      return;
    }
    const fullPhone = `${countryCode} ${phoneNumber.trim()}`;
    login(email.trim() || `${countryCode}${phoneNumber.replace(/\s+/g, '')}@fittrack.pro`, name.trim() || 'Athlete', fullPhone);
    if (isRegister) {
      onGoToWizard();
    } else {
      onLoginSuccess();
    }
  };

  const handleQuickDemo = () => {
    loginDemoUser();
    onLoginSuccess();
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Brand Header */}
          <View style={styles.header}>
            <View style={styles.brandIconWrap}>
              <Sparkles size={26} color={colors.primary} />
            </View>
            <Text style={styles.brand}>FIT<Text style={styles.brandAccent}>TRACK</Text></Text>
            <Text style={styles.tagline}>
              Liquid-Glass Hypertrophy & Personalized AI Coaching Ecosystem
            </Text>
          </View>

          {/* 1-Tap Instant Pro Access */}
          <TouchableOpacity
            style={styles.demoCard}
            onPress={handleQuickDemo}
            activeOpacity={0.85}
          >
            <View style={styles.demoLeft}>
              <View style={styles.demoIconBox}>
                <Zap size={20} color={colors.textDark} fill={colors.textDark} />
              </View>
              <View style={styles.demoInfo}>
                <Text style={styles.demoTitle}>Instant Demo Mode (1-Tap)</Text>
                <Text style={styles.demoSub}>Pre-connected with Google, Phone, Coach Nivi & Health Connect</Text>
              </View>
            </View>
            <ArrowRight size={18} color={colors.primary} />
          </TouchableOpacity>

          {/* Auth Method Navigation Tabs */}
          <View style={styles.authTabRow}>
            <TouchableOpacity
              style={[styles.authTab, authMode === 'social_phone' && styles.authTabActive]}
              onPress={() => { setAuthMode('social_phone'); setOtpSent(false); }}
              activeOpacity={0.8}
            >
              <Zap size={14} color={authMode === 'social_phone' ? colors.primary : colors.textSecondary} />
              <Text style={[styles.authTabText, authMode === 'social_phone' && styles.authTabTextActive]}>
                Google / Apple
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.authTab, authMode === 'mobile_otp' && styles.authTabActive]}
              onPress={() => setAuthMode('mobile_otp')}
              activeOpacity={0.8}
            >
              <Phone size={14} color={authMode === 'mobile_otp' ? colors.primary : colors.textSecondary} />
              <Text style={[styles.authTabText, authMode === 'mobile_otp' && styles.authTabTextActive]}>
                Phone OTP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.authTab, authMode === 'unified' && styles.authTabActive]}
              onPress={() => { setAuthMode('unified'); setOtpSent(false); }}
              activeOpacity={0.8}
            >
              <Mail size={14} color={authMode === 'unified' ? colors.primary : colors.textSecondary} />
              <Text style={[styles.authTabText, authMode === 'unified' && styles.authTabTextActive]}>
                Pro Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Main Glassmorphic Form Card */}
          <GlassCard style={styles.formCard} glow glowColor={colors.primary}>
            {authMode === 'social_phone' && (
              <View style={styles.socialAuthCol}>
                <TouchableOpacity
                  style={styles.googleBtn}
                  onPress={handleGoogleSignIn}
                  activeOpacity={0.85}
                >
                  <Text style={styles.socialIconEmoji}>🔴</Text>
                  <Text style={styles.googleBtnText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.appleBtn}
                  onPress={handleAppleSignIn}
                  activeOpacity={0.85}
                >
                  <Text style={styles.socialIconEmoji}>🍎</Text>
                  <Text style={styles.appleBtnText}>Continue with Apple</Text>
                </TouchableOpacity>

                <View style={styles.orDivider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.orText}>OR PHONE SIGN-IN</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                  style={styles.phoneDirectBtn}
                  onPress={() => setAuthMode('mobile_otp')}
                  activeOpacity={0.85}
                >
                  <Phone size={16} color={colors.primary} />
                  <Text style={styles.phoneDirectText}>Continue with Phone Number</Text>
                </TouchableOpacity>
              </View>
            )}

            {authMode === 'mobile_otp' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mobile Phone Number</Text>
                  <View style={styles.phoneInputRow}>
                    <View style={styles.countryCodePill}>
                      <Text style={styles.countryCodeText}>{countryCode}</Text>
                    </View>

                    <View style={[styles.inputWrapper, { flex: 1 }]}>
                      <Phone size={18} color={colors.textSecondary} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="98765 43210"
                        placeholderTextColor={colors.textMuted}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                      />
                    </View>
                  </View>
                </View>

                {!otpSent ? (
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSendOtp}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.submitButtonText}>Send 6-Digit OTP Code</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <View style={styles.inputGroup}>
                      <View style={styles.otpHeaderRow}>
                        <Text style={styles.inputLabel}>Enter 6-Digit OTP</Text>
                        <TouchableOpacity onPress={() => setOtpCode('789456')}>
                          <Text style={styles.autoFillText}>Auto-Fill Demo (789456)</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.inputWrapper}>
                        <KeyRound size={18} color={colors.primary} />
                        <TextInput
                          style={[styles.textInput, styles.otpInput]}
                          placeholder="789456"
                          placeholderTextColor={colors.textMuted}
                          keyboardType="number-pad"
                          maxLength={6}
                          value={otpCode}
                          onChangeText={setOtpCode}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleVerifyOtp}
                      activeOpacity={0.88}
                    >
                      <Text style={styles.submitButtonText}>Verify & Enter FitTrack</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resendBtn}
                      onPress={handleSendOtp}
                    >
                      <Text style={styles.resendText}>Resend SMS Code</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}

            {authMode === 'unified' && (
              <>
                <View style={styles.badgeInfoRow}>
                  <Link2 size={14} color={colors.primary} />
                  <Text style={styles.badgeInfoText}>Connects your Email & Phone to 1 Athlete Account</Text>
                </View>

                {isRegister && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Athlete Full Name</Text>
                    <View style={styles.inputWrapper}>
                      <User size={18} color={colors.textSecondary} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="e.g. Alex Hunter"
                        placeholderTextColor={colors.textMuted}
                        value={name}
                        onChangeText={setName}
                      />
                    </View>
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Pro Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Mail size={18} color={colors.textSecondary} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="alex.hunter@pro-athlete.com"
                      placeholderTextColor={colors.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Lock size={18} color={colors.textSecondary} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="••••••••"
                      placeholderTextColor={colors.textMuted}
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleUnifiedSubmit}
                  activeOpacity={0.88}
                >
                  <Text style={styles.submitButtonText}>
                    {isRegister ? 'Create Account' : 'Sign In with Email'}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* Switch Login / Sign Up Mode */}
            <TouchableOpacity
              style={styles.switchModeBtn}
              onPress={() => setIsRegister(!isRegister)}
            >
              <Text style={styles.switchModeText}>
                {isRegister
                  ? 'Already have an account? Sign In'
                  : "New athlete? Create an Account"}
              </Text>
            </TouchableOpacity>
          </GlassCard>

          {/* Security Assurance Badge */}
          <View style={styles.securityRow}>
            <ShieldCheck size={14} color={colors.textSecondary} />
            <Text style={styles.securityText}>End-to-End Encrypted Athlete Telemetry & Biometrics</Text>
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
  scroll: {
    padding: theme.spacing.lg,
    justifyContent: 'center',
    minHeight: '100%',
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  brandIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brand: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  brandAccent: {
    color: colors.primary,
  },
  tagline: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 320,
    lineHeight: 18,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.35)',
    borderRadius: theme.borderRadius.lg,
    padding: 14,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glassCard,
  },
  demoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  demoIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoInfo: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  demoSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  authTabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: theme.borderRadius.full,
    padding: 4,
    gap: 4,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  authTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    gap: 5,
  },
  authTabActive: {
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  authTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  authTabTextActive: {
    color: colors.primary,
    fontWeight: '900',
  },
  formCard: {
    padding: theme.spacing.lg,
    gap: 14,
  },
  socialAuthCol: {
    gap: 10,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    gap: 10,
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  appleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    gap: 10,
  },
  appleBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  socialIconEmoji: {
    fontSize: 16,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cardBorder,
  },
  orText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  phoneDirectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.35)',
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    gap: 8,
  },
  phoneDirectText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  badgeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.10)',
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.25)',
  },
  badgeInfoText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '700',
    flex: 1,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    height: 48,
    gap: 10,
  },
  phoneInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  countryCodePill: {
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  textInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  otpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoFillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  otpInput: {
    letterSpacing: 4,
    fontSize: 16,
    fontWeight: '800',
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: 4,
    ...theme.shadows.glowMint,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.textDark,
  },
  resendBtn: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  resendText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  switchModeBtn: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  switchModeText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: theme.spacing.lg,
  },
  securityText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
