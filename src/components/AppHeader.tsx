import React from 'react';

const AppHeader: React.FC = () => {
  return (
    <header style={{
      width: '100%',
      height: 56,
      background: '#fff',
      borderBottom: '1px solid #e3e6ea',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      fontWeight: 800,
      fontSize: 20,
      letterSpacing: 1.5,
      color: '#0d6efd',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      userSelect: 'none',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <img
        src={process.env.PUBLIC_URL + '/cat_logo.png'}
        alt="cat logo"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: 12,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
        }}
      />
      RookieSVN
    </header>
  );
};

export default AppHeader; 