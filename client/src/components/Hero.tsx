import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowDown } from 'react-icons/fa';
import { PersonalInfo } from '../types';

interface HeroProps {
  personal: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ personal }) => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        className="container-max text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary-400 to-primary-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-secondary-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary-600">
                  {personal.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-secondary-900 mb-6"
          >
            Hi, I'm{' '}
            <span className="text-gradient">
              {personal.name}
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl text-secondary-600 mb-8 font-light"
          >
            {personal.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-secondary-700 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {personal.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary text-lg px-8 py-4"
            >
              <FaEnvelope className="mr-2" />
              Get In Touch
            </button>
            <button
              className="btn btn-outline text-lg px-8 py-4"
              onClick={() => {
                // In a real implementation, this would download the actual resume
                alert('Resume download would be implemented here');
              }}
            >
              <FaDownload className="mr-2" />
              Download Resume
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-16"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-secondary-700 hover:text-primary-600"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-secondary-700 hover:text-primary-600"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-secondary-700 hover:text-primary-600"
            >
              <FaEnvelope size={24} />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToAbout}
            className="inline-flex items-center text-secondary-600 hover:text-primary-600 transition-colors duration-300"
          >
            <FaArrowDown className="animate-bounce" size={24} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;