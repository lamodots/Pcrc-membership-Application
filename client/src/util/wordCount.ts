export const handleWordCount = (text: string) => {
  const words = text.trim().split(/\s+/);
  return words.length;
};
