import React, { useEffect, useRef, useState } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import './Navbar.css';
import { logout } from '../../firebase';
// Import assets
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

const Navbar = () => {
  const navRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 50) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'TV Shows', href: '/tv' },
    { label: 'Movies', href: '/movies' },
    { label: 'New & Popular', href: '/new' },
    { label: 'My List', href: '/my-list' },
    { label: 'Browse by Languages', href: '/browse' }
  ];

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Netflix" />
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-right">
        <button aria-label="Search">
          <img src={search_icon} alt="" className="icons" />
        </button>
        
        <p>Children</p>
        
        <button aria-label="Notifications">
          <img src={bell_icon} alt="" className="icons" />
        </button>

        <div 
          className={`navbar-profile ${isDropdownOpen ? 'active' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img 
            src={profile_img} 
            alt="Profile" 
            className="profile"
          />
          <img 
            src={caret_icon} 
            alt=""
            className={isDropdownOpen ? 'rotate-180' : ''}
          />
          
          <div className="dropdown">
            <p onClick={()=>{logout()}}> Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;