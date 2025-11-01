'use client';

import { Box, Container, VStack, Text, SimpleGrid, Badge, HStack } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { 
  FaTheaterMasks, 
  FaMusic, 
  FaFistRaised, 
  FaSwimmer, 
  FaPenFancy, 
  FaVideo, 
  FaEye, 
  FaCommentDots 
} from 'react-icons/fa';
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

const skills = [
  {
    category: 'Acting',
    items: ['Comedy', 'Drama', 'Emotional', 'Realistic'],
    icon: FaTheaterMasks,
    color: 'yellow',
  },
  {
    category: 'Dancing',
    items: ['Bollywood', 'Freestyle'],
    icon: FaMusic,
    color: 'yellow',
  },
  {
    category: 'Martial Arts',
    items: ['Taekwondo'],
    icon: FaFistRaised,
    color: 'yellow',
  },
  {
    category: 'Sports',
    items: ['Swimming'],
    icon: FaSwimmer,
    color: 'yellow',
  },
  {
    category: 'Creative',
    items: ['Scriptwriting', 'Concept Creation'],
    icon: FaPenFancy,
    color: 'yellow',
  },
  {
    category: 'Production',
    items: ['Video Direction', 'Editing'],
    icon: FaVideo,
    color: 'yellow',
  },
  {
    category: 'Personal',
    items: ['Strong Observation', 'Listening Skills'],
    icon: FaEye,
    color: 'yellow',
  },
  {
    category: 'Communication',
    items: ['Improvisation', 'Expressive Communication'],
    icon: FaCommentDots,
    color: 'yellow',
  },
];

// Animated Camera Component
function AnimatedSkillCamera() {
  const cameraRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.y += delta * 0.3;
      cameraRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={cameraRef} position={[0, 0, 0]}>
      {/* Camera Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Lens */}
      <mesh position={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.12, 24]} />
        <meshStandardMaterial color="#1E40AF" metalness={0.9} />
      </mesh>
      {/* Viewfinder */}
      <mesh position={[-0.25, 0.15, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.04]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.7} />
      </mesh>
    </group>
  );
}

// Animated Microphone Component
function AnimatedMicrophone() {
  const micRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (micRef.current) {
      micRef.current.rotation.y += delta * -0.25;
      micRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group ref={micRef} position={[-1.5, 0.5, 0]}>
      {/* Mic Stand */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
        <meshStandardMaterial color="#60A5FA" metalness={0.7} />
      </mesh>
      {/* Mic Head */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.15, 16]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.9} />
      </mesh>
      {/* Grill */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.12, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} />
      </mesh>
    </group>
  );
}

// Animated Pen Component
function AnimatedPen() {
  const penRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (penRef.current) {
      penRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={penRef} position={[1.5, -0.3, 0]} rotation={[0, -0.4, Math.PI / 4]}>
      {/* Pen Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.045, 0.7, 8]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.6} />
      </mesh>
      {/* Pen Tip */}
      <mesh position={[0, -0.35, 0]}>
        <coneGeometry args={[0.045, 0.1, 8]} />
        <meshStandardMaterial color="#1E40AF" metalness={0.9} />
      </mesh>
      {/* Clip */}
      <mesh position={[0.055, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.06, 0.15, 0.02]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} />
      </mesh>
    </group>
  );
}

// Skills Section 3D - Video Camera, Microphone & Pen (Acting, Production, Creative)
function SkillsScene3D() {
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
          <AnimatedSkillCamera />
          <AnimatedMicrophone />
          <AnimatedPen />
        </Center>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Suspense>
    </Canvas>
  );
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box
      id="skills"
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
          <SkillsScene3D />
        </Box>
      </Box>
      <Container maxW="1400px" position="relative" zIndex={1}>
        <VStack gap={16}>
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
              Skills & Talents
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>The Arsenal of Creativity</AnimatedSubtitle>
            </Text>
          </motion.div>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="100%">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 50, rotateY: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 10,
                    rotateX: 10,
                    z: 50
                  }}
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                >
                  <Box
                    p={7}
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
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <VStack gap={5} align="stretch" h="100%">
                      <HStack gap={3}>
                        <skill.icon size={28} color="#3B82F6" />
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color="gray.900"
                          fontFamily="var(--font-poppins)"
                        >
                          {skill.category}
                        </Text>
                      </HStack>
                      <VStack gap={3} align="stretch">
                        {skill.items.map((item) => (
                          <Badge
                            key={item}
                            variant="subtle"
                            bg="blue.50"
                            color="blue.700"
                            borderWidth="1px"
                            borderColor="blue.200"
                            p={3}
                            borderRadius="md"
                            fontFamily="var(--font-poppins)"
                            textAlign="center"
                            fontSize="sm"
                            fontWeight="medium"
                          >
                            {item}
                          </Badge>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </motion.div>
              </motion.div>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

