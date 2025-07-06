import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiStar, FiCrown } = FiIcons;

const Membership = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      id: 'basic',
      name: t('membership.tier1'),
      description: language === 'ar' ? 'مثالية للأمهات المبتدئات' : 'Perfect for beginner mothers',
      icon: FiStar,
      color: 'primary',
      monthlyPrice: 99,
      annualPrice: 999,
      features: [
        { name: language === 'ar' ? 'الوصول لـ 50 مادة تعليمية' : 'Access to 50 educational materials', included: true },
        { name: language === 'ar' ? '3 دورات تدريبية' : '3 training courses', included: true },
        { name: language === 'ar' ? 'دعم عبر البريد الإلكتروني' : 'Email support', included: true },
        { name: language === 'ar' ? 'شهادات الإتمام' : 'Completion certificates', included: true },
        { name: language === 'ar' ? 'الوصول لجميع المواد' : 'Access to all materials', included: false },
        { name: language === 'ar' ? 'دعم مباشر' : 'Live support', included: false },
        { name: language === 'ar' ? 'ورش عمل حصرية' : 'Exclusive workshops', included: false },
      ],
      popular: false,
    },
    {
      id: 'vip',
      name: t('membership.tier2'),
      description: language === 'ar' ? 'للأمهات والمعلمات المتقدمات' : 'For advanced mothers and educators',
      icon: FiCrown,
      color: 'secondary',
      monthlyPrice: 199,
      annualPrice: 1999,
      features: [
        { name: language === 'ar' ? 'الوصول لجميع المواد التعليمية' : 'Access to all educational materials', included: true },
        { name: language === 'ar' ? 'جميع الدورات التدريبية' : 'All training courses', included: true },
        { name: language === 'ar' ? 'دعم مباشر 24/7' : '24/7 live support', included: true },
        { name: language === 'ar' ? 'شهادات الإتمام' : 'Completion certificates', included: true },
        { name: language === 'ar' ? 'ورش عمل حصرية' : 'Exclusive workshops', included: true },
        { name: language === 'ar' ? 'استشارات فردية' : 'Personal consultations', included: true },
        { name: language === 'ar' ? 'محتوى جديد أسبوعياً' : 'New weekly content', included: true },
      ],
      popular: true,
    },
  ];

  const handleSubscribe = (planId) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    
    // Handle subscription logic
    console.log('Subscribing to plan:', planId, 'Period:', billingPeriod);
    // Redirect to payment
    window.location.href = `/checkout?plan=${planId}&period=${billingPeriod}`;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('membership.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {language === 'ar' 
              ? 'اختاري الخطة التي تناسب احتياجاتك واستمتعي بتجربة تعليمية متكاملة'
              : 'Choose the plan that suits your needs and enjoy a comprehensive educational experience'
            }
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-primary-600' : 'text-gray-500'}`}>
              {t('membership.monthly')}
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                billingPeriod === 'annual' ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  billingPeriod === 'annual' ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingPeriod === 'annual' ? 'text-primary-600' : 'text-gray-500'}`}>
              {t('membership.annual')}
            </span>
            {billingPeriod === 'annual' && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                {language === 'ar' ? 'وفر 17%' : 'Save 17%'}
              </span>
            )}
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            const savings = getSavings(plan);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary-600 text-white text-center py-2 text-sm font-medium">
                    {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                  </div>
                )}
                
                <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      plan.color === 'primary' ? 'bg-primary-100' : 'bg-secondary-100'
                    }`}>
                      <SafeIcon 
                        icon={plan.icon} 
                        className={`w-8 h-8 ${
                          plan.color === 'primary' ? 'text-primary-600' : 'text-secondary-600'
                        }`} 
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {plan.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          {price}
                        </span>
                        <span className="text-lg text-gray-500 ml-2">
                          {language === 'ar' ? 'ريال' : 'SAR'}
                        </span>
                        <span className="text-gray-500 ml-2">
                          / {billingPeriod === 'monthly' ? (language === 'ar' ? 'شهر' : 'month') : (language === 'ar' ? 'سنة' : 'year')}
                        </span>
                      </div>
                      {billingPeriod === 'annual' && (
                        <p className="text-sm text-green-600 mt-2">
                          {language === 'ar' ? `وفر ${savings.amount} ريال سنوياً` : `Save ${savings.amount} SAR annually`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <SafeIcon 
                          icon={feature.included ? FiCheck : FiX} 
                          className={`w-5 h-5 ${
                            feature.included ? 'text-green-500' : 'text-gray-400'
                          } ml-3`} 
                        />
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {user?.membership === plan.id 
                      ? (language === 'ar' ? 'خطتك الحالية' : 'Current Plan')
                      : (language === 'ar' ? 'اشترك الآن' : 'Subscribe Now')
                    }
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {[
              {
                question: language === 'ar' ? 'هل يمكنني إلغاء الاشتراك في أي وقت؟' : 'Can I cancel my subscription anytime?',
                answer: language === 'ar' ? 'نعم، يمكنك إلغاء اشتراكك في أي وقت من لوحة التحكم.' : 'Yes, you can cancel your subscription anytime from your dashboard.',
              },
              {
                question: language === 'ar' ? 'هل تقدمون ضمان استرداد الأموال؟' : 'Do you offer money-back guarantee?',
                answer: language === 'ar' ? 'نعم، نقدم ضمان استرداد الأموال خلال 30 يوماً.' : 'Yes, we offer a 30-day money-back guarantee.',
              },
              {
                question: language === 'ar' ? 'هل يمكنني ترقية خطتي لاحقاً؟' : 'Can I upgrade my plan later?',
                answer: language === 'ar' ? 'بالطبع، يمكنك ترقية خطتك في أي وقت.' : 'Of course, you can upgrade your plan anytime.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;