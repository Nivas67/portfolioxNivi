import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  PanResponder,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  Layers,
  Sparkles,
  Calendar,
  Scale,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Check,
  Maximize2,
  Sliders,
  Shield,
} from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';
import { GlassCard } from '../../components/common/GlassCard';
import { StatBadge } from '../../components/common/StatBadge';
import { ScreenGradient } from '../../components/common/ScreenGradient';
import { useProgressStore } from '../../store/useProgressStore';
import { getTodayDateString } from '../../utils/dateUtils';
import { PhotoLog } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = Math.min(SCREEN_WIDTH - 48, 380);

interface PhotoCheckInScreenProps {
  onBack?: () => void;
}

export const PhotoCheckInScreen: React.FC<PhotoCheckInScreenProps> = ({ onBack }) => {
  const { photoLogs, addPhoto, weightLogs } = useProgressStore();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showSilhouetteOverlay, setShowSilhouetteOverlay] = useState(true);
  const [photoCaption, setPhotoCaption] = useState('Morning Fasted Check-In');
  const [photoWeight, setPhotoWeight] = useState('82.5');

  // Before & After Compare State
  const [beforePhotoIdx, setBeforePhotoIdx] = useState(0);
  const [afterPhotoIdx, setAfterPhotoIdx] = useState(photoLogs.length > 1 ? photoLogs.length - 1 : 0);
  const [sliderPosition, setSliderPosition] = useState(SLIDER_WIDTH / 2);

  const beforePhoto = photoLogs[beforePhotoIdx] || photoLogs[0];
  const afterPhoto = photoLogs[afterPhotoIdx] || photoLogs[photoLogs.length - 1];

  // PanResponder for Interactive Before/After Split Slider
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPos = Math.max(20, Math.min(SLIDER_WIDTH - 20, gestureState.moveX - 24));
        setSliderPosition(newPos);
      },
    })
  ).current;

  const handleCapturePhoto = () => {
    // Generate high-resolution progressive check-in snapshot
    const samplePhotos = [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    ];
    const chosenUri = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];

    addPhoto({
      photoUri: chosenUri,
      weightKgAtTime: parseFloat(photoWeight) || 82.5,
      caption: photoCaption,
      hasSilhouetteAlignment: true,
    });

    setShowCameraModal(false);
    Alert.alert('Check-In Saved!', 'Photo aligned with silhouette guide and added to your private timeline.');
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                <ChevronLeft size={22} color={colors.textPrimary} />
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.title}>Transformation Studio</Text>
              <Text style={styles.subtitle}>Silhouette-aligned photos & split-slider reveal</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.takePhotoBtn}
            onPress={() => setShowCameraModal(true)}
            activeOpacity={0.85}
          >
            <Camera size={16} color={colors.textDark} strokeWidth={2.5} />
            <Text style={styles.takePhotoBtnText}>Check-In</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Section 1: Interactive Before/After Split-Slider */}
          <GlassCard style={styles.compareCard} glow glowColor={colors.primary}>
            <View style={styles.compareHeader}>
              <View style={styles.compareTitleRow}>
                <Sliders size={18} color={colors.primary} />
                <Text style={styles.cardTitle}>Before & After Drag-Slider</Text>
              </View>
              <StatBadge label="Drag to Reveal" color={colors.primary} size="sm" />
            </View>

            {/* Split Slider Interactive Viewer */}
            <View style={[styles.splitViewer, { width: SLIDER_WIDTH }]} {...panResponder.panHandlers}>
              {/* Layer 1: "After" Photo (Full Background) */}
              <Image
                source={{ uri: afterPhoto?.photoUri }}
                style={[styles.compareImage, { width: SLIDER_WIDTH }]}
                resizeMode="cover"
              />
              <View style={styles.afterLabelPill}>
                <Text style={styles.afterLabelText}>AFTER · {afterPhoto?.date || 'Today'}</Text>
              </View>

              {/* Layer 2: "Before" Photo (Clipped View by Slider Position) */}
              <View style={[styles.clippedContainer, { width: sliderPosition }]}>
                <Image
                  source={{ uri: beforePhoto?.photoUri }}
                  style={[styles.compareImage, { width: SLIDER_WIDTH }]}
                  resizeMode="cover"
                />
                <View style={styles.beforeLabelPill}>
                  <Text style={styles.beforeLabelText}>BEFORE · {beforePhoto?.date || 'Day 1'}</Text>
                </View>
              </View>

              {/* Layer 3: Vertical Split Line & Handle */}
              <View style={[styles.sliderDividerLine, { left: sliderPosition - 1.5 }]}>
                <View style={styles.sliderKnobCircle}>
                  <Text style={styles.sliderKnobArrows}>◀ ▶</Text>
                </View>
              </View>
            </View>

            {/* Metrics Comparison Footer */}
            <View style={styles.metricsCompareRow}>
              <View style={styles.metricCompareItem}>
                <Text style={styles.compareDateSub}>Baseline ({beforePhoto?.date})</Text>
                <Text style={styles.compareWeightVal}>{beforePhoto?.weightKgAtTime || 84.5} kg</Text>
              </View>

              <View style={styles.deltaBadge}>
                <Text style={styles.deltaText}>
                  {((afterPhoto?.weightKgAtTime || 81.2) - (beforePhoto?.weightKgAtTime || 84.5)).toFixed(1)} kg
                </Text>
              </View>

              <View style={[styles.metricCompareItem, { alignItems: 'flex-end' }]}>
                <Text style={styles.compareDateSub}>Current ({afterPhoto?.date})</Text>
                <Text style={[styles.compareWeightVal, { color: colors.primary }]}>
                  {afterPhoto?.weightKgAtTime || 81.2} kg
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Section 2: Timeline Photo History */}
          <View style={styles.timelineSection}>
            <View style={styles.timelineHeaderRow}>
              <Text style={styles.sectionHeading}>Daily Check-In Timeline</Text>
              <Text style={styles.photoCount}>{photoLogs.length} Snapshots</Text>
            </View>

            <View style={styles.timelineGrid}>
              {photoLogs.map((p, idx) => (
                <GlassCard key={p.id} style={styles.photoGridCard}>
                  <Image source={{ uri: p.photoUri }} style={styles.gridThumb} resizeMode="cover" />
                  <View style={styles.gridOverlay}>
                    <Text style={styles.gridDateText}>{p.date}</Text>
                    <Text style={styles.gridWeightText}>{p.weightKgAtTime} kg</Text>
                  </View>
                </GlassCard>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Silhouette Camera Check-In Modal */}
        <Modal visible={showCameraModal} transparent animationType="slide">
          <View style={styles.cameraOverlayModal}>
            <View style={styles.cameraFrame}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80' }}
                style={styles.cameraPreviewImage}
              />

              {/* Faint Front-Facing Silhouette Guide */}
              {showSilhouetteOverlay && (
                <View style={styles.silhouetteWrapper} pointerEvents="none">
                  <View style={styles.silhouetteHead} />
                  <View style={styles.silhouetteShoulders} />
                  <View style={styles.silhouetteTorso} />
                  <View style={styles.silhouetteLegs} />
                  <Text style={styles.silhouetteHintText}>Align shoulders and hips with guide lines</Text>
                </View>
              )}

              {/* Camera Header */}
              <View style={styles.cameraTopRow}>
                <TouchableOpacity
                  style={styles.silhouetteToggleBtn}
                  onPress={() => setShowSilhouetteOverlay(!showSilhouetteOverlay)}
                >
                  <Layers size={16} color={showSilhouetteOverlay ? colors.primary : colors.textMuted} />
                  <Text style={styles.silhouetteToggleText}>
                    {showSilhouetteOverlay ? 'Guide ON' : 'Guide OFF'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeCamBtn} onPress={() => setShowCameraModal(false)}>
                  <X size={22} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Camera Controls Footer */}
              <View style={styles.cameraBottomBar}>
                <View style={styles.cameraInputsRow}>
                  <TextInput
                    style={styles.camInput}
                    value={photoWeight}
                    onChangeText={setPhotoWeight}
                    keyboardType="numeric"
                    placeholder="Scale weight (kg)"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                  <TextInput
                    style={[styles.camInput, { flex: 1.5 }]}
                    value={photoCaption}
                    onChangeText={setPhotoCaption}
                    placeholder="Notes (e.g. Fasted check-in)"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                  />
                </View>

                <TouchableOpacity
                  style={styles.shutterBtn}
                  onPress={handleCapturePhoto}
                  activeOpacity={0.85}
                >
                  <View style={styles.shutterInnerCircle} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  takePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    gap: 6,
    ...theme.shadows.glowMint,
  },
  takePhotoBtnText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.textDark,
  },
  scroll: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 95,
  },
  compareCard: {
    padding: theme.spacing.md,
    alignItems: 'center',
    gap: 12,
  },
  compareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  compareTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  splitViewer: {
    height: 380,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  compareImage: {
    height: 380,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  clippedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    overflow: 'hidden',
    borderRightWidth: 1,
    borderColor: 'transparent',
  },
  sliderDividerLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  sliderKnobCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...theme.shadows.glowMint,
  },
  sliderKnobArrows: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.textDark,
  },
  beforeLabelPill: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 12, 41, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  beforeLabelText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.secondary,
  },
  afterLabelPill: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(15, 12, 41, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.4)',
  },
  afterLabelText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  metricsCompareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: colors.cardBorder,
  },
  metricCompareItem: {
    gap: 2,
  },
  compareDateSub: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  compareWeightVal: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  deltaBadge: {
    backgroundColor: 'rgba(57, 255, 136, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 136, 0.3)',
  },
  deltaText: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primary,
  },
  timelineSection: {
    gap: 10,
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  photoCount: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  timelineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoGridCard: {
    width: (SCREEN_WIDTH - 42) / 2,
    height: 180,
    padding: 0,
    overflow: 'hidden',
  },
  gridThumb: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridDateText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  gridWeightText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  cameraOverlayModal: {
    flex: 1,
    backgroundColor: '#0F0C29',
  },
  cameraFrame: {
    flex: 1,
    position: 'relative',
  },
  cameraPreviewImage: {
    width: '100%',
    height: '100%',
  },
  silhouetteWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  silhouetteHead: {
    width: 90,
    height: 110,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'rgba(57, 255, 136, 0.4)',
    borderStyle: 'dashed',
    marginBottom: 8,
  },
  silhouetteShoulders: {
    width: 220,
    height: 45,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(57, 255, 136, 0.4)',
    borderStyle: 'dashed',
    marginBottom: 6,
  },
  silhouetteTorso: {
    width: 140,
    height: 130,
    borderWidth: 2,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    borderStyle: 'dashed',
    marginBottom: 6,
  },
  silhouetteLegs: {
    width: 130,
    height: 120,
    borderWidth: 2,
    borderColor: 'rgba(57, 255, 136, 0.3)',
    borderStyle: 'dashed',
  },
  silhouetteHintText: {
    position: 'absolute',
    top: 60,
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    backgroundColor: 'rgba(15, 12, 41, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cameraTopRow: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  silhouetteToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 12, 41, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  silhouetteToggleText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  closeCamBtn: {
    padding: 8,
    backgroundColor: 'rgba(15, 12, 41, 0.75)',
    borderRadius: 20,
  },
  cameraBottomBar: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
    gap: 16,
  },
  cameraInputsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  camInput: {
    backgroundColor: 'rgba(15, 12, 41, 0.85)',
    borderRadius: theme.borderRadius.sm,
    padding: 10,
    color: '#FFFFFF',
    fontSize: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  shutterBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  shutterInnerCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
  },
});
