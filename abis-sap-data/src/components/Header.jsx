import React from 'react';

const Header = () => {
  return (
    <header className="header shadow-sm p-3 mb-4 bg-light rounded">
      <div className="container d-flex align-items-center">
        <img src="/logo192.png" alt="logo" className="logo me-3" />
        <h3 className="m-0">ABIS</h3>
      </div>
    </header>
  );
};

export default Header;
