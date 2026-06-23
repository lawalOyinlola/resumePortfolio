export type Greeting = {
  /** Time-of-day greeting shown as the section heading. */
  greeting: string;
  /** Witty, frontend-flavored caption shown under the greeting. */
  caption: string;
};

/**
 * Greeting + caption resolved from the *viewer's* local hour. Edit freely —
 * the captions are meant to be playful and unmistakably frontend.
 */
export function getGreeting(hour: number): Greeting {
  if (hour >= 5 && hour < 12) {
    return {
      greeting: "Good morning",
      caption: "git pull, pour ☕, npm run dev",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: "Good afternoon",
      caption: "Turning Figma into pixel-perfect, accessible UI",
    };
  }

  if (hour >= 17 && hour < 24) {
    return {
      greeting: "Good evening",
      caption: 'git commit -m "final final v2 (for real this time)"',
    };
  }

  // hour 0–4: late night/early morning
  return {
    greeting: "Still up?",
    caption: "// TODO: sleep — deferred to next sprint",
  };
}

/** Neutral, deterministic value for SSR / first paint (before local hour is known). */
export const DEFAULT_GREETING: Greeting = {
  greeting: "Hello",
  caption: "Building things people depend on",
};
