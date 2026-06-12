export const SITE_NAME = 'Pogo Tunes'
export const SITE_DESCRIPTION = 'Fun learning songs, videos, and activities for toddlers and young children — alphabets, numbers, colors, phonics, Hindi, and more!'
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
export const SITE_LOGO = '/images/logo.svg'

export const CATEGORIES = [
  { name: 'Mathematics', slug: 'mathematics', icon: 'calculator', color: '#FF6B6B' },
  { name: 'English Language', slug: 'english-language', icon: 'book-open', color: '#6BCBFF' },
  { name: 'Science', slug: 'science', icon: 'flask', color: '#51CF66' },
  { name: 'Reading', slug: 'reading', icon: 'book', color: '#6C63FF' },
  { name: 'Writing', slug: 'writing', icon: 'edit', color: '#FFD93D' },
  { name: 'Spelling', slug: 'spelling', icon: 'type', color: '#FF6B6B' },
  { name: 'Vocabulary', slug: 'vocabulary', icon: 'book-marked', color: '#6BCBFF' },
  { name: 'Grammar', slug: 'grammar', icon: 'pencil-line', color: '#51CF66' },
  { name: 'Phonics', slug: 'phonics', icon: 'languages', color: '#6C63FF' },
  { name: 'Geography', slug: 'geography', icon: 'globe', color: '#FFD93D' },
  { name: 'History', slug: 'history', icon: 'landmark', color: '#FF6B6B' },
  { name: 'Art', slug: 'art', icon: 'palette', color: '#6BCBFF' },
  { name: 'Music', slug: 'music', icon: 'music', color: '#51CF66' },
  { name: 'Coding', slug: 'coding', icon: 'code', color: '#6C63FF' },
  { name: 'Logic & Puzzles', slug: 'logic-puzzles', icon: 'puzzle', color: '#FFD93D' },
  { name: 'Memory', slug: 'memory', icon: 'brain', color: '#FF6B6B' },
  { name: 'Colors & Shapes', slug: 'colors-shapes', icon: 'shapes', color: '#6BCBFF' },
  { name: 'Numbers', slug: 'numbers', icon: 'hash', color: '#51CF66' },
  { name: 'Alphabet', slug: 'alphabet', icon: 'sigma', color: '#6C63FF' },
  { name: 'Animals', slug: 'animals', icon: 'paw-print', color: '#FFD93D' },
  { name: 'Nature', slug: 'nature', icon: 'tree', color: '#FF6B6B' },
  { name: 'Space', slug: 'space', icon: 'rocket', color: '#6BCBFF' },
  { name: 'Body & Health', slug: 'body-health', icon: 'heart', color: '#51CF66' },
  { name: 'Food & Nutrition', slug: 'food-nutrition', icon: 'apple', color: '#6C63FF' },
  { name: 'Social Skills', slug: 'social-skills', icon: 'users', color: '#FFD93D' },
  { name: 'Emotions', slug: 'emotions', icon: 'smile', color: '#FF6B6B' },
  { name: 'Life Skills', slug: 'life-skills', icon: 'sparkles', color: '#6BCBFF' },
  { name: 'Foreign Languages', slug: 'foreign-languages', icon: 'globe-2', color: '#51CF66' },
  { name: 'Hindi', slug: 'hindi', icon: 'languages', color: '#FF6B6B' },
  { name: 'Fruits', slug: 'fruits', icon: 'apple', color: '#51CF66' },
  { name: 'Vegetables', slug: 'vegetables', icon: 'sprout', color: '#6BCBFF' },
  { name: 'Environment', slug: 'environment', icon: 'leaf', color: '#6C63FF' },
  { name: 'Technology', slug: 'technology', icon: 'monitor', color: '#FFD93D' },
  { name: 'Critical Thinking', slug: 'critical-thinking', icon: 'lightbulb', color: '#FF6B6B' },
  { name: 'Problem Solving', slug: 'problem-solving', icon: 'target', color: '#6BCBFF' },
]

export const DIFFICULTIES = ['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT'] as const

export const LESSON_TYPES = ['VIDEO', 'ARTICLE', 'QUIZ', 'GAME', 'FLASHCARD', 'PRACTICE'] as const

