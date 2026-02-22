import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Capitalize the first letter of each word in a string
export const capitalizeWords = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
};