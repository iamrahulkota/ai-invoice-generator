import React, { type RefObject, useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  query: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
  placeholder?: string;
  className?: string;
  searchRef?: RefObject<HTMLInputElement>;
  id?: string;
  debounceTime?: number;
}

export default function SearchBar({
  query,
  placeholder = "Search...",
  className = "",
  searchRef,
  debounceTime = 300,
  ...props
} : SearchBarProps) {
  const [value, setValue] = query;
  // Internal state to track input value
  const [inputValue, setInputValue] = useState<string>(value || '');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update internal state when external value changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Update internal state immediately for responsive UI
    setInputValue(newValue);
    
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set a new timer to update parent state after debounce time
    debounceTimerRef.current = setTimeout(() => {
      setValue(newValue);
    }, debounceTime);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const { ...rest } = props;

  return (
    <div className="relative">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
    <Input
      {...rest}
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={cn(
        "pl-10 rounded-lg border bg-background focus-visible:ring-primary min-w-56 h-8",
        className
      )}
    />
  </div>
  );
};