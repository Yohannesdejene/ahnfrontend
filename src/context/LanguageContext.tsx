"use client"; // Add this at the very top
import React, { createContext, useContext, useState, ReactNode } from "react";

type Locale = "en" | "am" | "om"; // Define your supported locales
type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

// Create the context
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Provider component to wrap the app
export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en"); // default to 'en'

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook to use locale context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
