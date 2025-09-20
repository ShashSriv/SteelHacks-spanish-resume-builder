import React from 'react';
import { FileText, Download } from 'lucide-react';

const Header = ({ onDownloadPDF }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <FileText className="logo-icon" />
            <h1>Resume Builder</h1>
          </div>
          <nav className="nav">
            <button 
              className="btn btn-secondary"
              onClick={onDownloadPDF}
            >
              <Download size={20} />
              Download PDF
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
