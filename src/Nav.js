import { useEffect, useState } from 'react';
import './nav.css';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(null);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 100 ? setIsScrolled(true) : setIsScrolled(false)
    );
  }, []);

  return (
    <nav className={`nav__bar ${isScrolled && `nav__bar__dark`}`}>
      <img
        className="nav__bar__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <img
        className="nav__bar__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="User Avatar"
      />
    </nav>
  );
};

export default Nav;
