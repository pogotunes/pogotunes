import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL!),
})

const CATEGORIES = [
  { name: "Mathematics", slug: "mathematics", icon: "calculator", color: "#FF6B6B", description: "Numbers, operations, and problem-solving skills" },
  { name: "English Language", slug: "english-language", icon: "book-open", color: "#6BCBFF", description: "Reading, writing, and communication skills" },
  { name: "Science", slug: "science", icon: "flask", color: "#51CF66", description: "Explore the natural world and scientific concepts" },
  { name: "Reading", slug: "reading", icon: "book", color: "#6C63FF", description: "Build reading comprehension and fluency" },
  { name: "Writing", slug: "writing", icon: "edit", color: "#FFD93D", description: "Develop creative and expository writing skills" },
  { name: "Spelling", slug: "spelling", icon: "type", color: "#FF6B6B", description: "Master spelling patterns and word families" },
  { name: "Vocabulary", slug: "vocabulary", icon: "book-marked", color: "#6BCBFF", description: "Expand word knowledge and usage" },
  { name: "Grammar", slug: "grammar", icon: "pencil-line", color: "#51CF66", description: "Learn sentence structure and parts of speech" },
  { name: "Phonics", slug: "phonics", icon: "languages", color: "#6C63FF", description: "Connect letters and sounds for reading" },
  { name: "Geography", slug: "geography", icon: "globe", color: "#FFD93D", description: "Explore places, cultures, and our world" },
  { name: "History", slug: "history", icon: "landmark", color: "#FF6B6B", description: "Learn about past events and civilizations" },
  { name: "Art", slug: "art", icon: "palette", color: "#6BCBFF", description: "Express creativity through visual arts" },
  { name: "Music", slug: "music", icon: "music", color: "#51CF66", description: "Discover rhythm, melody, and musical expression" },
  { name: "Coding", slug: "coding", icon: "code", color: "#6C63FF", description: "Learn programming fundamentals and logic" },
  { name: "Logic & Puzzles", slug: "logic-puzzles", icon: "puzzle", color: "#FFD93D", description: "Develop critical thinking and reasoning" },
  { name: "Memory", slug: "memory", icon: "brain", color: "#FF6B6B", description: "Strengthen memory and recall abilities" },
  { name: "Colors & Shapes", slug: "colors-shapes", icon: "shapes", color: "#6BCBFF", description: "Identify and work with colors and shapes" },
  { name: "Numbers", slug: "numbers", icon: "hash", color: "#51CF66", description: "Build number sense and counting skills" },
  { name: "Alphabet", slug: "alphabet", icon: "sigma", color: "#6C63FF", description: "Learn letters and their sounds" },
  { name: "Animals", slug: "animals", icon: "paw-print", color: "#FFD93D", description: "Discover the animal kingdom and habitats" },
  { name: "Nature", slug: "nature", icon: "tree", color: "#FF6B6B", description: "Explore plants, weather, and the outdoors" },
  { name: "Space", slug: "space", icon: "rocket", color: "#6BCBFF", description: "Journey through our solar system and beyond" },
  { name: "Body & Health", slug: "body-health", icon: "heart", color: "#51CF66", description: "Learn about the human body and staying healthy" },
  { name: "Food & Nutrition", slug: "food-nutrition", icon: "apple", color: "#6C63FF", description: "Understand food groups and healthy eating" },
  { name: "Social Skills", slug: "social-skills", icon: "users", color: "#FFD93D", description: "Build friendship and cooperation skills" },
  { name: "Emotions", slug: "emotions", icon: "smile", color: "#FF6B6B", description: "Understand and manage feelings" },
  { name: "Life Skills", slug: "life-skills", icon: "sparkles", color: "#6BCBFF", description: "Develop practical daily living skills" },
  { name: "Foreign Languages", slug: "foreign-languages", icon: "globe-2", color: "#51CF66", description: "Explore new languages and cultures" },
  { name: "Environment", slug: "environment", icon: "leaf", color: "#6C63FF", description: "Learn about ecology and protecting our planet" },
  { name: "Technology", slug: "technology", icon: "monitor", color: "#FFD93D", description: "Understand how technology shapes our world" },
  { name: "Critical Thinking", slug: "critical-thinking", icon: "lightbulb", color: "#FF6B6B", description: "Analyze, evaluate, and form reasoned arguments" },
  { name: "Problem Solving", slug: "problem-solving", icon: "target", color: "#6BCBFF", description: "Develop strategies for solving challenges" },
]

