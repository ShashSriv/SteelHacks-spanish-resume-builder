import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveSection('home');
  };

  // Listen for scroll events to update active section
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // Debounce scroll events to prevent rapid section changes
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const sections = ['home', 'how-it-works', 'about', 'apply'];
        const scrollPosition = window.scrollY + 200; // Increased offset for better detection
        let closestSection = 'home';
        let closestDistance = Infinity;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            const elementCenter = elementTop + (rect.height / 2);
            
            // Calculate distance from scroll position to section center
            const distance = Math.abs(scrollPosition - elementCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section;
            }
          }
        }
        
        setActiveSection(closestSection);
      }, 50); // 50ms debounce
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <FileText className="logo-icon" />
            <h1>LinguaCV</h1>
          </div>
          <nav className="header-nav">
            <button 
              onClick={scrollToTop} 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className={`nav-link ${activeSection === 'how-it-works' ? 'active' : ''}`}
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('apply')} 
              className={`nav-link ${activeSection === 'apply' ? 'active' : ''}`}
            >
              Apply
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
