'use client';

import { Box, Container, VStack, Text, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaVideo, FaYoutube, FaTimes } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';

// Component to animate text letter by letter with typing effect
function AnimatedSubtitle({ children }: { children: string }) {
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
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.01,
              delay: i * 0.03,
            }}
            style={{ 
              display: 'inline-block',
              transform: 'translateZ(0)',
            }}
          >
            {letter}
          </motion.span>
        )
      ))}
    </span>
  );
}

const portfolioItems = [
  {
    title: 'Hindi Introduction',
    category: 'Introduction',
    description: 'Personal introduction in Hindi',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    videoUrl: '', // Will be provided by user
  },
  {
    title: 'English Introduction',
    category: 'Introduction',
    description: 'Personal introduction in English',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    videoUrl: '', // Will be provided by user
  },
  {
    title: 'Monologue Performance',
    category: 'Performance',
    description: 'Theatrical monologue showcase',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    videoUrl: '', // Will be provided by user
  },
  {
    title: 'Brand Promo - LG',
    category: 'Brand Collaboration',
    description: 'Electronics promotional content',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    videoUrl: '', // Will be provided by user
  },
  {
    title: 'Brand Promo - Zorko',
    category: 'Brand Collaboration',
    description: 'Food & beverage advertisement',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    videoUrl: '', // Will be provided by user
  },
  {
    title: 'Behind the Scenes',
    category: 'BTS',
    description: 'Behind the scenes moments',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    videoUrl: '', // Will be provided by user
  },
];

// Animated Portfolio Camera
function AnimatedPortfolioCamera() {
  const cameraRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={cameraRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.45, 0.45]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Lens */}
      <mesh position={[0.35, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.14, 24]} />
        <meshStandardMaterial color="#1E40AF" metalness={0.9} />
      </mesh>
      {/* Viewfinder */}
      <mesh position={[-0.3, 0.18, 0]}>
        <boxGeometry args={[0.14, 0.1, 0.05]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.7} />
      </mesh>
      {/* Screen */}
      <mesh position={[-0.25, -0.15, 0.22]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Animated Film Strip
function AnimatedFilmStrip() {
  const filmRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (filmRef.current) {
      filmRef.current.rotation.y += delta * -0.2;
      filmRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group ref={filmRef} position={[-1.8, 0.5, 0]}>
      {/* Film Base */}
      <mesh position={[0, 0, 0]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.03]} />
        <meshStandardMaterial color="#1E40AF" transparent opacity={0.8} />
      </mesh>
      {/* Film Frames */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.02]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.2, 0.3, 0.02]} />
          <meshStandardMaterial color="#3B82F6" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Animated Play Button
function AnimatedPlayButton() {
  const playRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (playRef.current) {
      playRef.current.rotation.y += delta * 0.25;
      playRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group ref={playRef} position={[1.8, -0.5, 0]}>
      {/* Circle Background */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial color="#3B82F6" transparent opacity={0.6} />
      </mesh>
      {/* Play Triangle */}
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[0.2, 0.35, 3, 1]} />
        <meshStandardMaterial color="#2563EB" />
      </mesh>
    </group>
  );
}

// Portfolio Section 3D - Video Camera, Film Strip & Play Button
function PortfolioScene3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <Center>
          <AnimatedPortfolioCamera />
          <AnimatedFilmStrip />
          <AnimatedPlayButton />
        </Center>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Suspense>
    </Canvas>
  );
}

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>('');

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedVideo('');
  };

  return (
    <Box
      id="portfolio"
      ref={ref}
      minH="100vh"
      py={20}
      bg="#F8F9FA"
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
          <PortfolioScene3D />
        </Box>
      </Box>
      <Container maxW="1400px" position="relative" zIndex={1}>
        <VStack gap={12}>
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
              Portfolio Videos
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>The Work That Speaks</AnimatedSubtitle>
            </Text>
          </motion.div>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="100%">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    rotateX: 5,
                    z: 50
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Box
                    position="relative"
                    bg="white"
                    borderRadius="xl"
                    overflow="hidden"
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
                    onClick={() => item.videoUrl && handleVideoClick(item.videoUrl)}
                  >
                    {/* Placeholder for video thumbnail */}
                    <Box
                      h="250px"
                      bgGradient="linear(to-br, blue.400, blue.300)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                    >
                      <FaVideo size={64} color="rgba(255,255,255,0.8)" />
                      <Box
                        position="absolute"
                        inset={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="whiteAlpha.400"
                        _hover={{ bg: 'whiteAlpha.600' }}
                        transition="all 0.3s"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaPlay size={48} color="rgba(255,255,255,0.9)" />
                        </motion.div>
                      </Box>
                    </Box>

                    <VStack p={6} align="stretch" gap={2}>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.900" fontWeight="semibold" fontFamily="var(--font-poppins)">
                          {item.category}
                        </Text>
                        <FaYoutube size={20} color="gray.500" />
                      </HStack>
                      <Text fontSize="lg" fontWeight="bold" color="gray.800" fontFamily="var(--font-poppins)">
                        {item.title}
                      </Text>
                        <Text fontSize="sm" color="gray.700" fontFamily="var(--font-poppins)">
                          {item.description}
                        </Text>
                    </VStack>
                  </Box>
                </motion.div>
              </motion.div>
            ))}
          </SimpleGrid>

          {/* Video Modal */}
          <AnimatePresence>
            {isOpen && (
              <Box
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={2000}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="rgba(0, 0, 0, 0.7)"
                onClick={handleClose}
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Box
                  maxW="900px"
                  w="90%"
                  bg="white"
                  borderRadius="xl"
                  position="relative"
                  onClick={(e) => e.stopPropagation()}
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
                  as={motion.div}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <Button
                    position="absolute"
                    top={-10}
                    right={-10}
                    borderRadius="full"
                    bg="gray.300"
                    _hover={{ bg: 'gray.600' }}
                    onClick={handleClose}
                    zIndex={10}
                    size="sm"
                  >
                    <FaTimes />
                  </Button>
                  {selectedVideo ? (
                    <Box
                      position="relative"
                      pb="56.25%" // 16:9 aspect ratio
                      h={0}
                      overflow="hidden"
                      borderRadius="xl"
                    >
                      <Box
                        as="iframe"
                        position="absolute"
                        top={0}
                        left={0}
                        w="100%"
                        h="100%"
                        src={selectedVideo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </Box>
                  ) : (
                    <Box p={8} textAlign="center">
                      <Text color="gray.700" fontFamily="var(--font-poppins)">Video URL will be added here</Text>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </AnimatePresence>
        </VStack>
      </Container>
    </Box>
  );
}

