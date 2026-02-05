"use client";

import { useState } from "react";

type Personality =
  | "Sweet Enthusiast"
  | "Zen Minimalist"
  | "Night Owl"
  | "Health Nut"
  | "Artisan Snob";

interface Answer {
  emoji: string;
  text: string;
  personality: Personality;
}

interface Question {
  question: string;
  answers: Answer[];
}

const questions: Question[] = [
  {
    question: "Pick your ideal Saturday morning:",
    answers: [
      {
        emoji: "🍰",
        text: "Sleep in, then brunch with all the pastries",
        personality: "Sweet Enthusiast",
      },
      {
        emoji: "🧘",
        text: "Meditation and silence before the world wakes up",
        personality: "Zen Minimalist",
      },
      {
        emoji: "🌙",
        text: "Saturday morning? I'm still up from Friday",
        personality: "Night Owl",
      },
      {
        emoji: "🥑",
        text: "5am run followed by a green smoothie",
        personality: "Health Nut",
      },
      {
        emoji: "☕",
        text: "Farmers market for artisan beans",
        personality: "Artisan Snob",
      },
    ],
  },
  {
    question: "You're picking a Netflix show. You reach for:",
    answers: [
      {
        emoji: "🎬",
        text: "A rom-com that makes you cry happy tears",
        personality: "Sweet Enthusiast",
      },
      {
        emoji: "🏔️",
        text: "A slow, beautiful nature documentary",
        personality: "Zen Minimalist",
      },
      {
        emoji: "🔪",
        text: "A dark thriller you'll binge until 4am",
        personality: "Night Owl",
      },
      {
        emoji: "🏃",
        text: "An intense sports or survival doc",
        personality: "Health Nut",
      },
      {
        emoji: "🎭",
        text: "A critically acclaimed foreign film no one's heard of",
        personality: "Artisan Snob",
      },
    ],
  },
  {
    question: "Pick a superpower:",
    answers: [
      {
        emoji: "💕",
        text: "Making anyone instantly happy",
        personality: "Sweet Enthusiast",
      },
      {
        emoji: "🔮",
        text: "Perfect inner peace, no matter what",
        personality: "Zen Minimalist",
      },
      {
        emoji: "👁️",
        text: "Never needing sleep",
        personality: "Night Owl",
      },
      {
        emoji: "⚡",
        text: "Unlimited physical energy",
        personality: "Health Nut",
      },
      {
        emoji: "🎯",
        text: "Knowing the absolute best version of everything",
        personality: "Artisan Snob",
      },
    ],
  },
  {
    question: "Your friend describes you as:",
    answers: [
      {
        emoji: "🌈",
        text: '"The one who makes everything more fun"',
        personality: "Sweet Enthusiast",
      },
      {
        emoji: "🌊",
        text: '"Somehow always calm"',
        personality: "Zen Minimalist",
      },
      {
        emoji: "🦇",
        text: '"Impossible to reach before noon"',
        personality: "Night Owl",
      },
      {
        emoji: "🥦",
        text: '"Annoyingly disciplined"',
        personality: "Health Nut",
      },
      {
        emoji: "🧐",
        text: '"Weirdly specific opinions about everything"',
        personality: "Artisan Snob",
      },
    ],
  },
  {
    question: "Pick a travel destination:",
    answers: [
      {
        emoji: "🇮🇹",
        text: "Italy — gelato, pasta, romance",
        personality: "Sweet Enthusiast",
      },
      {
        emoji: "🇯🇵",
        text: "Japan — temples, gardens, quiet beauty",
        personality: "Zen Minimalist",
      },
      {
        emoji: "🇩🇪",
        text: "Berlin — underground clubs, no bedtime",
        personality: "Night Owl",
      },
      {
        emoji: "🇨🇷",
        text: "Costa Rica — hiking, surfing, jungle",
        personality: "Health Nut",
      },
      {
        emoji: "🇪🇹",
        text: "Ethiopia — origin of coffee, local roasters",
        personality: "Artisan Snob",
      },
    ],
  },
  {
    question: "Pick a color that speaks to you:",
    answers: [
      {
        emoji: "🩷",
        text: "Warm pink",
        personality: "Sweet Enthusiast",
      },
      {
        emoji: "🤍",
        text: "Soft white",
        personality: "Zen Minimalist",
      },
      {
        emoji: "🖤",
        text: "Midnight black",
        personality: "Night Owl",
      },
      {
        emoji: "💚",
        text: "Fresh green",
        personality: "Health Nut",
      },
      {
        emoji: "🤎",
        text: "Rich amber",
        personality: "Artisan Snob",
      },
    ],
  },
];

const results: Record<
  Personality,
  { coffee: string; tagline: string; emoji: string }
> = {
  "Sweet Enthusiast": {
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    emoji: "🍰",
  },
  "Zen Minimalist": {
    coffee: "Black Coffee, Single Origin",
    tagline: "Simple. Clean. Perfect.",
    emoji: "🧘",
  },
  "Night Owl": {
    coffee: "Red Eye (coffee + espresso shot)",
    tagline: "Sleep is optional",
    emoji: "🌙",
  },
  "Health Nut": {
    coffee: "Oat Milk Americano",
    tagline: "Wellness in every sip",
    emoji: "🥑",
  },
  "Artisan Snob": {
    coffee: "Pour-Over, Single Origin",
    tagline: "You know what you like",
    emoji: "☕",
  },
};

