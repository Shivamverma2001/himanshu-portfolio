import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import PortfolioSection from './components/PortfolioSection';
import CertificatesSection from './components/CertificatesSection';
import GallerySection from './components/GallerySection';
import InsightsSection from './components/InsightsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import SectionTransition from './components/SectionTransition';

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Navigation />
      <HomeSection />
      <SectionTransition>
        <PortfolioSection />
      </SectionTransition>
      <SectionTransition>
        <AboutSection />
      </SectionTransition>
      <SectionTransition>
        <SkillsSection />
      </SectionTransition>
      <SectionTransition>
        <ExperienceSection />
      </SectionTransition>
      <SectionTransition>
        <GallerySection />
      </SectionTransition>
      <SectionTransition>
        <CertificatesSection />
      </SectionTransition>
      <SectionTransition>
        <InsightsSection />
      </SectionTransition>
      <SectionTransition>
        <ContactSection />
      </SectionTransition>
      <Footer />
    </main>
  );
}
