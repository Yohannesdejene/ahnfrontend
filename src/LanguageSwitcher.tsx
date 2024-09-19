"use client"; // Mark as client component
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "./LanguageContext"; // Adjust the import path
import { Locale } from "@/utils/translation";
const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();
  const router = useRouter();

  // Load the saved locale from localStorage
  useEffect(() => {
    const storedLocale = localStorage.getItem("locale") as Locale;
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, [setLocale]);

  // Handle language change
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    console.log("Language changed to:", newLocale);
    router.refresh(); // Refresh the page to apply the language change
  };

  return (
    <select onChange={changeLanguage} value={locale}>
      <option value="en">English</option>
      <option value="am">Amharic</option>
    </select>
  );
};

export default LanguageSwitcher;
