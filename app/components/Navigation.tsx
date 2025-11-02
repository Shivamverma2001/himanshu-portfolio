'use client';

import { Box, HStack, Button, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      // Close menu after a short delay to ensure navigation completes
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 300);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      backgroundImage={scrolled
        ? 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(235,245,255,0.85) 50%, rgba(210,230,255,0.85) 100%)'
        : 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, rgba(235,245,255,0.7) 50%, rgba(210,230,255,0.7) 100%)'}
      backdropFilter="blur(16px)"
      borderBottom="1px solid rgba(0, 0, 0, 0.06)"
      p={{ base: '1rem', md: '1rem 2rem' }}
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box as="nav">
        <HStack justify="space-between" maxW="1400px" mx="auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box
            position="relative"
            w={{ base: '40px', md: '50px', lg: '50px' }}
            h={{ base: '40px', md: '50px', lg: '50px' }}
          >
            <Image
              src="/logo/image.png"
              alt="Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
        </motion.div>
        
        {/* Desktop Navigation */}
        <HStack gap={4} display={{ base: 'none', xl: 'flex' }}>
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

        {/* Mobile Hamburger Button */}
        <Button
          display={{ base: 'flex', xl: 'none' }}
          variant="ghost"
          onClick={toggleMenu}
          p={2}
          minW="auto"
          bg="transparent"
          _hover={{ bg: 'transparent' }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? (
              <FaTimes size={24} color="gray.800" />
            ) : (
              <FaBars size={24} color="gray.800" />
            )}
          </motion.div>
        </Button>
      </HStack>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <VStack
              gap={2}
              py={4}
              display={{ base: 'flex', xl: 'none' }}
              borderTop="1px solid rgba(0, 0, 0, 0.06)"
              mt={2}
            >
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  colorScheme="blue"
                  onClick={(e) => handleClick(e, item.href)}
                  color="gray.800"
                  fontFamily="var(--font-poppins)"
                  w="100%"
                  justifyContent="flex-start"
                  _hover={{ 
                    bg: 'blue.50',
                    color: 'blue.600'
                  }}
                  transition="all 0.2s"
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
      </Box>
      </motion.div>
    </Box>
  );
}

