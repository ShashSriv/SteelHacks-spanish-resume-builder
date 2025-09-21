import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <FileText className="logo-icon" />
            <h1>Resume Builder</h1>
          </div>
          <nav className="header-nav">
            <button 
              onClick={scrollToTop} 
              className="nav-link"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="nav-link"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="nav-link"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('apply')} 
              className="nav-link"
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
