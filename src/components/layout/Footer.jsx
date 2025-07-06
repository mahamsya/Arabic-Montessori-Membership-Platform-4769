import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiYoutube } = FiIcons;

const Footer = () => {
  const { t, language } = useLanguage();

  const socialLinks = [
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ت</span>
              </div>
              <span className="text-xl font-bold">
                {language === 'ar' ? 'تعليم مبكر' : 'Early Learning'}
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {language === 'ar' 
                ? 'منصة تعليمية شاملة تهدف إلى تطوير قدرات الأطفال من خلال منهجية منتسوري المدمجة مع الثقافة العربية الأصيلة.'
                : 'A comprehensive educational platform aimed at developing children\'s abilities through Montessori methodology integrated with authentic Arabic culture.'
              }
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {t('nav.courses')}
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {t('nav.membership')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  {language === 'ar' ? 'من نحن' : 'About Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <SafeIcon icon={FiMail} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">info@earlylearning.com</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <SafeIcon icon={FiPhone} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">+966 50 123 4567</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">
                  {language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {language === 'ar' 
              ? '© 2024 تعليم مبكر. جميع الحقوق محفوظة.'
              : '© 2024 Early Learning. All rights reserved.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;