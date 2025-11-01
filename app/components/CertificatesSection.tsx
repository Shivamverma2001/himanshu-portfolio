'use client';

import { Box, Container, VStack, Text, SimpleGrid, HStack } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FaAward, FaTrophy, FaCertificate, FaTheaterMasks } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense } from 'react';
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

  return (
    <Box
      id="certificates"
      ref={ref}
      minH="100vh"
      py={20}
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
        <VStack gap={20}>
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

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="100%">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    whileHover={{ 
                      rotateY: 180,
                      scale: 1.05
                    }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s',
                    }}
                  >
                    <Box
                      p={8}
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
                      backfaceVisibility="hidden"
                    >
                      <VStack gap={5} align="stretch">
                        <cert.icon size={40} color="#3B82F6" />
                        <VStack align="start" gap={2}>
                          <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="var(--font-poppins)">
                            {cert.title}
                          </Text>
                          <Text fontSize="sm" color="gray.600" fontFamily="var(--font-poppins)">
                            {cert.issuer} • {cert.year}
                          </Text>
                        </VStack>
                        <Text fontSize="sm" color="gray.700" fontFamily="var(--font-poppins)">
                          {cert.description}
                        </Text>
                      </VStack>
                    </Box>
                  </motion.div>
                </motion.div>
              ))}
            </SimpleGrid>
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
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
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

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="100%">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  style={{ perspective: '1000px' }}
                >
                  <motion.div
                    whileHover={{ 
                      rotateY: 5,
                      rotateX: 5,
                      z: 50
                    }}
                  >
                    <Box
                      p={10}
                      bg="white"
                      borderRadius="xl"
                      borderLeftWidth="4px"
                      borderLeftColor="blue.500"
                      boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                      position="relative"
                      _hover={{ 
                        borderLeftColor: 'blue.600',
                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
                        transform: 'translateY(-4px)'
                      }}
                      transition="all 0.3s"
                      h="100%"
                    >
                      <VStack gap={6} align="stretch">
                        <Text
                          fontSize="lg"
                          color="gray.700"
                          fontStyle="italic"
                          lineHeight="tall"
                          _before={{ content: '"\\201C"', fontSize: '4xl', color: 'blue.500' }}
                          _after={{ content: '"\\201D"', fontSize: '4xl', color: 'blue.500' }}
                          fontFamily="var(--font-poppins)"
                        >
                          {testimonial.quote}
                        </Text>
                        <Box h="1px" bg="gray.200" w="100%" my={4} />
                        <HStack gap={3}>
                          <Box
                            w="40px"
                            h="40px"
                            borderRadius="full"
                            bgGradient="linear(to-r, blue.500, blue.400)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="white"
                            fontWeight="bold"
                            fontSize="md"
                            boxShadow="0 4px 10px rgba(59, 130, 246, 0.3)"
                          >
                            {testimonial.author.charAt(0)}
                          </Box>
                          <VStack align="start" gap={1}>
                            <Text fontSize="sm" fontWeight="semibold" color="gray.800" fontFamily="var(--font-poppins)">
                              {testimonial.author}
                            </Text>
                            <Text fontSize="xs" color="gray.600" fontFamily="var(--font-poppins)">
                              {testimonial.role}
                            </Text>
                          </VStack>
                        </HStack>
                      </VStack>
                    </Box>
                  </motion.div>
                </motion.div>
              ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

