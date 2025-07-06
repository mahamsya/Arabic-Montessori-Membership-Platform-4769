import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFilter, FiShoppingCart, FiDownload, FiStar } = FiIcons;

const Shop = () => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [selectedAge, setSelectedAge] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const products = [
    {
      id: 1,
      title: language === 'ar' ? 'مجموعة الأرقام العربية' : 'Arabic Numbers Collection',
      description: language === 'ar' ? 'مجموعة شاملة لتعليم الأرقام العربية للأطفال' : 'Comprehensive collection for teaching Arabic numbers to children',
      price: 45,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop',
      ageGroup: '3-6',
      type: 'printable',
      rating: 4.8,
      downloads: 1250,
    },
    {
      id: 2,
      title: language === 'ar' ? 'كتاب الحروف التفاعلي' : 'Interactive Letters Book',
      description: language === 'ar' ? 'كتاب رقمي تفاعلي لتعليم الحروف العربية' : 'Interactive digital book for teaching Arabic letters',
      price: 65,
      image: 'https://images.unsplash.com/photo-1516627145497-ae4c8c73b1da?w=300&h=200&fit=crop',
      ageGroup: '0-3',
      type: 'book',
      rating: 4.9,
      downloads: 890,
    },
    {
      id: 3,
      title: language === 'ar' ? 'أنشطة الحياة العملية' : 'Practical Life Activities',
      description: language === 'ar' ? 'مجموعة أنشطة الحياة العملية حسب منهج منتسوري' : 'Practical life activities according to Montessori method',
      price: 55,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=200&fit=crop',
      ageGroup: '6-9',
      type: 'printable',
      rating: 4.7,
      downloads: 654,
    },
    {
      id: 4,
      title: language === 'ar' ? 'قصص الأطفال التفاعلية' : 'Interactive Children Stories',
      description: language === 'ar' ? 'مجموعة قصص تفاعلية تعليمية للأطفال' : 'Collection of interactive educational stories for children',
      price: 75,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      ageGroup: '3-6',
      type: 'book',
      rating: 4.8,
      downloads: 1100,
    },
    {
      id: 5,
      title: language === 'ar' ? 'ألعاب الذاكرة والتركيز' : 'Memory and Focus Games',
      description: language === 'ar' ? 'ألعاب تعليمية لتطوير الذاكرة والتركيز' : 'Educational games for developing memory and focus',
      price: 40,
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop',
      ageGroup: '6-9',
      type: 'printable',
      rating: 4.6,
      downloads: 780,
    },
    {
      id: 6,
      title: language === 'ar' ? 'دليل الأنشطة العلمية' : 'Science Activities Guide',
      description: language === 'ar' ? 'دليل شامل للأنشطة العلمية للأطفال' : 'Comprehensive guide for science activities for children',
      price: 85,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop',
      ageGroup: '9-12',
      type: 'book',
      rating: 4.9,
      downloads: 420,
    },
  ];

  const ageGroups = [
    { value: 'all', label: language === 'ar' ? 'جميع الأعمار' : 'All Ages' },
    { value: '0-3', label: t('shop.age.0-3') },
    { value: '3-6', label: t('shop.age.3-6') },
    { value: '6-9', label: t('shop.age.6-9') },
    { value: '9-12', label: t('shop.age.9-12') },
  ];

  const productTypes = [
    { value: 'all', label: language === 'ar' ? 'جميع الأنواع' : 'All Types' },
    { value: 'printable', label: language === 'ar' ? 'قابل للطباعة' : 'Printable' },
    { value: 'book', label: language === 'ar' ? 'كتاب تفاعلي' : 'Interactive Book' },
  ];

  const filteredProducts = products.filter(product => {
    const ageMatch = selectedAge === 'all' || product.ageGroup === selectedAge;
    const typeMatch = selectedType === 'all' || product.type === selectedType;
    return ageMatch && typeMatch;
  });

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('shop.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'اكتشفي مجموعة واسعة من المواد التعليمية المصممة خصيصاً لتطوير قدرات طفلك'
              : 'Discover a wide range of educational materials designed specifically to develop your child\'s abilities'
            }
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('shop.filter.age')}
              </label>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {ageGroups.map(group => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('shop.filter.type')}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {productTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {product.ageGroup} {language === 'ar' ? 'سنوات' : 'years'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <SafeIcon icon={FiStar} className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <SafeIcon icon={FiDownload} className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.downloads}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    {product.price} {language === 'ar' ? 'ريال' : 'SAR'}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <SafeIcon icon={FiShoppingCart} className="w-4 h-4" />
                    <span>{t('common.addToCart')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'ar' ? 'لا توجد منتجات تطابق البحث' : 'No products match your search'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;