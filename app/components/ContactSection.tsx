'use client';

import { 
  Box, 
  Container, 
  VStack, 
  Text, 
  SimpleGrid, 
  GridItem, 
  Input, 
  Textarea, 
  Button, 
  HStack, 
  Link,
  createToaster,
} from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaInstagram, 
  FaYoutube, 
  FaWhatsapp,
  FaVideo,
  FaShoppingBag,
  FaPenFancy
} from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
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

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'himanshuverma1july2003@gmail.com',
    link: 'mailto:himanshuverma1july2003@gmail.com',
    color: 'yellow',
  },
  {
    icon: FaPhone,
    label: 'Phone / WhatsApp',
    value: '+91 99972 54939',
    link: 'https://wa.me/919997254939',
    color: 'green',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Delhi, India',
    link: '#',
    color: 'orange',
  },
];

const socialLinks = [
  {
    icon: FaInstagram,
    label: 'Instagram',
    link: 'https://instagram.com/himverma_',
    color: 'pink',
  },
  {
    icon: FaYoutube,
    label: 'YouTube',
    link: 'https://youtube.com/@himverma_01',
    color: 'red',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    link: 'https://wa.me/919997254939',
    color: 'green',
  },
];

const services = [
  {
    icon: FaVideo,
    title: 'Acting Projects',
    description: 'Short Films, Web Series, Ads',
  },
  {
    icon: FaShoppingBag,
    title: 'Brand Collaborations',
    description: 'Food, Fashion, Fitness, Lifestyle, Electronics',
  },
  {
    icon: FaPenFancy,
    title: 'Script & Direction',
    description: 'Concept Creation & Video Direction',
  },
];

// Animated Phone
function AnimatedPhone() {
  const phoneRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y += delta * 0.3;
      phoneRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <group ref={phoneRef} position={[-1.5, 0, 0]} rotation={[0, -0.3, 0]}>
      {/* Phone Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.7, 0.12]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.1, 0.07]}>
        <boxGeometry args={[0.3, 0.4, 0.01]} />
        <meshStandardMaterial color="#1E40AF" transparent opacity={0.9} />
      </mesh>
      {/* Speaker */}
      <mesh position={[0, 0.3, 0.07]}>
        <boxGeometry args={[0.25, 0.05, 0.01]} />
        <meshStandardMaterial color="#2563EB" />
      </mesh>
      {/* Home Button */}
      <mesh position={[0, -0.25, 0.07]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        <meshStandardMaterial color="#2563EB" />
      </mesh>
      {/* Antenna/Signal */}
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#60A5FA" />
      </mesh>
    </group>
  );
}

