import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaTools } from 'react-icons/fa';
import { Skills as SkillsType } from '../types';

interface SkillsProps {
  skills: SkillsType;
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
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

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <FaCode className="text-3xl" />,
      skills: skills.frontend,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Backend Development',
      icon: <FaServer className="text-3xl" />,
      skills: skills.backend,
      color: 'from-green-500 to-blue-600'
    },
    {
      title: 'Tools & Technologies',
      icon: <FaTools className="text-3xl" />,
      skills: skills.tools,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="skills" className="section-padding bg-secondary-50">
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
            My <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-secondary-600 max-w-2xl mx-auto"
          >
            Here are some of the technologies and tools I work with
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="card p-8 hover:scale-105 transition-transform duration-300"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${category.color} text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary-900">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: skillIndex * 0.1 }}
                    className="flex items-center"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                    <span className="text-secondary-700 font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-secondary-900 mb-8">
            Always Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Machine Learning', 'Cloud Computing', 'DevOps', 'Mobile Development',
              'UI/UX Design', 'Data Analysis', 'Blockchain', 'Cybersecurity'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 bg-white rounded-full text-secondary-700 font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;