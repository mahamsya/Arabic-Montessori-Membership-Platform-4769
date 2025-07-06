import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiPlay, FiTrendingUp, FiBookOpen, FiAward, FiStar, FiCalendar } = FiIcons;

const Dashboard = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: language === 'ar' ? 'المواد المحملة' : 'Downloaded Materials',
      value: '24',
      icon: FiDownload,
      color: 'primary',
      change: '+3',
    },
    {
      title: language === 'ar' ? 'الدورات المكتملة' : 'Completed Courses',
      value: '6',
      icon: FiAward,
      color: 'green',
      change: '+2',
    },
    {
      title: language === 'ar' ? 'ساعات التعلم' : 'Learning Hours',
      value: '42',
      icon: FiPlay,
      color: 'blue',
      change: '+8',
    },
    {
      title: language === 'ar' ? 'نقاط الإنجاز' : 'Achievement Points',
      value: '1,240',
      icon: FiStar,
      color: 'yellow',
      change: '+120',
    },
  ];

  const recentDownloads = [
    {
      id: 1,
      title: language === 'ar' ? 'مجموعة الأرقام العربية' : 'Arabic Numbers Collection',
      date: '2024-01-15',
      size: '2.5 MB',
      type: 'PDF',
    },
    {
      id: 2,
      title: language === 'ar' ? 'أنشطة الحياة العملية' : 'Practical Life Activities',
      date: '2024-01-12',
      size: '3.8 MB',
      type: 'PDF',
    },
    {
      id: 3,
      title: language === 'ar' ? 'قصص الأطفال التفاعلية' : 'Interactive Children Stories',
      date: '2024-01-10',
      size: '15.2 MB',
      type: 'Interactive',
    },
  ];

  const courseProgress = [
    {
      id: 1,
      title: language === 'ar' ? 'أساسيات منهج منتسوري' : 'Montessori Method Basics',
      progress: 65,
      nextLesson: language === 'ar' ? 'الأنشطة العملية' : 'Practical Activities',
      timeLeft: '2 ساعات',
    },
    {
      id: 2,
      title: language === 'ar' ? 'تطوير المهارات الحركية' : 'Motor Skills Development',
      progress: 30,
      nextLesson: language === 'ar' ? 'أنشطة المهارات الدقيقة' : 'Fine Motor Activities',
      timeLeft: '3 ساعات',
    },
  ];

  const suggestedContent = [
    {
      id: 1,
      title: language === 'ar' ? 'ألعاب الذاكرة والتركيز' : 'Memory and Focus Games',
      type: 'material',
      reason: language === 'ar' ? 'بناءً على اهتمامك بالأنشطة التفاعلية' : 'Based on your interest in interactive activities',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=150&h=100&fit=crop',
    },
    {
      id: 2,
      title: language === 'ar' ? 'القراءة المبكرة' : 'Early Reading',
      type: 'course',
      reason: language === 'ar' ? 'لإكمال رحلة التعلم في منهج منتسوري' : 'To complete your Montessori learning journey',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=100&fit=crop',
    },
  ];

  const tabs = [
    { id: 'overview', label: language === 'ar' ? 'نظرة عامة' : 'Overview' },
    { id: 'downloads', label: t('dashboard.downloads') },
    { id: 'courses', label: language === 'ar' ? 'دوراتي' : 'My Courses' },
    { id: 'suggested', label: t('dashboard.suggested') },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change} {language === 'ar' ? 'هذا الشهر' : 'this month'}</p>
                    </div>
                    <div className={`p-3 rounded-full ${
                      stat.color === 'primary' ? 'bg-primary-100' :
                      stat.color === 'green' ? 'bg-green-100' :
                      stat.color === 'blue' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      <SafeIcon 
                        icon={stat.icon} 
                        className={`w-6 h-6 ${
                          stat.color === 'primary' ? 'text-primary-600' :
                          stat.color === 'green' ? 'text-green-600' :
                          stat.color === 'blue' ? 'text-blue-600' :
                          'text-yellow-600'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'ar' ? 'آخر التحميلات' : 'Recent Downloads'}
                </h3>
                <div className="space-y-3">
                  {recentDownloads.map((download) => (
                    <div key={download.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{download.title}</p>
                        <p className="text-sm text-gray-500">{download.date} • {download.size}</p>
                      </div>
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                        {download.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'ar' ? 'تقدم الدورات' : 'Course Progress'}
                </h3>
                <div className="space-y-4">
                  {courseProgress.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900">{course.title}</p>
                        <span className="text-sm text-primary-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {language === 'ar' ? 'التالي:' : 'Next:'} {course.nextLesson}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'downloads':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {t('dashboard.downloads')}
            </h3>
            <div className="space-y-4">
              {recentDownloads.map((download) => (
                <div key={download.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={FiDownload} className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{download.title}</p>
                      <p className="text-sm text-gray-500">{download.date} • {download.size}</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 transition-colors duration-200">
                    <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            {courseProgress.map((course) => (
              <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <span className="text-sm text-primary-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {language === 'ar' ? 'التالي:' : 'Next:'} {course.nextLesson}
                  </p>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    {language === 'ar' ? 'متابعة' : 'Continue'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'suggested':
        return (
          <div className="space-y-6">
            {suggestedContent.map((content) => (
              <div key={content.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{content.reason}</p>
                    <span className="text-xs bg-secondary-100 text-secondary-800 px-2 py-1 rounded">
                      {content.type === 'material' ? (language === 'ar' ? 'مادة تعليمية' : 'Educational Material') : (language === 'ar' ? 'دورة' : 'Course')}
                    </span>
                  </div>
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    {language === 'ar' ? 'عرض' : 'View'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">
            {language === 'ar' ? 'يرجى تسجيل الدخول أولاً' : 'Please login first'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'ar' ? `مرحباً، ${user.name}` : `Welcome, ${user.name}`}
              </h1>
              <p className="text-gray-600 mt-2">
                {language === 'ar' ? 'إليك ملخص نشاطك التعليمي' : 'Here\'s a summary of your learning activity'}
              </p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.membership === 'vip' 
                  ? 'bg-secondary-100 text-secondary-800' 
                  : 'bg-primary-100 text-primary-800'
              }`}>
                {user.membership === 'vip' ? (language === 'ar' ? 'عضوية مميزة' : 'VIP Member') : (language === 'ar' ? 'عضوية أساسية' : 'Basic Member')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 rtl:space-x-reverse">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;