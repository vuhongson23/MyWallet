export function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    food: "🍔",
    transport: "🚗",
    entertainment: "🎬",
    shopping: "🛍️",
    utilities: "💡",
    health: "💊",
    education: "📚",
    other: "📌",
  };

  return emojiMap[category] || "📌";
}
