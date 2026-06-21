import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function titleCase(word: string) {
  return `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`;
}
