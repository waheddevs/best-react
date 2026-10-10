/** Separate the existing English cue-card prompt without changing its content. */
export function parseStudentSpeakingCueCard(prompt: string) {
  const marker = /\s+(?:You should say|Say)\s*:?\s+/i.exec(prompt);
  if (!marker || marker.index === 0) return { title: prompt, points: [] };

  const title = prompt.slice(0, marker.index).trim();
  const details = prompt.slice(marker.index + marker[0].length).trim();
  if (!details) return { title: prompt, points: [] };

  const points = details
    .split(/[,;]\s*(?:and\s+)?(?=(?:who|what|when|where|why|how|whether)\b)|\r?\n+/i)
    .map((point) => point.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);

  return { title, points };
}
