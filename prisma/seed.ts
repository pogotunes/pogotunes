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

const HINDI_LESSONS = [
  { title: "Hindi Swar (Vowels)", slug: "hindi-swar", type: "VIDEO", difficulty: "BEGINNER", content: "Learn the Hindi vowels - अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ" },
  { title: "Hindi Vyanjan (Consonants)", slug: "hindi-vyanjan", type: "VIDEO", difficulty: "BEGINNER", content: "Learn the Hindi consonants - क, ख, ग, घ, ङ and more!" },
  { title: "Counting in Hindi 1-10", slug: "hindi-counting-1-10", type: "PRACTICE", difficulty: "BEGINNER", content: "Count from 1 to 10 in Hindi - एक, दो, तीन, चार, पाँच..." },
  { title: "Colors in Hindi", slug: "hindi-colors", type: "FLASHCARD", difficulty: "BEGINNER", content: "Learn color names in Hindi - लाल, नीला, हरा, पीला..." },
  { title: "Animals in Hindi", slug: "hindi-animals", type: "GAME", difficulty: "EASY", content: "Learn animal names in Hindi - कुत्ता, बिल्ली, हाथी..." },
  { title: "Hindi Rhymes", slug: "hindi-rhymes", type: "VIDEO", difficulty: "BEGINNER", content: "Sing along to popular Hindi nursery rhymes and poems!" },
  { title: "Body Parts in Hindi", slug: "hindi-body-parts", type: "QUIZ", difficulty: "EASY", content: "Learn body part names in Hindi - सिर, आँख, नाक, कान..." },
  { title: "Days of Week in Hindi", slug: "hindi-days-week", type: "ARTICLE", difficulty: "EASY", content: "Learn the days of the week in Hindi - सोमवार, मंगलवार..." },
]

