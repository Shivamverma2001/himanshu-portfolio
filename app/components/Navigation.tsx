'use client';

import { Box, HStack, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Achievements', href: '#certificates' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundImage: scrolled
          ? 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(235,245,255,0.85) 50%, rgba(210,230,255,0.85) 100%)'
          : 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(235,245,255,0.7) 50%, rgba(210,230,255,0.7) 100%)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '1rem 2rem',
      }}
    >
      <Box as="nav">
      <HStack justify="space-between" maxW="1400px" mx="auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box fontSize="xl" fontWeight="bold" bgGradient="linear(to-r, blue.600, blue.500)" bgClip="text">
            HV
          </Box>
        </motion.div>
        
        <HStack gap={4} display={{ base: 'none', md: 'flex' }}>
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                colorScheme="blue"
                onClick={(e) => handleClick(e, item.href)}
                color="gray.800"
                fontFamily="var(--font-poppins)"
                _hover={{ 
                  bg: 'transparent', 
                  color: 'blue.600',
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.2s"
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
        </HStack>

      </HStack>
      </Box>
    </motion.div>
  );
}

