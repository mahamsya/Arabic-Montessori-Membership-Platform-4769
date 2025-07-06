import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [isRTL, setIsRTL] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === 'ar');
    
    // Set document direction
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'ar');
    localStorage.setItem('language', newLanguage);
    
    // Update document direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const t = (key) => {
    const translations = {
      // Navigation
      'nav.home': { ar: 'الرئيسية', en: 'Home' },
      'nav.shop': { ar: 'المتجر', en: 'Shop' },
      'nav.courses': { ar: 'الدورات', en: 'Courses' },
      'nav.membership': { ar: 'العضوية', en: 'Membership' },
      'nav.dashboard': { ar: 'لوحة التحكم', en: 'Dashboard' },
      'nav.login': { ar: 'تسجيل الدخول', en: 'Login' },
      'nav.signup': { ar: 'إنشاء حساب', en: 'Sign Up' },
      
      // Homepage
      'hero.title': { ar: 'رحلة التعليم المبكر تبدأ هنا', en: 'Early Education Journey Starts Here' },
      'hero.subtitle': { ar: 'منصة تعليمية شاملة للأمهات والمعلمات مع محتوى منتسوري عربي أصيل', en: 'Comprehensive educational platform for mothers and educators with authentic Arabic Montessori content' },
      'hero.cta': { ar: 'ابدأي رحلتك الآن', en: 'Start Your Journey' },
      
      // About
      'about.title': { ar: 'عن رؤيتي', en: 'About My Vision' },
      'about.description': { ar: 'أؤمن بأن التعليم المبكر هو أساس بناء جيل واعٍ ومبدع. من خلال دمج منهجية منتسوري مع الثقافة العربية، نقدم تجربة تعليمية فريدة تحترم طبيعة الطفل وتنمي قدراته الفطرية.', en: 'I believe that early education is the foundation for building a conscious and creative generation. By integrating Montessori methodology with Arabic culture, we provide a unique educational experience that respects the child\'s nature and develops their innate abilities.' },
      
      // Shop
      'shop.title': { ar: 'المتجر الرقمي', en: 'Digital Shop' },
      'shop.filter.age': { ar: 'العمر', en: 'Age' },
      'shop.filter.type': { ar: 'النوع', en: 'Type' },
      'shop.age.0-3': { ar: '0-3 سنوات', en: '0-3 years' },
      'shop.age.3-6': { ar: '3-6 سنوات', en: '3-6 years' },
      'shop.age.6-9': { ar: '6-9 سنوات', en: '6-9 years' },
      'shop.age.9-12': { ar: '9-12 سنة', en: '9-12 years' },
      
      // Courses
      'courses.title': { ar: 'الدورات التدريبية', en: 'Training Courses' },
      'courses.progress': { ar: 'التقدم', en: 'Progress' },
      'courses.certificate': { ar: 'شهادة إتمام', en: 'Certificate of Completion' },
      
      // Membership
      'membership.title': { ar: 'خطط العضوية', en: 'Membership Plans' },
      'membership.tier1': { ar: 'العضوية الأساسية', en: 'Basic Membership' },
      'membership.tier2': { ar: 'العضوية المميزة', en: 'VIP Membership' },
      'membership.monthly': { ar: 'شهري', en: 'Monthly' },
      'membership.annual': { ar: 'سنوي', en: 'Annual' },
      
      // Dashboard
      'dashboard.title': { ar: 'لوحة التحكم', en: 'Dashboard' },
      'dashboard.downloads': { ar: 'التحميلات', en: 'Downloads' },
      'dashboard.progress': { ar: 'تقدم الدورات', en: 'Course Progress' },
      'dashboard.suggested': { ar: 'المحتوى المقترح', en: 'Suggested Content' },
      
      // Common
      'common.loading': { ar: 'جاري التحميل...', en: 'Loading...' },
      'common.error': { ar: 'حدث خطأ', en: 'An error occurred' },
      'common.save': { ar: 'حفظ', en: 'Save' },
      'common.cancel': { ar: 'إلغاء', en: 'Cancel' },
      'common.continue': { ar: 'متابعة', en: 'Continue' },
      'common.back': { ar: 'رجوع', en: 'Back' },
      'common.next': { ar: 'التالي', en: 'Next' },
      'common.previous': { ar: 'السابق', en: 'Previous' },
      'common.download': { ar: 'تحميل', en: 'Download' },
      'common.price': { ar: 'السعر', en: 'Price' },
      'common.addToCart': { ar: 'إضافة للسلة', en: 'Add to Cart' },
      'common.buyNow': { ar: 'اشتري الآن', en: 'Buy Now' },
    };

    return translations[key]?.[language] || key;
  };

  const value = {
    language,
    isRTL,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};