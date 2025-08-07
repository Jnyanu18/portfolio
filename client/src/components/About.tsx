import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { PersonalInfo } from '../types';

interface AboutProps {
  personal: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ personal }) => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="about" className="section-padding bg-white">
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
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-secondary-600 max-w-2xl mx-auto"
          >
            Get to know more about who I am, what I do, and what skills I have
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image and Info */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <div className="mb-8">
              <div className="w-64 h-64 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center shadow-2xl">
                <span className="text-6xl font-bold text-primary-600">
                  {personal.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start text-secondary-700">
                <FaMapMarkerAlt className="mr-3 text-primary-600" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-secondary-700">
                <FaPhone className="mr-3 text-primary-600" />
                <span>{personal.phone}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start text-secondary-700">
                <FaEnvelope className="mr-3 text-primary-600" />
                <span>{personal.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-secondary-900">
              {personal.title}
            </h3>
            
            <div className="text-lg text-secondary-700 leading-relaxed space-y-4">
              <p>{personal.bio}</p>
              
              <p>
                I'm passionate about creating digital experiences that make a difference. 
                With a strong foundation in both front-end and back-end technologies, 
                I enjoy the entire process of bringing ideas to life through code.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-secondary-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">3+</div>
                <div className="text-sm text-secondary-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-primary-50 rounded-lg col-span-2 md:col-span-1">
                <div className="text-2xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-secondary-600">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;