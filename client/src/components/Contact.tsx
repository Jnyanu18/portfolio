import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { portfolioApi } from '../services/api';
import { ContactForm as ContactFormType } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await portfolioApi.submitContact(formData);
      setSubmitStatus({
        type: 'success',
        message: response.message || 'Message sent successfully!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
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
    <section id="contact" className="section-padding bg-white">
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
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-secondary-600 max-w-2xl mx-auto"
          >
            Have a project in mind? Let's discuss how we can work together
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                Let's start a conversation
              </h3>
              <p className="text-lg text-secondary-600 leading-relaxed mb-8">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you're a company looking to hire, or you're a fellow developer 
                wanting to collaborate, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-full text-primary-600 mr-4">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900">Email</h4>
                  <p className="text-secondary-600">your.email@example.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-full text-primary-600 mr-4">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900">Phone</h4>
                  <p className="text-secondary-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-full text-primary-600 mr-4">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900">Location</h4>
                  <p className="text-secondary-600">City, State</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-primary-50 p-6 rounded-lg">
              <h4 className="font-semibold text-primary-900 mb-2">
                Quick Response Time
              </h4>
              <p className="text-primary-700">
                I typically respond to emails within 24 hours. For urgent matters, 
                feel free to call me directly.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="input-field resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;