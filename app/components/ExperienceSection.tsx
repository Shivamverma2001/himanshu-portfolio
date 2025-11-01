'use client';

import { Box, Container, VStack, Text, HStack, Grid, GridItem, Badge } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FaTv, FaShoppingBag, FaDumbbell, FaMobileAlt } from 'react-icons/fa';
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
    brand: 'Gera Electronics',
    description: 'Festive Sale Campaigns',
    icon: FaMobileAlt,
    category: 'Electronics',
    color: 'yellow',
  },
];

const categories = [
  'Food', 'Electronics', 'Fashion', 'Beauty', 
  'Gym', 'Jewellery', 'Lifestyle', 'Local Retail'
];

// Experience Section 3D - Brand collaboration elements
function ExperienceScene3D() {
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
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Suspense>
    </Canvas>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box
      id="experience"
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
          <ExperienceScene3D />
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

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
            gap={10}
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
                    p={9}
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
                    <VStack gap={5} align="stretch">
                      <HStack gap={4}>
                         <collab.icon 
                          size={32} 
                          color="#3B82F6"
                        />
                        <VStack align="start" gap={1}>
                          <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            color="gray.900"
                            fontFamily="var(--font-poppins)"
                          >
                            {collab.brand}
                          </Text>
                           <Badge colorScheme="blue" fontSize="xs" px={2} py={1} fontFamily="var(--font-poppins)">
                            {collab.category}
                          </Badge>
                        </VStack>
                      </HStack>
                      <Box h="1px" bg="gray.200" w="100%" my={2} />
                      <Text color="gray.700" fontSize="md" fontFamily="var(--font-poppins)">
                        {collab.description}
                      </Text>
                    </VStack>
                  </Box>
                </motion.div>
              </motion.div>
            ))}
          </Grid>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', maxWidth: '900px' }}
          >
              <Box
                p={8}
                bg="gray.50"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.200"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
              >
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="blue.600"
                mb={4}
                textAlign="center"
                fontFamily="var(--font-poppins)"
              >
                Department Categories Covered
              </Text>
              <HStack gap={3} flexWrap="wrap" justify="center">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                      <Badge
                      colorScheme="blue"
                      p={2}
                      px={4}
                      borderRadius="full"
                      fontSize="sm"
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

