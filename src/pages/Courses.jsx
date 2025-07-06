import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiClock, FiUsers, FiAward, FiLock, FiCheck } = FiIcons;

const Courses = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: language === 'ar' ? 'أساسيات منهج منتسوري' : 'Montessori Method Basics',
      description: language === 'ar' ? 'تعلمي أساسيات منهج منتسوري وكيفية تطبيقه مع طفلك' : 'Learn Montessori method basics and how to apply it with your child',
      instructor: language === 'ar' ? 'د. فاطمة العلي' : 'Dr. Fatima Al-Ali',
      duration: '6 ساعات',
      students: 1250,
      rating: 4.9,
      price: 299,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=250&fit=crop',
      level: 'مبتدئ',
      progress: user ? 65 : 0,
      lessons: [
        { id: 1, title: 'مقدمة في منهج منتسوري', duration: '45 دقيقة', completed: true },
        { id: 2, title: 'البيئة المعدة للطفل', duration: '60 دقيقة', completed: true },
        { id: 3, title: 'الأنشطة العملية', duration: '75 دقيقة', completed: false },
        { id: 4, title: 'التطبيق العملي', duration: '90 دقيقة', completed: false },
      ],
      isEnrolled: user ? true : false,
    },
    {
      id: 2,
      title: language === 'ar' ? 'تطوير المهارات الحركية' : 'Motor Skills Development',
      description: language === 'ar' ? 'دورة شاملة لتطوير المهارات الحركية الدقيقة والكبيرة' : 'Comprehensive course for developing fine and gross motor skills',
      instructor: language === 'ar' ? 'أ. سارة أحمد' : 'Ms. Sarah Ahmed',
      duration: '4 ساعات',
      students: 890,
      rating: 4.8,
      price: 199,
      image: 'https://images.unsplash.com/photo-1516627145497-ae4c8c73b1da?w=400&h=250&fit=crop',
      level: 'متوسط',
      progress: user ? 30 : 0,
      lessons: [
        { id: 1, title: 'فهم المهارات الحركية', duration: '40 دقيقة', completed: true },
        { id: 2, title: 'أنشطة المهارات الدقيقة', duration: '50 دقيقة', completed: false },
        { id: 3, title: 'أنشطة المهارات الكبيرة', duration: '60 دقيقة', completed: false },
      ],
      isEnrolled: user ? true : false,
    },
    {
      id: 3,
      title: language === 'ar' ? 'القراءة المبكرة' : 'Early Reading',
      description: language === 'ar' ? 'تعلمي كيفية تعليم طفلك القراءة بطريقة ممتعة وفعالة' : 'Learn how to teach your child to read in a fun and effective way',
      instructor: language === 'ar' ? 'د. مريم الزهراني' : 'Dr. Mariam Al-Zahrani',
      duration: '8 ساعات',
      students: 654,
      rating: 4.7,
      price: 399,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      level: 'متقدم',
      progress: 0,
      lessons: [
        { id: 1, title: 'أساسيات القراءة', duration: '60 دقيقة', completed: false },
        { id: 2, title: 'تعليم الحروف', duration: '90 دقيقة', completed: false },
        { id: 3, title: 'تكوين الكلمات', duration: '75 دقيقة', completed: false },
        { id: 4, title: 'القراءة التفاعلية', duration: '85 دقيقة', completed: false },
      ],
      isEnrolled: false,
    },
  ];

  const handleEnroll = (courseId) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }
    
    // Handle enrollment logic
    console.log('Enrolling in course:', courseId);
  };

  const CourseCard = ({ course, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {course.level}
        </div>
        {course.isEnrolled && (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {language === 'ar' ? 'مسجل' : 'Enrolled'}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <SafeIcon icon={FiClock} className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <SafeIcon icon={FiUsers} className="w-4 h-4" />
            <span>{course.students}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            {language === 'ar' ? 'المدرب:' : 'Instructor:'} {course.instructor}
          </span>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <SafeIcon icon={FiAward} className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-600">{course.rating}</span>
          </div>
        </div>
        
        {course.isEnrolled && course.progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {t('courses.progress')}
              </span>
              <span className="text-sm font-medium text-primary-600">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {course.price} {language === 'ar' ? 'ريال' : 'SAR'}
          </span>
          <button
            onClick={() => course.isEnrolled ? setSelectedCourse(course) : handleEnroll(course.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 rtl:space-x-reverse ${
              course.isEnrolled 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <SafeIcon icon={course.isEnrolled ? FiPlay : FiLock} className="w-4 h-4" />
            <span>
              {course.isEnrolled 
                ? (language === 'ar' ? 'متابعة' : 'Continue')
                : (language === 'ar' ? 'اشتراك' : 'Enroll')
              }
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );

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
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'طوري مهاراتك في التعليم المبكر من خلال دوراتنا المتخصصة'
              : 'Develop your early education skills through our specialized courses'
            }
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCourse.title}
                  </h2>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={FiLock} className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {language === 'ar' ? 'محتوى الدورة' : 'Course Content'}
                  </h3>
                  {selectedCourse.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {lesson.completed ? (
                            <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-white text-sm">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                          <p className="text-sm text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                      <SafeIcon icon={FiPlay} className="w-5 h-5 text-primary-600" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;