// Animated Envelope
function AnimatedEnvelope() {
  const envelopeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (envelopeRef.current) {
      envelopeRef.current.rotation.y += delta * -0.2;
      envelopeRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 0.12;
    }
  });

  return (
    <group ref={envelopeRef} position={[0, 0.3, 0]} rotation={[0, 0.2, 0]}>
      {/* Envelope Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.6, 0.06]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.5} />
      </mesh>
      {/* Envelope Flap */}
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.06]} />
        <meshStandardMaterial color="#2563EB" metalness={0.6} />
      </mesh>
      {/* Letter Inside */}
      <mesh position={[0, 0.05, 0.04]}>
        <boxGeometry args={[0.7, 0.4, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

// Animated Chat Bubble
function AnimatedChatBubble() {
  const chatRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (chatRef.current) {
      chatRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      chatRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group ref={chatRef} position={[1.5, -0.3, 0]} rotation={[0, 0.3, 0]}>
      {/* Bubble Main */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.7} />
      </mesh>
      {/* Bubble Tail */}
      <mesh position={[-0.3, -0.4, 0]} rotation={[Math.PI / 6, 0, Math.PI / 4]}>
        <coneGeometry args={[0.2, 0.35, 3]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.7} />
      </mesh>
      {/* Message Lines */}
      <mesh position={[-0.1, 0, 0.5]}>
        <boxGeometry args={[0.3, 0.05, 0.01]} />
        <meshStandardMaterial color="#1E40AF" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.1, -0.1, 0.5]}>
        <boxGeometry args={[0.2, 0.05, 0.01]} />
        <meshStandardMaterial color="#1E40AF" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Contact Section 3D - Phone (Calling), Envelope (Email) & Chat Bubble (Messaging)
function ContactScene3D({ isVisible }: { isVisible: boolean }) {
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
          <AnimatedPhone />
          <AnimatedEnvelope />
          <AnimatedChatBubble />
        </Center>
        <OrbitControls enableZoom={false} autoRotate={isVisible} autoRotateSpeed={0.3} />
      </Suspense>
    </Canvas>
  );
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const toaster = createToaster({ placement: 'top' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        toaster.create({
          type: 'success',
          title: 'Message Sent Successfully!',
          description: 'Thank you for contacting us. We\'ll get back to you soon.',
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        // Error from API
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toaster.create({
        type: 'error',
        title: 'Failed to Send Message',
        description: error instanceof Error ? error.message : 'Please try again later or contact us directly.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      id="contact"
      ref={ref}
      minH="100vh"
      py={{ base: 12, md: 16, lg: 20 }}
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
          <ContactScene3D isVisible={isSectionVisible} />
        </Box>
      </Box>
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
              Let's Collaborate
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>Want to create something unforgettable for your brand or project?</AnimatedSubtitle>
            </Text>
          </motion.div>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 6, md: 8, lg: 12 }} w="100%">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                p={{ base: 4, md: 6, lg: 8 }}
                bg="white"
                borderRadius="xl"
                borderWidth="2px"
                borderColor="blue.300"
                boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
              >
                <VStack gap={{ base: 4, md: 5, lg: 6 }} as="form" onSubmit={handleSubmit}>
                  <Box w="100%">
                    <Text color="gray.700" mb={2} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">Name</Text>
                    <Input
                      type="text"
                      bg="gray.50"
                      borderColor="gray.300"
                      color="gray.800"
                      fontSize={{ base: 'sm', md: 'md' }}
                      size={{ base: 'md', md: 'lg' }}
                      _hover={{ borderColor: 'blue.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Box>

                  <Box w="100%">
                    <Text color="gray.700" mb={2} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">Email</Text>
                    <Input
                      type="email"
                      bg="gray.50"
                      borderColor="gray.300"
                      color="gray.800"
                      fontSize={{ base: 'sm', md: 'md' }}
                      size={{ base: 'md', md: 'lg' }}
                      _hover={{ borderColor: 'blue.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </Box>

                  <Box w="100%">
                    <Text color="gray.700" mb={2} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">Phone (Optional)</Text>
                    <Input
                      type="tel"
                      bg="gray.50"
                      borderColor="gray.300"
                      color="gray.800"
                      fontSize={{ base: 'sm', md: 'md' }}
                      size={{ base: 'md', md: 'lg' }}
                      _hover={{ borderColor: 'blue.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </Box>

                  <Box w="100%">
                    <Text color="gray.700" mb={2} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="semibold">Message</Text>
                    <Textarea
                      bg="gray.50"
                      borderColor="gray.300"
                      color="gray.800"
                      fontSize={{ base: 'sm', md: 'md' }}
                      rows={8}
                      minH={{ base: '120px', md: '150px' }}
                      _hover={{ borderColor: 'blue.400' }}
                      _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </Box>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ width: '100%' }}
                  >
                    <Button
                      type="submit"
                      colorScheme="blue"
                      size={{ base: 'md', md: 'lg' }}
                      w="100%"
                      bgGradient="linear(to-r, blue.600, blue.500)"
                      color="white"
                      fontSize={{ base: 'sm', md: 'md' }}
                      _hover={{ bgGradient: 'linear(to-r, blue.700, blue.600)' }}
                      fontFamily="var(--font-poppins)"
                      loading={isSubmitting}
                      loadingText="Sending..."
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </VStack>
              </Box>
            </motion.div>

            {/* Contact Info & Services */}
            <VStack gap={{ base: 6, md: 7, lg: 8 }} align="stretch">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  p={{ base: 4, md: 6, lg: 8 }}
                  bg="white"
                  borderRadius="xl"
                  borderWidth="2px"
                  borderColor="blue.300"
                  boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                >
                  <VStack gap={{ base: 4, md: 5, lg: 6 }} align="stretch">
                    <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="gray.900" fontFamily="var(--font-poppins)">
                      Get In Touch
                    </Text>
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        whileHover={{ scale: 1.02, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={info.link} target="_blank" rel="noopener noreferrer">
                          <HStack gap={{ base: 3, md: 4 }}>
                            <Box color="blue.500">
                              <Box display={{ base: 'none', md: 'block' }}>
                                <info.icon size={24} />
                              </Box>
                              <Box display={{ base: 'block', md: 'none' }}>
                                <info.icon size={20} />
                              </Box>
                            </Box>
                            <VStack align="start" gap={0}>
                              <Text fontSize={{ base: '2xs', md: 'xs' }} color="gray.600" fontFamily="var(--font-poppins)">
                                {info.label}
                              </Text>
                              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.800" fontFamily="var(--font-poppins)">
                                {info.value}
                              </Text>
                            </VStack>
                          </HStack>
                        </Link>
                      </motion.div>
                    ))}
                  </VStack>
                </Box>
              </motion.div>

              {/* Available Services */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  p={{ base: 4, md: 6, lg: 8 }}
                  bg="white"
                  borderRadius="xl"
                  borderWidth="2px"
                  borderColor="blue.300"
                  boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
                >
                  <VStack gap={{ base: 4, md: 5, lg: 6 }} align="stretch">
                    <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color="gray.900" fontFamily="var(--font-poppins)">
                      Available For
                    </Text>
                    {services.map((service) => (
                      <motion.div
                        key={service.title}
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HStack gap={{ base: 3, md: 4 }}>
                          <Box color="blue.500">
                            <Box display={{ base: 'none', md: 'block' }}>
                              <service.icon size={24} />
                            </Box>
                            <Box display={{ base: 'block', md: 'none' }}>
                              <service.icon size={20} />
                            </Box>
                          </Box>
                          <VStack align="start" gap={0}>
                            <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold" color="gray.800" fontFamily="var(--font-poppins)">
                              {service.title}
                            </Text>
                            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600" fontFamily="var(--font-poppins)">
                              {service.description}
                            </Text>
                          </VStack>
                        </HStack>
                      </motion.div>
                    ))}
                  </VStack>
                </Box>
              </motion.div>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

