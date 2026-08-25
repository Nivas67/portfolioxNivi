# FitTrack — Complete Mobile Fitness & Gym Planning App

FitTrack is a cross-platform mobile fitness lifestyle application built with **React Native**, **Expo**, and **TypeScript**. It is designed for gym-goers who want a single, powerful app to manage their workout splits, log live sets with rest timers & auto-progression, follow tailored diet plans with barcode food scanning, sync smartwatch telemetry (Apple Health, Google Fit, Fitbit), and track continuous discipline with streaks and 1RM strength analytics.

---

## 🌟 Key Features

### 1. 📋 Onboarding & Precision Target Calculation
- 4-slide interactive onboarding carousel introducing workouts, diet, smartwatches, and discipline.
- **Mifflin-St Jeor Formula**: Calculates BMR, TDEE, suggested calories, and custom macro ratios (Protein / Carbs / Fat) and water intake based on your goal (*Cut / Lean Bulk / Maintain / Recomp / Endurance*).

### 2. 🏋️ Workout Planning & Live Session Mode
- **Pre-Built Splits**: 6-Day Push/Pull/Legs, 4-Day Upper/Lower, and 3-Day Full Body routines.
- **100+ Exercise Library**: Database with muscle group filtering (Chest, Back, Shoulders, Quads, Hamstrings, Glutes, Arms, Core, Cardio), equipment tags, step-by-step instructions, and form tips.
- **Live Workout Mode**:
  - High-contrast, one-handed set logging table (Weight kg/lbs, Reps, RPE 6-10).
  - Audio/Visual Rest Timer countdown bar with +/- 15s quick adjust.
  - **Auto-Progression suggestions**: Recommends weight increases when rep targets are crushed.
  - Workout Summary modal calculating total volume (kg lifted), duration, active burn, and PR highlights.
- **Custom Routine Builder**: Build, customize, and save custom splits.

### 3. 🥗 Diet, Macros & Open Food Facts API
- Daily calorie & macro target dashboard with interactive SVG circular gauge.
- 4 Meal tracking slots (*Breakfast, Lunch, Dinner, Snacks*).
- **Open Food Facts API Search**: Live search across millions of global products with automatic macro parsing.
- **Barcode Scanner**: Barcode lookup tool for instant nutrition entry.
- **Custom Food & Recipe Creator**: Save your own custom meals.
- **Hydration Tracker**: Quick-add water logger (+250ml / +500ml).
- **Diet Templates**: High-protein shred, lean bulk, recomp, and vegan options.

### 4. ⌚ Smartwatch & Wearable Sync
- Unified sync adapter for **Apple HealthKit**, **Google Fit / Health Connect**, and **Fitbit Web API**.
- Merges watch data (*Steps, Active Burned Calories, Resting Heart Rate, Sleep Duration*).
- **Net Energy Balance**: Calculates Daily Diet In minus Total Burn Out (Active Burn + BMR).
- **Heart Rate Training Zones**: Breakdown of 5 training zones (Recovery to Peak).
- Built-in live telemetry simulator for testing on any device/web browser.

### 5. 📈 Progress Analytics & Gamification
- **Weight Trend Graph**: SVG trendline tracking body weight changes and moving averages.
- **1RM Strength Progression**: Epley formula $1RM = w \times (1 + r / 30)$ tracking Bench Press, Squat, Deadlift, and Overhead Press.
- **Body Circumference Tracker**: Logs Chest, Waist, Arms, and Thigh measurements.
- **Transformation Photos**: Before & after progress photo cards.
- **Discipline Checklist & Streaks**: Daily habit checklist, streak counter, and weekly adherence score.
- **Achievement Badges**: Milestones for 10-Ton Titan, Iron Consistency, Hydration Machine, and Record Crusher.

---

## 🚀 Running the App

### Start Expo Development Server:
```bash
# In the project directory:
npx expo start
```

### Run on Web (Browser Preview):
```bash
npm run web
# or
npx expo start --web
```

### Run on Mobile (iOS / Android):
1. Install **Expo Go** from App Store or Google Play Store.
2. Run `npx expo start` and scan the terminal QR code using your phone camera (iOS) or the Expo Go app (Android).

---

## 🛠️ Architecture & Tech Stack

```
src/
├── types/          # Full TypeScript interfaces (UserProfile, WorkoutLog, FoodItem, WearableDailyData, etc.)
├── theme/          # Luxury dark mode palette (#090B10) with electric neon accents (#00F59B)
├── data/           # 100+ Seeded exercises, workout templates, diet templates, and badges
├── utils/          # BMR/TDEE calculator, Epley 1RM, date formatting, unit conversions
├── services/       # Open Food Facts API, Wearables sync, Storage service, Firebase bridge
├── store/          # Zustand state management with offline persistence
├── components/     # Reusable glassmorphic cards, charts, set row items, and widgets
├── screens/        # Auth, Dashboard, Workouts, Live Workout, Diet, Wearables, Progress, Settings
└── navigation/     # AppNavigator and TabNavigator
```