const ACHIEVEMENTS_DATA = [
  { id: "first-lesson", name: "First Steps", description: "Complete your first lesson", icon: "🎯", xpReward: 50, coinReward: 10, starsReward: 1 },
  { id: "quick-learner", name: "Quick Learner", description: "Complete 5 lessons", icon: "⚡", xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: "knowledge-seeker", name: "Knowledge Seeker", description: "Complete 25 lessons", icon: "📚", xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: "scholar", name: "Scholar", description: "Complete 100 lessons", icon: "🎓", xpReward: 500, coinReward: 100, starsReward: 10 },
  { id: "quiz-master", name: "Quiz Master", description: "Score 100% on any quiz", icon: "🏆", xpReward: 200, coinReward: 50, starsReward: 5 },
  { id: "streak-3", name: "On a Roll", description: "Maintain a 3-day streak", icon: "🔥", xpReward: 75, coinReward: 15, starsReward: 2 },
  { id: "streak-7", name: "Week Warrior", description: "Maintain a 7-day streak", icon: "💪", xpReward: 200, coinReward: 50, starsReward: 5 },
  { id: "streak-30", name: "Monthly Master", description: "Maintain a 30-day streak", icon: "👑", xpReward: 1000, coinReward: 200, starsReward: 20 },
  { id: "game-whiz", name: "Game Whiz", description: "Play 10 games", icon: "🎮", xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: "video-binger", name: "Video Learner", description: "Watch 20 videos", icon: "🎬", xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: "flashcard-fan", name: "Flashcard Fan", description: "Review 50 flashcards", icon: "🃏", xpReward: 100, coinReward: 25, starsReward: 2 },
  { id: "perfect-week", name: "Perfect Week", description: "Complete at least one lesson every day for a week", icon: "⭐", xpReward: 300, coinReward: 75, starsReward: 7 },
  { id: "collector", name: "Collector", description: "Earn 10 achievements", icon: "💎", xpReward: 500, coinReward: 100, starsReward: 10 },
  { id: "speed-demon", name: "Speed Demon", description: "Complete a timed quiz with 100% accuracy", icon: "⏱️", xpReward: 300, coinReward: 75, starsReward: 5 },
  { id: "math-wizard", name: "Math Wizard", description: "Complete 20 math lessons", icon: "🔢", xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: "reading-star", name: "Reading Star", description: "Complete 20 reading lessons", icon: "📖", xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: "science-explorer", name: "Science Explorer", description: "Complete 20 science lessons", icon: "🔬", xpReward: 250, coinReward: 50, starsReward: 5 },
  { id: "coding-ninja", name: "Coding Ninja", description: "Complete 10 coding lessons", icon: "💻", xpReward: 300, coinReward: 75, starsReward: 5 },
  { id: "music-maestro", name: "Music Maestro", description: "Complete 10 music lessons", icon: "🎵", xpReward: 200, coinReward: 50, starsReward: 3 },
  { id: "art-enthusiast", name: "Art Enthusiast", description: "Complete 10 art lessons", icon: "🎨", xpReward: 200, coinReward: 50, starsReward: 3 },
]

const MATH_LESSONS = [
  { title: "Counting to 100", slug: "counting-to-100", type: "VIDEO", difficulty: "BEGINNER", content: "Learn to count from 1 to 100 with fun examples!" },
  { title: "Addition Basics", slug: "addition-basics", type: "QUIZ", difficulty: "BEGINNER", content: "Master simple addition with numbers up to 20." },
  { title: "Subtraction Fun", slug: "subtraction-fun", type: "GAME", difficulty: "BEGINNER", content: "Practice subtraction with interactive games." },
  { title: "Multiplication Tables", slug: "multiplication-tables", type: "PRACTICE", difficulty: "EASY", content: "Learn your times tables from 1 to 12." },
  { title: "Division Discovery", slug: "division-discovery", type: "ARTICLE", difficulty: "EASY", content: "Understand division through sharing and grouping." },
  { title: "Fractions Are Easy", slug: "fractions-are-easy", type: "VIDEO", difficulty: "MEDIUM", content: "Learn about halves, thirds, and quarters." },
  { title: "Geometry Shapes", slug: "geometry-shapes", type: "FLASHCARD", difficulty: "EASY", content: "Identify 2D and 3D shapes around you." },
  { title: "Money Math", slug: "money-math", type: "PRACTICE", difficulty: "MEDIUM", content: "Count coins and make change." },
  { title: "Time Telling", slug: "time-telling", type: "VIDEO", difficulty: "EASY", content: "Learn to read analog and digital clocks." },
  { title: "Data and Charts", slug: "data-and-charts", type: "ARTICLE", difficulty: "MEDIUM", content: "Read and create bar graphs and pictographs." },
]

const ENGLISH_LESSONS = [
  { title: "The Alphabet Song", slug: "alphabet-song", type: "VIDEO", difficulty: "BEGINNER", content: "Sing along and learn the ABCs!" },
  { title: "Vowels and Consonants", slug: "vowels-consonants", type: "ARTICLE", difficulty: "BEGINNER", content: "Learn the difference between vowels and consonants." },
  { title: "Building Sentences", slug: "building-sentences", type: "PRACTICE", difficulty: "EASY", content: "Put words together to make complete sentences." },
  { title: "Story Time: The Lost Kitten", slug: "story-lost-kitten", type: "VIDEO", difficulty: "EASY", content: "Read along with this heartwarming story." },
  { title: "Parts of Speech", slug: "parts-of-speech", type: "QUIZ", difficulty: "MEDIUM", content: "Identify nouns, verbs, adjectives, and more." },
]

