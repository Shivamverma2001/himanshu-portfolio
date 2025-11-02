'use client';

import { Box, Container, VStack, Text, HStack, Button } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaAward, FaTrophy, FaCertificate, FaTheaterMasks, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

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

const certificates = [
  {
    title: 'Theatre Training Certification',
    issuer: 'Theatre Institute',
    year: '2021',
    description: 'Professional theatre and stage acting training',
    icon: FaTheaterMasks,
  },
  {
    title: 'Acting Excellence Award',
    issuer: 'Performance Academy',
    year: '2022',
    description: 'Recognition for outstanding theatrical performance',
    icon: FaAward,
  },
  {
    title: 'Brand Collaboration Excellence',
    issuer: 'LG Team',
    year: '2024',
    description: 'Outstanding Promotional Performance',
    icon: FaTrophy,
  },
];

const testimonials = [
  {
    quote: "Himanshu doesn't just act — he transforms simple ideas into viral stories.",
    author: 'Zorko Marketing Team',
    role: 'Brand Collaboration',
  },
  {
    quote: "A powerhouse of creativity and positive energy.",
    author: 'Gera Electronics Owner',
    role: 'Brand Partner',
  },
];

// Animated Trophy
function AnimatedTrophy() {
  const trophyRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y += delta * 0.25;
      trophyRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <group ref={trophyRef} position={[0, 0, 0]}>
      {/* Trophy Top (Bowl) */}
      <mesh position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.12, 16, 32]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Trophy Body */}
      <mesh position={[0, -0.15, 0]}>
        <coneGeometry args={[0.45, 0.7, 32]} />
        <meshStandardMaterial color="#2563EB" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Trophy Base */}
      <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} />
        <meshStandardMaterial color="#1E40AF" metalness={0.9} />
      </mesh>
      {/* Trophy Handle */}
      <mesh position={[-0.5, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.04, 8, 16]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.04, 8, 16]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.9} />
      </mesh>
    </group>
  );
}

// Animated Certificate
function AnimatedCertificate() {
  const certRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (certRef.current) {
      certRef.current.rotation.y += delta * -0.15;
    }
  });

  return (
    <group ref={certRef} position={[-1.8, 0, 0]} rotation={[0, 0.4, -0.1]}>
      {/* Certificate Paper */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 1, 0.03]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.2} roughness={0.4} />
      </mesh>
      {/* Certificate Border */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.75, 1.05, 0.01]} />
        <meshStandardMaterial color="#60A5FA" />
      </mesh>
      {/* Seal/Badge on Certificate */}
      <mesh position={[0, -0.3, 0.04]}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 32]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.8} />
      </mesh>
    </group>
  );
}

// Animated Star Award
function AnimatedStar() {
  const starRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (starRef.current) {
      starRef.current.rotation.z += delta * 0.5;
      starRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 0.15;
    }
  });

  return (
    <group ref={starRef} position={[1.8, 0.5, 0]} rotation={[0, -0.4, 0]}>
      {/* Star Shape */}
      <mesh>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Star Center */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} />
      </mesh>
      {/* Star Rays */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0.5, 0, 0]} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
          <boxGeometry args={[0.3, 0.08, 0.08]} />
          <meshStandardMaterial color="#60A5FA" metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Certificates Section 3D - Trophy, Certificate & Star Award
function CertificatesScene3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Center>
          <AnimatedTrophy />
          <AnimatedCertificate />
          <AnimatedStar />
        </Center>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.25} />
      </Suspense>
    </Canvas>
  );
}

