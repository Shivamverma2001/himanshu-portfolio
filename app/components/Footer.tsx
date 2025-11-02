'use client';

import { Box, Container, VStack, Text, HStack, Link } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaSnapchat, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      py={{ base: 8, md: 10, lg: 12 }}
      bg="gray.100"
      borderTopWidth="1px"
      borderTopColor="gray.200"
      position="relative"
      overflow="hidden"
    >
      <GradientBG />
      <Container maxW="1400px">
        <VStack gap={{ base: 4, md: 5, lg: 6 }}>
          <Text
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.600, blue.500, gray.900)"
            bgClip="text"
            fontFamily="var(--font-playfair)"
            textAlign="center"
            px={4}
          >
            "I don't just create content — I create connections."
          </Text>
          
          <Box h="1px" bg="gray.300" w="100%" />
          
          <HStack gap={{ base: 4, md: 5, lg: 6 }} flexWrap="wrap" justify="center">
            <Link href="https://instagram.com/himverma_" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box display={{ base: 'none', md: 'block' }}>
                  <FaInstagram size={24} color="#E4405F" />
                </Box>
                <Box display={{ base: 'block', md: 'none' }}>
                  <FaInstagram size={20} color="#E4405F" />
                </Box>
              </motion.div>
            </Link>
            <Link href="https://youtube.com/@himverma_01" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box display={{ base: 'none', md: 'block' }}>
                  <FaYoutube size={24} color="#FF0000" />
                </Box>
                <Box display={{ base: 'block', md: 'none' }}>
                  <FaYoutube size={20} color="#FF0000" />
                </Box>
              </motion.div>
            </Link>
            <Link href="https://www.facebook.com/share/1GZ4btaqT1/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box display={{ base: 'none', md: 'block' }}>
                  <FaFacebook size={24} color="#1877F2" />
                </Box>
                <Box display={{ base: 'block', md: 'none' }}>
                  <FaFacebook size={20} color="#1877F2" />
                </Box>
              </motion.div>
            </Link>
            <Link href="https://wa.me/919997254939" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box display={{ base: 'none', md: 'block' }}>
                  <FaWhatsapp size={24} color="#25D366" />
                </Box>
                <Box display={{ base: 'block', md: 'none' }}>
                  <FaWhatsapp size={20} color="#25D366" />
                </Box>
              </motion.div>
            </Link>
            <Link href="mailto:himanshuverma1july2003@gmail.com">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box display={{ base: 'none', md: 'block' }}>
                  <FaEnvelope size={24} color="#FFD700" />
                </Box>
                <Box display={{ base: 'block', md: 'none' }}>
                  <FaEnvelope size={20} color="#FFD700" />
                </Box>
              </motion.div>
            </Link>
            <Link href="https://snapchat.com/t/EyKxIqQ1" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Box display={{ base: 'none', md: 'block' }}>
                  <FaSnapchat size={24} color="#FFFC00" />
                </Box>
                <Box display={{ base: 'block', md: 'none' }}>
                  <FaSnapchat size={20} color="#FFFC00" />
                </Box>
              </motion.div>
            </Link>
          </HStack>

          <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.700" textAlign="center" fontFamily="var(--font-poppins)" px={4}>
            © {currentYear} Himanshu Verma. All rights reserved.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}

