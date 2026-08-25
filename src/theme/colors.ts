export const darkColors = {
  // Deep Navy -> Violet -> Obsidian Space Canvas
  background: '#0F0C29',
  backgroundMid: '#302B63',
  backgroundEnd: '#24243E',
  backgroundElevated: 'rgba(48, 43, 99, 0.5)',
  
  // Liquid Glass Tokens (Dark Mode)
  card: 'rgba(255, 255, 255, 0.08)',
  cardSolid: '#181636',
  cardHover: 'rgba(255, 255, 255, 0.14)',
  cardBorder: 'rgba(255, 255, 255, 0.15)',
  cardBorderHighlight: 'rgba(255, 255, 255, 0.28)',
  glassBg: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  glassHighlight: 'rgba(120, 200, 255, 0.25)', // Watery soft cyan sheen
  waterSheen: 'rgba(120, 200, 255, 0.25)',
  
  // Electric Accents
  primary: '#39FF88',       // Electric Neon Green
  primaryLight: '#70FFAB',
  primaryDark: '#00D65B',
  primaryGlow: 'rgba(57, 255, 136, 0.35)',
  
  secondary: '#38BDF8',     // Electric Sky Blue
  secondaryLight: '#7DD3FC',
  secondaryGlow: 'rgba(56, 189, 248, 0.25)',
  
  accentOrange: '#FF6B35',  // Athletic Neon Flame Orange
  accentOrangeGlow: 'rgba(255, 107, 53, 0.35)',
  
  accentPurple: '#A855F7',  // VisionOS Amethyst
  accentYellow: '#FBBF24',  // Championship Gold
  accentRed: '#FF3B30',     // Coral Heart Red
  
  // Macros
  protein: '#38BDF8',       // Cyan Blue
  carbs: '#FBBF24',         // Amber Gold
  fat: '#FF3B30',           // Heart Red
  water: '#06B6D4',         // Aqua
  
  // High-Contrast Off-White Typography Scale
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.68)',
  textMuted: 'rgba(255, 255, 255, 0.42)',
  textDark: '#0A0C16',
  
  // UI States
  success: '#39FF88',
  warning: '#FBBF24',
  error: '#FF3B30',
  info: '#38BDF8',
  
  // Inputs & Dividers
  divider: 'rgba(255, 255, 255, 0.10)',
  inputBg: 'rgba(255, 255, 255, 0.06)',
  inputBorder: 'rgba(255, 255, 255, 0.14)',
  inputFocus: 'rgba(57, 255, 136, 0.5)',
  
  // Overlays
  overlay: 'rgba(15, 12, 41, 0.85)',
};

export const lightColors = {
  // Soft Sky Blue -> Pale Lavender Canvas
  background: '#E8F4FF',
  backgroundMid: '#FFFFFF',
  backgroundEnd: '#F3EFFF',
  backgroundElevated: 'rgba(240, 246, 255, 0.8)',
  
  // Liquid Glass Tokens (Light Mode - More Opaque for high readability)
  card: 'rgba(255, 255, 255, 0.65)',
  cardSolid: '#FFFFFF',
  cardHover: 'rgba(255, 255, 255, 0.85)',
  cardBorder: 'rgba(255, 255, 255, 0.85)',
  cardBorderHighlight: 'rgba(56, 189, 248, 0.35)',
  glassBg: 'rgba(255, 255, 255, 0.65)',
  glassBorder: 'rgba(255, 255, 255, 0.85)',
  glassHighlight: 'rgba(120, 200, 255, 0.45)', // Watery sheen
  waterSheen: 'rgba(120, 200, 255, 0.45)',
  
  // Electric Accents
  primary: '#00D65B',       // Electric Deep Green for light contrast
  primaryLight: '#39FF88',
  primaryDark: '#059669',
  primaryGlow: 'rgba(0, 214, 91, 0.25)',
  
  secondary: '#0284C7',     // Sky Blue
  secondaryLight: '#38BDF8',
  secondaryGlow: 'rgba(2, 132, 199, 0.20)',
  
  accentOrange: '#EA580C',  // Athletic Flame
  accentOrangeGlow: 'rgba(234, 88, 12, 0.25)',
  
  accentPurple: '#9333EA',  // Amethyst
  accentYellow: '#D97706',  // Amber
  accentRed: '#DC2626',     // Crimson
  
  // Macros
  protein: '#0284C7',
  carbs: '#D97706',
  fat: '#DC2626',
  water: '#0891B2',
  
  // Deep Contrast Typography Scale (Light Mode)
  textPrimary: '#1A1A2E',
  textSecondary: 'rgba(26, 26, 46, 0.68)',
  textMuted: 'rgba(26, 26, 46, 0.45)',
  textDark: '#FFFFFF',
  
  // UI States
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  info: '#0284C7',
  
  // Inputs & Dividers
  divider: 'rgba(26, 26, 46, 0.08)',
  inputBg: 'rgba(255, 255, 255, 0.8)',
  inputBorder: 'rgba(26, 26, 46, 0.12)',
  inputFocus: 'rgba(0, 214, 91, 0.5)',
  
  // Overlays
  overlay: 'rgba(26, 26, 46, 0.75)',
};

// Default export is dark colors for backwards compatibility
export const colors = darkColors;

export const theme = {
  colors: darkColors,
  borderRadius: {
    xs: 6,
    sm: 12,
    md: 18,
    lg: 22,
    xl: 26,
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  shadows: {
    glowMint: {
      shadowColor: '#39FF88',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    },
    glowOrange: {
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    },
    glassCard: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 18,
      elevation: 6,
    },
  },
};
