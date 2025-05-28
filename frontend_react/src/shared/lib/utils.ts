import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind CSSのクラス名をマージする */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