type Screen = "welcome" | "quiz" | "results";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selections, setSelections] = useState<Personality[]>([]);

  function handleStart() {
    setScreen("quiz");
    setCurrentQuestion(0);
    setSelections([]);
  }

  function handleAnswer(personality: Personality) {
    const newSelections = [...selections, personality];
    setSelections(newSelections);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("results");
    }
  }

  function getResult(): Personality {
    const counts: Partial<Record<Personality, number>> = {};
    for (const p of selections) {
      counts[p] = (counts[p] || 0) + 1;
    }

    let maxCount = 0;
    let winner: Personality = selections[0];

    // Walk selections in order so first-selected wins ties
    for (const p of selections) {
      const c = counts[p] || 0;
      if (c > maxCount) {
        maxCount = c;
        winner = p;
      }
    }

    return winner;
  }

  function handleRetake() {
    setScreen("welcome");
    setCurrentQuestion(0);
    setSelections([]);
  }

  // --- Welcome Screen ---
  if (screen === "welcome") {
    return (
      <div className="flex min-h-screen items-center justify-center p-5">
        <div
          className="w-full max-w-[520px] rounded-3xl bg-white p-12 text-center"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
        >
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
            style={{ background: "#FFF3E0" }}
          >
            ☕
          </div>
          <h1
            className="mb-3 text-3xl font-bold"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            What&rsquo;s Your Coffee Personality?
          </h1>
          <p
            className="mb-8 text-base italic"
            style={{ color: "var(--color-light-muted)" }}
          >
            Answer 6 quick questions to discover your perfect brew
          </p>
          <button
            onClick={handleStart}
            className="cursor-pointer rounded-full px-10 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
            style={{
              fontFamily: "var(--font-body)",
              background: "linear-gradient(135deg, var(--color-pink), var(--color-teal))",
              border: "none",
            }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // --- Quiz Screen ---
  if (screen === "quiz") {
    const q = questions[currentQuestion];

    return (
      <div className="flex min-h-screen items-center justify-center p-5">
        <div
          className="w-full max-w-[520px] rounded-3xl bg-white p-12"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
        >
          <p
            className="mb-6 text-xl font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-dark)",
            }}
          >
            {q.question}
          </p>

          <div className="flex flex-col gap-3">
            {q.answers.map((a, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(a.personality)}
                className="cursor-pointer rounded-2xl border-2 border-solid bg-white px-5 py-4 text-left text-base font-medium transition-all hover:-translate-y-0.5"
                style={{
                  fontFamily: "var(--font-body)",
                  borderColor: "#eee",
                  color: "var(--color-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#4ECDC4";
                  e.currentTarget.style.background = "#F0FFFE";
                  e.currentTarget.style.color = "var(--color-dark)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#eee";
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "var(--color-muted)";
                }}
              >
                <span className="mr-3 text-lg">{a.emoji}</span>
                {a.text}
              </button>
            ))}
          </div>

          {/* Progress dots */}
          <div className="mt-8 flex justify-center gap-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className="h-2.5 w-2.5 rounded-full transition-colors"
                style={{
                  background:
                    i <= currentQuestion ? "var(--color-teal)" : "#eee",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Results Screen ---
  const personality = getResult();
  const result = results[personality];

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div
        className="w-full max-w-[520px] rounded-3xl bg-white p-12 text-center"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
      >
        {/* Circular image placeholder */}
        <div
          className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full text-5xl"
          style={{
            background: "linear-gradient(135deg, var(--color-pink), var(--color-yellow))",
          }}
        >
          {result.emoji}
        </div>

        <p
          className="mb-2 text-sm font-medium uppercase tracking-widest"
          style={{ color: "var(--color-light-muted)" }}
        >
          Your coffee personality is
        </p>

        <h1
          className="mb-2 text-3xl font-bold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-dark)",
          }}
        >
          {personality}
        </h1>

        <p
          className="mb-6 text-lg italic"
          style={{ color: "var(--color-light-muted)" }}
        >
          &ldquo;{result.tagline}&rdquo;
        </p>

        <div
          className="mx-auto mb-8 rounded-2xl px-8 py-5"
          style={{ background: "#FFF8EE" }}
        >
          <p
            className="mb-1 text-sm uppercase tracking-wider"
            style={{ color: "var(--color-light-muted)" }}
          >
            Your perfect brew
          </p>
          <p
            className="text-xl font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-dark)",
            }}
          >
            {result.coffee}
          </p>
        </div>

        <button
          onClick={handleRetake}
          className="cursor-pointer rounded-full px-10 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
          style={{
            fontFamily: "var(--font-body)",
            background: "linear-gradient(135deg, var(--color-pink), var(--color-teal))",
            border: "none",
          }}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
