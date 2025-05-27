import React from 'react';

const SidebarHeader: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
      fontWeight: 800,
      fontSize: 20,
      letterSpacing: 1.5,
      color: '#0d6efd',
      background: '#fff',
      borderBottom: '1px solid #e3e6ea',
      userSelect: 'none',
    }}>
      <img
        src={process.env.PUBLIC_URL + '/cat_logo.png'}
        alt="cat logo"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: 8,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
        }}
      />
      RookieSVN
    </div>
  );
};

export default SidebarHeader; 