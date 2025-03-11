
import React from 'react';
import {Link} from 'react-router-dom'
const Menu = () => {
  return (
    <nav className="bg-black p-4">
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="text-white hover:text-blue-500">Home</a>
        </li>
        {/* You can add more links here */}
      </ul>
    </nav>
  );
};

export default Menu;
