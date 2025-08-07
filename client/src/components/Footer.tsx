import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';
import { PersonalInfo } from '../types';

interface FooterProps {
  personal: PersonalInfo;
}

const Footer: React.FC<FooterProps> = ({ personal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white relative">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-colors duration-300"
      >
        <FaArrowUp size={20} />
      </button>

      <div className="container-max py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gradient mb-4">
                {personal.name}
              </h3>
              <p className="text-secondary-300 leading-relaxed mb-6">
                {personal.title} passionate about creating amazing digital experiences. 
                Always learning, always building, always pushing the boundaries of what's possible with code.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary-800 hover:bg-primary-600 rounded-full transition-colors duration-300"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary-800 hover:bg-primary-600 rounded-full transition-colors duration-300"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="p-3 bg-secondary-800 hover:bg-primary-600 rounded-full transition-colors duration-300"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About', href: '#about' },
                  { label: 'Skills', href: '#skills' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'Contact', href: '#contact' }
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.href.substring(1));
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-secondary-300 hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
              <div className="space-y-3 text-secondary-300">
                <p>{personal.email}</p>
                <p>{personal.phone}</p>
                <p>{personal.location}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-secondary-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-secondary-400 text-sm">
            <p className="mb-4 md:mb-0">
              © {currentYear} {personal.name}. All rights reserved.
            </p>
            <p className="flex items-center">
              Made with <FaHeart className="text-red-500 mx-2" size={16} /> and React
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;