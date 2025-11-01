'use client';

import { Box, Container, Grid, GridItem, Heading, List, Text, VStack, Button, HStack, IconButton } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

// Component to animate text letter by letter with typing effect
function AnimatedText({ children, delay = 0 }: { children: string; delay?: number }) {
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
              delay: delay + i * 0.03,
              ease: "linear"
            }}
            style={{ 
              display: 'inline-block',
              transform: 'translateZ(0)',
              marginRight: letter === ' ' ? '0' : '-0.1px'
            }}
          >
            {letter}
          </motion.span>
        )
      ))}
    </span>
  );
}

export default function HomeSection() {
  return (
    <Box id="home" bg="white" pt={{ base: 0, md: 0 }} pb={{ base: 0, md: 0 }} h={{ base: 'auto', md: '100vh' }} style={{ scrollMarginTop: '96px' }} position="relative" overflow="hidden">
      <GradientBG />
      <Box h="100%" maxW="1920px" mx="auto">
        <Grid templateColumns={{ base: '1fr', md: '55% 45%' }} gap={0} alignItems="stretch" h="100%">
          <GridItem display="flex" alignItems="center" pl={{ base: 4, md: 8 }} mr={{ base: 0, md: -16 }}>
            <VStack align="start" gap={6} w="100%">
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.800" fontFamily="var(--font-poppins)">
                <AnimatedText delay={2}>Actor | Creator | Brand Storyteller</AnimatedText>
              </Text>
              <Heading as="h1" fontWeight="extrabold" lineHeight="1.05" fontFamily="var(--font-playfair)" fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}>
                <AnimatedText delay={2.5}>Transform Your</AnimatedText>
                <br />
                <Box as="span">
                  <AnimatedText delay={3}>Story</AnimatedText>
                </Box>
                <br />
                <AnimatedText delay={3.3}>With Cinematic Creativity</AnimatedText>
              </Heading>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" fontStyle="italic" fontFamily="var(--font-poppins)">
                <AnimatedText delay={4}>"I don't just create content — I create connections."</AnimatedText>
              </Text>
              <Text color="gray.700" fontSize={{ base: 'md', md: 'lg' }} maxW="600px" fontFamily="var(--font-poppins)">
                <AnimatedText delay={4.5}>Work with a versatile actor and creator to bring authentic, brand - aligned narratives to life — from short-form content to commercials.</AnimatedText>
              </Text>
              <Box w="100%" display="flex" flexDirection="column" alignItems="center">
                <HStack gap={4}>
                  <Button 
                    colorScheme="blue" 
                    size="lg"
                    onClick={() => {
                      const element = document.querySelector('#about');
                      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    _hover={{}}
                  >
                    Explore My Journey
                  </Button>
                  <Button 
                    variant="outline" 
                    colorScheme="blue" 
                    size="lg"
                    onClick={() => {
                      const element = document.querySelector('#contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    _hover={{ transform: 'scale(1.05)' }}
                  >
                    Let's Collaborate
                  </Button>
                </HStack>
                
                {/* Animated Down Arrow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 10, 0] }}
                  transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                  style={{ marginTop: '2rem' }}
                >
                <Box
                  as="button"
                  aria-label="Scroll down"
                  p={3}
                  bg="transparent"
                  borderRadius="full"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => {
                    const element = document.querySelector('#about');
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  _hover={{
                    transform: 'scale(1.1)',
                  }}
                  transition="all 0.3s"
                  w="44px"
                  h="44px"
                >
                  <FaArrowDown size={24} color="black" />
                </Box>
              </motion.div>
              </Box>
            </VStack>
          </GridItem>
          <GridItem display="flex" alignItems="stretch">
            <Box w="100%" h={{ base: '480px', md: '100%' }} display="flex" alignItems="center" justifyContent="center">
              <Box position="relative" w="100%" h="100%" bg="transparent" borderRadius={0} boxShadow="none" p={0}>
                <Box position="relative" w="100%" h="100%" borderRadius={0}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 4, delay: 2.5 }}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                  >
                    <Image
                      src="/myimages/image.png"
                      alt="Himanshu portrait"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'contain', objectPosition: 'right center' }}
                    />
                  </motion.div>
                  {/* Permanent bottom blur effect */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    h="40px"
                    bgGradient="linear(to-t, white, transparent)"
                    pointerEvents="none"
                    zIndex={2}
                    style={{ 
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}