export default function CertificatesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);
  
  // State for certificates carousel
  const [currentIndex1, setCurrentIndex1] = useState(certificates.length);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const [slidePercentage1, setSlidePercentage1] = useState(100);
  const [itemWidth1, setItemWidth1] = useState('calc(100% - 24px)');
  const [isCarousel1, setIsCarousel1] = useState(true);
  
  // State for testimonials carousel
  const [currentIndex2, setCurrentIndex2] = useState(testimonials.length);
  const [isTransitioning2, setIsTransitioning2] = useState(false);
  const [slidePercentage2, setSlidePercentage2] = useState(100);
  const [isCarousel2, setIsCarousel2] = useState(true);

  // Track if we should show carousel or grid for certificates
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsCarousel1(width < 1024); // Carousel for mobile and tablet, grid for laptop
      if (width < 768) {
        setSlidePercentage1(100); // 1 item on mobile
        setItemWidth1('calc(100% - 24px)');
      } else if (width < 1024) {
        setSlidePercentage1(50); // 2 items on tablet
        setItemWidth1('calc(50% - 12px)');
      } else {
        setSlidePercentage1(33.333); // Not used (grid is shown)
        setItemWidth1('calc(33.333% - 16px)');
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Track if we should show carousel or grid for testimonials
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsCarousel2(width < 780);
      if (width < 780) {
        setSlidePercentage2(100); // 1 item on mobile
      } else {
        setSlidePercentage2(50); // 2 items on desktop
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Handle infinite scroll for certificates
  useEffect(() => {
    if (currentIndex1 >= certificates.length * 2) {
      setIsTransitioning1(true);
      setTimeout(() => {
        setCurrentIndex1(certificates.length);
        setIsTransitioning1(false);
      }, 50);
    }
    if (currentIndex1 < 0) {
      setIsTransitioning1(true);
      setTimeout(() => {
        setCurrentIndex1(certificates.length - 1);
        setIsTransitioning1(false);
      }, 50);
    }
  }, [currentIndex1]);

  // Handle infinite scroll for testimonials
  useEffect(() => {
    if (currentIndex2 >= testimonials.length * 2) {
      setIsTransitioning2(true);
      setTimeout(() => {
        setCurrentIndex2(testimonials.length);
        setIsTransitioning2(false);
      }, 50);
    }
    if (currentIndex2 < 0) {
      setIsTransitioning2(true);
      setTimeout(() => {
        setCurrentIndex2(testimonials.length - 1);
        setIsTransitioning2(false);
      }, 50);
    }
  }, [currentIndex2]);

  // Navigation functions for certificates
  const goToPrevious1 = () => setCurrentIndex1(prev => prev - 1);
  const goToNext1 = () => setCurrentIndex1(prev => prev + 1);

  // Navigation functions for testimonials
  const goToPrevious2 = () => setCurrentIndex2(prev => prev - 1);
  const goToNext2 = () => setCurrentIndex2(prev => prev + 1);

  // Auto-scroll for certificates carousel only
  useEffect(() => {
    if (!isCarousel1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex1((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isCarousel1]);

  // Auto-scroll for testimonials carousel only
  useEffect(() => {
    if (!isCarousel2) return;
    
    const interval = setInterval(() => {
      setCurrentIndex2((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isCarousel2]);

  return (
    <Box
      id="certificates"
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
          <CertificatesScene3D />
        </Box>
      </Box>
      <Container maxW="1400px" position="relative" zIndex={1}>
        <VStack gap={{ base: 10, md: 15, lg: 20 }}>
          {/* Certificates */}
          <VStack gap={10} w="100%">
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
                Certificates & Recognition
              </Text>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                color="gray.700"
                textAlign="center"
                mt={4}
                fontFamily="var(--font-poppins)"
                fontWeight="bold"
              >
                <AnimatedSubtitle>The Achievements</AnimatedSubtitle>
              </Text>
            </motion.div>

            <Box position="relative" w="100%">
              {/* Navigation Buttons - Only show for carousel */}
              {isCarousel1 && (
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
                    onClick={goToPrevious1}
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
                    onClick={goToNext1}
                    zIndex={10}
                    size={{ base: 'md', md: 'lg' }}
                  >
                    <FaChevronRight />
                  </Button>
                </>
              )}

              {/* Content */}
              {isCarousel1 ? (
                <Box
                  ref={carouselRef1}
                  display="flex"
                  gap={{ base: 4, md: 5, lg: 6 }}
                  style={{
                    transform: `translateX(-${currentIndex1 * slidePercentage1}%)`,
                    transition: isTransitioning1 ? 'none' : 'transform 0.5s ease-in-out',
                  }}
                  w="100%"
                >
                  {[...certificates, ...certificates, ...certificates].map((cert, index) => (
                    <Box
                      key={`${cert.title}-${index}`}
                      flex={`0 0 ${itemWidth1}`}
                      maxW={itemWidth1}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.05
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ height: '100%' }}
                      >
                        <Box
                          p={{ base: 4, md: 6, lg: 8 }}
                          bg="white"
                          borderRadius="xl"
                          borderWidth="2px"
                          borderColor="blue.200"
                          boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                          _hover={{ 
                            borderColor: 'blue.500',
                            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)'
                          }}
                          transition="all 0.3s"
                          h="100%"
                          d="flex"
                          flexDirection="column"
                        >
                          <VStack gap={{ base: 3, md: 4, lg: 5 }} align="stretch" h="100%">
                            <HStack gap={3}>
                              <Box display={{ base: 'none', lg: 'block' }}>
                                <cert.icon size={40} color="#3B82F6" />
                              </Box>
                              <Box display={{ base: 'block', md: 'none' }}>
                                <cert.icon size={28} color="#3B82F6" />
                              </Box>
                              <Box display={{ base: 'none', md: 'block', lg: 'none' }}>
                                <cert.icon size={32} color="#3B82F6" />
                              </Box>
                            </HStack>
                            <VStack align="start" gap={{ base: 1, md: 2 }}>
                              <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} fontWeight="bold" color="gray.900" fontFamily="var(--font-poppins)">
                                {cert.title}
                              </Text>
                              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" fontFamily="var(--font-poppins)">
                                {cert.issuer} • {cert.year}
                              </Text>
                            </VStack>
                            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.700" fontFamily="var(--font-poppins)">
                              {cert.description}
                            </Text>
                          </VStack>
                        </Box>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box display="grid" gridTemplateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, md: 5, lg: 6 }} w="100%">
                  {certificates.map((cert, index) => (
                    <Box key={cert.title}>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        style={{ height: '100%' }}
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.05
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ height: '100%' }}
                        >
                          <Box
                            p={{ base: 4, md: 6, lg: 8 }}
                            bg="white"
                            borderRadius="xl"
                            borderWidth="2px"
                            borderColor="blue.200"
                            boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                            _hover={{ 
                              borderColor: 'blue.500',
                              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)'
                            }}
                            transition="all 0.3s"
                            h="100%"
                            d="flex"
                            flexDirection="column"
                          >
                            <VStack gap={{ base: 3, md: 4, lg: 5 }} align="stretch" h="100%">
                              <HStack gap={3}>
                                <Box display={{ base: 'none', lg: 'block' }}>
                                  <cert.icon size={40} color="#3B82F6" />
                                </Box>
                                <Box display={{ base: 'block', md: 'none' }}>
                                  <cert.icon size={28} color="#3B82F6" />
                                </Box>
                                <Box display={{ base: 'none', md: 'block', lg: 'none' }}>
                                  <cert.icon size={32} color="#3B82F6" />
                                </Box>
                              </HStack>
                              <VStack align="start" gap={{ base: 1, md: 2 }}>
                                <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} fontWeight="bold" color="gray.900" fontFamily="var(--font-poppins)">
                                  {cert.title}
                                </Text>
                                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" fontFamily="var(--font-poppins)">
                                  {cert.issuer} • {cert.year}
                                </Text>
                              </VStack>
                              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.700" fontFamily="var(--font-poppins)">
                                {cert.description}
                              </Text>
                            </VStack>
                          </Box>
                        </motion.div>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </VStack>

          {/* Testimonials */}
          <VStack gap={10} w="100%">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Text
                fontSize={{ base: '2xl', md: '3xl', lg: '3xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, blue.600, blue.500, gray.900)"
                bgClip="text"
                textAlign="center"
                fontFamily="var(--font-playfair)"
              >
                Testimonials
              </Text>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                color="gray.700"
                textAlign="center"
                mt={4}
                fontFamily="var(--font-poppins)"
                fontWeight="bold"
              >
                <AnimatedSubtitle>What People Say</AnimatedSubtitle>
              </Text>
            </motion.div>

            <Box position="relative" w="100%">
              {/* Navigation Buttons - Only show for carousel */}
              {isCarousel2 && (
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
                    onClick={goToPrevious2}
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
                    onClick={goToNext2}
                    zIndex={10}
                    size={{ base: 'md', md: 'lg' }}
                  >
                    <FaChevronRight />
                  </Button>
                </>
              )}

              {/* Content */}
              {isCarousel2 ? (
                <Box
                  ref={carouselRef2}
                  display="flex"
                  gap={{ base: 4, md: 6, lg: 8 }}
                  style={{
                    transform: `translateX(-${currentIndex2 * slidePercentage2}%)`,
                    transition: isTransitioning2 ? 'none' : 'transform 0.5s ease-in-out',
                  }}
                  w="100%"
                >
                  {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                    <Box
                      key={`${index}`}
                      flex={{ base: '0 0 calc(100% - 32px)', md: '0 0 calc(50% - 32px)' }}
                      maxW={{ base: 'calc(100% - 32px)', md: 'calc(50% - 32px)' }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.05
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ height: '100%' }}
                      >
                        <Box
                          p={{ base: 4, md: 6, lg: 7 }}
                          bg="white"
                          borderRadius="xl"
                          borderLeftWidth="4px"
                          borderLeftColor="blue.500"
                          boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                          position="relative"
                          _hover={{ 
                            borderLeftColor: 'blue.600',
                            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)'
                          }}
                          transition="all 0.3s"
                          h="100%"
                          d="flex"
                          flexDirection="column"
                        >
                          <VStack gap={{ base: 3, md: 4 }} align="stretch" h="100%">
                            <Text
                              fontSize={{ base: 'xs', md: 'sm' }}
                              color="gray.700"
                              fontStyle="italic"
                              lineHeight="tall"
                              _before={{ content: '"\\201C"', fontSize: 'xl', color: 'blue.500' }}
                              _after={{ content: '"\\201D"', fontSize: 'xl', color: 'blue.500' }}
                              fontFamily="var(--font-poppins)"
                            >
                              {testimonial.quote}
                            </Text>
                            <Box h="1px" bg="gray.200" w="100%" my={{ base: 2, md: 4 }} />
                            <HStack gap={{ base: 2, md: 3 }}>
                              <Box
                                w={{ base: '32px', md: '40px' }}
                                h={{ base: '32px', md: '40px' }}
                                borderRadius="full"
                                bgGradient="linear(to-r, blue.500, blue.400)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                color="white"
                                fontWeight="bold"
                                fontSize={{ base: 'sm', md: 'md' }}
                                boxShadow="0 4px 10px rgba(59, 130, 246, 0.3)"
                              >
                                {testimonial.author.charAt(0)}
                              </Box>
                              <VStack align="start" gap={{ base: 0.5, md: 1 }}>
                                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold" color="gray.800" fontFamily="var(--font-poppins)">
                                  {testimonial.author}
                                </Text>
                                <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.600" fontFamily="var(--font-poppins)">
                                  {testimonial.role}
                                </Text>
                              </VStack>
                            </HStack>
                          </VStack>
                        </Box>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box display="grid" gridTemplateColumns={{ md: 'repeat(2, 1fr)' }} gap={{ base: 4, md: 6, lg: 8 }} w="100%">
                  {testimonials.map((testimonial, index) => (
                    <Box key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        style={{ height: '100%' }}
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.05
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ height: '100%' }}
                        >
                          <Box
                            p={{ base: 4, md: 6, lg: 7 }}
                            bg="white"
                            borderRadius="xl"
                            borderLeftWidth="4px"
                            borderLeftColor="blue.500"
                            boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                            position="relative"
                            _hover={{ 
                              borderLeftColor: 'blue.600',
                              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)'
                            }}
                            transition="all 0.3s"
                            h="100%"
                            d="flex"
                            flexDirection="column"
                          >
                            <VStack gap={{ base: 3, md: 4 }} align="stretch" h="100%">
                              <Text
                                fontSize={{ base: 'xs', md: 'sm' }}
                                color="gray.700"
                                fontStyle="italic"
                                lineHeight="tall"
                                _before={{ content: '"\\201C"', fontSize: 'xl', color: 'blue.500' }}
                                _after={{ content: '"\\201D"', fontSize: 'xl', color: 'blue.500' }}
                                fontFamily="var(--font-poppins)"
                              >
                                {testimonial.quote}
                              </Text>
                              <Box h="1px" bg="gray.200" w="100%" my={{ base: 2, md: 4 }} />
                              <HStack gap={{ base: 2, md: 3 }}>
                                <Box
                                  w={{ base: '32px', md: '40px' }}
                                  h={{ base: '32px', md: '40px' }}
                                  borderRadius="full"
                                  bgGradient="linear(to-r, blue.500, blue.400)"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  color="white"
                                  fontWeight="bold"
                                  fontSize={{ base: 'sm', md: 'md' }}
                                  boxShadow="0 4px 10px rgba(59, 130, 246, 0.3)"
                                >
                                  {testimonial.author.charAt(0)}
                                </Box>
                                <VStack align="start" gap={{ base: 0.5, md: 1 }}>
                                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold" color="gray.800" fontFamily="var(--font-poppins)">
                                    {testimonial.author}
                                  </Text>
                                  <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.600" fontFamily="var(--font-poppins)">
                                    {testimonial.role}
                                  </Text>
                                </VStack>
                              </HStack>
                            </VStack>
                          </Box>
                        </motion.div>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

