import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { Experience as ExperienceType, Education } from '../types';

interface ExperienceProps {
  experience: ExperienceType[];
  education: Education[];
}

const Experience: React.FC<ExperienceProps> = ({ experience, education }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="experience" className="section-padding bg-secondary-50">
      <motion.div
        className="container-max"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4"
          >
            Experience & <span className="text-gradient">Education</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-secondary-600 max-w-2xl mx-auto"
          >
            My professional journey and educational background
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-8">
              <div className="p-3 bg-primary-600 rounded-full text-white mr-4">
                <FaBriefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900">
                Work Experience
              </h3>
            </div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className="relative pl-8 pb-8"
                >
                  {/* Timeline Line */}
                  {index < experience.length - 1 && (
                    <div className="absolute left-4 top-12 w-0.5 h-full bg-primary-200"></div>
                  )}
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-2 top-2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-lg font-bold text-secondary-900">
                        {exp.position}
                      </h4>
                      <div className="flex items-center text-primary-600 text-sm font-medium mt-1 sm:mt-0">
                        <FaCalendarAlt className="mr-2" />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-primary-700 font-medium mb-3">
                      {exp.company}
                    </p>
                    <p className="text-secondary-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-8">
              <div className="p-3 bg-green-600 rounded-full text-white mr-4">
                <FaGraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900">
                Education
              </h3>
            </div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  variants={itemVariants}
                  className="relative pl-8 pb-8"
                >
                  {/* Timeline Line */}
                  {index < education.length - 1 && (
                    <div className="absolute left-4 top-12 w-0.5 h-full bg-green-200"></div>
                  )}
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-2 top-2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-lg font-bold text-secondary-900">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center text-green-600 text-sm font-medium mt-1 sm:mt-0">
                        <FaCalendarAlt className="mr-2" />
                        {edu.duration}
                      </div>
                    </div>
                    <p className="text-green-700 font-medium mb-2">
                      {edu.institution}
                    </p>
                    <p className="text-secondary-600">
                      GPA: {edu.gpa}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Certifications */}
            <motion.div
              variants={itemVariants}
              className="mt-12"
            >
              <h4 className="text-xl font-bold text-secondary-900 mb-6">
                Certifications & Achievements
              </h4>
              <div className="space-y-4">
                {[
                  'AWS Certified Developer',
                  'Google Cloud Professional',
                  'React Developer Certification',
                  'Full Stack JavaScript Path'
                ].map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-white p-4 rounded-lg shadow-md"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                    <span className="text-secondary-700 font-medium">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;