const SCIENCE_LESSONS = [
  { title: "The Water Cycle", slug: "water-cycle", type: "VIDEO", difficulty: "EASY", content: "Follow the journey of water through evaporation, condensation, and precipitation." },
  { title: "Plant Growth", slug: "plant-growth", type: "ARTICLE", difficulty: "BEGINNER", content: "Discover what plants need to grow." },
  { title: "Solar System Tour", slug: "solar-system-tour", type: "VIDEO", difficulty: "EASY", content: "Visit all 8 planets in our solar system." },
  { title: "States of Matter", slug: "states-of-matter", type: "GAME", difficulty: "EASY", content: "Explore solids, liquids, and gases." },
  { title: "Simple Machines", slug: "simple-machines", type: "PRACTICE", difficulty: "MEDIUM", content: "Learn about levers, pulleys, and inclined planes." },
]

const READING_LESSONS = [
  { title: "Phonics: Short A Sound", slug: "phonics-short-a", type: "VIDEO", difficulty: "BEGINNER", content: "Practice the short A sound with fun words." },
  { title: "Sight Words Level 1", slug: "sight-words-1", type: "FLASHCARD", difficulty: "BEGINNER", content: "Master the first 20 sight words." },
  { title: "Reading Comprehension: Animals", slug: "reading-animals", type: "ARTICLE", difficulty: "EASY", content: "Read about amazing animals and answer questions." },
  { title: "Rhyming Words", slug: "rhyming-words", type: "GAME", difficulty: "EASY", content: "Match words that rhyme." },
  { title: "Reading Fluency", slug: "reading-fluency", type: "PRACTICE", difficulty: "MEDIUM", content: "Practice reading aloud with expression." },
]

const CODING_LESSONS = [
  { title: "What is Code?", slug: "what-is-code", type: "VIDEO", difficulty: "BEGINNER", content: "Learn what computer code is and how it works." },
  { title: "Sequences and Order", slug: "sequences-order", type: "GAME", difficulty: "BEGINNER", content: "Put steps in the right order." },
  { title: "Patterns in Code", slug: "patterns-code", type: "PRACTICE", difficulty: "EASY", content: "Identify and create patterns like a programmer." },
  { title: "Introduction to Loops", slug: "intro-loops", type: "VIDEO", difficulty: "EASY", content: "Learn how loops repeat actions in coding." },
  { title: "Conditional Statements", slug: "conditional-statements", type: "QUIZ", difficulty: "MEDIUM", content: "Use if-then logic to make decisions." },
]

const VIDEOS_DATA: Record<string, Array<{ title: string; slug: string; url: string; description: string; duration: number; transcript?: string }>> = {
  mathematics: [
    { title: "Counting Fun 1-100", slug: "counting-fun", url: "https://www.youtube.com/watch?v=example1", description: "A fun counting video for kids", duration: 300, transcript: "Let's count together! One, two, three..." },
    { title: "Adding with Apples", slug: "adding-apples", url: "https://www.youtube.com/watch?v=example2", description: "Learn addition with apple examples", duration: 420 },
  ],
  science: [
    { title: "The Magic of Rainbows", slug: "magic-rainbows", url: "https://www.youtube.com/watch?v=example3", description: "How rainbows are made", duration: 360, transcript: "Rainbows happen when sunlight passes through water droplets..." },
    { title: "Dinosaur Discovery", slug: "dinosaur-discovery", url: "https://www.youtube.com/watch?v=example4", description: "Learn about different dinosaurs", duration: 480 },
  ],
  "english-language": [
    { title: "ABC Song", slug: "abc-song", url: "https://www.youtube.com/watch?v=example5", description: "Sing the alphabet", duration: 180 },
    { title: "Learn Opposites", slug: "learn-opposites", url: "https://www.youtube.com/watch?v=example6", description: "Big and small, hot and cold", duration: 240 },
  ],
  space: [
    { title: "The Moon Adventure", slug: "moon-adventure", url: "https://www.youtube.com/watch?v=example7", description: "Journey to the moon", duration: 420, transcript: "The moon orbits Earth every 27 days..." },
    { title: "Stars and Constellations", slug: "stars-constellations", url: "https://www.youtube.com/watch?v=example8", description: "Find constellations in the night sky", duration: 360 },
  ],
  animals: [
    { title: "Ocean Animals", slug: "ocean-animals", url: "https://www.youtube.com/watch?v=example9", description: "Discover creatures under the sea", duration: 300 },
    { title: "Farm Animals", slug: "farm-animals", url: "https://www.youtube.com/watch?v=example10", description: "Meet the animals on a farm", duration: 240 },
  ],
  history: [
    { title: "Ancient Egypt", slug: "ancient-egypt", url: "https://www.youtube.com/watch?v=example11", description: "Pyramids, pharaohs, and the Nile", duration: 480, transcript: "Ancient Egypt was one of the world's first civilizations..." },
    { title: "Knights and Castles", slug: "knights-castles", url: "https://www.youtube.com/watch?v=example12", description: "Life in medieval times", duration: 420 },
  ],
}

