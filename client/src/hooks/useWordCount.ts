import { useState, useCallback } from "react";

function useWordCount() {
  const [wordCount, setWordCount] = useState(0);

  const handleWordCount = useCallback((text: string) => {
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);
  }, []);

  return { wordCount, handleWordCount };
}

export default useWordCount;
