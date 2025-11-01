'use client';

import { Box, Container, VStack, Text, HStack, Link } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaSnapchat } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      py={12}
      bg="gray.100"
      borderTopWidth="1px"
      borderTopColor="gray.200"
      position="relative"
      overflow="hidden"
    >
      <GradientBG />
      <Container maxW="1400px">
        <VStack gap={6}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="linear(to-r, blue.600, blue.500, gray.900)"
            bgClip="text"
            fontFamily="var(--font-playfair)"
          >
            "I don't just create content — I create connections."
          </Text>
          
          <Box h="1px" bg="gray.300" w="100%" />
          
          <HStack gap={6} flexWrap="wrap" justify="center">
            <Link href="https://instagram.com/himverma_" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <FaInstagram size={24} color="#E4405F" />
              </motion.div>
            </Link>
            <Link href="https://youtube.com/@himverma_01" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <FaYoutube size={24} color="#FF0000" />
              </motion.div>
            </Link>
            <Link href="https://wa.me/919997254939" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <FaWhatsapp size={24} color="#25D366" />
              </motion.div>
            </Link>
            <Link href="mailto:himanshuverma1july2003@gmail.com">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <FaEnvelope size={24} color="#FFD700" />
              </motion.div>
            </Link>
            <Link href="https://snapchat.com/add/himverma_" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <FaSnapchat size={24} color="#FFFC00" />
              </motion.div>
            </Link>
          </HStack>

          <Text fontSize="sm" color="gray.700" textAlign="center" fontFamily="var(--font-poppins)">
            © {currentYear} Himanshu Verma. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}

