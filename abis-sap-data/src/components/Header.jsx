import React from 'react';

const Header = () => {
  return (
    <header className="header shadow-sm  p-3 mb-4 custom-header">
      <div className="container-fluid d-flex align-items-center">
        <img src="/logo-white.png" alt="logo" className="logo" />
        <h3 className="m-0 ms-2">ABIS</h3>
      </div>
    </header>
  );
};

export default Header;
