import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <FileText className="logo-icon" />
            <h1>Resume Builder</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
