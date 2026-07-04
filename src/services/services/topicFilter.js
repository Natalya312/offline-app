const forbiddenWords = [
  "sex",
  "sexy",
  "intim",
  "intimate",
  "erotic",
  "porn",
  "nude",
  "naked",
  "escort",
  "dating",
  "hookup",
  "18+",
  "adult",

  "секс",
  "интим",
  "эротика",
  "порно",
  "голые",
  "нюдсы",
  "знакомства",

  "sexuell",
  "intim",
  "erotik",
  "porno",
  "nackt",
  "escort"
];

export function isTopicAllowed(text = "") {
  const lowerText = text.toLowerCase();

  return !forbiddenWords.some((word) =>
    lowerText.includes(word)
  );
}