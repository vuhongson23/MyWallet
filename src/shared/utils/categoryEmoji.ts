export function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    food: "🍔",
    transport: "🚗",
    shopping: "🛒",
    health: "💊",
    house: "🏠",
    entertainment: "🎮",
    education: "📕",
    other: "⋯",
  };

  return emojiMap[category] || "⋯";
}