const VIDEOS_DATA: Record<string, Array<{ title: string; slug: string; url: string; description: string; duration: number; transcript?: string }>> = {
  mathematics: [
    { title: "Counting Fun 1-100", slug: "counting-fun", url: "https://www.youtube.com/watch?v=OPW7CQ0Jc5I", description: "A fun counting video for kids", duration: 300, transcript: "Let's count together! One, two, three..." },
    { title: "Adding with Apples", slug: "adding-apples", url: "https://www.youtube.com/watch?v=Wwz4LMpVRaM", description: "Learn addition with apple examples", duration: 420 },
  ],
  science: [
    { title: "The Magic of Rainbows", slug: "magic-rainbows", url: "https://www.youtube.com/watch?v=gFqJgHyA7So", description: "How rainbows are made", duration: 360, transcript: "Rainbows happen when sunlight passes through water droplets..." },
    { title: "Dinosaur Discovery", slug: "dinosaur-discovery", url: "https://www.youtube.com/watch?v=kz-MDch3FWo", description: "Learn about different dinosaurs", duration: 480 },
  ],
  "english-language": [
    { title: "ABC Song", slug: "abc-song", url: "https://www.youtube.com/watch?v=BELlZKpi1Zs", description: "Sing the alphabet", duration: 180 },
    { title: "Learn Opposites", slug: "learn-opposites", url: "https://www.youtube.com/watch?v=SJz7wOBK7d4", description: "Big and small, hot and cold", duration: 240 },
  ],
  space: [
    { title: "The Moon Adventure", slug: "moon-adventure", url: "https://www.youtube.com/watch?v=LVV3Q7JEUSk", description: "Journey to the moon", duration: 420, transcript: "The moon orbits Earth every 27 days..." },
    { title: "Stars and Constellations", slug: "stars-constellations", url: "https://www.youtube.com/watch?v=s6GfqJZp_SM", description: "Find constellations in the night sky", duration: 360 },
  ],
  animals: [
    { title: "Ocean Animals", slug: "ocean-animals", url: "https://www.youtube.com/watch?v=5P7kZo8ZrnI", description: "Discover creatures under the sea", duration: 300 },
    { title: "Farm Animals", slug: "farm-animals", url: "https://www.youtube.com/watch?v=6sYrSL7Qv38", description: "Meet the animals on a farm", duration: 240 },
  ],
  history: [
    { title: "Ancient Egypt", slug: "ancient-egypt", url: "https://www.youtube.com/watch?v=0h0pS7t0qjI", description: "Pyramids, pharaohs, and the Nile", duration: 480, transcript: "Ancient Egypt was one of the world's first civilizations..." },
    { title: "Knights and Castles", slug: "knights-castles", url: "https://www.youtube.com/watch?v=cVRjLBNh2yQ", description: "Life in medieval times", duration: 420 },
  ],
  hindi: [
    { title: "Hindi Swar Geet", slug: "hindi-swar-geet", url: "https://www.youtube.com/watch?v=pN2Q5hHMDyo", description: "Sing along to the Hindi vowels song!", duration: 180, transcript: "अ से अनार, आ से आम..." },
    { title: "Hindi Vyanjan Song", slug: "hindi-vyanjan-song", url: "https://www.youtube.com/watch?v=yKFvBdOTNn8", description: "Learn Hindi consonants with fun animations", duration: 240, transcript: "क से कबूतर, ख से खरगोश..." },
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
  hindi: [
    { title: "Hindi Body Parts", slug: "hindi-body-parts-quiz", type: "MULTIPLE_CHOICE", description: "Test your knowledge of body parts in Hindi!", timeLimit: 60, passingScore: 60, questions: [
      { text: "What is 'head' called in Hindi?", options: ["सिर", "हाथ", "पैर", "आँख"], correctAnswer: "सिर", order: 0, points: 10 },
      { text: "What is 'eyes' called in Hindi?", options: ["कान", "आँख", "नाक", "मुँह"], correctAnswer: "आँख", order: 1, points: 10 },
      { text: "What is 'nose' called in Hindi?", options: ["हाथ", "पैर", "नाक", "दाँत"], correctAnswer: "नाक", order: 2, points: 10 },
    ]},
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
  hindi: [
    { title: "Hindi Colors", slug: "hindi-colors-flashcards", description: "Learn color names in Hindi!", cards: [
      { front: "Red", back: "लाल (Laal)", order: 0 },
      { front: "Blue", back: "नीला (Neela)", order: 1 },
      { front: "Green", back: "हरा (Hara)", order: 2 },
      { front: "Yellow", back: "पीला (Peela)", order: 3 },
      { front: "Black", back: "काला (Kaala)", order: 4 },
      { front: "White", back: "सफेद (Safed)", order: 5 },
    ]},
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

const CATEGORY_LESSON_CONTENT: Record<string, string> = {
  "writing": `# Introduction to Writing

Writing is how we share our thoughts and ideas on paper! When you write, you can tell stories, send messages, and create amazing things.

## What You'll Learn

In this lesson, you will learn how to hold a pencil, form letters, and write your first words. Practice makes perfect!

## Key Concepts

### Grip and Posture
Hold your pencil between your thumb and first finger. Sit up straight with both feet on the floor. This helps you write neatly!

### Letter Formation
Start with capital letters — they are all the same height. Then practice lowercase letters. Remember: A, B, C!

### Your First Words
Try writing simple words like "cat", "dog", and "sun". Say each letter as you write it.

## Practice Time

1. Trace the letter A five times
2. Write your name
3. Write three words that start with B

## Summary

Writing is a superpower! The more you practice, the better you'll become.`,

  "spelling": `# Introduction to Spelling

Spelling is putting letters in the right order to make words. Good spelling helps others understand what you write!

## What You'll Learn

Learn how to spell common words using letter sounds and spelling rules.

## Key Concepts

### Sound It Out
Say the word slowly: c-a-t. Each sound matches a letter. Blend them together to spell the word!

### Common Patterns
Many words follow patterns. Words like "cake", "make", and "take" all end with "ake".

### Sight Words
Some words don't follow the rules. Words like "the", "said", and "was" need to be memorized.

## Practice Time

1. Spell these words: hat, run, big, red
2. Find three words that rhyme with "cat"
3. Write a sentence using a sight word

## Summary

Great spellers practice every day. Keep learning new words and soon you'll be a spelling champion!`,

  "vocabulary": `# Introduction to Vocabulary

Vocabulary means all the words you know! The more words you know, the better you can read, write, and talk with others.

## What You'll Learn

Learn new words, what they mean, and how to use them in sentences.

## Key Concepts

### New Words Every Day
Try to learn one new word each day. Write it down, learn its meaning, and use it in a sentence.

### Synonyms and Antonyms
Synonyms are words that mean the same thing (happy = joyful). Antonyms are opposites (hot vs cold).

### Using Context Clues
When you see a word you don't know, look at the words around it. They can help you figure out the meaning!

## Practice Time

1. What does "enormous" mean? (Hint: it's like "big")
2. Find a synonym for "fast"
3. Use the word "delicious" in a sentence

## Summary

Building your vocabulary opens up a world of understanding. Read books and ask about words you don't know!`,

  "grammar": `# Introduction to Grammar

Grammar is the set of rules that helps us speak and write correctly. Good grammar makes your sentences clear and easy to understand!

## What You'll Learn

Learn about nouns, verbs, adjectives, and how to build proper sentences.

## Key Concepts

### Nouns
A noun is a person, place, or thing. Examples: teacher, school, book.

### Verbs
A verb is an action word. Examples: run, jump, read, sing.

### Adjectives
An adjective describes a noun. Examples: big, red, happy, soft.

### Building Sentences
A sentence needs a noun and a verb. "The dog runs." is a complete sentence!

## Practice Time

1. Find the noun in: "The girl reads a book."
2. Find the verb in: "Birds fly in the sky."
3. Add an adjective to: "The ___ cat slept."

## Summary

Grammar helps us communicate clearly. Practice making sentences every day!`,

  "phonics": `# Introduction to Phonics

Phonics is about connecting letters with their sounds. When you know phonics, you can read new words by sounding them out!

## What You'll Learn

Learn the sounds of each letter and how to blend them to read words.

## Key Concepts

### Letter Sounds
Each letter makes a sound. A says "ah", B says "buh", C says "cuh". Practice all 26 letters!

### Blending Sounds
Push sounds together: c-a-t = cat! Start with short words and build up.

### Digraphs
Two letters can make one sound. "sh" makes the sound at the start of "ship". "ch" starts "chat".

## Practice Time

1. What sound does "M" make?
2. Blend these: d-o-g, s-u-n, f-i-sh
3. Find a word that starts with "sh"

## Summary

Phonics is the key to reading. Practice your letter sounds every day!`,

  "geography": `# Introduction to Geography

Geography is the study of our world — its mountains, rivers, countries, and the people who live there!

## What You'll Learn

Learn about continents, oceans, maps, and the amazing places on Earth.

## Key Concepts

### The Seven Continents
Earth has seven big land areas: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.

### The Five Oceans
Our planet has five oceans: Pacific, Atlantic, Indian, Southern, and Arctic.

### Reading Maps
Maps use symbols and colors to show where things are. Blue is water, green is land. A compass shows direction!

## Practice Time

1. Name the continent you live on
2. Which ocean is the largest?
3. Draw a simple map of your room

## Summary

Geography helps us understand our amazing world. There's always something new to discover!`,

  "art": `# Introduction to Art

Art is how we express our creativity through colors, shapes, and imagination. Everyone can be an artist!

## What You'll Learn

Learn about colors, drawing techniques, and famous artists who changed the world.

## Key Concepts

### Primary Colors
Red, blue, and yellow are primary colors. You can mix them to make any other color!

### Warm and Cool Colors
Red, orange, and yellow are warm like sunshine. Blue, green, and purple are cool like water.

### Shapes in Art
Everything in art starts with basic shapes — circles, squares, and triangles.

## Practice Time

1. Mix blue and yellow paint — what color do you get?
2. Draw a picture using only circles
3. Color a picture using warm colors only

## Summary

Art lets your imagination run wild. Create something every day!`,

  "music": `# Introduction to Music

Music is made of sounds and silence arranged in beautiful patterns. It can make us happy, calm, or excited!

## What You'll Learn

Learn about notes, rhythm, instruments, and how music works.

## Key Concepts

### Beat and Rhythm
The beat is the steady pulse in music. Tap your foot — that's the beat! Rhythm is the pattern of long and short sounds.

### Notes and Scales
Notes are the building blocks of music. Do-Re-Mi-Fa-So-La-Ti-Do is a scale!

### Instruments
Instruments make sounds in different ways: strings (guitar, violin), percussion (drums), and wind (flute, trumpet).

## Practice Time

1. Clap along to your favorite song
2. Sing the Do-Re-Mi scale
3. Name three instruments you know

## Summary

Music is a universal language. Sing, dance, and make music every day!`,

  "memory": `# Introduction to Memory

Memory is how your brain stores and remembers information. A good memory helps you learn faster and remember more!

## What You'll Learn

Learn how memory works and discover fun techniques to improve your memory.

## Key Concepts

### How Memory Works
Your brain takes in information, stores it, and brings it back when needed. Like a computer!

### Memory Tricks
Use rhymes, songs, and pictures to remember things. "In 1492, Columbus sailed the ocean blue!"

### Practice Makes Perfect
The more you use your memory, the stronger it gets. Practice remembering small things every day.

## Practice Time

1. Memorize a short poem
2. Remember a list of 5 items for 1 minute
3. Use a rhyme to remember something new

## Summary

Your memory is like a muscle — exercise it every day to make it stronger!`,

  "numbers": `# Introduction to Numbers

Numbers are everywhere! We use them to count, measure, tell time, and so much more.

## What You'll Learn

Learn about counting, number order, and what numbers mean in our daily lives.

## Key Concepts

### Counting
Count objects around you: toys, fingers, steps. Practice counting forward and backward.

### Number Order
Numbers have an order: 1, 2, 3, 4, 5... What comes after 7? Before 3?

### Numbers in Daily Life
Numbers tell us the time, the date, how much things cost, and your age!

## Practice Time

1. Count to 20 out loud
2. Find five numbers in your kitchen
3. What number comes after 15?

## Summary

Numbers are fun and useful. Count something every day!`,

  "alphabet": `# Introduction to the Alphabet

The alphabet has 26 letters that make up all the words in English! Learning them is your first step to reading.

## What You'll Learn

Learn to recognize, say, and write all 26 letters of the alphabet.

## Key Concepts

### Capital and Lowercase
Each letter has two forms: capital (A) and lowercase (a). Both are important to learn!

### Letter Order
The alphabet has a special order: A, B, C, D, E... Sing the ABC song to remember it!

### Letter Sounds
Each letter makes at least one sound. A is for apple, B is for ball, C is for cat!

## Practice Time

1. Sing the ABC song
2. Find something that starts with each letter of your name
3. Trace the letters A through M

## Summary

The alphabet is the foundation of reading and writing. Practice your letters every day!`,

  "nature": `# Introduction to Nature

Nature is everything around us that isn't made by people — trees, flowers, rivers, mountains, and animals!

## What You'll Learn

Learn about plants, weather, seasons, and how to appreciate the natural world.

## Key Concepts

### Plants and Trees
Plants make their own food using sunlight! Trees give us shade, fruit, and clean air.

### Weather
Weather is what happens in the sky each day: sunny, rainy, cloudy, windy, or snowy.

### The Four Seasons
Spring brings flowers, summer brings heat, fall brings colorful leaves, and winter brings snow!

## Practice Time

1. Name three types of trees
2. What's your favorite season and why?
3. Draw a picture of a sunny day

## Summary

Nature is beautiful and important. Go outside and explore the natural world!`,

  "body-health": `# Introduction to Body & Health

Your body is amazing! Learning how it works and how to take care of it helps you grow strong and healthy.

## What You'll Learn

Learn about body parts, the five senses, and healthy habits.

## Key Concepts

### Body Parts
Your body has many parts: head, arms, legs, hands, and feet. Each part has a special job!

### The Five Senses
You see with your eyes, hear with your ears, smell with your nose, taste with your tongue, and touch with your skin.

### Healthy Habits
Eat fruits and vegetables, drink water, exercise, wash your hands, and get plenty of sleep!

## Practice Time

1. Name five body parts
2. What sense do you use to read a book?
3. List three healthy habits

## Summary

Take care of your body, and it will take care of you! Stay healthy and active.`,

  "food-nutrition": `# Introduction to Food & Nutrition

Food gives your body energy to grow, play, and learn. Eating the right foods helps you feel great!

## What You'll Learn

Learn about food groups, healthy eating, and where food comes from.

## Key Concepts

### Food Groups
There are five food groups: fruits, vegetables, grains, proteins, and dairy. Eat from all groups every day!

### Healthy vs Treat Foods
Some foods give your body fuel (apples, carrots, milk). Others are treats for special days (cookies, candy).

### Where Food Comes From
Fruit grows on trees and vines. Vegetables grow in the ground. Milk comes from cows. Bread is made from wheat!

## Practice Time

1. Name a fruit from each color of the rainbow
2. What food group does cheese belong to?
3. Draw your favorite healthy meal

## Summary

Good food makes a strong body and a sharp mind. Make healthy choices!`,

  "social-skills": `# Introduction to Social Skills

Social skills help us get along with others, make friends, and work together. They are just as important as school subjects!

## What You'll Learn

Learn about sharing, listening, being kind, and solving problems with friends.

## Key Concepts

### Sharing and Taking Turns
When you share, everyone gets a turn. It makes playtime more fun for everyone!

### Listening Carefully
Look at the person speaking and think about what they say. Good listeners make good friends.

### Using Kind Words
Say "please", "thank you", and "sorry". Kind words make others feel happy and respected.

## Practice Time

1. Practice saying "please" when you ask for something
2. Let a friend go first today
3. Tell someone something nice

## Summary

Being a good friend is a superpower. Practice kindness every day!`,

  "emotions": `# Introduction to Emotions

Emotions are feelings that everyone has — happy, sad, angry, scared, and excited. Learning about emotions helps us understand ourselves and others.

## What You'll Learn

Learn to name your feelings, understand why you feel them, and handle big emotions.

## Key Concepts

### Name That Feeling
Can you name how you feel? Happy, sad, angry, surprised, scared, or loved? Naming feelings helps you handle them.

### It's Okay to Feel
All feelings are normal! Everyone feels sad sometimes and angry sometimes. What matters is what you do with your feelings.

### Calming Down
When you feel angry or upset, take deep breaths. Count to five. Talk to a grown-up about how you feel.

## Practice Time

1. Draw a face showing how you feel today
2. Name something that makes you happy
3. Practice taking three deep breaths

## Summary

Your feelings are important. Learn to understand them and express them in healthy ways!`,

  "life-skills": `# Introduction to Life Skills

Life skills are things you need to know to take care of yourself and help others. They make you more independent every day!

## What You'll Learn

Learn about personal hygiene, organization, safety, and helping at home.

## Key Concepts

### Taking Care of Yourself
Brush your teeth, wash your hands, get dressed, and make your bed. Small tasks make a big difference!

### Staying Organized
Put your toys away after playing. Keep your school things in one place. Being organized saves time!

### Staying Safe
Know your full name, address, and phone number. Don't talk to strangers. Look both ways before crossing.

## Practice Time

1. Make your bed this morning
2. Help set the table for dinner
3. Memorize your home address

## Summary

Life skills help you grow up confident and capable. Practice one new skill each week!`,

  "foreign-languages": `# Introduction to Foreign Languages

Learning a new language opens doors to new cultures, friends, and adventures! It's like having a superpower.

## What You'll Learn

Learn basic greetings, numbers, and phrases in different languages.

## Key Concepts

### Greetings Around the World
Hello in Spanish is "Hola". In French it's "Bonjour". In Hindi it's "Namaste". Learning greetings is a great start!

### Counting in Other Languages
Practice counting to 10 in Spanish: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.

### Why Learn Languages
Speaking another language lets you talk to more people, travel easily, and understand other cultures better.

## Practice Time

1. Say "hello" in three different languages
2. Count to 5 in Spanish
3. Learn one new word in another language today

## Summary

Every new word in another language is a step toward connecting with the world!`,

  "environment": `# Introduction to Environment

The environment is everything around us — the air, water, land, and all living things. Protecting it is everyone's job!

## What You'll Learn

Learn about ecosystems, recycling, and how to take care of our planet.

## Key Concepts

### What is an Ecosystem?
An ecosystem is a community of plants and animals living together. A pond, a forest, and a desert are all ecosystems.

### The Three Rs
Reduce, Reuse, Recycle! Use less, use again, and recycle what you can. Every small action helps.

### Saving Energy and Water
Turn off lights when you leave a room. Turn off the tap while brushing your teeth. Small habits save big resources!

## Practice Time

1. Sort items into recycling and trash
2. Find something at home you can reuse
3. Turn off a light when leaving a room

## Summary

Our planet is our home. Take care of it with small daily actions!`,

  "technology": `# Introduction to Technology

Technology is all around us — computers, tablets, phones, and even microwaves use technology to make our lives easier!

## What You'll Learn

Learn what technology is, how computers work, and how to use technology safely.

## Key Concepts

### What is Technology?
Technology is any tool made by people to solve problems. A pencil is technology! A computer is technology too!

### How Computers Work
Computers take input (keyboard, mouse), process it (CPU), store it (memory), and show output (screen).

### Screen Time Balance
Technology is great, but too much screen time isn't good. Take breaks, play outside, and read books too!

## Practice Time

1. Name three examples of technology in your home
2. Ask a grown-up how technology helps them at work
3. Take a 15-minute break from screens

## Summary

Technology is a powerful tool. Use it wisely and balance it with other activities!`,

  "critical-thinking": `# Introduction to Critical Thinking

Critical thinking means thinking carefully before making a decision. It helps you solve problems and make good choices!

## What You'll Learn

Learn to ask questions, evaluate information, and think for yourself.

## Key Concepts

### Ask Questions
Always ask "why?" and "how do you know?" Curious people make great critical thinkers.

### Fact vs Opinion
A fact can be proven true (water freezes at 0°C). An opinion is what someone thinks (chocolate is the best flavor).

### Make Good Decisions
Think about what might happen before you act. Consider different options and choose the best one.

## Practice Time

1. Tell your grown-up one fact and one opinion
2. Think of two ways to solve a problem
3. Ask "why?" about something new today

## Summary

Critical thinking helps you make smart choices. Question things and think for yourself!`,

  "problem-solving": `# Introduction to Problem Solving

Problems are challenges that need solutions. Learning to solve problems helps you in school, with friends, and in life!

## What You'll Learn

Learn a step-by-step method to solve any problem.

## Key Concepts

### The Problem-Solving Steps
1. Identify the problem
2. Think of possible solutions
3. Try the best solution
4. Check if it worked

### Try Different Ways
If one solution doesn't work, try another! Never give up after the first try.

### Ask for Help
Sometimes you need help solving a problem. Asking for help is smart, not giving up!

## Practice Time

1. Think of a small problem you had today
2. List two ways you could solve it
3. Try one solution and see if it works

## Summary

Every problem has a solution. Stay calm, think it through, and keep trying!`,

  "logic-puzzles": `# Introduction to Logic & Puzzles

Logic is about thinking carefully and making sense of things. Puzzles are fun challenges that test your logical thinking!

## What You'll Learn

Learn to solve puzzles, spot patterns, and think logically.

## Key Concepts

### Patterns
Look for things that repeat: colors, shapes, numbers. Patterns help us predict what comes next.

### Deduction
Use clues to figure out the answer. "All birds have wings. A sparrow is a bird. So a sparrow has wings!"

### Brain Teasers
Riddles and puzzles make you think in new ways. They're fun and good for your brain!

## Practice Time

1. Complete this pattern: red, blue, red, blue, ___
2. Solve: What has hands but can't clap?
3. Make up your own riddle

## Summary

Logic and puzzles keep your brain sharp. Challenge yourself with a puzzle every day!`,

  "colors-shapes": `# Introduction to Colors & Shapes

Colors and shapes are everywhere! Recognizing them helps you understand and describe the world around you.

## What You'll Learn

Learn to identify basic colors and shapes, and how they appear in everyday life.

## Key Concepts

### Primary and Secondary Colors
Red, yellow, and blue are primary colors. Mix them to get orange, green, and purple!

### Basic Shapes
Circle, square, triangle, and rectangle are the building blocks of everything we see.

### Shapes in Nature
Look around — the sun is a circle, a window is a rectangle, a mountain is a triangle!

## Practice Time

1. Find something red, something blue, and something yellow
2. Count how many circles you see in your room
3. Draw a house using only squares and triangles

## Summary

Colors and shapes make our world beautiful and interesting. Find them everywhere you go!`,

  "animals": `# Introduction to Animals

Animals are living creatures that share our planet. From tiny ants to giant whales, each animal is amazing in its own way!

## What You'll Learn

Learn about different types of animals, where they live, and what they need to survive.

## Key Concepts

### Mammals, Birds, Fish, and More
Animals are grouped by their features. Mammals have fur and drink milk. Birds have feathers and lay eggs. Fish live in water and have gills.

### Habitats
Animals live in different habitats: forests, oceans, deserts, grasslands, and polar regions. Each habitat provides food and shelter.

### What Animals Need
All animals need food, water, shelter, and space to survive. Different animals eat different things — plants, other animals, or both!

## Practice Time

1. Name an animal that lives in each habitat
2. Is a dolphin a mammal or a fish?
3. Draw your favorite animal in its habitat

## Summary

Animals are our companions on Earth. Learn about them and help protect their homes!`,

  "space": `# Introduction to Space

Space is the vast, amazing universe beyond our planet Earth. It's filled with stars, planets, moons, and galaxies!

## What You'll Learn

Learn about our solar system, stars, and the incredible tools humans use to explore space.

## Key Concepts

### Our Solar System
The Sun is a star at the center. Eight planets orbit around it: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.

### Day and Night
Earth spins like a top. When your part faces the Sun, it's day. When it faces away, it's night.

### Exploring Space
Rockets carry astronauts and satellites into space. The Moon is the only place in space where humans have walked!

## Practice Time

1. Name the planets in order from the Sun
2. Why does the Moon change shape?
3. Draw a picture of a rocket

## Summary

Space is the ultimate adventure. Keep looking up at the stars and wondering!`,

  "history": `# Introduction to History

History is the story of people who lived before us. It helps us understand how the world became what it is today!

## What You'll Learn

Learn about ancient civilizations, important events, and how people lived long ago.

## Key Concepts

### Ancient Civilizations
The Egyptians built pyramids, the Romans built roads, and the Chinese invented paper. Each civilization contributed amazing things!

### Measuring Time
History is measured in years. BC means before the common era, and AD/CE means the common era. The further back, the older the event.

### Learning from the Past
History teaches us lessons. By studying what happened before, we can make better choices today.

## Practice Time

1. Name one thing the Ancient Egyptians are known for
2. What year were you born?
3. Ask a grandparent what life was like when they were young

## Summary

History helps us understand our world. Every day, you are making history too!`
}


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
    hindi: HINDI_LESSONS,
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
    const title = `Introduction to ${catSlug.replace(/-/g, " ")}`
    const shortLesson = await prisma.lesson.create({
      data: {
        title,
        slug: `intro-${catSlug}`,
        description: `Start learning about ${catSlug.replace(/-/g, " ")}!`,
        content: CATEGORY_LESSON_CONTENT[catSlug] || CATEGORY_LESSON_CONTENT["writing"],
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
    { title: "10 Fun Ways to Learn Math at Home", slug: "fun-ways-learn-math", excerpt: "Discover creative and engaging ways to make math fun for your kids at home!", content: "Math doesn't have to be boring. Here are 10 fun ways to help your child enjoy mathematics! From counting toys during playtime to baking cookies and measuring ingredients, math is everywhere. Try playing shopkeeper with pretend money, sorting socks by size and color, or singing counting songs during car rides. Board games like Snakes and Ladders teach number recognition, while building with blocks introduces geometry. Even setting the table practices one-to-one correspondence. The key is to make it playful, not pressured. When children see math as a game, they naturally want to participate and learn more.", tags: ["mathematics", "parenting", "tips"], category: "Parenting Tips" },
    { title: "The Benefits of Educational Games for Kids", slug: "benefits-educational-games", excerpt: "How educational games can boost learning and development in children.", content: "Educational games combine fun with learning, helping children develop critical skills while having a great time! Research shows that game-based learning improves memory retention, problem-solving abilities, and social skills. When children play educational games, they practice patience, strategic thinking, and hand-eye coordination. Games also provide immediate feedback, which helps children understand cause and effect. Memory games strengthen neural pathways, puzzle games develop spatial reasoning, and word games build vocabulary. Most importantly, educational games create a positive association with learning that lasts a lifetime.", tags: ["games", "education", "child-development"], category: "Education" },
    { title: "Building a Reading Routine for Your Child", slug: "reading-routine", excerpt: "Simple steps to establish a daily reading habit that your child will love.", content: "Creating a consistent reading routine is one of the most important things you can do for your child's education. Start by setting aside 15-20 minutes each day for reading together. Choose a comfortable, well-lit spot with minimal distractions. Let your child pick the books — even if they want to read the same story every night! Ask questions about the story to build comprehension: 'What do you think happens next?' or 'Why did the character do that?' Point to words as you read to build word recognition. Celebrate progress with a reading chart or sticker rewards. The goal is to make reading a cozy, anticipated part of the daily routine rather than a chore.", tags: ["reading", "parenting", "literacy"], category: "Parenting Tips" },
    { title: "Introduction to Coding for Kids Ages 5-7", slug: "coding-kids-5-7", excerpt: "Start your child's coding journey with these age-appropriate resources and activities.", content: "Teaching coding to young children doesn't require a computer. Start with unplugged activities that teach logical thinking — like writing step-by-step instructions for making a sandwich or creating sequences with colored beads. Once they understand sequencing, introduce pattern recognition through everyday activities: sorting laundry by color, following recipes, or arranging toys by size. Free apps like ScratchJr and Kodable offer visual programming where children snap together blocks to create animations and simple games. The key concepts for ages 5-7 are sequences, patterns, loops, and debugging (finding and fixing mistakes). Celebrate the process, not just the result — every bug is a learning opportunity!", tags: ["coding", "stem", "early-learning"], category: "STEM" },
    { title: "Why Music Education Matters in Early Childhood", slug: "music-education-early-childhood", excerpt: "Research-backed benefits of music education for young children's development.", content: "Music education has profound effects on children's cognitive development, language skills, and emotional intelligence. Studies show that children who receive music training develop better memory, attention span, and mathematical ability. Learning rhythm helps with pattern recognition, singing builds vocabulary and pronunciation, and playing instruments develops fine motor skills. Music also supports emotional development — children learn to express feelings through sound and movement. Group music activities teach cooperation, turn-taking, and listening skills. You don't need expensive instruments: pots and pans make drums, rice in a container makes a shaker, and rubber bands on a box make a guitar. The most important thing is to make music joyful and accessible every day.", tags: ["music", "education", "child-development"], category: "Education" },
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
