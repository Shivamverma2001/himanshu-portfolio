'use client';

import { Box, Container, VStack, Text, HStack, Grid, GridItem, Badge, Button } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaTv, FaShoppingBag, FaDumbbell, FaMobileAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense } from 'react';

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

const collaborations = [
  {
    brand: 'LG',
    description: 'Electronics Campaigns & Promotional Videos',
    icon: FaTv,
    category: 'Electronics',
    color: 'yellow',
  },
  {
    brand: 'Zorko',
    description: 'Food & Beverage Ads',
    icon: FaShoppingBag,
    category: 'Food & Beverage',
    color: 'yellow',
  },
  {
    brand: 'Amaze Fitness',
    description: 'Gym & Fitness Promotions',
    icon: FaDumbbell,
    category: 'Gym',
    color: 'yellow',
  },
  {
    brand: 'Nasir Hussain',
    description: 'Beauty & Fashion Brand Promotions',
    icon: FaShoppingBag,
    category: 'Beauty & Fashion',
    color: 'yellow',
  },
];

const categories = [
  'Food', 'Electronics', 'Fashion', 'Beauty', 
  'Gym', 'Jewellery', 'Lifestyle', 'Local Retail'
];

// Experience Section 3D - Brand collaboration elements
function ExperienceScene3D({ isVisible }: { isVisible: boolean }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      frameloop={isVisible ? 'always' : 'demand'}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Center>
          {/* Brand Logo Plate */}
          <mesh position={[0, 0, 0]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[1.5, 0.8, 0.1]} />
            <meshStandardMaterial color="#3B82F6" metalness={0.7} roughness={0.3} />
          </mesh>
          
          {/* Handshake/Partnership */}
          <mesh position={[-1.2, -0.8, 0]} rotation={[0, -0.3, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#2563EB" transparent opacity={0.6} />
          </mesh>
          <mesh position={[1.2, -0.8, 0]} rotation={[0, 0.3, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#2563EB" transparent opacity={0.6} />
          </mesh>
          
          {/* Connection Lines */}
          <mesh position={[-0.6, -0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[0.6, 0.05, 0.05]} />
            <meshStandardMaterial color="#60A5FA" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0.6, -0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <boxGeometry args={[0.6, 0.05, 0.05]} />
            <meshStandardMaterial color="#60A5FA" transparent opacity={0.5} />
          </mesh>
        </Center>
        <OrbitControls enableZoom={false} autoRotate={isVisible} autoRotateSpeed={0.3} />
      </Suspense>
    </Canvas>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(collaborations.length);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slidePercentage, setSlidePercentage] = useState(100);
  const [isCarousel, setIsCarousel] = useState(true);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  // Monitor section visibility to pause 3D animation when not visible
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsSectionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Track visible items count
  const [itemsVisible, setItemsVisible] = useState(1);

  // Track if we should show carousel or grid
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsCarousel(width < 768);
      if (width < 768) {
        setSlidePercentage(100);
        setItemsVisible(1);
      } else {
        setSlidePercentage(50);
        setItemsVisible(2); // 2 items visible on desktop
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Calculate duplicates needed based on visible items
  const duplicatesNeeded = Math.max(3, Math.ceil(itemsVisible * 2));
  const duplicatedCollaborations = Array(duplicatesNeeded).fill(collaborations).flat();

  // Carousel navigation
  useEffect(() => {
    const maxIndex = duplicatedCollaborations.length - itemsVisible;
    if (currentIndex >= maxIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(collaborations.length);
        setIsTransitioning(false);
      }, 50);
    }
    if (currentIndex < 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(collaborations.length - 1);
        setIsTransitioning(false);
      }, 50);
    }
  }, [currentIndex, collaborations.length, itemsVisible, duplicatedCollaborations.length]);

  // Auto-scroll for carousel only
  useEffect(() => {
    if (!isCarousel) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isCarousel]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box
      id="experience"
      ref={ref}
      minH="100vh"
      py={{ base: 12, md: 16, lg: 20 }}
      bg="white"
      position="relative"
      overflow="hidden"
    >
      <GradientBG />
      {/* 3D Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.12}
        zIndex={0}
        pointerEvents="none"
      >
        <Box w="100%" h="100%" style={{ background: 'transparent' }}>
          <ExperienceScene3D isVisible={isSectionVisible} />
        </Box>
      </Box>
      <Container maxW="1400px" position="relative" zIndex={1}>
        <VStack gap={{ base: 8, md: 12, lg: 16 }}>
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
              Experience & Collaborations
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              maxW="800px"
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>"I don't just promote brands —  I tell their story through emotion, humor, and creativity."</AnimatedSubtitle>
            </Text>
          </motion.div>

          {/* Carousel/Grid Container */}
          <Box position="relative" w="100%">
            {/* Navigation Buttons - Only show for carousel */}
            {isCarousel && (
              <>
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
              </>
            )}

            {/* Content */}
            {isCarousel ? (
              <Box
                ref={carouselRef}
                display="flex"
                gap={{ base: 4, md: 5, lg: 6 }}
                style={{
                  transform: `translateX(-${currentIndex * slidePercentage}%)`,
                  transition: isTransitioning ? 'none' : 'transform 0.5s ease-in-out',
                }}
                w="100%"
                minW="100%"
                flexShrink={0}
              >
                {duplicatedCollaborations.map((collab, index) => (
                  <Box
                    key={`${collab.brand}-${index}`}
                    flex={{ base: '0 0 calc(100% - 24px)' }}
                    maxW={{ base: 'calc(100% - 24px)' }}
                  >
                    <Box
                      p={{ base: 4, md: 6, lg: 9 }}
                      bg="white"
                      borderRadius="xl"
                      borderWidth="2px"
                      borderColor="blue.200"
                      boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                      _hover={{ 
                        borderColor: 'blue.500',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
                        transform: 'translateY(-4px)'
                      }}
                      transition="all 0.3s"
                      h="100%"
                    >
                      <VStack gap={{ base: 3, md: 4, lg: 5 }} align="stretch">
                        <HStack gap={{ base: 2, md: 4 }}>
                          <Box display={{ base: 'none', lg: 'block' }}>
                            <collab.icon size={32} color="#3B82F6" />
                          </Box>
                          <Box display={{ base: 'block', md: 'none' }}>
                            <collab.icon size={24} color="#3B82F6" />
                          </Box>
                          <Box display={{ base: 'none', md: 'block', lg: 'none' }}>
                            <collab.icon size={28} color="#3B82F6" />
                          </Box>
                          <VStack align="start" gap={{ base: 0.5, md: 1 }}>
                            <Text
                              fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                              fontWeight="bold"
                              color="gray.900"
                              fontFamily="var(--font-poppins)"
                            >
                              {collab.brand}
                            </Text>
                            <Badge colorScheme="blue" fontSize={{ base: '2xs', md: 'xs' }} px={2} py={1} fontFamily="var(--font-poppins)">
                              {collab.category}
                            </Badge>
                          </VStack>
                        </HStack>
                        <Box h="1px" bg="gray.200" w="100%" my={2} />
                        <Text color="gray.700" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} fontFamily="var(--font-poppins)">
                          {collab.description}
                        </Text>
                      </VStack>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Grid
                templateColumns={{ md: 'repeat(2, 1fr)' }}
                gap={{ base: 6, md: 8, lg: 10 }}
                w="100%"
              >
                {collaborations.map((collab, index) => (
                  <motion.div
                    key={collab.brand}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box
                        p={{ base: 4, md: 6, lg: 9 }}
                        bg="white"
                        borderRadius="xl"
                        borderWidth="2px"
                        borderColor="blue.200"
                        boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                        _hover={{ 
                          borderColor: 'blue.500',
                          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
                          transform: 'translateY(-4px)'
                        }}
                        transition="all 0.3s"
                        h="100%"
                      >
                        <VStack gap={{ base: 3, md: 4, lg: 5 }} align="stretch">
                          <HStack gap={{ base: 2, md: 4 }}>
                            <Box display={{ base: 'none', lg: 'block' }}>
                              <collab.icon 
                                size={32} 
                                color="#3B82F6"
                              />
                            </Box>
                            <Box display={{ base: 'block', md: 'none' }}>
                              <collab.icon 
                                size={24} 
                                color="#3B82F6"
                              />
                            </Box>
                            <Box display={{ base: 'none', md: 'block', lg: 'none' }}>
                              <collab.icon 
                                size={28} 
                                color="#3B82F6"
                              />
                            </Box>
                            <VStack align="start" gap={{ base: 0.5, md: 1 }}>
                              <Text
                                fontSize={{ base: 'md', md: 'xl', lg: '2xl' }}
                                fontWeight="bold"
                                color="gray.900"
                                fontFamily="var(--font-poppins)"
                              >
                                {collab.brand}
                              </Text>
                              <Badge colorScheme="blue" fontSize={{ base: '2xs', md: 'xs' }} px={2} py={1} fontFamily="var(--font-poppins)">
                                {collab.category}
                              </Badge>
                            </VStack>
                          </HStack>
                          <Box h="1px" bg="gray.200" w="100%" my={2} />
                          <Text color="gray.700" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} fontFamily="var(--font-poppins)">
                            {collab.description}
                          </Text>
                        </VStack>
                      </Box>
                    </motion.div>
                  </motion.div>
                ))}
              </Grid>
            )}
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', maxWidth: '900px' }}
          >
              <Box
                p={{ base: 4, md: 6, lg: 8 }}
                bg="gray.50"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.200"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
              >
              <Text
                fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                fontWeight="semibold"
                color="blue.600"
                mb={{ base: 3, md: 4 }}
                textAlign="center"
                fontFamily="var(--font-poppins)"
              >
                Department Categories Covered
              </Text>
              <HStack gap={{ base: 2, md: 3 }} flexWrap="wrap" justify="center">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                      <Badge
                      colorScheme="blue"
                      p={{ base: 1, md: 2 }}
                      px={{ base: 3, md: 4 }}
                      borderRadius="full"
                      fontSize={{ base: 'xs', md: 'sm' }}
                      fontFamily="var(--font-poppins)"
                    >
                      {category}
                    </Badge>
                  </motion.div>
                ))}
              </HStack>
            </Box>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
}

