import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiUsers, FiAward, FiHeart, FiStar, FiArrowRight } = FiIcons;

const Home = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: FiBookOpen,
      title: language === 'ar' ? 'محتوى منتسوري عربي' : 'Arabic Montessori Content',
      description: language === 'ar' ? 'مواد تعليمية مصممة خصيصاً للأطفال العرب' : 'Educational materials designed specifically for Arab children',
    },
    {
      icon: FiUsers,
      title: language === 'ar' ? 'مجتمع تعليمي' : 'Educational Community',
      description: language === 'ar' ? 'انضمي لمجتمع الأمهات والمعلمات المتميزات' : 'Join a community of exceptional mothers and educators',
    },
    {
      icon: FiAward,
      title: language === 'ar' ? 'شهادات معتمدة' : 'Certified Courses',
      description: language === 'ar' ? 'احصلي على شهادات إتمام معتمدة' : 'Receive certified completion certificates',
    },
    {
      icon: FiHeart,
      title: language === 'ar' ? 'تعليم بالحب' : 'Education with Love',
      description: language === 'ar' ? 'منهجية تعليمية تحترم طبيعة الطفل' : 'Educational methodology that respects the child\'s nature',
    },
  ];

  const testimonials = [
    {
      name: 'أم فاطمة',
      text: 'منصة رائعة ساعدتني في تطوير مهارات ابنتي بطريقة ممتعة وعلمية',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'المعلمة سارة',
      text: 'المحتوى عالي الجودة والدورات التدريبية مفيدة جداً للمعلمات',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'أم أحمد',
      text: 'أحب التنوع في المواد التعليمية والطريقة السهلة في التحميل',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <span>{t('hero.cta')}</span>
                  <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
                </Link>
                <Link
                  to="/courses"
                  className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-600 hover:text-white transition-colors duration-200"
                >
                  {language === 'ar' ? 'استكشف الدورات' : 'Explore Courses'}
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop"
                alt="Mother and child learning"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ar' ? '1000+ أم راضية' : '1000+ Happy Mothers'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae4c8c73b1da?w=600&h=400&fit=crop"
                alt="Educational materials"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute top-6 right-6 bg-primary-600 text-white p-3 rounded-full">
                <SafeIcon icon={FiBookOpen} className="w-6 h-6" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('about.description')}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ar' ? 'مادة تعليمية' : 'Educational Materials'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">
                    {language === 'ar' ? 'دورة تدريبية' : 'Training Courses'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'لماذا تختارين منصتنا؟' : 'Why Choose Our Platform?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'نقدم تجربة تعليمية متكاملة تجمع بين العلم والحب والثقافة العربية الأصيلة'
                : 'We provide a comprehensive educational experience that combines science, love, and authentic Arabic culture'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'ماذا يقول عملاؤنا؟' : 'What Our Customers Say?'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full ml-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <SafeIcon key={i} icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === 'ar' ? 'ابدأي رحلة التعلم اليوم' : 'Start Your Learning Journey Today'}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'انضمي لآلاف الأمهات والمعلمات اللواتي يثقن في منصتنا لتطوير أطفالهن'
                : 'Join thousands of mothers and educators who trust our platform to develop their children'
              }
            </p>
            <Link
              to="/membership"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2 rtl:space-x-reverse"
            >
              <span>{language === 'ar' ? 'اشتركي الآن' : 'Subscribe Now'}</span>
              <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;