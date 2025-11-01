'use client';

import { Box, Container, VStack, Text, SimpleGrid, HStack, Badge } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion } from 'framer-motion';
import { 
  FaYoutube, 
  FaInstagram, 
  FaFacebook, 
  FaSnapchatGhost,
  FaChartLine,
  FaFire,
  FaArrowUp,
  FaEye,
  FaClock,
  FaUsers,
  FaHeart,
  FaComment,
  FaEnvelope,
  FaDownload
} from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

// Icon mapping
const iconMap: { [key: string]: any } = {
  FaEye,
  FaClock,
  FaUsers,
  FaHeart,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaSnapchatGhost,
};

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

function MetricCard({ icon: Icon, metric, value, growth, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        <Box
          p={6}
          bg="white"
          borderRadius="xl"
          borderWidth="2px"
          borderColor={`${color}.200`}
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
          _hover={{ 
            borderColor: `${color}.500`, 
            boxShadow: `0 8px 24px var(--chakra-colors-${color}-200)`
          }}
          transition="all 0.3s"
          h="100%"
        >
          <VStack gap={3} align="stretch">
            <HStack gap={3}>
              <Icon size={32} color={`var(--chakra-colors-${color}-500)`} />
              <VStack align="start" gap={0}>
                <Text fontSize="xs" color="gray.600" fontFamily="var(--font-poppins)">
                  {metric}
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color={`${color}.600`} fontFamily="var(--font-poppins)">
                  {value}
                </Text>
              </VStack>
            </HStack>
            <HStack gap={2}>
              <FaArrowUp size={14} color="green" />
              <Text fontSize="sm" color="green.600" fontWeight="semibold" fontFamily="var(--font-poppins)">
                {growth}
              </Text>
            </HStack>
          </VStack>
        </Box>
      </motion.div>
    </motion.div>
  );
}

function PlatformCard({ platform }: { platform: any }) {
  const PlatformIcon = platform.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      style={{ height: '100%' }}
    >
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} style={{ height: '100%' }}>
        <Box
          p={6}
          bg="white"
          borderRadius="xl"
          borderWidth="2px"
          borderColor={`${platform.color}.200`}
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
          _hover={{ 
            borderColor: `${platform.color}.500`, 
            boxShadow: `0 8px 24px var(--chakra-colors-${platform.color}-200)`
          }}
          transition="all 0.3s"
          h="100%"
          d="flex"
          flexDirection="column"
        >
          <VStack gap={4} align="stretch" h="100%">
            <HStack gap={3}>
              <PlatformIcon size={32} color={`var(--chakra-colors-${platform.color}-500)`} />
              <Text fontSize="xl" fontWeight="bold" color="gray.900" fontFamily="var(--font-poppins)">
                {platform.name}
              </Text>
            </HStack>
            <Box h="1px" bg="gray.200" w="100%" />
            <VStack gap={2} align="stretch">
              {Object.entries(platform.metrics).map(([key, value]) => (
                <HStack key={key} justify="space-between">
                  <Text fontSize="sm" color="gray.600" fontFamily="var(--font-poppins)" textTransform="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </Text>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.900" fontFamily="var(--font-poppins)">
                    {String(value)}
                  </Text>
                </HStack>
              ))}
            </VStack>
            <Box h="1px" bg="gray.200" w="100%" />
            <Text fontSize="sm" color="gray.700" fontStyle="italic" fontFamily="var(--font-poppins)">
              {platform.description}
            </Text>
          </VStack>
        </Box>
      </motion.div>
    </motion.div>
  );
}

export default function InsightsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [insightsData, setInsightsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch('/api/insights');
        const data = await response.json();
        setInsightsData(data);
      } catch (error) {
        console.error('Error fetching insights:', error);
        setInsightsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading || !insightsData) {
    return (
      <Box
        id="insights"
        ref={ref}
        minH="100vh"
        py={20}
        bg="#F8F9FA"
        position="relative"
        overflow="hidden"
      >
        <GradientBG />
        <Container maxW="1400px" position="relative" zIndex={1}>
          <VStack gap={12} h="100%" justify="center">
            <Text fontSize="xl" color="gray.500" fontFamily="var(--font-poppins)">
              Loading insights...
            </Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  // Map icon names from API to actual icon components
  const overallMetricsWithIcons = insightsData.overallMetrics.map((metric: any) => ({
    ...metric,
    icon: iconMap[metric.icon],
  }));

  const platformsWithIcons = Object.entries(insightsData.platforms).reduce((acc: any, [key, platform]: [string, any]) => {
    acc[key] = {
      ...platform,
      icon: iconMap[platform.icon],
    };
    return acc;
  }, {});

  return (
    <Box
      id="insights"
      ref={ref}
      minH="100vh"
      py={20}
      bg="#F8F9FA"
      position="relative"
      overflow="hidden"
    >
      <GradientBG />
      <Container maxW="1400px" position="relative" zIndex={1}>
        <VStack gap={12}>
          {/* Header */}
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
              Social Insight Dashboard
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>Performance Metrics</AnimatedSubtitle>
            </Text>
          </motion.div>

          {/* Overall Metrics */}
          <VStack gap={6} w="100%">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6} w="100%">
              {overallMetricsWithIcons.map((metric: any) => (
                <MetricCard key={metric.metric} {...metric} />
              ))}
            </SimpleGrid>
          </VStack>

          {/* Platform Breakdown */}
          <VStack gap={6} w="100%">
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="100%">
              {Object.values(platformsWithIcons).map((platform: any) => (
                <PlatformCard key={platform.name} platform={platform} />
              ))}
            </SimpleGrid>
          </VStack>

          {/* Brand Impact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%' }}
          >
            <Box
              p={8}
              bg="white"
              borderRadius="xl"
              borderWidth="2px"
              borderColor="blue.200"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
            >
              <VStack gap={4} align="stretch">
                <HStack gap={3}>
                  <FaChartLine size={32} color="#3B82F6" />
                  <Text fontSize="2xl" fontWeight="bold" color="gray.900" fontFamily="var(--font-poppins)">
                    💼 Brand Impact Summary
                  </Text>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <HStack gap={3}>
                    <Text fontSize="3xl">✅</Text>
                    <Text fontSize="sm" color="gray.700" fontFamily="var(--font-poppins)">
                      Multi-platform visibility across YouTube, Instagram, Facebook & Snapchat
                    </Text>
                  </HStack>
                  <HStack gap={3}>
                    <Text fontSize="3xl">✅</Text>
                    <Text fontSize="sm" color="gray.700" fontFamily="var(--font-poppins)">
                      Real engagement: 900K+ organic views this month — growing audience every week
                    </Text>
                  </HStack>
                  <HStack gap={3}>
                    <Text fontSize="3xl">✅</Text>
                    <Text fontSize="sm" color="gray.700" fontFamily="var(--font-poppins)">
                      Creative storytelling optimized for each platform's short-form content
                    </Text>
                  </HStack>
                  <HStack gap={3}>
                    <Text fontSize="3xl">✅</Text>
                    <Text fontSize="sm" color="gray.700" fontFamily="var(--font-poppins)">
                      Brand-safe environment with verified creator status and genuine growth
                    </Text>
                  </HStack>
                </SimpleGrid>
              </VStack>
            </Box>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
}

