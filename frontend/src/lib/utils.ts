import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Capitalize the first letter of each word in a string
export const capitalizeWords = (str: string): string => {
  return str.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
};

// Format price with locale-specific formatting
export function formatPrice(price: number, showDecimals = false, currency = 'INR'): string {
// Handle non-numeric input
    if (isNaN(price)) {
        return "";
    }

    if (currency === "") currency = "INR";

    // For very small amounts (less than 0.01), show all decimal places
    if (Math.abs(price) > 0 && Math.abs(price) < 0.01) {
        const formatter = new Intl.NumberFormat(currency === "INR" ? 'en-IN' : "en-US", {
            style: 'currency',
            currency,
            minimumFractionDigits: 6,
            maximumFractionDigits: 6
        });
        return formatter.format(price);
    }

    // Use Intl.NumberFormat for locale-specific formatting
    const formatter = new Intl.NumberFormat(currency === "INR" ? 'en-IN' : "en-US", {
        style: 'currency',
        currency,
        minimumFractionDigits: showDecimals ? 2 : 0, // Control decimals
    });

    return formatter.format(price);
}
