import { Exercise } from '../types';

export const EXERCISES_DATABASE: Exercise[] = [
  // ==================== CHEST (1-15) ====================
  {
    id: 'ex-chest-01',
    name: 'Barbell Flat Bench Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Lie flat on the bench with eyes under the barbell.',
      'Grip the bar slightly wider than shoulder-width with wrists straight.',
      'Unrack the bar and stabilize over your upper chest.',
      'Lower the bar with controlled tempo to your mid-chest, keeping elbows tucked at ~45-75 degrees.',
      'Press the bar explosively back to starting position without bouncing off your chest.'
    ],
    tips: ['Keep shoulder blades retracted and depressed against the bench throughout the lift.', 'Plant feet firmly on the floor for leg drive.']
  },
  {
    id: 'ex-chest-02',
    name: 'Incline Dumbbell Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Set an adjustable bench to a 30-45 degree incline.',
      'Sit back with dumbbells at shoulder level, palms facing forward.',
      'Press the dumbbells upward until arms are almost fully extended.',
      'Lower slowly under control until you feel a deep stretch in the upper pectorals.'
    ],
    tips: ['Avoid excessive arching that turns the movement into a flat press.']
  },
  {
    id: 'ex-chest-03',
    name: 'Decline Barbell Bench Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Secure your legs under the padded rollers on a decline bench.',
      'Grip the bar with medium width, unrack, and lower to the lower chest line.',
      'Press powerfully upward to lockout.'
    ],
    tips: ['Emphasizes the lower sternal head of the chest.']
  },
  {
    id: 'ex-chest-04',
    name: 'Cable High-to-Low Flyes',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders'],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Set cable pulleys at the highest pin.',
      'Step forward into a staggered stance, arms slightly bent.',
      'Bring handles downward and together in an arcing motion, squeezing the lower chest.',
      'Slowly return to the starting stretched position.'
    ],
    tips: ['Keep a slight bend in the elbows to protect the biceps tendon.']
  },
  {
    id: 'ex-chest-05',
    name: 'Incline Cable Flyes',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders'],
    equipment: 'cable',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Position an incline bench between low cable pulleys.',
      'Grasp the handles and arc your hands upward and together over your upper chest.',
      'Hold the peak contraction for 1 second before lowering.'
    ],
    tips: ['Focus on bringing the inner elbows together.']
  },
  {
    id: 'ex-chest-06',
    name: 'Chest Dips',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    category: 'strength',
    instructions: [
      'Support yourself on parallel bars with arms locked.',
      'Lean your torso forward at a 30-degree angle and flare elbows slightly outward.',
      'Lower yourself until upper arms are parallel to the floor.',
      'Press back up, focusing on contracting the lower chest.'
    ],
    tips: ['Leaning forward shifts emphasis from triceps to chest.']
  },
  {
    id: 'ex-chest-07',
    name: 'Flat Dumbbell Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Lie on a flat bench with a dumbbell in each hand at chest level.',
      'Press upward in a slight converging arc without banging the weights together.',
      'Lower with control for a full chest stretch.'
    ]
  },
  {
    id: 'ex-chest-08',
    name: 'Pec Deck Machine Fly',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders'],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Adjust the seat height so handles align with mid-chest level.',
      'Keep back flat against pad and push pads/handles together in front of you.',
      'Squeeze chest at the top and return slowly.'
    ]
  },
  {
    id: 'ex-chest-09',
    name: 'Push-Ups (Standard)',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps', 'abs'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: [
      'Place hands slightly wider than shoulder-width, body in a rigid plank.',
      'Lower your chest until it touches the ground.',
      'Push back up through your palms maintaining core engagement.'
    ]
  },
  {
    id: 'ex-chest-10',
    name: 'Incline Barbell Bench Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Lie on an incline bench angled at ~30 degrees.',
      'Unrack barbell and lower with control to upper clavicle area.',
      'Drive weight upward in a smooth bar path.'
    ]
  },
  {
    id: 'ex-chest-11',
    name: 'Dumbbell Pullover',
    primaryMuscle: 'chest',
    secondaryMuscles: ['back', 'triceps'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Lie perpendicular across a flat bench with shoulders supported.',
      'Hold a single dumbbell overhead with both hands forming a diamond grip.',
      'Lower the dumbbell in an arc behind your head while keeping hips down.',
      'Pull the dumbbell back over your chest using your chest and serratus.'
    ]
  },
  {
    id: 'ex-chest-12',
    name: 'Machine Chest Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Sit comfortably and adjust handles to mid-chest height.',
      'Press handles forward until arms are extended.',
      'Control the return to get a safe stretch.'
    ]
  },
  {
    id: 'ex-chest-13',
    name: 'Smith Machine Incline Press',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders', 'triceps'],
    equipment: 'smith_machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Position incline bench in the center of the Smith machine track.',
      'Unrack the bar and lower slowly to upper chest.',
      'Press up against the fixed path to failure safely.'
    ]
  },
  {
    id: 'ex-chest-14',
    name: 'Diamond Push-Ups',
    primaryMuscle: 'chest',
    secondaryMuscles: ['triceps'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Form a diamond shape with index fingers and thumbs on the floor under chest.',
      'Lower chest towards hands and push back up.'
    ]
  },
  {
    id: 'ex-chest-15',
    name: 'Low-to-High Cable Crossover',
    primaryMuscle: 'chest',
    secondaryMuscles: ['shoulders'],
    equipment: 'cable',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Set cables to lowest position.',
      'Scoop arms upward and inward towards nose level, squeezing upper chest.'
    ]
  },

  // ==================== BACK (16-30) ====================
  {
    id: 'ex-back-01',
    name: 'Barbell Deadlift (Conventional)',
    primaryMuscle: 'back',
    secondaryMuscles: ['hamstrings', 'glutes', 'quads', 'abs'],
    equipment: 'barbell',
    difficulty: 'advanced',
    category: 'strength',
    instructions: [
      'Stand with mid-foot under the bar, feet hip-width apart.',
      'Bend over and grip the bar just outside your legs.',
      'Drop hips, pull chest up, flatten your back, and take a deep breath into core.',
      'Drive through your heels, extending knees and hips together until standing tall.',
      'Lower bar in a controlled path back to the floor.'
    ],
    tips: ['Do not round your lower spine; keep lats packed tight like bending the bar.']
  },
  {
    id: 'ex-back-02',
    name: 'Pull-Ups (Overhand)',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Grip the pull-up bar slightly wider than shoulder-width with palms facing away.',
      'Hang with arms fully extended (dead hang).',
      'Engage lats, drive elbows down toward your ribs, and pull chin over the bar.',
      'Lower with control back to full extension.'
    ]
  },
  {
    id: 'ex-back-03',
    name: 'Barbell Bent-Over Row',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Hinge at hips with torso ~45 degrees to the floor and knees slightly bent.',
      'Grip bar overhand and pull bar to lower ribcage/belly button.',
      'Squeeze shoulder blades at top, lower slowly.'
    ]
  },
  {
    id: 'ex-back-04',
    name: 'Lat Pulldown (Wide Grip)',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Sit facing the lat pulldown station with thighs secured under pads.',
      'Grasp bar with wide overhand grip and lean back slightly (10-15 degrees).',
      'Pull bar down to upper chest while driving elbows downward.',
      'Slowly allow bar to return to full stretch.'
    ]
  },
  {
    id: 'ex-back-05',
    name: 'Seated Cable Row (Close Grip)',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Attach V-bar to low pulley and sit with knees slightly bent.',
      'Pull handles into abdomen, keeping spine neutral and elbows close to torso.',
      'Pause and squeeze back muscles, then slowly extend arms forward.'
    ]
  },
  {
    id: 'ex-back-06',
    name: 'Single-Arm Dumbbell Row',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Place one knee and hand on a flat bench for support.',
      'Hold dumbbell in free hand, letting arm hang straight down.',
      'Row the dumbbell up toward your hip crease, keeping elbow tucked.',
      'Lower under control for full stretch.'
    ]
  },
  {
    id: 'ex-back-07',
    name: 'Chest-Supported T-Bar Row',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps', 'shoulders'],
    equipment: 'machine',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Lie chest-down on the padded support angled bench.',
      'Grab handles with neutral or pronated grip and row weight upward.',
      'Eliminates lower back strain for pure upper back activation.'
    ]
  },
  {
    id: 'ex-back-08',
    name: 'Straight-Arm Cable Pulldown',
    primaryMuscle: 'back',
    secondaryMuscles: ['triceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Attach a straight bar or rope to high pulley.',
      'Stand with arms extended, slight hinge at hips.',
      'Sweep bar down toward thighs in an arc using only lat contraction.'
    ]
  },
  {
    id: 'ex-back-09',
    name: 'Chin-Ups (Underhand)',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Grasp bar with underhand grip (palms facing you) shoulder-width.',
      'Pull chest up to bar focusing on biceps and lower lats.'
    ]
  },
  {
    id: 'ex-back-10',
    name: 'Hyperextensions (Back Extensions)',
    primaryMuscle: 'back',
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: [
      'Lock ankles into 45-degree hyperextension bench with hips resting on pad.',
      'Lower torso down, then raise back up to neutral spine alignment.'
    ]
  },
  {
    id: 'ex-back-11',
    name: 'Meadows Row',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps'],
    equipment: 'barbell',
    difficulty: 'advanced',
    category: 'hypertrophy',
    instructions: [
      'Stand perpendicular to a landmine barbell.',
      'Grip the thick collar end with an overhand grip and row up towards ribcage.'
    ]
  },
  {
    id: 'ex-back-12',
    name: 'Rack Pulls',
    primaryMuscle: 'back',
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Set barbell on power rack pins just below knee level.',
      'Perform lockout portion of deadlift to overload upper back and traps.'
    ]
  },
  {
    id: 'ex-back-13',
    name: 'Barbell Shrugs',
    primaryMuscle: 'back',
    secondaryMuscles: ['shoulders'],
    equipment: 'barbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hold barbell in front of thighs with shoulder-width overhand grip.',
      'Elevate shoulders straight up toward ears, hold for 1 second, lower smoothly.'
    ]
  },
  {
    id: 'ex-back-14',
    name: 'Neutral Grip Lat Pulldown',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps'],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Attach parallel grip handle to pulldown cable and pull directly to collarbones.'
    ]
  },
  {
    id: 'ex-back-15',
    name: 'Inverted Row (Australian Pull-Up)',
    primaryMuscle: 'back',
    secondaryMuscles: ['biceps'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: [
      'Hang underneath a barbell set in rack at waist height with heels on floor.',
      'Pull chest up to touch the bar.'
    ]
  },

  // ==================== SHOULDERS (31-45) ====================
  {
    id: 'ex-sh-01',
    name: 'Overhead Barbell Military Press',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps', 'abs'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Stand with feet shoulder-width, bar resting on front delts.',
      'Squeeze glutes and brace core.',
      'Press barbell vertically overhead, clearing head as bar travels upward.',
      'Lock out with head through the "window" and lower with control.'
    ]
  },
  {
    id: 'ex-sh-02',
    name: 'Seated Dumbbell Shoulder Press',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Sit on an upright 90-degree bench with dumbbells at ear height.',
      'Press dumbbells overhead until arms extend, without clinking weights together.',
      'Lower smoothly to shoulder level.'
    ]
  },
  {
    id: 'ex-sh-03',
    name: 'Dumbbell Lateral Raises',
    primaryMuscle: 'shoulders',
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hold dumbbells at sides with slight forward lean and slight elbow bend.',
      'Raise arms out to sides until elbows reach shoulder height.',
      'Lead with elbows and pour imaginary pitchers of water at the peak.'
    ]
  },
  {
    id: 'ex-sh-04',
    name: 'Cable Lateral Raise',
    primaryMuscle: 'shoulders',
    secondaryMuscles: [],
    equipment: 'cable',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Set low pulley and grab handle across your body.',
      'Raise arm laterally to shoulder height with constant tension throughout range of motion.'
    ]
  },
  {
    id: 'ex-sh-05',
    name: 'Face Pulls (Rope Attachment)',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['back'],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Set cable at eye level with rope attachment.',
      'Grip rope with thumbs back and pull toward eye level, externally rotating shoulders.',
      'Squeeze rear deltoids and upper back.'
    ]
  },
  {
    id: 'ex-sh-06',
    name: 'Bent-Over Dumbbell Rear Delt Fly',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['back'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hinge at hips until torso is almost parallel to floor.',
      'Raise dumbbells out to sides, pinching rear deltoids.'
    ]
  },
  {
    id: 'ex-sh-07',
    name: 'Arnold Press',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Start with dumbbells at chin level, palms facing chest.',
      'Rotate wrists outward as you press upward until palms face forward at top.'
    ]
  },
  {
    id: 'ex-sh-08',
    name: 'Barbell Upright Row',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['back', 'biceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Hold barbell with hands shoulder-width apart.',
      'Lift bar upward along body, leading with elbows until reaching mid-chest.'
    ]
  },
  {
    id: 'ex-sh-09',
    name: 'Dumbbell Front Raise',
    primaryMuscle: 'shoulders',
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Raise dumbbell in front of you to eye level with controlled speed.'
    ]
  },
  {
    id: 'ex-sh-10',
    name: 'Reverse Pec Deck (Machine Rear Delt)',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['back'],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Sit facing the machine pad with handles adjusted to rear position.',
      'Pull handles backward in horizontal plane squeezing rear delts.'
    ]
  },
  {
    id: 'ex-sh-11',
    name: 'Landmine Shoulder Press',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps', 'abs'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Hold one end of a landmine barbell at shoulder height.',
      'Press upward and forward in a diagonal plane.'
    ]
  },
  {
    id: 'ex-sh-12',
    name: 'Dumbbell Shrugs',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['back'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hold heavy dumbbells at sides and shrug shoulders up toward ears.'
    ]
  },
  {
    id: 'ex-sh-13',
    name: 'Pike Push-Ups',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Position body in downward dog / inverted V position.',
      'Lower crown of head toward floor and push up using shoulders.'
    ]
  },
  {
    id: 'ex-sh-14',
    name: 'Cable Front Raise with Rope',
    primaryMuscle: 'shoulders',
    secondaryMuscles: [],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Straddle low pulley cable with rope between legs and raise forward.'
    ]
  },
  {
    id: 'ex-sh-15',
    name: 'Machine Shoulder Press',
    primaryMuscle: 'shoulders',
    secondaryMuscles: ['triceps'],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Adjust seat height so handles sit at shoulder level and press vertically.'
    ]
  },

  // ==================== LEGS / QUADS / HAMSTRINGS / GLUTES / CALVES (46-70) ====================
  {
    id: 'ex-leg-01',
    name: 'Barbell Back Squat',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings', 'abs'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Place barbell across upper traps (high bar) or rear delts (low bar).',
      'Set feet shoulder-width apart with toes turned slightly outward.',
      'Brace core, push hips back and knees out, descending until hip crease is below knee.',
      'Drive powerfully through mid-foot back to standing.'
    ],
    tips: ['Keep chest up and knees tracking in line with toes.']
  },
  {
    id: 'ex-leg-02',
    name: 'Barbell Front Squat',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'abs'],
    equipment: 'barbell',
    difficulty: 'advanced',
    category: 'strength',
    instructions: [
      'Rest bar across anterior deltoids in clean rack grip or crossed arms.',
      'Squat deep with vertical torso posture to maximize quad focus.'
    ]
  },
  {
    id: 'ex-leg-03',
    name: 'Romanian Deadlift (Barbell RDL)',
    primaryMuscle: 'hamstrings',
    secondaryMuscles: ['glutes', 'back'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Hold bar at hip height, soft bend in knees.',
      'Hinge back at hips, lowering bar along shins until hamstrings are fully stretched.',
      'Drive hips forward and squeeze glutes at top.'
    ]
  },
  {
    id: 'ex-leg-04',
    name: 'Barbell Hip Thrust',
    primaryMuscle: 'glutes',
    secondaryMuscles: ['hamstrings'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Sit on floor with upper back against bench and padded barbell across hips.',
      'Plant feet flat and drive hips upward until thighs and torso align horizontally.',
      'Hard glute squeeze at top lockout.'
    ]
  },
  {
    id: 'ex-leg-05',
    name: 'Leg Press (45 Degree)',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes'],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Place feet shoulder-width in middle of sled platform.',
      'Lower sled until knees reach 90 degrees without rounding lower back.',
      'Press sled up without locking knees aggressively.'
    ]
  },
  {
    id: 'ex-leg-06',
    name: 'Bulgarian Split Squats (Dumbbells)',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Elevate rear foot on a bench behind you.',
      'Lower back knee down toward floor keeping front shin relatively upright.',
      'Drive through front heel to return to top.'
    ]
  },
  {
    id: 'ex-leg-07',
    name: 'Seated Leg Extension',
    primaryMuscle: 'quads',
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Align machine axis with knee joint and pad against lower shin.',
      'Extend legs to full lockout, squeeze quads, and lower under control.'
    ]
  },
  {
    id: 'ex-leg-08',
    name: 'Lying Hamstring Leg Curl',
    primaryMuscle: 'hamstrings',
    secondaryMuscles: ['calves'],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Lie face down on bench with pad positioned behind ankles.',
      'Curl heels toward glutes, pause, and slowly extend.'
    ]
  },
  {
    id: 'ex-leg-09',
    name: 'Seated Hamstring Leg Curl',
    primaryMuscle: 'hamstrings',
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Adjust back support and lock lap pad down snugly.',
      'Curl legs down and back, maintaining continuous tension.'
    ]
  },
  {
    id: 'ex-leg-10',
    name: 'Standing Calf Raise',
    primaryMuscle: 'calves',
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Place balls of feet on block with heels hanging off.',
      'Lower heels for a deep 2-second stretch, then explode onto toes.'
    ]
  },
  {
    id: 'ex-leg-11',
    name: 'Seated Calf Raise',
    primaryMuscle: 'calves',
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Sit with thighs secured under pad (soleus isolation).',
      'Perform full range calf raises.'
    ]
  },
  {
    id: 'ex-leg-12',
    name: 'Walking Dumbbell Lunges',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'hamstrings'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Take a long step forward, lowering back knee until hovering above floor.',
      'Step through to the next repetition smoothly.'
    ]
  },
  {
    id: 'ex-leg-13',
    name: 'Hack Squat (Machine)',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes'],
    equipment: 'machine',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Position back flat against sled backrest with shoulders under pads.',
      'Squat deep into knees and drive up through heels.'
    ]
  },
  {
    id: 'ex-leg-14',
    name: 'Goblet Squat (Kettlebell / Dumbbell)',
    primaryMuscle: 'quads',
    secondaryMuscles: ['glutes', 'abs'],
    equipment: 'kettlebell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hold kettlebell close to chest with both hands.',
      'Squat between your legs with upright posture.'
    ]
  },
  {
    id: 'ex-leg-15',
    name: 'Sumo Deadlift',
    primaryMuscle: 'glutes',
    secondaryMuscles: ['quads', 'hamstrings', 'back'],
    equipment: 'barbell',
    difficulty: 'advanced',
    category: 'strength',
    instructions: [
      'Set wide stance with toes pointed outward at 45 degrees.',
      'Grip bar inside legs and drive knees outward as you stand.'
    ]
  },

  // ==================== ARMS (BICEPS & TRICEPS) (71-85) ====================
  {
    id: 'ex-arm-01',
    name: 'Barbell Biceps Curl',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'barbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Stand upright holding bar with shoulder-width underhand grip.',
      'Keep elbows pinned at sides and curl bar toward shoulders.',
      'Squeeze biceps at peak and lower with full 3-second eccentric.'
    ]
  },
  {
    id: 'ex-arm-02',
    name: 'Incline Dumbbell Curl',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Sit on an incline bench at 45-60 degrees letting arms hang straight down.',
      'Curl dumbbells upward with supination for deep long-head stretch.'
    ]
  },
  {
    id: 'ex-arm-03',
    name: 'Dumbbell Hammer Curls',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hold dumbbells with neutral palms-facing-inward grip.',
      'Curl dumbbells up, targeting the brachialis and forearm flexors.'
    ]
  },
  {
    id: 'ex-arm-04',
    name: 'Preacher Curl (EZ Bar)',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'barbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Rest upper arms flat on preacher pad.',
      'Curl EZ bar upward and lower under control to full elbow extension.'
    ]
  },
  {
    id: 'ex-arm-05',
    name: 'Cable Rope Biceps Curl',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Attach rope to low pulley and spread rope apart at top of curl.'
    ]
  },
  {
    id: 'ex-arm-06',
    name: 'Triceps Rope Pushdown',
    primaryMuscle: 'triceps',
    secondaryMuscles: [],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Attach rope to high pulley, elbows locked at sides.',
      'Push rope downward, spreading ends apart at bottom for lateral head lockout.'
    ]
  },
  {
    id: 'ex-arm-07',
    name: 'Skull Crushers (Lying EZ Bar Triceps Extension)',
    primaryMuscle: 'triceps',
    secondaryMuscles: [],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Lie on flat bench holding EZ bar overhead.',
      'Hinge at elbows to lower bar towards forehead/crown of head.',
      'Extend triceps back to vertical.'
    ]
  },
  {
    id: 'ex-arm-08',
    name: 'Overhead Cable Triceps Extension',
    primaryMuscle: 'triceps',
    secondaryMuscles: [],
    equipment: 'cable',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Set cable at chest/shoulder height and step forward.',
      'Extend arms overhead to stretch long head of triceps.'
    ]
  },
  {
    id: 'ex-arm-09',
    name: 'Close-Grip Barbell Bench Press',
    primaryMuscle: 'triceps',
    secondaryMuscles: ['chest', 'shoulders'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Grip barbell shoulder-width apart.',
      'Lower bar to sternum keeping elbows tucked tightly along ribs, then press up.'
    ]
  },
  {
    id: 'ex-arm-10',
    name: 'Concentration Curls',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Sit on bench with elbow braced against inner thigh, curl dumbbell to chin.'
    ]
  },
  {
    id: 'ex-arm-11',
    name: 'Triceps Dips (Bench / Parallel Bars)',
    primaryMuscle: 'triceps',
    secondaryMuscles: ['chest', 'shoulders'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Keep torso upright and elbows tucked straight back to emphasize triceps.'
    ]
  },
  {
    id: 'ex-arm-12',
    name: 'Single-Arm Cable Triceps Kickback',
    primaryMuscle: 'triceps',
    secondaryMuscles: [],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hinge forward with cable and kick arm back into full extension.'
    ]
  },
  {
    id: 'ex-arm-13',
    name: 'Spider Curl',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'barbell',
    difficulty: 'intermediate',
    category: 'hypertrophy',
    instructions: [
      'Lie chest-down on incline bench, curl barbell with arms hanging vertically.'
    ]
  },
  {
    id: 'ex-arm-14',
    name: 'Reverse Barbell Forearm Curl',
    primaryMuscle: 'biceps',
    secondaryMuscles: [],
    equipment: 'barbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Curl barbell with overhand pronated grip to build forearms and brachioradialis.'
    ]
  },
  {
    id: 'ex-arm-15',
    name: 'Single-Arm Dumbbell Overhead Triceps Extension',
    primaryMuscle: 'triceps',
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Hold dumbbell behind head with single arm and press upward to lockout.'
    ]
  },

  // ==================== CORE / ABS (86-95) ====================
  {
    id: 'ex-core-01',
    name: 'Hanging Leg Raises',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    category: 'strength',
    instructions: [
      'Hang from pull-up bar with straight arms.',
      'Curl pelvis up and raise straight legs to parallel or bar height.'
    ]
  },
  {
    id: 'ex-core-02',
    name: 'Cable Kneeling Crunch',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'cable',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Kneel below high pulley holding rope by ears.',
      'Flex spine downward, bringing elbows toward knees.'
    ]
  },
  {
    id: 'ex-core-03',
    name: 'Ab Wheel Rollout',
    primaryMuscle: 'abs',
    secondaryMuscles: ['shoulders', 'back'],
    equipment: 'bodyweight',
    difficulty: 'advanced',
    category: 'strength',
    instructions: [
      'Kneel on floor holding ab roller handles.',
      'Roll wheel forward extending body, brace core, and pull back with abs.'
    ]
  },
  {
    id: 'ex-core-04',
    name: 'Standard Plank',
    primaryMuscle: 'abs',
    secondaryMuscles: ['shoulders', 'glutes'],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: [
      'Rest on forearms and toes with straight bodyline, squeezing abs and glutes.'
    ]
  },
  {
    id: 'ex-core-05',
    name: 'Russian Twists',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Sit with knees bent, feet off floor, and rotate weight side to side.'
    ]
  },
  {
    id: 'ex-core-06',
    name: 'Decline Bench Sit-Ups',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: [
      'Hook legs into decline bench and perform full contraction sit-ups.'
    ]
  },
  {
    id: 'ex-core-07',
    name: 'Bicycle Crunches',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'hypertrophy',
    instructions: [
      'Alternate touching opposite elbow to opposite knee with legs pedaling.'
    ]
  },
  {
    id: 'ex-core-08',
    name: 'Side Plank',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'strength',
    instructions: [
      'Support weight on one forearm and side of feet, holding hips high.'
    ]
  },
  {
    id: 'ex-core-09',
    name: 'Dead Bug',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'bodyweight',
    difficulty: 'beginner',
    category: 'mobility',
    instructions: [
      'Lie on back and lower opposite arm and leg while pressing lumbar spine to floor.'
    ]
  },
  {
    id: 'ex-core-10',
    name: 'Captain’s Chair Knee Raise',
    primaryMuscle: 'abs',
    secondaryMuscles: [],
    equipment: 'machine',
    difficulty: 'beginner',
    category: 'strength',
    instructions: [
      'Rest forearms on parallel tower pads and lift knees up to chest.'
    ]
  },

  // ==================== CARDIO & FULL BODY (96-105) ====================
  {
    id: 'ex-car-01',
    name: 'Treadmill Incline Walk',
    primaryMuscle: 'cardio',
    secondaryMuscles: ['calves', 'glutes'],
    equipment: 'cardio',
    difficulty: 'beginner',
    category: 'cardio',
    instructions: ['Walk at 12% incline, 3.0 mph for steady state fat burning.']
  },
  {
    id: 'ex-car-02',
    name: 'StairMaster Climber',
    primaryMuscle: 'cardio',
    secondaryMuscles: ['quads', 'glutes', 'calves'],
    equipment: 'cardio',
    difficulty: 'intermediate',
    category: 'cardio',
    instructions: ['Climb stairs without leaning heavily on handrails.']
  },
  {
    id: 'ex-car-03',
    name: 'Rowing Machine (Ergometer)',
    primaryMuscle: 'full_body',
    secondaryMuscles: ['back', 'quads', 'biceps'],
    equipment: 'cardio',
    difficulty: 'intermediate',
    category: 'cardio',
    instructions: ['Drive with legs first, lean back with torso, pull handle to chest.']
  },
  {
    id: 'ex-car-04',
    name: 'Jump Rope (Skipping)',
    primaryMuscle: 'cardio',
    secondaryMuscles: ['calves', 'shoulders'],
    equipment: 'cardio',
    difficulty: 'beginner',
    category: 'cardio',
    instructions: ['Perform steady bounds on the balls of feet with minimal arm swing.']
  },
  {
    id: 'ex-car-05',
    name: 'Assault / Air Bike Sprint',
    primaryMuscle: 'full_body',
    secondaryMuscles: ['quads', 'shoulders', 'chest'],
    equipment: 'cardio',
    difficulty: 'advanced',
    category: 'cardio',
    instructions: ['Push and pull handles vigorously while pedaling for HIIT intervals.']
  },
  {
    id: 'ex-car-06',
    name: 'Kettlebell Swings',
    primaryMuscle: 'glutes',
    secondaryMuscles: ['hamstrings', 'back', 'shoulders'],
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    category: 'strength',
    instructions: ['Hinge at hips and explosively snap hips forward to swing kettlebell to chest height.']
  },
  {
    id: 'ex-car-07',
    name: 'Burpees',
    primaryMuscle: 'full_body',
    secondaryMuscles: ['chest', 'quads', 'abs'],
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    category: 'cardio',
    instructions: ['Drop into pushup position, kick feet back, perform pushup, jump up with hands overhead.']
  }
];

export const MUSCLE_GROUPS_LIST = [
  { id: 'all', label: 'All' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'quads', label: 'Quads' },
  { id: 'hamstrings', label: 'Hamstrings' },
  { id: 'glutes', label: 'Glutes' },
  { id: 'biceps', label: 'Biceps' },
  { id: 'triceps', label: 'Triceps' },
  { id: 'abs', label: 'Core / Abs' },
  { id: 'calves', label: 'Calves' },
  { id: 'cardio', label: 'Cardio' },
];

export const EQUIPMENT_LIST = [
  { id: 'all', label: 'All' },
  { id: 'barbell', label: 'Barbell' },
  { id: 'dumbbell', label: 'Dumbbell' },
  { id: 'cable', label: 'Cable' },
  { id: 'machine', label: 'Machine' },
  { id: 'bodyweight', label: 'Bodyweight' },
  { id: 'smith_machine', label: 'Smith' },
  { id: 'kettlebell', label: 'Kettlebell' },
  { id: 'cardio', label: 'Cardio' },
];
