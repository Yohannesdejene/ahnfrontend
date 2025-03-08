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
    // window.location.reload();
    router.refresh(); // Refresh the page to apply the language change
  };

  return (
    <select
      onChange={changeLanguage}
      value={locale}
      className="font-sans focus:shadow-outline-primary dark:focus:shadow-outline-primary w-full rounded-lg border border-solid border-slate-300 bg-white  py-2 text-sm font-normal leading-5 text-slate-900 shadow-md shadow-slate-100 focus:border-primary focus:shadow-lg focus-visible:outline-0 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:shadow-slate-900 dark:focus:border-primary"
    >
      <option value="en">English</option>
      <option value="am">አማርኛ</option>
      {/* <option value="om">Afan Oromo</option> */}
    </select>
  );
};

export default LanguageSwitcher;
