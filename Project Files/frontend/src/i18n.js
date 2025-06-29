import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

    const resources = {
  en: {
    translation: {
      signInTitle: "Sign in to your account",
email: "Email",
password: "Password",
login: "Login",
noAccount: "Don’t have an account?",
registerHere: "Register here",
loginFailed: "Login failed. Please check your credentials.",
signupTitle: "Sign up to your account",
      fullName: "Full Name",
      sendOtp: "Send OTP",
      enterOtp: "Enter OTP",
      verifyOtp: "Verify OTP",
      phone: "Phone",
      admin: "Admin",
      user: "User",
      register: "Register",
      haveAccount: "Have an account?",
      loginHere: "Login here",
      enterEmailToSendOtp: "Enter email to send OTP",
      otpSent: "✅ OTP sent to your email.",
      otpFailed: "❌ Failed to send OTP",
      otpVerified: "✅ OTP Verified",
      invalidOtp: "❌ Invalid OTP",
      otpVerificationFailed: "❌ OTP verification failed",
      verifyOtpWarning: "⚠️ Please verify OTP before registering.",
      registrationSuccess: "✅ Registered successfully!",
      registrationFailed: "❌ Registration failed",
    },
  },
  hi: {
    translation: {
      signInTitle: "अपने खाते में लॉगिन करें",
email: "ईमेल",
password: "पासवर्ड",
login: "लॉगिन",
noAccount: "खाता नहीं है?",
registerHere: "यहाँ पंजीकरण करें",
loginFailed: "लॉगिन विफल। कृपया अपनी साख जांचें।",
signupTitle: "अपने खाते में साइन अप करें",
      fullName: "पूरा नाम",
      sendOtp: "ओटीपी भेजें",
      enterOtp: "ओटीपी दर्ज करें",
      verifyOtp: "ओटीपी सत्यापित करें",
      phone: "फ़ोन",
      admin: "व्यवस्थापक",
      user: "उपयोगकर्ता",
      register: "पंजीकरण करें",
      haveAccount: "क्या आपके पास खाता है?",
      loginHere: "यहाँ लॉगिन करें",
      enterEmailToSendOtp: "ओटीपी भेजने के लिए ईमेल दर्ज करें",
      otpSent: "✅ ओटीपी आपके ईमेल पर भेजा गया है।",
      otpFailed: "❌ ओटीपी भेजने में विफल",
      otpVerified: "✅ ओटीपी सत्यापित",
      invalidOtp: "❌ अमान्य ओटीपी",
      otpVerificationFailed: "❌ ओटीपी सत्यापन विफल",
      verifyOtpWarning: "⚠️ कृपया पंजीकरण से पहले ओटीपी सत्यापित करें।",
      registrationSuccess: "✅ सफलतापूर्वक पंजीकृत!",
      registrationFailed: "❌ पंजीकरण विफल",
    },
  },
};
    i18n
  .use(LanguageDetector) // <-- use it here
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
