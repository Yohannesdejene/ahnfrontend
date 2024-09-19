/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mui-one-time-password-input"],
  i18n: {
    locales: ["en", "am"], // Add the languages you want to support
    defaultLocale: "en", // Set the default language
  },
};

export default nextConfig;
