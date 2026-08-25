import { WorkoutPlan, TrainingTier } from '../types';

export const DEFAULT_WORKOUT_TEMPLATES: WorkoutPlan[] = [
  // 1. BEGINNER TIER (4 exercises/day, 3 sets each, machines & dumbbells over complex barbells, 90-120s rest)
  {
    id: 'plan-beginner-split',
    name: 'Beginner Hypertrophy Foundation (4-Day)',
    description: 'Safe, accessible machine & dumbbell foundation with generous 90-120s recovery intervals to build tendon strength and motor patterns.',
    tier: 'beginner',
    splitType: 'upper_lower',
    daysPerWeek: 4,
    days: [
      {
        id: 'beg-day-1',
        dayIndex: 0, // Monday
        name: 'Monday — Upper Body Foundation (A)',
        isRestDay: false,
        targetMuscleGroups: ['chest', 'back', 'shoulders'],
        exercises: [
          { exerciseId: 'ex-chest-05', customName: 'Dumbbell Flat Bench Press', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Controlled tempo, feel chest stretch' },
          { exerciseId: 'ex-back-02', customName: 'Lat Pulldown (Wide Grip)', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Pull smoothly to upper chest' },
          { exerciseId: 'ex-sh-03', customName: 'Seated Dumbbell Shoulder Press', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Press up without clacking dumbbells' },
          { exerciseId: 'ex-arm-04', customName: 'Triceps Cable Pushdown', targetSets: 3, targetReps: '12-15', restSeconds: 90, notes: 'Strict form with elbows pinned at sides' },
        ],
      },
      {
        id: 'beg-day-2',
        dayIndex: 1, // Tuesday
        name: 'Tuesday — Lower Body Foundation (A)',
        isRestDay: false,
        targetMuscleGroups: ['quads', 'hamstrings', 'calves'],
        exercises: [
          { exerciseId: 'ex-leg-02', customName: 'Leg Press (Machine)', targetSets: 3, targetReps: '10-12', restSeconds: 120, notes: 'Deep knee flexion, do not lock knees at top' },
          { exerciseId: 'ex-leg-07', customName: 'Seated Hamstring Leg Curl', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Smooth 3-second negative descent' },
          { exerciseId: 'ex-leg-04', customName: 'Leg Extension (Machine)', targetSets: 3, targetReps: '12-15', restSeconds: 90, notes: 'Squeeze quads at top' },
          { exerciseId: 'ex-leg-05', customName: 'Seated Calf Raise', targetSets: 3, targetReps: '15-20', restSeconds: 60, notes: 'Full ankle range of motion' },
        ],
      },
      {
        id: 'beg-day-3',
        dayIndex: 2, // Wednesday
        name: 'Wednesday — Active Recovery',
        isRestDay: true,
        targetMuscleGroups: ['cardio', 'abs'],
        exercises: [],
      },
      {
        id: 'beg-day-4',
        dayIndex: 3, // Thursday
        name: 'Thursday — Upper Body Foundation (B)',
        isRestDay: false,
        targetMuscleGroups: ['chest', 'back', 'biceps'],
        exercises: [
          { exerciseId: 'ex-chest-04', customName: 'Chest Press Machine', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Smooth concentric push, controlled negative' },
          { exerciseId: 'ex-back-04', customName: 'Seated Cable Row', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Pinch shoulder blades at contraction' },
          { exerciseId: 'ex-sh-02', customName: 'Dumbbell Lateral Raise', targetSets: 3, targetReps: '12-15', restSeconds: 75, notes: 'Slight bend at elbows, lead with side delts' },
          { exerciseId: 'ex-arm-05', customName: 'Dumbbell Bicep Hammer Curl', targetSets: 3, targetReps: '10-12', restSeconds: 75, notes: 'Neutral grip for arm thickness' },
        ],
      },
      {
        id: 'beg-day-5',
        dayIndex: 4, // Friday
        name: 'Friday — Lower Body & Core (B)',
        isRestDay: false,
        targetMuscleGroups: ['quads', 'glutes', 'abs'],
        exercises: [
          { exerciseId: 'ex-leg-03', customName: 'Goblet Squat (Dumbbell)', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Hold dumbbell close to chest, deep squat' },
          { exerciseId: 'ex-leg-06', customName: 'Dumbbell Romanian Deadlift', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Hinge hips back with flat back' },
          { exerciseId: 'ex-core-04', customName: 'Floor Plank', targetSets: 3, targetReps: '30-45s hold', restSeconds: 60, notes: 'Braced core' },
          { exerciseId: 'ex-core-02', customName: 'Cable Crunch', targetSets: 3, targetReps: '15', restSeconds: 60, notes: 'Flex spine, pull with abs' },
        ],
      },
      {
        id: 'beg-day-6',
        dayIndex: 5, // Saturday
        name: 'Saturday — Rest & Recovery',
        isRestDay: true,
        targetMuscleGroups: [],
        exercises: [],
      },
      {
        id: 'beg-day-7',
        dayIndex: 6, // Sunday
        name: 'Sunday — Rest & Recovery',
        isRestDay: true,
        targetMuscleGroups: [],
        exercises: [],
      },
    ],
  },

  // 2. INTERMEDIATE TIER (The Part 2 Standard 7-Day Muscle-Building Split)
  {
    id: 'plan-default-hypertrophy',
    name: 'Intermediate Hypertrophy Split (7-Day)',
    description: 'The science-grounded 7-day hypertrophy standard with dedicated muscle-group targeting and progressive overload tracking.',
    tier: 'intermediate',
    splitType: 'body_part_hypertrophy',
    daysPerWeek: 6,
    days: [
      {
        id: 'day-mon-chest-tri',
        dayIndex: 0,
        name: 'Monday — Chest & Triceps',
        isRestDay: false,
        targetMuscleGroups: ['chest', 'triceps'],
        exercises: [
          { exerciseId: 'ex-chest-01', customName: 'Barbell Bench Press', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: 'Touch mid-chest, retract scapulae, drive heels' },
          { exerciseId: 'ex-chest-02', customName: 'Incline Dumbbell Press', targetSets: 3, targetReps: '10-12', restSeconds: 75, notes: '30° incline for upper chest clavicular fibers' },
          { exerciseId: 'ex-chest-04', customName: 'Cable Chest Fly', targetSets: 3, targetReps: '12-15', restSeconds: 60, notes: '2-second peak squeeze at full contraction' },
          { exerciseId: 'ex-chest-06', customName: 'Weighted Dips', targetSets: 3, targetReps: '10-12', restSeconds: 75, notes: 'Forward lean to emphasize lower chest and triceps' },
          { exerciseId: 'ex-arm-03', customName: 'Skull Crushers', targetSets: 3, targetReps: '10-12', restSeconds: 60, notes: 'EZ-Bar to forehead, strict elbow position' },
          { exerciseId: 'ex-arm-04', customName: 'Triceps Rope Pushdown', targetSets: 3, targetReps: '12-15', restSeconds: 45, notes: 'Spread rope handles wide at the bottom lockout' },
        ],
      },
      {
        id: 'day-tue-back-bi',
        dayIndex: 1,
        name: 'Tuesday — Back & Biceps',
        isRestDay: false,
        targetMuscleGroups: ['back', 'biceps'],
        exercises: [
          { exerciseId: 'ex-back-01', customName: 'Deadlift', targetSets: 4, targetReps: '6-8', restSeconds: 120, notes: 'Brace core, push the floor away, maintain neutral spine' },
          { exerciseId: 'ex-back-02', customName: 'Lat Pulldown', targetSets: 3, targetReps: '8-10', restSeconds: 90, notes: 'Full lat stretch at bottom, drive elbows down' },
          { exerciseId: 'ex-back-03', customName: 'Barbell Row', targetSets: 3, targetReps: '10-12', restSeconds: 75, notes: 'Hinged at hips, pull bar to belly button' },
          { exerciseId: 'ex-back-04', customName: 'Seated Cable Row', targetSets: 3, targetReps: '10-12', restSeconds: 60, notes: 'Close grip, squeeze rhomboids and middle traps' },
          { exerciseId: 'ex-arm-01', customName: 'Barbell Bicep Curl', targetSets: 3, targetReps: '10-12', restSeconds: 60, notes: 'Strict form, no swinging, full supination' },
          { exerciseId: 'ex-arm-05', customName: 'Hammer Curl', targetSets: 3, targetReps: '12', restSeconds: 45, notes: 'Neutral grip for brachialis and forearm thickness' },
        ],
      },
      {
        id: 'day-wed-legs-calves',
        dayIndex: 2,
        name: 'Wednesday — Legs & Calves',
        isRestDay: false,
        targetMuscleGroups: ['quads', 'hamstrings', 'calves'],
        exercises: [
          { exerciseId: 'ex-leg-01', customName: 'Barbell Back Squat', targetSets: 4, targetReps: '8-10', restSeconds: 120, notes: 'Parallel or below, drive through mid-foot' },
          { exerciseId: 'ex-leg-02', customName: 'Leg Press', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Deep range of motion, feet shoulder-width' },
          { exerciseId: 'ex-leg-06', customName: 'Romanian Deadlift', targetSets: 3, targetReps: '10-12', restSeconds: 90, notes: 'Hinge hips back, feel intense hamstring stretch' },
          { exerciseId: 'ex-leg-04', customName: 'Leg Extension', targetSets: 3, targetReps: '12-15', restSeconds: 60, notes: '1-second pause at top lockout' },
          { exerciseId: 'ex-leg-07', customName: 'Leg Curl', targetSets: 3, targetReps: '12-15', restSeconds: 60, notes: 'Control the eccentric descent' },
          { exerciseId: 'ex-leg-05', customName: 'Standing Calf Raise', targetSets: 4, targetReps: '15-20', restSeconds: 45, notes: '3-second deep stretch at the bottom' },
        ],
      },
      {
        id: 'day-thu-shoulders-abs',
        dayIndex: 3,
        name: 'Thursday — Shoulders & Abs',
        isRestDay: false,
        targetMuscleGroups: ['shoulders', 'abs'],
        exercises: [
          { exerciseId: 'ex-sh-01', customName: 'Overhead Press (Barbell)', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: 'Braced glutes and core, press in straight vertical bar path' },
          { exerciseId: 'ex-sh-02', customName: 'Dumbbell Lateral Raise', targetSets: 4, targetReps: '12-15', restSeconds: 45, notes: 'Lead with elbows, slight forward tilt for side delts' },
          { exerciseId: 'ex-sh-06', customName: 'Face Pulls (Cable)', targetSets: 3, targetReps: '15-20', restSeconds: 45, notes: 'Pinch rear delts and external rotators' },
          { exerciseId: 'ex-sh-09', customName: 'Front Raise', targetSets: 3, targetReps: '12', restSeconds: 45, notes: 'Controlled tempo to eye level' },
          { exerciseId: 'ex-core-01', customName: 'Hanging Leg Raise', targetSets: 3, targetReps: '12-15', restSeconds: 45, notes: 'Curl pelvis up to engage lower abdominal wall' },
          { exerciseId: 'ex-core-04', customName: 'Plank Hold', targetSets: 3, targetReps: '60s hold', restSeconds: 45, notes: 'Full body tension, squeeze abs and glutes' },
        ],
      },
      {
        id: 'day-fri-arms-forearms',
        dayIndex: 4,
        name: 'Friday — Arms & Forearms',
        isRestDay: false,
        targetMuscleGroups: ['biceps', 'triceps'],
        exercises: [
          { exerciseId: 'ex-arm-09', customName: 'Close-Grip Bench Press', targetSets: 3, targetReps: '8-10', restSeconds: 75, notes: 'Hands shoulder-width, elbows tight to ribs' },
          { exerciseId: 'ex-arm-02', customName: 'EZ-Bar Preacher Curl', targetSets: 3, targetReps: '10-12', restSeconds: 60, notes: 'Strict biceps isolation against pad' },
          { exerciseId: 'ex-arm-11', customName: 'Incline Dumbbell Curl', targetSets: 3, targetReps: '10-12', restSeconds: 60, notes: 'Maximal long head bicep stretch' },
          { exerciseId: 'ex-arm-04', customName: 'Cable Triceps Pushdown', targetSets: 3, targetReps: '12-15', restSeconds: 45, notes: 'Lock elbows at sides, full extension' },
          { exerciseId: 'ex-arm-14', customName: 'Reverse Grip Barbell Curl', targetSets: 3, targetReps: '12-15', restSeconds: 45, notes: 'Overhand grip for brachioradialis' },
          { exerciseId: 'ex-arm-15', customName: 'Wrist Curls', targetSets: 3, targetReps: '15-20', restSeconds: 30, notes: 'Forearms rested on bench' },
        ],
      },
      {
        id: 'day-sat-cardio-abs',
        dayIndex: 5,
        name: 'Saturday — Cardio + Abs (Active Recovery)',
        isRestDay: false,
        targetMuscleGroups: ['cardio', 'abs'],
        exercises: [
          { exerciseId: 'ex-cardio-01', customName: 'Incline Treadmill Walk', targetSets: 1, targetReps: '25 min (Zone 2)', restSeconds: 0, notes: '12% incline, 4.5 km/h, steady fat burn' },
          { exerciseId: 'ex-core-02', customName: 'Cable Crunch', targetSets: 3, targetReps: '15-20', restSeconds: 45, notes: 'Heavy resistance on ab wall' },
          { exerciseId: 'ex-core-03', customName: 'Ab Wheel Rollout', targetSets: 3, targetReps: '10-12', restSeconds: 60, notes: 'Full extension, prevent lower back hyperextension' },
          { exerciseId: 'ex-core-04', customName: 'Side Plank', targetSets: 3, targetReps: '45s each side', restSeconds: 45, notes: 'Squeeze obliques' },
        ],
      },
      {
        id: 'day-sun-rest',
        dayIndex: 6,
        name: 'Sunday — Rest & Recovery',
        isRestDay: true,
        targetMuscleGroups: [],
        exercises: [],
      },
    ],
  },

  // 3. ADVANCED TIER (High Volume + Supersets on Isolation Pairs + 6 Sessions)
  {
    id: 'plan-advanced-hypertrophy',
    name: 'Advanced Hypertrophy & Supersets (6-Day)',
    description: 'High-density hypertrophy program featuring antagonistic supersets, 24+ weekly sets per group, and advanced mechanical tension protocols.',
    tier: 'advanced',
    splitType: 'ppl',
    daysPerWeek: 6,
    days: [
      {
        id: 'adv-day-1',
        dayIndex: 0,
        name: 'Monday — Push Power & Density',
        isRestDay: false,
        targetMuscleGroups: ['chest', 'shoulders', 'triceps'],
        exercises: [
          { exerciseId: 'ex-chest-01', customName: 'Barbell Flat Bench Press', targetSets: 5, targetReps: '5-8', restSeconds: 120, notes: 'Heavy strength top sets' },
          { exerciseId: 'ex-chest-02', customName: 'Incline DB Press', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: 'Explosive press, 3s eccentric' },
          { exerciseId: 'ex-sh-01', customName: 'Standing Military Press', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: 'Full lock, strict overhead' },
          { exerciseId: 'ex-sh-02', customName: 'Cable Lateral Raise [SUPERSET]', targetSets: 4, targetReps: '12-15', restSeconds: 0, intensityTechnique: 'superset', notes: 'Pair with Overhead Cable Extension' },
          { exerciseId: 'ex-arm-04', customName: 'Overhead Cable Triceps Ext [SUPERSET]', targetSets: 4, targetReps: '12-15', restSeconds: 60, intensityTechnique: 'superset', notes: 'Deep triceps long head stretch' },
        ],
      },
      {
        id: 'adv-day-2',
        dayIndex: 1,
        name: 'Tuesday — Pull Power & Density',
        isRestDay: false,
        targetMuscleGroups: ['back', 'biceps'],
        exercises: [
          { exerciseId: 'ex-back-01', customName: 'Conventional Deadlift', targetSets: 4, targetReps: '5', restSeconds: 150, notes: 'Heavy power pull' },
          { exerciseId: 'ex-back-03', customName: 'Pendlay Row', targetSets: 4, targetReps: '8', restSeconds: 90, notes: 'From floor every rep, zero body english' },
          { exerciseId: 'ex-back-02', customName: 'Weighted Neutral Pull-Ups', targetSets: 4, targetReps: '6-8', restSeconds: 90, notes: 'Full hang stretch' },
          { exerciseId: 'ex-arm-01', customName: 'Incline DB Curl [SUPERSET]', targetSets: 4, targetReps: '10-12', restSeconds: 0, intensityTechnique: 'superset', notes: 'Pair with Face Pulls' },
          { exerciseId: 'ex-sh-06', customName: 'Cable Face Pulls [SUPERSET]', targetSets: 4, targetReps: '15-20', restSeconds: 60, intensityTechnique: 'superset', notes: 'Pinch rear delts' },
        ],
      },
      {
        id: 'adv-day-3',
        dayIndex: 2,
        name: 'Wednesday — Legs Quad Dominant',
        isRestDay: false,
        targetMuscleGroups: ['quads', 'calves'],
        exercises: [
          { exerciseId: 'ex-leg-01', customName: 'Barbell Back Squat', targetSets: 5, targetReps: '6-8', restSeconds: 120, notes: 'High bar, deep depth' },
          { exerciseId: 'ex-leg-02', customName: 'Hack Squat (Machine)', targetSets: 4, targetReps: '10-12', restSeconds: 90, notes: 'Full knee flexion' },
          { exerciseId: 'ex-leg-04', customName: 'Leg Extensions [DROP SET]', targetSets: 4, targetReps: '12 + drop', restSeconds: 60, intensityTechnique: 'drop_set', notes: 'Drop 30% weight at failure on final set' },
          { exerciseId: 'ex-leg-05', customName: 'Standing Calf Raise', targetSets: 5, targetReps: '15-20', restSeconds: 45, notes: 'Heavy loads with 2s bottom pause' },
        ],
      },
      {
        id: 'adv-day-4',
        dayIndex: 3,
        name: 'Thursday — Push Hypertrophy',
        isRestDay: false,
        targetMuscleGroups: ['chest', 'shoulders', 'triceps'],
        exercises: [
          { exerciseId: 'ex-chest-04', customName: 'Incline Cable Fly', targetSets: 4, targetReps: '12-15', restSeconds: 60, notes: 'Constant cable tension' },
          { exerciseId: 'ex-chest-06', customName: 'Weighted Dips', targetSets: 4, targetReps: '8-10', restSeconds: 75, notes: 'Add weight plate' },
          { exerciseId: 'ex-sh-02', customName: 'DB Lateral Raises [REST PAUSE]', targetSets: 4, targetReps: '12-15 (rest-pause)', restSeconds: 45, intensityTechnique: 'rest_pause', notes: 'Hit failure, rest 15s, push 4 more reps' },
          { exerciseId: 'ex-arm-03', customName: 'Skull Crushers', targetSets: 4, targetReps: '10-12', restSeconds: 60, notes: 'EZ-Bar strict form' },
        ],
      },
      {
        id: 'adv-day-5',
        dayIndex: 4,
        name: 'Friday — Pull Hypertrophy & Arms',
        isRestDay: false,
        targetMuscleGroups: ['back', 'biceps'],
        exercises: [
          { exerciseId: 'ex-back-04', customName: 'Chest-Supported T-Bar Row', targetSets: 4, targetReps: '10-12', restSeconds: 75, notes: 'Strict back isolation' },
          { exerciseId: 'ex-back-02', customName: 'Single-Arm Cable Lat Pulldown', targetSets: 4, targetReps: '10-12', restSeconds: 60, notes: 'Line of pull toward hip' },
          { exerciseId: 'ex-arm-02', customName: 'Spider Curl (Incline Bench)', targetSets: 4, targetReps: '12', restSeconds: 60, notes: 'Peak short head bicep contraction' },
          { exerciseId: 'ex-arm-05', customName: 'Cross-Body Hammer Curls', targetSets: 4, targetReps: '12', restSeconds: 45, notes: 'Brachialis focus' },
        ],
      },
      {
        id: 'adv-day-6',
        dayIndex: 5,
        name: 'Saturday — Legs Posterior Chain & Glutes',
        isRestDay: false,
        targetMuscleGroups: ['hamstrings', 'glutes', 'abs'],
        exercises: [
          { exerciseId: 'ex-leg-06', customName: 'Barbell Romanian Deadlift', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: 'Intense hamstring stretch' },
          { exerciseId: 'ex-leg-08', customName: 'Barbell Hip Thrust', targetSets: 4, targetReps: '10-12', restSeconds: 90, notes: '2-second top glute squeeze' },
          { exerciseId: 'ex-leg-07', customName: 'Lying Leg Curl', targetSets: 4, targetReps: '12-15', restSeconds: 60, notes: 'Slow eccentric' },
          { exerciseId: 'ex-core-01', customName: 'Hanging Windshield Wipers', targetSets: 3, targetReps: '12', restSeconds: 45, notes: 'Full rotational core control' },
        ],
      },
      {
        id: 'adv-day-7',
        dayIndex: 6,
        name: 'Sunday — Rest & Recovery',
        isRestDay: true,
        targetMuscleGroups: [],
        exercises: [],
      },
    ],
  },

  // 4. MASTER TIER (Periodized 4-Week Block Wave + 1-Week Deload + Rest-Pause & Drop Sets)
  {
    id: 'plan-master-periodized',
    name: 'Master Periodized Overload Wave (5-Day)',
    description: 'Elite periodization architecture: 4-Week progressive volume accumulation wave followed by 1-Week scheduled deload (50% volume, 70% intensity) with precision intensity techniques.',
    tier: 'master',
    splitType: 'ppl',
    daysPerWeek: 5,
    currentBlockWeek: 2,
    totalBlockWeeks: 5,
    isDeloadWeek: false,
    days: [
      {
        id: 'mas-day-1',
        dayIndex: 0,
        name: 'Monday — Push Wave (RPE 9.0)',
        isRestDay: false,
        targetMuscleGroups: ['chest', 'shoulders', 'triceps'],
        exercises: [
          { exerciseId: 'ex-chest-01', customName: 'Barbell Flat Bench Press [Periodized]', targetSets: 5, targetReps: '4-6', restSeconds: 150, intensityTechnique: 'straight_set', notes: 'Week 2 Block: 82.5% 1RM target' },
          { exerciseId: 'ex-chest-02', customName: 'Incline DB Press [Rest-Pause]', targetSets: 4, targetReps: '8-10', restSeconds: 90, intensityTechnique: 'rest_pause', notes: 'Hit failure, 15s pause, +3 reps' },
          { exerciseId: 'ex-chest-04', customName: 'Cable Crossover [Drop Set]', targetSets: 4, targetReps: '12-15', restSeconds: 60, intensityTechnique: 'drop_set', notes: 'Double drop on set 4' },
          { exerciseId: 'ex-sh-02', customName: 'Heavy DB Lateral Swings', targetSets: 4, targetReps: '15-20', restSeconds: 45, notes: 'Strict side delt overload' },
          { exerciseId: 'ex-arm-09', customName: 'Close-Grip Pin Press', targetSets: 4, targetReps: '6-8', restSeconds: 90, notes: 'Overload triceps lockout strength' },
        ],
      },
      {
        id: 'mas-day-2',
        dayIndex: 1,
        name: 'Tuesday — Pull Wave (RPE 9.0)',
        isRestDay: false,
        targetMuscleGroups: ['back', 'biceps'],
        exercises: [
          { exerciseId: 'ex-back-01', customName: 'Deficit Deadlift', targetSets: 4, targetReps: '4-6', restSeconds: 150, notes: 'Increased ROM from 2-inch riser' },
          { exerciseId: 'ex-back-03', customName: 'Weighted Chest-Supported Row', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: '2s peak rhomboid contraction' },
          { exerciseId: 'ex-back-02', customName: 'Weighted Neutral Grip Pull-Ups', targetSets: 4, targetReps: '6-8', restSeconds: 90, notes: 'Full bottom stretch' },
          { exerciseId: 'ex-arm-01', customName: 'Incline Bicep Curls [Drop Set]', targetSets: 4, targetReps: '10 + drop', restSeconds: 60, intensityTechnique: 'drop_set', notes: 'Immediate drop set to failure' },
        ],
      },
      {
        id: 'mas-day-3',
        dayIndex: 2,
        name: 'Wednesday — Active Mobility & CNS Regeneration',
        isRestDay: true,
        targetMuscleGroups: [],
        exercises: [],
      },
      {
        id: 'mas-day-4',
        dayIndex: 3,
        name: 'Thursday — Squat & Quad Wave (RPE 9.0)',
        isRestDay: false,
        targetMuscleGroups: ['quads', 'calves'],
        exercises: [
          { exerciseId: 'ex-leg-01', customName: 'Barbell Pause Squat (2s pause in hole)', targetSets: 5, targetReps: '5-6', restSeconds: 150, notes: 'Eliminate stretch reflex in hole' },
          { exerciseId: 'ex-leg-02', customName: 'Leg Press [Myo-Reps]', targetSets: 4, targetReps: '12 (Myo)', restSeconds: 90, intensityTechnique: 'rest_pause', notes: 'Activation set of 12, then 5 mini-sets of 3 reps with 5 breaths rest' },
          { exerciseId: 'ex-leg-04', customName: 'Sissy Squat / Leg Ext Tri-Set', targetSets: 4, targetReps: '15', restSeconds: 60, notes: 'Maximal distal quad stress' },
          { exerciseId: 'ex-leg-05', customName: 'Donkey Calf Raise', targetSets: 5, targetReps: '20', restSeconds: 45, notes: '3-second deep stretch' },
        ],
      },
      {
        id: 'mas-day-5',
        dayIndex: 4,
        name: 'Friday — Posterior Chain & Hypertrophy Wave',
        isRestDay: false,
        targetMuscleGroups: ['hamstrings', 'shoulders', 'biceps', 'triceps'],
        exercises: [
          { exerciseId: 'ex-leg-06', customName: 'Snatch-Grip RDL', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: 'Wider grip increases upper back and glute demand' },
          { exerciseId: 'ex-sh-01', customName: 'Seated DB Shoulder Press', targetSets: 4, targetReps: '8-10', restSeconds: 90, notes: 'Heavy pressing' },
          { exerciseId: 'ex-arm-02', customName: 'EZ-Bar Preacher 21s', targetSets: 3, targetReps: '21s (7 bot / 7 top / 7 full)', restSeconds: 75, notes: 'Insane metabolic pump' },
          { exerciseId: 'ex-arm-04', customName: 'Overhead Cable Ext [Rest Pause]', targetSets: 4, targetReps: '12 + RP', restSeconds: 60, intensityTechnique: 'rest_pause', notes: 'Rest pause technique' },
        ],
      },
      {
        id: 'mas-day-6',
        dayIndex: 5,
        name: 'Saturday — Rest & Recovery',
        isRestDay: true,
        targetMuscleGroups: [],
        exercises: [],
      },
      {
        id: 'mas-day-7',
        dayIndex: 6,
        name: 'Sunday — Rest & Recovery',
        isRestDay: true,
        targetMuscleGroups: [],
        exercises: [],
      },
    ],
  },
];

/**
 * Calculates Day 1 Starting Weights tailored to user's body stats (Weight, Gender, Body Type & Goal)
 */
export function calculatePersonalizedStartingWeights(
  bodyweightKg: number = 80,
  bodyType: 'ectomorph' | 'mesomorph' | 'endomorph' = 'mesomorph',
  experience: TrainingTier = 'intermediate'
): Record<string, number> {
  const typeMultiplier = bodyType === 'mesomorph' ? 1.05 : bodyType === 'endomorph' ? 1.1 : 0.95;
  const expMultiplier = experience === 'beginner' ? 0.65 : experience === 'intermediate' ? 0.85 : experience === 'advanced' ? 1.05 : 1.25;

  return {
    barbellBenchPressKg: Math.round(((bodyweightKg * 0.75 * expMultiplier * typeMultiplier) / 2.5)) * 2.5,
    barbellBackSquatKg: Math.round(((bodyweightKg * 0.95 * expMultiplier * typeMultiplier) / 2.5)) * 2.5,
    barbellDeadliftKg: Math.round(((bodyweightKg * 1.15 * expMultiplier * typeMultiplier) / 2.5)) * 2.5,
    overheadPressKg: Math.round(((bodyweightKg * 0.50 * expMultiplier * typeMultiplier) / 2.5)) * 2.5,
    dumbbellPressKgPerHand: Math.round(((bodyweightKg * 0.28 * expMultiplier * typeMultiplier) / 2)) * 2,
    barbellBicepCurlKg: Math.round(((bodyweightKg * 0.35 * expMultiplier * typeMultiplier) / 2.5)) * 2.5,
  };
}

/**
 * Strength Standards Level-Up Checker:
 * Analyzes user's logged estimated 1RMs against bodyweight-relative standards
 * and nudges them to consider graduating to the next tier!
 */
export function checkTierGraduationNudge(
  currentTier: TrainingTier,
  bodyweightKg: number,
  bestBench1RM: number,
  bestSquat1RM: number,
  bestDeadlift1RM: number
): { shouldNudge: boolean; recommendedTier: TrainingTier; message: string } {
  const benchRatio = bestBench1RM / (bodyweightKg || 80);
  const squatRatio = bestSquat1RM / (bodyweightKg || 80);
  const deadliftRatio = bestDeadlift1RM / (bodyweightKg || 80);

  if (currentTier === 'beginner') {
    if (benchRatio >= 0.75 || squatRatio >= 1.0 || deadliftRatio >= 1.25) {
      return {
        shouldNudge: true,
        recommendedTier: 'intermediate',
        message: `🏆 Strength Milestone! Your 1RM ratios (${benchRatio.toFixed(2)}x BW Bench, ${squatRatio.toFixed(2)}x BW Squat) surpass beginner baselines. Ready to graduate to the 6-Day Intermediate Hypertrophy Split?`,
      };
    }
  } else if (currentTier === 'intermediate') {
    if (benchRatio >= 1.25 && squatRatio >= 1.5 && deadliftRatio >= 1.85) {
      return {
        shouldNudge: true,
        recommendedTier: 'advanced',
        message: `🔥 Elite Strength Achieved! You hit ${benchRatio.toFixed(2)}x BW Bench & ${deadliftRatio.toFixed(2)}x BW Deadlift. Level up to the Advanced High-Volume & Supersets Split?`,
      };
    }
  } else if (currentTier === 'advanced') {
    if (benchRatio >= 1.55 && squatRatio >= 2.0 && deadliftRatio >= 2.35) {
      return {
        shouldNudge: true,
        recommendedTier: 'master',
        message: `👑 Master Strength Standard! You've achieved elite powerlifting/bodybuilding standards. Unlock Master 4-Week Overload Waves & Periodized Deload Blocks?`,
      };
    }
  }

  return {
    shouldNudge: false,
    recommendedTier: currentTier,
    message: '',
  };
}
