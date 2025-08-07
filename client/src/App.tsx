import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Services and Types
import { portfolioApi } from './services/api';
import { PortfolioData } from './types';

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        const data = await portfolioApi.getPortfolio();
        setPortfolioData(data);
      } catch (err) {
        setError('Failed to load portfolio data. Please try again later.');
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-secondary-600 mb-6">
            {error || 'Failed to load portfolio data.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero personal={portfolioData.personal} />
                  <About personal={portfolioData.personal} />
                  <Skills skills={portfolioData.skills} />
                  <Projects projects={portfolioData.projects} />
                  <Experience 
                    experience={portfolioData.experience} 
                    education={portfolioData.education} 
                  />
                  <Contact />
                </>
              }
            />
            <Route
              path="/projects"
              element={<Projects projects={portfolioData.projects} />}
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer personal={portfolioData.personal} />
      </div>
    </Router>
  );
}

export default App;
