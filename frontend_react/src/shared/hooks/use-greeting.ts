import { useCurrentDate } from '@/shared/hooks/use-current-date';
import { useState, useEffect } from 'react';

export const useGreeting = () => {
  const [formal, setFormal] = useState<string>('');
  const [casual, setCasual] = useState<string>('');
  const currentDate = useCurrentDate({ timeResolution: 'day' });

  useEffect(() => {
    const hours = currentDate.getHours();
    if (hours >= 4 && hours < 12) {
      setFormal('おはようございます');
      setCasual('おはよう');
    } else if (hours >= 12 && hours < 18) {
      setFormal('こんにちは');
      setCasual('やあ');
    } else if (hours >= 18) {
      setFormal('お疲れ様でした');
      setCasual('こんばんは');
    } else {
      setFormal('こんばんは');
      setCasual('こんばんは');
    }
  }, [currentDate]);

  return { formal, casual };
};
