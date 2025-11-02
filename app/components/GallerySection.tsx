'use client';

import { Box, Container, VStack, Text, HStack, Button } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaImages } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

// Component to animate text letter by letter with typing effect
function AnimatedSubtitle({ children, delay = 0 }: { children: string; delay?: number }) {
  const letters = Array.from(children);
  
  return (
    <span>
      {letters.map((letter, i) => (
        letter === ' ' ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.01,
              delay: delay + i * 0.03,
              ease: "linear"
            }}
            style={{ 
              display: 'inline-block',
              transform: 'translateZ(0)',
              marginRight: '-0.1px'
            }}
          >
            {letter}
          </motion.span>
        )
      ))}
    </span>
  );
}

const galleryImages = [
  '/myimages/01427459-3552-4EB2-A43C-86392DDE2C12.jpeg',
  '/myimages/1950A882-9BB6-4EF5-9E66-8FE373FDE30E.jpeg',
  '/myimages/240EBB08-5900-4783-B60E-349FD1187CB5.jpeg',
  '/myimages/F108DA6C-1A02-4739-9AEB-172FDDAB3E38.jpeg',
  '/myimages/IMG_0703.jpeg',
  '/myimages/IMG_0742.jpeg',
  '/myimages/IMG_2543.jpeg',
  '/myimages/IMG_3089.jpeg',
];

function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(galleryImages.length);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slidePercentage, setSlidePercentage] = useState(33.333);

  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidePercentage(100);
      } else if (width < 1024) {
        setSlidePercentage(33.333); // 3 images on tablet
      } else {
        setSlidePercentage(33.333); // 3 images on desktop
      }
    };

    updateSlidePercentage();
    window.addEventListener('resize', updateSlidePercentage);
    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);

  useEffect(() => {
    // Check if we need to jump back to the beginning (after reaching the end of duplicates)
    if (currentIndex >= galleryImages.length * 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(galleryImages.length);
        setIsTransitioning(false);
      }, 50);
    }
    // Check if we need to jump to the end (after going below the start)
    if (currentIndex < 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(galleryImages.length - 1);
        setIsTransitioning(false);
      }, 50);
    }
  }, [currentIndex, galleryImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box
      w="100%"
      overflow="hidden"
      position="relative"
      py={4}
    >
      {/* Left Arrow */}
      <Button
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        color="blue.600"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
        _hover={{
          bg: 'blue.50',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-50%) scale(1.1)'
        }}
        transition="all 0.3s"
        onClick={goToPrevious}
        zIndex={10}
        size={{ base: 'md', md: 'lg' }}
      >
        <FaChevronLeft />
      </Button>

      {/* Right Arrow */}
      <Button
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        color="blue.600"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
        _hover={{
          bg: 'blue.50',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-50%) scale(1.1)'
        }}
        transition="all 0.3s"
        onClick={goToNext}
        zIndex={10}
        size={{ base: 'md', md: 'lg' }}
      >
        <FaChevronRight />
      </Button>

      <Box
        ref={carouselRef}
        display="flex"
        gap={{ base: 2, md: 6 }}
        style={{
          transform: `translateX(-${currentIndex * slidePercentage}%)`,
          transition: isTransitioning ? 'none' : 'transform 0.6s ease-in-out',
        }}
        w="100%"
      >
        {[...galleryImages, ...galleryImages, ...galleryImages].map((image, index) => (
          <Box
            key={`${image}-${index}`}
            flex={{ base: '0 0 calc(100% - 8px)', md: '0 0 calc(33.333% - 16px)' }}
            maxW={{ base: 'calc(100% - 8px)', md: 'calc(33.333% - 16px)' }}
            position="relative"
            overflow="hidden"
            borderRadius="xl"
            bg="white"
            borderWidth="2px"
            borderColor="blue.200"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
            _hover={{
              borderColor: 'blue.500',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
              transform: 'translateY(-4px)'
            }}
            transition="all 0.3s"
            cursor="pointer"
          >
            <Box
              position="relative"
              pb="133.33%" // 3:4 aspect ratio for portraits
              overflow="hidden"
            >
              <motion.img
                src={image}
                alt="Gallery photo"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box
      id="gallery"
      ref={ref}
      minH="100vh"
      py={{ base: 12, md: 16, lg: 20 }}
      bg="white"
      position="relative"
      overflow="hidden"
    >
      <GradientBG />
      <Container maxW="1400px" position="relative" zIndex={1}>
        <VStack gap={{ base: 8, md: 10, lg: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Text
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.600, blue.500, gray.900)"
              bgClip="text"
              textAlign="center"
              fontFamily="var(--font-playfair)"
            >
              Photo Gallery
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>Behind The Scenes</AnimatedSubtitle>
            </Text>
          </motion.div>

          <GalleryCarousel />
        </VStack>
      </Container>
    </Box>
  );
}

