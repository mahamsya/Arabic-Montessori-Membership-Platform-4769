import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiLock, FiCheck, FiShoppingBag } = FiIcons;

const Checkout = () => {
  const { language } = useLanguage();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const planId = searchParams.get('plan');
  const period = searchParams.get('period');

  const membershipPrices = {
    basic: { monthly: 99, annual: 999 },
    vip: { monthly: 199, annual: 1999 },
  };

  const isMembershipCheckout = planId && period;
  const checkoutItems = isMembershipCheckout ? [{
    id: planId,
    title: planId === 'basic' ? (language === 'ar' ? 'العضوية الأساسية' : 'Basic Membership') : (language === 'ar' ? 'العضوية المميزة' : 'VIP Membership'),
    price: membershipPrices[planId][period],
    quantity: 1,
    type: 'membership',
    period: period,
  }] : items;

  const totalPrice = isMembershipCheckout ? membershipPrices[planId][period] : getTotalPrice();

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setOrderComplete(true);
      if (!isMembershipCheckout) {
        clearCart();
      }
      setLoading(false);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'ar' 
              ? 'شكراً لك! تم تأكيد طلبك وسيتم إرسال تفاصيل الدفع إلى بريدك الإلكتروني.'
              : 'Thank you! Your order has been confirmed and payment details will be sent to your email.'
            }
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              {language === 'ar' ? 'الذهاب للوحة التحكم' : 'Go to Dashboard'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <p className="text-gray-600 mb-4">
            {language === 'ar' ? 'يرجى تسجيل الدخول لإتمام عملية الشراء' : 'Please login to complete your purchase'}
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </button>
        </div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <SafeIcon icon={FiShoppingBag} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {language === 'ar' ? 'لا توجد عناصر للدفع' : 'No items to checkout'}
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'إتمام عملية الدفع' : 'Complete Your Purchase'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'راجعي طلبك واختاري طريقة الدفع' : 'Review your order and choose payment method'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
            </h2>
            
            <div className="space-y-4">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    {item.type === 'membership' && (
                      <p className="text-sm text-gray-600">
                        {item.period === 'monthly' ? (language === 'ar' ? 'شهري' : 'Monthly') : (language === 'ar' ? 'سنوي' : 'Annual')}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'الكمية:' : 'Quantity:'} {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {item.price} {language === 'ar' ? 'ريال' : 'SAR'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  {language === 'ar' ? 'الإجمالي' : 'Total'}
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  {totalPrice} {language === 'ar' ? 'ريال' : 'SAR'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
            </h2>

            {/* Payment Method Selection */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <input
                  id="stripe"
                  name="payment-method"
                  type="radio"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="stripe" className="ml-3 flex items-center">
                  <SafeIcon icon={FiCreditCard} className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900">
                    {language === 'ar' ? 'بطاقة ائتمان (Stripe)' : 'Credit Card (Stripe)'}
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="paypal"
                  name="payment-method"
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="paypal" className="ml-3 flex items-center">
                  <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                  <span className="text-sm font-medium text-gray-900">PayPal</span>
                </label>
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === 'stripe' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'رقم البطاقة' : 'Card Number'}
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'رمز الأمان' : 'CVV'}
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'اسم حامل البطاقة' : 'Cardholder Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={user.name}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}

            {/* Security Notice */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <SafeIcon icon={FiLock} className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  {language === 'ar' ? 'دفع آمن ومحمي بتشفير SSL' : 'Secure payment protected with SSL encryption'}
                </span>
              </div>
            </div>

            {/* Complete Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-primary-600 text-white py-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <SafeIcon icon={FiLock} className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'إتمام الدفع' : 'Complete Payment'}
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;