const QUIZZES_DATA: Record<string, Array<{ title: string; slug: string; type: string; description: string; timeLimit?: number; passingScore: number; questions: Array<{ text: string; options: string[]; correctAnswer: string; order: number; points: number; explanation?: string }> }>> = {
  mathematics: [
    {
      title: "Basic Addition Quiz", slug: "basic-addition", type: "MULTIPLE_CHOICE", description: "Test your addition skills!", timeLimit: 300, passingScore: 60,
      questions: [
        { text: "What is 2 + 3?", options: ["4", "5", "6", "7"], correctAnswer: "5", order: 0, points: 10, explanation: "2 plus 3 equals 5" },
        { text: "What is 7 + 1?", options: ["6", "7", "8", "9"], correctAnswer: "8", order: 1, points: 10, explanation: "7 plus 1 equals 8" },
        { text: "What is 4 + 6?", options: ["8", "9", "10", "11"], correctAnswer: "10", order: 2, points: 10, explanation: "4 plus 6 equals 10" },
        { text: "What is 5 + 5?", options: ["10", "11", "12", "15"], correctAnswer: "10", order: 3, points: 10, explanation: "5 plus 5 equals 10" },
        { text: "What is 9 + 3?", options: ["10", "11", "12", "13"], correctAnswer: "12", order: 4, points: 10, explanation: "9 plus 3 equals 12" },
      ],
    },
    {
      title: "True or False: Math Facts", slug: "math-true-false", type: "TRUE_FALSE", description: "Can you spot the correct facts?", passingScore: 60,
      questions: [
        { text: "The number 10 is greater than 5", options: ["True", "False"], correctAnswer: "True", order: 0, points: 10 },
        { text: "2 + 2 equals 5", options: ["True", "False"], correctAnswer: "False", order: 1, points: 10 },
        { text: "A triangle has 3 sides", options: ["True", "False"], correctAnswer: "True", order: 2, points: 10 },
        { text: "7 is an even number", options: ["True", "False"], correctAnswer: "False", order: 3, points: 10 },
        { text: "1 + 1 equals 2", options: ["True", "False"], correctAnswer: "True", order: 4, points: 10 },
      ],
    },
  ],
  science: [
    {
      title: "Science Basics", slug: "science-basics", type: "MULTIPLE_CHOICE", description: "Test your science knowledge!", timeLimit: 240, passingScore: 60,
      questions: [
        { text: "What planet do we live on?", options: ["Mars", "Venus", "Earth", "Jupiter"], correctAnswer: "Earth", order: 0, points: 10 },
        { text: "What gas do plants need to make food?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], correctAnswer: "Carbon Dioxide", order: 1, points: 10 },
        { text: "What is the largest animal on Earth?", options: ["Elephant", "Blue Whale", "Giraffe", "Bear"], correctAnswer: "Blue Whale", order: 2, points: 10 },
        { text: "What state is water in when it freezes?", options: ["Gas", "Liquid", "Solid", "Plasma"], correctAnswer: "Solid", order: 3, points: 10 },
        { text: "What do plants need to grow?", options: ["Sunlight only", "Water only", "Sunlight and water", "Nothing"], correctAnswer: "Sunlight and water", order: 4, points: 10 },
      ],
    },
  ],
  reading: [
    {
      title: "Reading Comprehension", slug: "reading-comprehension", type: "MULTIPLE_CHOICE", description: "Read and answer!", passingScore: 60,
      questions: [
        { text: "What is a noun?", options: ["An action word", "A person, place, or thing", "A describing word", "A joining word"], correctAnswer: "A person, place, or thing", order: 0, points: 10 },
        { text: "Which word rhymes with 'cat'?", options: ["Dog", "Bat", "Fish", "Bird"], correctAnswer: "Bat", order: 1, points: 10 },
        { text: "What does the word 'happy' mean?", options: ["Sad", "Angry", "Joyful", "Tired"], correctAnswer: "Joyful", order: 2, points: 10 },
      ],
    },
  ],
  history: [
    {
      title: "World History Quiz", slug: "world-history", type: "MULTIPLE_CHOICE", description: "Test your history knowledge!", passingScore: 50,
      questions: [
        { text: "Who built the pyramids?", options: ["Romans", "Greeks", "Ancient Egyptians", "Vikings"], correctAnswer: "Ancient Egyptians", order: 0, points: 10 },
        { text: "What was the first moon landing year?", options: ["1965", "1969", "1972", "1960"], correctAnswer: "1969", order: 1, points: 10 },
        { text: "Who discovered America?", options: ["Christopher Columbus", "Marco Polo", "Vasco da Gama", "Ferdinand Magellan"], correctAnswer: "Christopher Columbus", order: 2, points: 10 },
      ],
    },
  ],
  "english-language": [
    {
      title: "Grammar Basics", slug: "grammar-basics", type: "MULTIPLE_CHOICE", description: "Test your grammar!", passingScore: 60,
      questions: [
        { text: "Which is correct?", options: ["She go to school", "She goes to school", "She going school", "She go school"], correctAnswer: "She goes to school", order: 0, points: 10 },
        { text: "What is a verb?", options: ["A person", "An action word", "A place", "A thing"], correctAnswer: "An action word", order: 1, points: 10 },
      ],
    },
  ],
  coding: [
    {
      title: "Coding Concepts", slug: "coding-concepts", type: "MULTIPLE_CHOICE", description: "Test your coding knowledge!", passingScore: 60,
      questions: [
        { text: "What does a loop do?", options: ["Stops the program", "Repeats code", "Deletes code", "Draws a picture"], correctAnswer: "Repeats code", order: 0, points: 10 },
        { text: "What is an algorithm?", options: ["A type of computer", "A step-by-step plan", "A programming language", "A video game"], correctAnswer: "A step-by-step plan", order: 1, points: 10 },
        { text: "Which is a programming language?", options: ["English", "Spanish", "Python", "French"], correctAnswer: "Python", order: 2, points: 10 },
      ],
    },
  ],
}

const FLASHCARDS_DATA: Record<string, Array<{ title: string; slug: string; description: string; cards: Array<{ front: string; back: string; order: number }> }>> = {
  mathematics: [
    {
      title: "Math Facts", slug: "math-facts", description: "Essential math facts",
      cards: [
        { front: "2 + 2", back: "4", order: 0 },
        { front: "5 + 3", back: "8", order: 1 },
        { front: "10 - 4", back: "6", order: 2 },
        { front: "3 x 3", back: "9", order: 3 },
        { front: "12 ÷ 4", back: "3", order: 4 },
        { front: "7 + 8", back: "15", order: 5 },
        { front: "20 - 7", back: "13", order: 6 },
        { front: "4 x 5", back: "20", order: 7 },
      ],
    },
  ],
  "colors-shapes": [
    {
      title: "Colors & Shapes", slug: "color-shapes-cards", description: "Learn colors and shapes",
      cards: [
        { front: "🔴 Red", back: "The color of apples and strawberries", order: 0 },
        { front: "🔵 Blue", back: "The color of the sky and ocean", order: 1 },
        { front: "🟡 Yellow", back: "The color of the sun and bananas", order: 2 },
        { front: "🟢 Green", back: "The color of leaves and grass", order: 3 },
        { front: "🔺 Triangle", back: "A shape with 3 sides", order: 4 },
        { front: "⬜ Square", back: "A shape with 4 equal sides", order: 5 },
        { front: "⭕ Circle", back: "A round shape with no corners", order: 6 },
        { front: "⬟ Pentagon", back: "A shape with 5 sides", order: 7 },
      ],
    },
  ],
  animals: [
    {
      title: "Animal Facts", slug: "animal-facts", description: "Fun animal facts",
      cards: [
        { front: "🐶 Dog", back: "A loyal pet that barks", order: 0 },
        { front: "🐱 Cat", back: "A furry pet that purrs", order: 1 },
        { front: "🐘 Elephant", back: "The largest land animal", order: 2 },
        { front: "🦁 Lion", back: "King of the jungle", order: 3 },
        { front: "🐬 Dolphin", back: "A smart ocean mammal", order: 4 },
        { front: "🦅 Eagle", back: "A powerful bird of prey", order: 5 },
        { front: "🐸 Frog", back: "An amphibian that hops", order: 6 },
        { front: "🦋 Butterfly", back: "An insect with colorful wings", order: 7 },
      ],
    },
  ],
  space: [
    {
      title: "Space Explorer", slug: "space-explorer", description: "Amazing space facts",
      cards: [
        { front: "🌍 Earth", back: "Our home planet - the third from the Sun", order: 0 },
        { front: "🌙 Moon", back: "Earth's only natural satellite", order: 1 },
        { front: "☀️ Sun", back: "A star at the center of our solar system", order: 2 },
        { front: "⭐ Star", back: "A giant ball of hot gas that gives light", order: 3 },
        { front: "🚀 Rocket", back: "A vehicle that travels to space", order: 4 },
        { front: "🪐 Saturn", back: "The planet with beautiful rings", order: 5 },
        { front: "🌌 Milky Way", back: "Our home galaxy", order: 6 },
        { front: "👨‍🚀 Astronaut", back: "A person who travels to space", order: 7 },
      ],
    },
  ],
  "english-language": [
    {
      title: "Sight Words", slug: "sight-words", description: "Common sight words",
      cards: [
        { front: "the", back: "Used before nouns: the cat, the dog", order: 0 },
        { front: "and", back: "Joins words: you and me", order: 1 },
        { front: "said", back: "Past tense of say: He said hello", order: 2 },
        { front: "was", back: "Past tense of is: She was happy", order: 3 },
        { front: "were", back: "Past tense of are: They were playing", order: 4 },
        { front: "have", back: "To possess: I have a book", order: 5 },
        { front: "what", back: "Question word: What is this?", order: 6 },
        { front: "where", back: "Question word: Where are you?", order: 7 },
      ],
    },
  ],
  "logic-puzzles": [
    {
      title: "Brain Teasers", slug: "brain-teasers", description: "Fun logic puzzles",
      cards: [
        { front: "What gets wetter the more it dries?", back: "A towel", order: 0 },
        { front: "What has keys but can't open locks?", back: "A piano", order: 1 },
        { front: "What has a head and a tail but no body?", back: "A coin", order: 2 },
        { front: "What can travel around the world while staying in a corner?", back: "A stamp", order: 3 },
        { front: "What gets bigger when more is taken away?", back: "A hole", order: 4 },
        { front: "What month has 28 days?", back: "All of them", order: 5 },
      ],
    },
  ],
}

const GAMES_DATA: Record<string, Array<{ title: string; slug: string; type: string; description: string; difficulty: string; config?: Record<string, unknown> }>> = {
  mathematics: [
    { title: "Memory Match: Numbers", slug: "memory-match", type: "MEMORY", description: "Match number pairs in this memory game", difficulty: "BEGINNER", config: { pairs: 8, theme: "numbers" } },
    { title: "Counting Speed", slug: "counting-speed", type: "SPEED", description: "Count objects as fast as you can", difficulty: "EASY", config: { timeLimit: 60, maxNumber: 20 } },
  ],
  "english-language": [
    { title: "Word Match", slug: "word-match", type: "MATCHING", description: "Match words to pictures", difficulty: "BEGINNER", config: { pairs: 6, category: "words" } },
    { title: "Spelling Bee", slug: "spelling-bee", type: "SPELLING", description: "Spell words correctly", difficulty: "EASY", config: { wordCount: 10 } },
  ],
  science: [
    { title: "Science Sorting", slug: "science-sorting", type: "SORTING", description: "Sort items into science categories", difficulty: "EASY", config: { categories: ["living", "non-living"] } },
  ],
  "colors-shapes": [
    { title: "Shape Sorter", slug: "shape-sorter", type: "SORTING", description: "Sort shapes by color and type", difficulty: "BEGINNER", config: { shapes: ["circle", "square", "triangle"] } },
    { title: "Color Match", slug: "color-match", type: "COLOR", description: "Match the colors!", difficulty: "BEGINNER", config: { colors: ["red", "blue", "green", "yellow"] } },
  ],
  animals: [
    { title: "Animal Puzzle", slug: "animal-puzzle", type: "PUZZLE", description: "Complete animal puzzles", difficulty: "EASY", config: { pieces: 12, animals: ["cat", "dog", "elephant"] } },
  ],
  space: [
    { title: "Space Maze", slug: "space-maze", type: "MAZE", description: "Navigate through space mazes", difficulty: "MEDIUM", config: { levels: 5, theme: "space" } },
  ],
}

const lessonContentTemplate = (title: string, category: string) => `# ${title}

Welcome to this exciting lesson! Let's explore the wonderful world of ${category.toLowerCase()}.

## What You'll Learn

In this lesson, you will discover amazing new concepts that will help you understand ${category.toLowerCase()} better.

## Key Concepts

### Main Idea
Start with the basics and build your understanding step by step. Every great learner starts from the beginning!

### Practice Time
Try these examples yourself:
1. Think about what you already know about ${category.toLowerCase()}
2. Try the activities in this lesson
3. Ask questions if something isn't clear

### Fun Fact
Learning is like building a tower - you start with a strong foundation and add new knowledge brick by brick!

## Summary

Great job! You've completed this lesson. Keep practicing and you'll become an expert in ${category.toLowerCase()}!

## Try This

- Practice what you learned today
- Share your new knowledge with friends and family
- Come back tomorrow for another lesson!`

async function main() {
  console.log("🌱 Starting seed...")

  // Clear existing data
  console.log("Clearing existing data...")
  await prisma.userAchievement.deleteMany()
  await prisma.achievement.deleteMany()
  await prisma.quizProgress.deleteMany()
  await prisma.progress.deleteMany()
  await prisma.bookmark.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.like.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.session.deleteMany()
  await prisma.loginHistory.deleteMany()
  await prisma.userSettings.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.flashcardCard.deleteMany()
  await prisma.flashcard.deleteMany()
  await prisma.question.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.game.deleteMany()
  await prisma.video.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.category.deleteMany()
  await prisma.newsletter.deleteMany()
  await prisma.contactMessage.deleteMany()
  await prisma.pageView.deleteMany()
  await prisma.searchQuery.deleteMany()
  await prisma.adPlacement.deleteMany()
  await prisma.blog.deleteMany()
  await prisma.user.deleteMany()

  // Create test user
  console.log("Creating test user...")
  const hashedPassword = await bcrypt.hash("password123", 12)
  const testUser = await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "Test User",
      displayName: "Test User",
      password: hashedPassword,
      role: "USER",
      isActive: true,
      profile: {
        create: {
          bio: "I love learning new things!",
          age: 8,
          grade: "3rd",
          language: "en",
          xp: 450,
          coins: 230,
          stars: 12,
          level: 5,
          streak: 3,
          longestStreak: 7,
          lastActiveAt: new Date(),
          totalLessons: 15,
          totalQuizzes: 8,
          totalGames: 5,
          totalVideos: 10,
          totalPoints: 450,
          accuracy: 85,
        },
      },
      settings: {
        create: {
          theme: "dark",
          fontSize: "large",
          soundEnabled: true,
          autoPlay: true,
          emailNotifications: true,
          pushNotifications: true,
        },
      },
    },
  })
  console.log(`  Created user: ${testUser.email}`)

  // Create categories
  console.log("Creating categories...")
  const categoryMap = new Map<string, string>()

  for (const cat of CATEGORIES) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        order: CATEGORIES.indexOf(cat),
        isActive: true,
      },
    })
    categoryMap.set(cat.slug, created.id)
  }
  console.log(`  Created ${CATEGORIES.length} categories`)

  // Create lessons for specific categories
  console.log("Creating lessons...")
  const allLessonData: Record<string, Array<{ title: string; slug: string; type: string; difficulty: string; content: string }>> = {
    mathematics: MATH_LESSONS,
    "english-language": ENGLISH_LESSONS,
    science: SCIENCE_LESSONS,
    reading: READING_LESSONS,
    coding: CODING_LESSONS,
  }

  let lessonCount = 0
  for (const [catSlug, lessons] of Object.entries(allLessonData)) {
    const catId = categoryMap.get(catSlug)
    if (!catId) continue

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i]
      await prisma.lesson.create({
        data: {
          title: lesson.title,
          slug: lesson.slug,
          description: `Learn about ${lesson.title.toLowerCase()} in this fun lesson!`,
          content: lesson.content,
          categoryId: catId,
          type: lesson.type as any,
          difficulty: lesson.difficulty as any,
          status: "PUBLISHED",
          order: i,
          isFree: true,
          tags: [catSlug, lesson.difficulty.toLowerCase()],
          viewCount: Math.floor(Math.random() * 1000),
          likeCount: Math.floor(Math.random() * 100),
          publishedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000),
        },
      })
      lessonCount++
    }
  }
  console.log(`  Created ${lessonCount} lessons`)

  // Create short lessons for remaining categories
  for (const [catSlug, catId] of categoryMap) {
    if (allLessonData[catSlug]) continue
    const shortLesson = await prisma.lesson.create({
      data: {
        title: `Introduction to ${catSlug.replace(/-/g, " ")}`,
        slug: `intro-${catSlug}`,
        description: `Start learning about ${catSlug.replace(/-/g, " ")}!`,
        content: lessonContentTemplate(`Introduction to ${catSlug.replace(/-/g, " ")}`, catSlug),
        categoryId: catId,
        type: "ARTICLE",
        difficulty: "BEGINNER",
        status: "PUBLISHED",
        order: 0,
        isFree: true,
        tags: [catSlug, "beginner"],
        publishedAt: new Date(),
      },
    })
    lessonCount++
  }
  console.log(`  Created ${CATEGORIES.length - Object.keys(allLessonData).length} intro lessons`)

  // Create videos
  console.log("Creating videos...")
  let videoCount = 0
  for (const [catSlug, videos] of Object.entries(VIDEOS_DATA)) {
    const catId = categoryMap.get(catSlug)
    if (!catId) continue

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i]
      await prisma.video.create({
        data: {
          title: video.title,
          slug: video.slug,
          description: video.description,
          url: video.url,
          duration: video.duration,
          transcript: video.transcript || null,
          categoryId: catId,
          status: "PUBLISHED",
          order: i,
          isFree: true,
          tags: [catSlug],
          viewCount: Math.floor(Math.random() * 5000),
          likeCount: Math.floor(Math.random() * 500),
          publishedAt: new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000),
        },
      })
      videoCount++
    }
  }
  console.log(`  Created ${videoCount} videos`)

  // Create quizzes
  console.log("Creating quizzes...")
  let quizCount = 0
  for (const [catSlug, quizzes] of Object.entries(QUIZZES_DATA)) {
    const catId = categoryMap.get(catSlug)
    if (!catId) continue

    for (const quizData of quizzes) {
      const quiz = await prisma.quiz.create({
        data: {
          title: quizData.title,
          slug: quizData.slug,
          description: quizData.description,
          categoryId: catId,
          type: quizData.type as any,
          difficulty: "BEGINNER",
          status: "PUBLISHED",
          timeLimit: quizData.timeLimit || null,
          passingScore: quizData.passingScore,
          maxAttempts: 3,
          isFree: true,
          tags: [catSlug],
          viewCount: Math.floor(Math.random() * 2000),
          likeCount: Math.floor(Math.random() * 200),
        },
      })

      for (const question of quizData.questions) {
        await prisma.question.create({
          data: {
            quizId: quiz.id,
            text: question.text,
            options: question.options,
            correctAnswer: question.correctAnswer,
            order: question.order,
            points: question.points,
            explanation: question.explanation || null,
          },
        })
      }
      quizCount++
    }
  }
  console.log(`  Created ${quizCount} quizzes`)

  // Create flashcards
  console.log("Creating flashcards...")
  let flashcardCount = 0
  let cardCount = 0
  for (const [catSlug, flashcardSets] of Object.entries(FLASHCARDS_DATA)) {
    const catId = categoryMap.get(catSlug)
    if (!catId) continue

    for (const set of flashcardSets) {
      const flashcard = await prisma.flashcard.create({
        data: {
          title: set.title,
          slug: set.slug,
          description: set.description,
          categoryId: catId,
          status: "PUBLISHED",
          isFree: true,
          tags: [catSlug],
          viewCount: Math.floor(Math.random() * 1000),
        },
      })

      for (const card of set.cards) {
        await prisma.flashcardCard.create({
          data: {
            flashcardId: flashcard.id,
            front: card.front,
            back: card.back,
            order: card.order,
          },
        })
        cardCount++
      }
      flashcardCount++
    }
  }
  console.log(`  Created ${flashcardCount} flashcard sets (${cardCount} cards)`)

  // Create games
  console.log("Creating games...")
  let gameCount = 0
  for (const [catSlug, games] of Object.entries(GAMES_DATA)) {
    const catId = categoryMap.get(catSlug)
    if (!catId) continue

    for (const game of games) {
      await prisma.game.create({
        data: {
          title: game.title,
          slug: game.slug,
          description: game.description,
          categoryId: catId,
          type: game.type as any,
          difficulty: game.difficulty as any,
          status: "PUBLISHED",
          config: (game.config ?? undefined) as any,
          isFree: true,
          tags: [catSlug],
          viewCount: Math.floor(Math.random() * 3000),
          likeCount: Math.floor(Math.random() * 300),
        },
      })
      gameCount++
    }
  }
  console.log(`  Created ${gameCount} games`)

  // Create achievements
  console.log("Creating achievements...")
  for (const achievement of ACHIEVEMENTS_DATA) {
    await prisma.achievement.create({
      data: {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        type: "MILESTONE",
        xpReward: achievement.xpReward,
        coinReward: achievement.coinReward,
        starsReward: achievement.starsReward,
        isHidden: false,
      },
    })
  }
  console.log(`  Created ${ACHIEVEMENTS_DATA.length} achievements`)

  // Create sample blog posts
  console.log("Creating blog posts...")
  const blogPosts = [
    { title: "10 Fun Ways to Learn Math at Home", slug: "fun-ways-learn-math", excerpt: "Discover creative and engaging ways to make math fun for your kids at home!", content: "Math doesn't have to be boring. Here are 10 fun ways to help your child enjoy mathematics...", tags: ["mathematics", "parenting", "tips"], category: "Parenting Tips" },
    { title: "The Benefits of Educational Games for Kids", slug: "benefits-educational-games", excerpt: "How educational games can boost learning and development in children.", content: "Educational games combine fun with learning, helping children develop critical skills while having a great time...", tags: ["games", "education", "child-development"], category: "Education" },
    { title: "Building a Reading Routine for Your Child", slug: "reading-routine", excerpt: "Simple steps to establish a daily reading habit that your child will love.", content: "Creating a consistent reading routine is one of the most important things you can do for your child's education...", tags: ["reading", "parenting", "literacy"], category: "Parenting Tips" },
    { title: "Introduction to Coding for Kids Ages 5-7", slug: "coding-kids-5-7", excerpt: "Start your child's coding journey with these age-appropriate resources and activities.", content: "Teaching coding to young children doesn't require a computer. Start with unplugged activities that teach logical thinking...", tags: ["coding", "stem", "early-learning"], category: "STEM" },
    { title: "Why Music Education Matters in Early Childhood", slug: "music-education-early-childhood", excerpt: "Research-backed benefits of music education for young children's development.", content: "Music education has profound effects on children's cognitive development, language skills, and emotional intelligence...", tags: ["music", "education", "child-development"], category: "Education" },
  ]

  for (let i = 0; i < blogPosts.length; i++) {
    await prisma.blog.create({
      data: {
        title: blogPosts[i].title,
        slug: blogPosts[i].slug,
        excerpt: blogPosts[i].excerpt,
        content: blogPosts[i].content,
        author: "Pogo Tunes Team",
        category: blogPosts[i].category,
        tags: blogPosts[i].tags,
        status: "PUBLISHED",
        viewCount: Math.floor(Math.random() * 2000),
        publishedAt: new Date(Date.now() - i * 86400000 * 3),
      },
    })
  }
  console.log(`  Created ${blogPosts.length} blog posts`)

  console.log("✅ Seed completed successfully!")
  console.log(`  📧 Test user: test@test.com / password123`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
