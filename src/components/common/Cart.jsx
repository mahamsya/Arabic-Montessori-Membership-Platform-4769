import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiPlus, FiMinus, FiShoppingBag, FiCreditCard } = FiIcons;

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, isOpen, setIsOpen } = useCart();
  const { t, language, isRTL } = useLanguage();

  const handleCheckout = () => {
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: isRTL ? -400 : 400 }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? -400 : 400 }}
            className={`fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                {language === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <SafeIcon icon={FiShoppingBag} className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {language === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.price} {language === 'ar' ? 'ريال' : 'SAR'}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <SafeIcon icon={FiMinus} className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <SafeIcon icon={FiPlus} className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <SafeIcon icon={FiX} className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    {language === 'ar' ? 'الإجمالي' : 'Total'}
                  </span>
                  <span className="text-lg font-bold text-primary-600">
                    {getTotalPrice()} {language === 'ar' ? 'ريال' : 'SAR'}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
                  <span>{language === 'ar' ? 'الدفع' : 'Checkout'}</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;