export const QUIZ_TYPES = ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'MATCH', 'FILL_BLANKS', 'DRAG_DROP', 'MEMORY', 'IMAGE_QUIZ', 'TIMED'] as const

export const GAME_TYPES = ['MEMORY', 'PUZZLE', 'SORTING', 'MATCHING', 'DRAG_DROP', 'TAP', 'SPEED', 'SPELLING', 'COUNTING', 'COLOR', 'SHAPE', 'MAZE'] as const

export const ACHIEVEMENTS = [
  { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', xpReward: 50, coinReward: 10, starsReward: 1 },
  { id: 'quick-learner', name: 'Quick Learner', description: 'Complete 5 lessons', icon: '⚡', xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: 'knowledge-seeker', name: 'Knowledge Seeker', description: 'Complete 25 lessons', icon: '📚', xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: 'scholar', name: 'Scholar', description: 'Complete 100 lessons', icon: '🎓', xpReward: 500, coinReward: 100, starsReward: 10 },
  { id: 'quiz-master', name: 'Quiz Master', description: 'Score 100% on any quiz', icon: '🏆', xpReward: 200, coinReward: 50, starsReward: 5 },
  { id: 'streak-3', name: 'On a Roll', description: 'Maintain a 3-day streak', icon: '🔥', xpReward: 75, coinReward: 15, starsReward: 2 },
  { id: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '💪', xpReward: 200, coinReward: 50, starsReward: 5 },
  { id: 'streak-30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '👑', xpReward: 1000, coinReward: 200, starsReward: 20 },
  { id: 'game-whiz', name: 'Game Whiz', description: 'Play 10 games', icon: '🎮', xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: 'video-binger', name: 'Video Learner', description: 'Watch 20 videos', icon: '🎬', xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: 'flashcard-fan', name: 'Flashcard Fan', description: 'Review 50 flashcards', icon: '🃏', xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: 'perfect-week', name: 'Perfect Week', description: 'Complete at least one lesson every day for a week', icon: '⭐', xpReward: 300, coinReward: 75, starsReward: 7 },
  { id: 'collector', name: 'Collector', description: 'Earn 10 achievements', icon: '💎', xpReward: 500, coinReward: 100, starsReward: 10 },
  { id: 'speed-demon', name: 'Speed Demon', description: 'Complete a timed quiz with 100% accuracy', icon: '⏱️', xpReward: 300, coinReward: 75, starsReward: 5 },
  { id: 'math-wizard', name: 'Math Wizard', description: 'Complete 20 math lessons', icon: '🔢', xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: 'reading-star', name: 'Reading Star', description: 'Complete 20 reading lessons', icon: '📖', xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: 'science-explorer', name: 'Science Explorer', description: 'Complete 20 science lessons', icon: '🔬', xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: 'coding-ninja', name: 'Coding Ninja', description: 'Complete 10 coding lessons', icon: '💻', xpReward: 300, coinReward: 75, starsReward: 5 },
  { id: 'music-maestro', name: 'Music Maestro', description: 'Complete 10 music lessons', icon: '🎵', xpReward: 200, coinReward: 50, starsReward: 3 },
  { id: 'art-enthusiast', name: 'Art Enthusiast', description: 'Complete 10 art lessons', icon: '🎨', xpReward: 200, coinReward: 50, starsReward: 3 },
]

export const LEVELS = Array.from({ length: 100 }, (_, i) => ({
  level: i + 1,
  xpRequired: (i + 1) * 100,
  totalXpRequired: ((i + 1) * (i + 2) * 100) / 2,
  title: getLevelTitle(i + 1),
}))

function getLevelTitle(level: number): string {
  if (level <= 5) return 'Beginner'
  if (level <= 10) return 'Curious Mind'
  if (level <= 15) return 'Eager Learner'
  if (level <= 20) return 'Knowledge Builder'
  if (level <= 25) return 'Smart Thinker'
  if (level <= 30) return 'Rising Star'
  if (level <= 35) return 'Bright Spark'
  if (level <= 40) return 'Wise Owl'
  if (level <= 45) return 'Brain Genius'
  if (level <= 50) return 'Knowledge Master'
  if (level <= 55) return 'Learning Legend'
  if (level <= 60) return 'Super Scholar'
  if (level <= 65) return 'Intellect Icon'
  if (level <= 70) return 'Brilliant Mind'
  if (level <= 75) return 'Genius Prodigy'
  if (level <= 80) return 'Thought Leader'
  if (level <= 85) return 'Wisdom Keeper'
  if (level <= 90) return 'Enlightened Soul'
  if (level <= 95) return 'Grand Master'
  return 'Pogo Legend'
}

export const REWARDS = [
  { id: 'bronze-star', name: 'Bronze Star', cost: 100, type: 'avatar' as const },
  { id: 'silver-star', name: 'Silver Star', cost: 250, type: 'avatar' as const },
  { id: 'gold-star', name: 'Gold Star', cost: 500, type: 'avatar' as const },
  { id: 'rainbow-unicorn', name: 'Rainbow Unicorn', cost: 1000, type: 'avatar' as const },
  { id: 'space-rocket', name: 'Space Rocket', cost: 1500, type: 'avatar' as const },
  { id: 'magic-wand', name: 'Magic Wand', cost: 750, type: 'avatar' as const },
  { id: 'crown', name: 'Royal Crown', cost: 2000, type: 'avatar' as const },
  { id: 'dragon', name: 'Friendly Dragon', cost: 3000, type: 'avatar' as const },
  { id: 'bg-forest', name: 'Enchanted Forest', cost: 500, type: 'background' as const },
  { id: 'bg-ocean', name: 'Underwater World', cost: 500, type: 'background' as const },
  { id: 'bg-space', name: 'Outer Space', cost: 500, type: 'background' as const },
  { id: 'bg-castle', name: 'Magic Castle', cost: 500, type: 'background' as const },
  { id: 'theme-dark', name: 'Night Mode', cost: 200, type: 'theme' as const },
  { id: 'theme-rainbow', name: 'Rainbow Mode', cost: 400, type: 'theme' as const },
  { id: 'theme-ocean', name: 'Ocean Breeze', cost: 300, type: 'theme' as const },
]

export const NAV_LINKS = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Learn', href: '/learn', icon: 'book-open' },
  { label: 'Games', href: '/games', icon: 'gamepad-2' },
  { label: 'Flashcards', href: '/flashcards', icon: 'layers' },
  { label: 'Videos', href: '/videos', icon: 'video' },
  { label: 'Quizzes', href: '/quizzes', icon: 'help-circle' },
  { label: 'Leaderboard', href: '/leaderboard', icon: 'trophy' },
  { label: 'Blog', href: '/blog', icon: 'newspaper' },
]

export const FOOTER_LINKS = {
  learn: {
    title: 'Learn',
    links: [
      { label: 'All Lessons', href: '/learn' },
      { label: 'Mathematics', href: '/learn?category=mathematics' },
      { label: 'English', href: '/learn?category=english-language' },
      { label: 'Science', href: '/learn?category=science' },
      { label: 'Coding', href: '/learn?category=coding' },
    ],
  },
  play: {
    title: 'Play',
    links: [
      { label: 'All Games', href: '/games' },
      { label: 'Quizzes', href: '/quizzes' },
      { label: 'Flashcards', href: '/flashcards' },
      { label: 'Videos', href: '/videos' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Leaderboard', href: '/leaderboard' },
      { label: 'Achievements', href: '/achievements' },
      { label: 'Certificates', href: '/certificates' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
}

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://facebook.com/pogotunes', icon: 'facebook' },
  { name: 'Twitter', href: 'https://twitter.com/pogotunes', icon: 'twitter' },
  { name: 'Instagram', href: 'https://instagram.com/pogotunes', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com/@pogotunes', icon: 'youtube' },
  { name: 'TikTok', href: 'https://tiktok.com/@pogotunes', icon: 'music' },
]

export const COLORS = {
  coral: '#FF6B6B',
  yellow: '#FFD93D',
  skyBlue: '#6BCBFF',
  purple: '#6C63FF',
  green: '#51CF66',
  white: '#FFFFFF',
  warmCream: '#FFF8F0',
}

export const FONTS = {
  baloo: 'Baloo 2',
  fredoka: 'Fredoka',
  nunito: 'Nunito',
}

export const BREAKPOINTS = {
  xs: 320,
  sm: 375,
  md: 425,
  lg: 768,
  xl: 1024,
  '2xl': 1440,
  '4k': 3840,
}
