import React from 'react';

const NavBar: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="company">company</a>
          </li>
          <li>
            <a href="supplier">suppier</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
