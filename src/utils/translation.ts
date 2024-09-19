// utils/translation.ts

import en from "@/translations/en.json";
import am from "@/translations/am.json";
import om from "@/translations/om.json";

// Define supported locales
export type Locale = "en" | "am" | "om";

// Store the translations for each locale
const translations: Record<Locale, any> = {
  en,
  am,
  om,
};

// Helper function to get a nested value by key
const getNestedTranslation = (key: string, locale: Locale): any => {
  const keys = key.split("."); // Split by dot notation for nested keys
  let translation: any = translations[locale];

  for (const k of keys) {
    if (translation[k] !== undefined) {
      translation = translation[k];
    } else {
      return key; // Return the key as fallback if translation is missing
    }
  }

  return translation;
};

// Translation function
export const t = (key: string): any => {
  // Get the stored locale from localStorage or default to "en"
  const locale =
    ((typeof window !== "undefined" &&
      localStorage.getItem("locale")) as Locale) || "en";

  return getNestedTranslation(key, locale);
};
