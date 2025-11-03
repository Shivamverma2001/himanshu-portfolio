'use client';

import { Box, Container, VStack, HStack, Text, Grid, GridItem } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaUser, FaBirthdayCake, FaRulerVertical, FaLanguage, FaMapMarkerAlt, FaTheaterMasks } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense } from 'react';
import { useRef, useState, useEffect } from 'react';
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

const stats = [
  { icon: FaUser, label: 'Name', value: 'Himanshu Verma' },
  { icon: FaBirthdayCake, label: 'Age', value: '22 Years' },
  { icon: FaRulerVertical, label: 'Height', value: "5'7\"" },
  { icon: FaLanguage, label: 'Languages', value: 'Hindi, English' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Delhi, India' },
  { icon: FaTheaterMasks, label: 'Experience', value: '3+ Years' },
];

// Animated Airplane Component
function AnimatedAirplane() {
  const airplaneRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (airplaneRef.current) {
      airplaneRef.current.rotation.y += delta * 0.3;
      airplaneRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
      airplaneRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group ref={airplaneRef} position={[-1.5, 0.5, 0]}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 1.2, 16]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.8} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.5, 0.05, 0.3]} />
        <meshStandardMaterial color="#2563EB" metalness={0.7} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0, -0.6]}>
        <boxGeometry args={[0.1, 0.4, 0.3]} />
        <meshStandardMaterial color="#1E40AF" metalness={0.8} />
      </mesh>
      {/* Cockpit */}
      <mesh position={[0, 0, 0.5]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Animated Theater Stage Component
function AnimatedStage() {
  const stageRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * -0.1;
    }
  });

  return (
    <group ref={stageRef} position={[1.5, -0.5, 0]}>
      {/* Stage Platform */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
      {/* Curtains */}
      <mesh position={[-0.7, 0.4, 0]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.8, 0.08]} />
        <meshStandardMaterial color="#2563EB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.7, 0.4, 0]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.8, 0.08]} />
        <meshStandardMaterial color="#2563EB" transparent opacity={0.7} />
      </mesh>
      {/* Spotlight */}
      <mesh position={[0, 1, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <coneGeometry args={[0.25, 0.6, 16]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// About Section 3D - Airplane (Journey) & Theater Stage
function AboutScene3D({ isVisible }: { isVisible: boolean }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      frameloop={isVisible ? 'always' : 'demand'}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Center>
          <AnimatedAirplane />
          <AnimatedStage />
        </Center>
        <OrbitControls enableZoom={false} autoRotate={isVisible} autoRotateSpeed={0.2} />
      </Suspense>
    </Canvas>
  );
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

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

  return (
    <Box
      id="about"
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
        opacity={0.15}
        zIndex={0}
        pointerEvents="none"
      >
        <Box w="100%" h="100%" style={{ background: 'transparent' }}>
          <AboutScene3D isVisible={isSectionVisible} />
        </Box>
      </Box>
      <Container maxW="1400px" position="relative" zIndex={1}>
        <VStack gap={{ base: 8, md: 10, lg: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            style={{ opacity, y }}
          >
            <Text
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              bgGradient="linear(to-r, blue.600, blue.500, gray.900)"
              bgClip="text"
              textAlign="center"
              fontFamily="var(--font-playfair)"
            >
              About Me
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              mb={{ base: 8, md: 12 }}
              maxW="800px"
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>The Journey From Streets to Stage</AnimatedSubtitle>
            </Text>
          </motion.div>

          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 3, md: 6 }}
            rowGap={{ base: 3, md: 6 }}
            w="100%"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Box
                    p={{ base: 3, md: 6 }}
                    bg="white"
                    borderRadius="xl"
                    borderWidth="2px"
                    borderColor="blue.200"
                    boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                    _hover={{ 
                      borderColor: 'blue.500', 
                      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.3s"
                    h="100%"
                  >
                    <HStack gap={{ base: 2, md: 4 }} align="center" h="100%">
                      <Box flexShrink={0}>
                        <Box display={{ base: 'none', md: 'block' }}>
                          <stat.icon size={40} color="#3B82F6" />
                        </Box>
                        <Box display={{ base: 'block', md: 'none' }}>
                          <stat.icon size={24} color="#3B82F6" />
                        </Box>
                        <Text color="gray.600" fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} fontWeight="medium" fontFamily="var(--font-poppins)" mt={2}>
                          {stat.label}
                        </Text>
                      </Box>
                      <Box flex={1} textAlign="center">
                        <Text color="blue.600" fontSize={{ base: 'sm', md: 'xl', lg: '2xl' }} fontWeight="bold" fontFamily="var(--font-poppins)">
                          {stat.value}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </motion.div>
              </motion.div>
            ))}
          </Grid>

          <VStack gap={6} align="stretch" style={{ width: '100%', maxWidth: '900px' }}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ width: '100%' }}
            >
              <Box
                p={{ base: 4, md: 8 }}
                bg="gray.50"
                borderRadius="xl"
                borderLeftWidth="4px"
                borderLeftColor="blue.500"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
              >
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="gray.700" lineHeight="tall">
                  From the bustling streets of <strong>Delhi and Mumbai</strong> to the serene lanes of{' '}
                  <strong>Yamunanagar, Haryana</strong>, I bring stories to life through authentic performance 
                  and cinematic creativity.
                </Text>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ width: '100%' }}
            >
              <Box
                p={{ base: 4, md: 8 }}
                bg="gray.50"
                borderRadius="xl"
                borderLeftWidth="4px"
                borderLeftColor="blue.500"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
              >
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="gray.800" lineHeight="tall" mb={4} fontFamily="var(--font-poppins)">
                  <strong>Started Acting In: 2021</strong> – driven by my dream to make people smile and 
                  connect emotionally through performance.
                </Text>
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="gray.800" lineHeight="tall" fontFamily="var(--font-poppins)">
                  Trained in <strong>theatre and stage acting</strong>, now transitioning into on-screen work 
                  and brand commercials.
                </Text>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ width: '100%' }}
            >
              <Box
                p={{ base: 4, md: 8 }}
                bg="gray.50"
                borderRadius="xl"
                borderLeftWidth="4px"
                borderLeftColor="blue.500"
                boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
              >
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} color="gray.800" lineHeight="tall" fontFamily="var(--font-poppins)">
                  <strong>Goal:</strong> To become one of India's most recognized on-screen actors while 
                  continuing to collaborate with local and national brands to tell meaningful stories.
                </Text>
              </Box>
            </motion.div>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

