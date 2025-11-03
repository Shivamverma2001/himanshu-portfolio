'use client';

import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import SectionTransition from './components/SectionTransition';

// Lazy load all sections for code splitting and memory optimization
const PortfolioSection = lazy(() => import('./components/PortfolioSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const CertificatesSection = lazy(() => import('./components/CertificatesSection'));
const InsightsSection = lazy(() => import('./components/InsightsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

// Loading fallback component - with gradient background to match site design
const SectionLoader = () => (
  <div style={{ 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F8F9FA 0%, #E8F2FF 50%, #DBEAFE 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Subtle animated gradient overlay */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(37, 99, 235, 0.05) 100%)',
      animation: 'pulse 3s ease-in-out infinite',
    }} />
    <div style={{ 
      width: '40px', 
      height: '40px', 
      border: '4px solid rgba(59, 130, 246, 0.2)', 
      borderTop: '4px solid #3B82F6', 
      borderRadius: '50%', 
      animation: 'spin 1s linear infinite',
      position: 'relative',
      zIndex: 1
    }} />
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.8; }
      }
    `}</style>
  </div>
);

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Navigation />
      <HomeSection />
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <PortfolioSection />
        </Suspense>
      </SectionTransition>
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </SectionTransition>
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>
      </SectionTransition>
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>
      </SectionTransition>
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <GallerySection />
        </Suspense>
      </SectionTransition>
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <CertificatesSection />
        </Suspense>
      </SectionTransition>
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <InsightsSection />
        </Suspense>
      </SectionTransition>
      <SectionTransition>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </SectionTransition>
      <Footer />
    </main>
  );
}
