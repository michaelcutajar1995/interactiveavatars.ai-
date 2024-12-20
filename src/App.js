import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Investors from './pages/Investor';
import Licensing from './pages/Licensing';
import OurWork from './pages/Interactions';
import Team from './pages/Team';
import Careers from './pages/Careers';
import BlogIndex, { blogPosts } from './pages/blog';
import BlogPost from './components/BlogPost';
import { useEffect } from 'react';
import { initGA, logPageView } from './utils/analytics';
import Podcast from './pages/Podcast';
import GlimpseTravel from './pages/GlimpseTravel';
import GlimpseSocial from './pages/GlimpseSocial';
import GlimpseBusiness from './pages/GlimpseBusiness';
import Remax from './pages/Remax';
import TokenWaitlist from './pages/tokenwaitlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './components/ContactForm';
import PremiumUpgrade from './pages/PremiumUpgrade';
import Mans from './pages/Mans';
import Social from './pages/Social';
import { AuthProvider } from './context/AuthContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #000000;
  color: white;
  font-family: 'Geometry Soft Pro Regular C', sans-serif;
  padding-top: 60px;
`;

function App() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost blogPosts={blogPosts} />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/ourwork" element={<OurWork />} />
            <Route path="/ourwork/mans" element={<Mans />} />
            <Route path="/ourwork/remax" element={<Remax />} />
            <Route path="/products/travel" element={<GlimpseTravel />} />
            <Route path="/products/social" element={<GlimpseSocial />} />
            <Route path="/products/business" element={<GlimpseBusiness />} />
            <Route path="/tokenwaitlist" element={<TokenWaitlist />} />
            <Route path="/contactform" element={<ContactForm />} />
            <Route path="/premiumupgrade" element={<PremiumUpgrade />} />
            <Route path="/social" element={<Social />} />
          </Routes>
          <ToastContainer />
        </AppContainer>
      </Router>
    </AuthProvider>
  );
}

export default App; 