'use client';

import { Box, Container, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense } from 'react';
import { FaArrowDown, FaPlay } from 'react-icons/fa';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated Camera Component
function AnimatedCamera() {
  const cameraRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.y += delta * 0.3;
      cameraRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={cameraRef} position={[-1.5, 0, 0]}>
      {/* Camera Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Camera Lens */}
      <mesh position={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.15, 32]} />
        <meshStandardMaterial color="#1E40AF" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Viewfinder */}
      <mesh position={[-0.35, 0.2, 0]}>
        <boxGeometry args={[0.15, 0.1, 0.05]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.7} />
      </mesh>
      {/* Flash/Top */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshStandardMaterial color="#60A5FA" metalness={0.6} />
      </mesh>
    </group>
  );
}

// Animated Theater Mask Component
function AnimatedMask() {
  const maskRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (maskRef.current) {
      maskRef.current.rotation.y += delta * -0.2;
      maskRef.current.position.y = Math.cos(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <group ref={maskRef} position={[1.5, 0.5, 0]}>
      {/* Mask Face */}
      <mesh position={[0, 0, 0]} rotation={[0, -0.3, 0]}>
        <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial color="#3B82F6" transparent opacity={0.7} metalness={0.5} />
      </mesh>
      {/* Eye Holes */}
      <mesh position={[-0.2, 0.1, 0.65]} rotation={[0, -0.3, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.65]} rotation={[0, -0.3, 0]}>
        <torusGeometry args={[0.15, 0.05, 8, 16]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>
      {/* Smile */}
      <mesh position={[0, -0.2, 0.65]} rotation={[Math.PI / 6, -0.3, 0]}>
        <torusGeometry args={[0.2, 0.05, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1E40AF" />
      </mesh>
    </group>
  );
}

// Animated Film Reel Component
function AnimatedReel() {
  const reelRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reelRef.current) {
      reelRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      <mesh ref={reelRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.15, 16, 64]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} />
      </mesh>
    </group>
  );
}

// Hero 3D Scene - Film Camera & Theater Mask representing Actor/Creator
function Scene3D() {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Center>
          <AnimatedCamera />
          <AnimatedMask />
          <AnimatedReel />
        </Center>
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      id="hero"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bgGradient="linear(to-b, white, blue.50)"
      color="gray.800"
    >
      {/* 3D Background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.15}
        zIndex={0}
        pointerEvents="none"
      >
        <Box
          w="100%"
          h="100%"
          style={{
            background: 'transparent',
          }}
        >
          <Scene3D />
        </Box>
      </Box>

      {/* Content */}
      <Container maxW="1400px" position="relative" zIndex={2}>
        <VStack gap={8} textAlign="center" py={20}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Text
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.600, blue.500, gray.900)"
              bgClip="text"
              lineHeight="1.2"
              fontFamily="var(--font-playfair)"
            >
              HIMANSHU VERMA
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Text
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              color="gray.800"
              maxW="800px"
              fontFamily="var(--font-poppins)"
            >
              Actor | Creator | Brand Storyteller
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              maxW="700px"
              fontStyle="italic"
              fontFamily="var(--font-poppins)"
            >
              "I don't just create content — I create connections."
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <VStack gap={4} mt={8}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                color="gray.700"
                maxW="600px"
                fontFamily="var(--font-poppins)"
              >
                From the bustling streets of Delhi and Mumbai to the serene lanes of Yamunanagar, Haryana, 
                I bring stories to life through authentic performance and cinematic creativity.
              </Text>
              <HStack gap={4} flexWrap="wrap" justify="center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={scrollToAbout}
                    bgGradient="linear(to-r, blue.600, blue.500)"
                    color="white"
                    _hover={{ bgGradient: 'linear(to-r, blue.700, blue.600)' }}
                    fontFamily="var(--font-poppins)"
                  >
                    Explore My Journey <FaPlay style={{ marginLeft: '8px' }} />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    size="lg"
                    borderColor="blue.600"
                    borderWidth="2px"
                    color="blue.700"
                    bg="white"
                    _hover={{ bg: 'blue.50', borderColor: 'blue.700' }}
                    fontFamily="var(--font-poppins)"
                    onClick={() => {
                      const element = document.querySelector('#contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Let's Collaborate
                  </Button>
                </motion.div>
              </HStack>
            </VStack>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, delay: 1, repeat: Infinity }}
            style={{ marginTop: '4rem' }}
          >
            <FaArrowDown size={24} color="#3B82F6" />
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
}

