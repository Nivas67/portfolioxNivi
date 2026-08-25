import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, theme } from '../../theme/colors';

interface StatBadgeProps {
  label: string;
  color?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  size?: 'sm' | 'md';
}

export const StatBadge: React.FC<StatBadgeProps> = ({
  label,
  color = colors.primary,
  backgroundColor,
  style,
  size = 'md',
}) => {
  const bg = backgroundColor || `${color}18`;

  return (
    <View
      style={[
        styles.badge,
        size === 'sm' ? styles.badgeSm : styles.badgeMd,
        { backgroundColor: bg, borderColor: `${color}40` },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'sm' ? styles.textSm : styles.textMd,
          { color },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
  },
  badgeSm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeMd: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  textSm: {
    fontSize: 11,
  },
  textMd: {
    fontSize: 12,
  },
});
