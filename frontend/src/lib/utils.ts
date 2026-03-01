import { environment } from "@/config/environment";
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEFAULT_KEYS_TO_KEEP = ['theme'];

export const handleLogout = async (keepKeys = [], reload = true) => {
  // Get user ID before clearing localStorage
  const token = localStorage.getItem('token');
  let userId = null;
  
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      userId = decodedToken.id;
    } catch (error) {
      console.warn('Could not decode token for session tracking:', error);
    }
  }

  const keysToKeep = [...DEFAULT_KEYS_TO_KEEP, ...keepKeys];
  // Remove everything except the keys we want to keep
  const keysToRemove = Object.keys(localStorage).filter(key => !keysToKeep.includes(key));
  keysToRemove.forEach(key => localStorage.removeItem(key));
  toast.success("Logged out successfully");
  setTimeout(() => toast.dismiss(), 3000);

  if (reload) {
    window.location.href = environment.basename + "/";
  }
};


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
