import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Send, Bot, User, Trash2, Zap, Dumbbell, Utensils, ShieldCheck, ChevronRight, Smile, Flame, Award, Heart } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../../components/common/GlassCard';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { useAICoachStore, CoachPersona } from '../../store/useAICoachStore';

export const AICoachScreen: React.FC = () => {
  const { messages, isTyping, sendMessage, clearHistory, persona, setPersona } = useAICoachStore();
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const personas: { id: CoachPersona; label: string; icon: string; desc: string }[] = [
    { id: 'nivi', label: 'Coach Nivi', icon: '🏋️‍♀️', desc: 'Elite Trainer & Biomechanist' },
    { id: 'mentor', label: 'Marcus', icon: '🧑‍🏫', desc: 'Supportive & Empathetic' },
    { id: 'motivator', label: 'Sarah', icon: '⚡', desc: 'High Energy & Hype' },
    { id: 'sergeant', label: 'Stone', icon: '🎖️', desc: 'Tough Love Discipline' },
    { id: 'scientist', label: 'Dr. Andy', icon: '🔬', desc: 'Biomechanics Science' },
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    setInputText('');
    await sendMessage(text.trim());
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.aiBadgeCircle}>
              <Sparkles size={18} color={colors.primary} />
            </View>
            <View>
              <View style={styles.titleRow}>
                <Text style={styles.title}>Coach Nivi (AI Trainer)</Text>
                <View style={styles.liveOnlineDot} />
              </View>
              <Text style={styles.subtitle}>Personalized Gym, Form & Nutrition Intelligence</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.clearBtn} onPress={clearHistory} activeOpacity={0.7}>
            <Trash2 size={15} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Coach Persona Selector Bar */}
        <View style={styles.personaBar}>
          <Text style={styles.personaBarLabel}>SELECT TRAINER TONE:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.personaScroll}>
            {personas.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[styles.personaChip, persona === p.id && styles.personaChipActive]}
                onPress={() => setPersona(p.id)}
              >
                <Text style={styles.personaEmoji}>{p.icon}</Text>
                <Text style={[styles.personaText, persona === p.id && styles.personaTextActive]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Messages Scroll Area */}
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => {
            const isAI = msg.sender === 'assistant';
            return (
              <View key={msg.id} style={[styles.messageWrapper, isAI ? styles.aiWrapper : styles.userWrapper]}>
                <View style={styles.messageHeaderRow}>
                  {isAI ? (
                    <View style={styles.senderPillAI}>
                      <Bot size={12} color={colors.primary} />
                      <Text style={styles.senderTextAI}>COACH {persona.toUpperCase()}</Text>
                    </View>
                  ) : (
                    <View style={styles.senderPillUser}>
                      <User size={12} color={colors.secondary} />
                      <Text style={styles.senderTextUser}>YOU</Text>
                    </View>
                  )}
                </View>

                <GlassCard
                  style={[styles.bubbleCard, isAI ? styles.aiBubble : styles.userBubble]}
                  glow={isAI}
                  glowColor={colors.primary}
                >
                  <Text style={styles.bubbleText}>{msg.text}</Text>

                  {/* Quick Prompts */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <View style={styles.quickActionsList}>
                      {msg.quickActions.map((qa, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.quickActionPill}
                          onPress={() => handleSend(qa.action)}
                          activeOpacity={0.75}
                        >
                          <Text style={styles.quickActionLabel}>{qa.label}</Text>
                          <ChevronRight size={12} color={colors.primary} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </GlassCard>
              </View>
            );
          })}

          {isTyping && (
            <View style={[styles.messageWrapper, styles.aiWrapper]}>
              <GlassCard style={styles.typingCard}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.typingText}>Coach Nivi is analyzing your workout and form...</Text>
              </GlassCard>
            </View>
          )}
        </ScrollView>

        {/* Bottom Input Field Bar */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.inputContainer}>
            <View style={styles.inputGlass}>
              <TextInput
                style={styles.input}
                placeholder="Ask Coach Nivi anything (e.g. 'Warmup for 100kg bench')..."
                placeholderTextColor={colors.textMuted}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={() => handleSend()}
                returnKeyType="send"
              />

              <TouchableOpacity
                style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
                disabled={!inputText.trim() || isTyping}
                onPress={() => handleSend()}
                activeOpacity={0.8}
              >
                <Send size={16} color={inputText.trim() ? colors.textDark : colors.textMuted} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiBadgeCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  liveOnlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  clearBtn: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  personaBar: {
    paddingVertical: 8,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  personaBarLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  personaScroll: {
    gap: 8,
  },
  personaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 6,
  },
  personaChipActive: {
    backgroundColor: 'rgba(57, 255, 136, 0.15)',
    borderColor: colors.primary,
  },
  personaEmoji: {
    fontSize: 13,
  },
  personaText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  personaTextActive: {
    color: colors.primary,
    fontWeight: '900',
  },
  messagesContainer: {
    padding: theme.spacing.md,
    gap: 14,
    paddingBottom: 95,
  },
  messageWrapper: {
    maxWidth: '92%',
    gap: 4,
  },
  aiWrapper: {
    alignSelf: 'flex-start',
  },
  userWrapper: {
    alignSelf: 'flex-end',
  },
  messageHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  senderPillAI: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
  },
  senderTextAI: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  senderPillUser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  senderTextUser: {
    fontSize: 9,
    fontWeight: '900',
    color: colors.secondary,
    letterSpacing: 0.8,
  },
  bubbleCard: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  aiBubble: {
    borderColor: 'rgba(57, 255, 136, 0.3)',
  },
  userBubble: {
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  bubbleText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 21,
    fontWeight: '500',
  },
  quickActionsList: {
    marginTop: 12,
    gap: 6,
    borderTopWidth: 1,
    borderColor: colors.cardBorder,
    paddingTop: 10,
  },
  quickActionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(57, 255, 136, 0.08)',
    borderRadius: theme.borderRadius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.2)',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  typingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  typingText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: theme.spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.cardBorder,
  },
  inputGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.glowMint,
  },
  sendBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
