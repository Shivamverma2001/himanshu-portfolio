import Navigation from './components/Navigation';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import PortfolioSection from './components/PortfolioSection';
import CertificatesSection from './components/CertificatesSection';
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
        <AboutSection />
      </SectionTransition>
      <SectionTransition>
        <SkillsSection />
      </SectionTransition>
      <SectionTransition>
        <ExperienceSection />
      </SectionTransition>
      <SectionTransition>
        <PortfolioSection />
      </SectionTransition>
      <SectionTransition>
        <CertificatesSection />
      </SectionTransition>
      <SectionTransition>
        <ContactSection />
      </SectionTransition>
      <Footer />
    </main>
  );
}
