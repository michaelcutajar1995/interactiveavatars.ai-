import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/output-onlinepngtools.png';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  height: 70px;
  z-index: 1000;
  background-color: #000000;
`;

const Logo = styled.img`
  height: 70px;

  @media (max-width: 768px) {
    margin-left: -1rem;
  }
`;

// Desktop Menu
const DesktopMenu = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none; // Hide on mobile
  }
`;

// Mobile Menu Container
const MobileMenu = styled.div`
  display: none; // Hide by default on desktop
  
  @media (max-width: 768px) {
    display: block; // Only show on mobile
  }
`;

const MenuIcon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
`;

const MobileMenuItems = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 80px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid white;
  gap: 1rem;
  z-index: 1000;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
`;

const NavItem = styled.div`
  // Add your styles here
`;

// Add these new styled components after your existing styled components
const ProductDropdown = styled.div`
  margin-top: 0.1rem;
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  min-width: 160px;
  border-radius: 10px;
  border: 1px solid white;
  padding: 0.5rem;
  z-index: 1001;

  ${ProductDropdown}:hover & {
    display: block;
  }
`;

const DropdownLink = styled(NavLink)`
  display: block;
  margin: 0.5rem 0;
  white-space: nowrap;
`;

// Add new styled component for mobile dropdown
const MobileProductDropdown = styled.div`
  position: relative;
  width: 100%;
`;

const MobileDropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;a
  padding-left: 1rem;
`;

const MobileDropdownButton = styled.div`
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 2px solid #FFFFFF;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
`;

// Add this new styled component
const ProductsButton = styled.div`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid #FFFFFF;
  border-radius: 25px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 215, 0, 0.1);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  }
`;

// Add this new styled component
const HighlightedNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  border: 2px solid white;
  border-radius: 25px;
  transition: all 0.3s ease;
  background-color: white;
  animation: pulse 2s infinite;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
`;

// Add new styled component for the More dropdown
const MoreDropdown = styled(ProductDropdown)`
  // Inherits styles from ProductDropdown
`;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <NavbarContainer>
      <Link to="/">
        <Logo src={logo} alt="Glimpse Logo" />
      </Link>
      {/* Desktop Menu */}
      <DesktopMenu>
        <MoreDropdown>
          <ProductsButton>More</ProductsButton>
          <DropdownContent>
            <DropdownLink to="/team">Team</DropdownLink>
            <DropdownLink to="/blog">Blog</DropdownLink>
            <DropdownLink to="/ourwork">Our Characters</DropdownLink>
            <DropdownLink to="/ourwork/mans" style={{ paddingLeft: '2rem' }}>→ Meet Mans</DropdownLink>
            <DropdownLink to="/ourwork/remax" style={{ paddingLeft: '2rem' }}>→ Remax Demo</DropdownLink>
            <DropdownLink to="/products/travel">Glimpse Travel</DropdownLink>
            <DropdownLink to="/products/social">Glimpse Social</DropdownLink>
          </DropdownContent>
        </MoreDropdown>
        <HighlightedNavLink to="/contactform">Bring Your Brand to Life for free.</HighlightedNavLink>
        <HighlightedNavLink to="/premiumupgrade">Pricing</HighlightedNavLink>
      </DesktopMenu>
      {/* Mobile Menu */}
      <MobileMenu>
        <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </MenuIcon>
        <MobileMenuItems isOpen={isMenuOpen}>
          <MobileProductDropdown>
            <MobileDropdownButton onClick={() => setIsMoreOpen(!isMoreOpen)}>
              More
            </MobileDropdownButton>
            <MobileDropdownContent isOpen={isMoreOpen}>
              <NavLink to="/team" onClick={handleLinkClick}>Team</NavLink>
              <NavLink to="/blog" onClick={handleLinkClick}>Blog</NavLink>
              <NavLink to="/ourwork" onClick={handleLinkClick}>Our Characters</NavLink>
              <NavLink to="/ourwork/mans" onClick={handleLinkClick} style={{ paddingLeft: '2rem' }}>→ Meet Mans</NavLink>
              <NavLink to="/ourwork/remax" onClick={handleLinkClick} style={{ paddingLeft: '2rem' }}>→ Remax Demo</NavLink>
              <NavLink to="/products/travel" onClick={handleLinkClick}>Glimpse Travel</NavLink>
              <NavLink to="/products/social" onClick={handleLinkClick}>Glimpse Social</NavLink>
            </MobileDropdownContent>
          </MobileProductDropdown>
          <HighlightedNavLink to="/contactform" onClick={handleLinkClick}>
            Bring Your Brand to Life for free.
          </HighlightedNavLink>
          <HighlightedNavLink to="/premiumupgrade" onClick={handleLinkClick}>
            Pricing
          </HighlightedNavLink>
        </MobileMenuItems>
      </MobileMenu>
    </NavbarContainer>
  );
}

export default Navbar;