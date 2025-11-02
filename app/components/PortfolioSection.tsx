'use client';

import { Box, Container, VStack, Text, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import GradientBG from './GradientBG';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaVideo, FaYoutube, FaTimes, FaChevronLeft, FaChevronRight, FaInstagram } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useMusicStore } from './BackgroundMusic';

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

const portfolioGroups = [
  [
    {
      title: 'Hindi Introduction',
      category: 'Introduction',
      description: 'Personal introduction in Hindi',
      type: 'video',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.youtube.com/watch?v=IZtLIACcXLQ',
    },
    {
      title: 'English Introduction',
      category: 'Introduction',
      description: 'Personal introduction in English',
      type: 'video',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.youtube.com/watch?v=5AHOBCr0YsM',
    },
    {
      title: 'Monologue Performance',
      category: 'Performance',
      description: 'Theatrical monologue showcase',
      type: 'video',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.instagram.com/reel/DQHbkqoARgg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      platform: 'instagram',
    },
  ],
  [
    {
      title: 'Brand Promo - LG',
      category: 'Brand Collaboration',
      description: 'Electronics promotional content',
      type: 'video',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.instagram.com/reel/DP7_bsWiD52/?igsh=MWMxNXk5bDQ5amEzOQ==',
      platform: 'instagram',
    },
    {
      title: 'Brand Promo - Zorko',
      category: 'Brand Collaboration',
      description: 'Food & beverage advertisement',
      type: 'video',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.instagram.com/reel/DPtyEAKAdiw/?igsh=c3dsYmlhYXhlNTZ3',
      platform: 'instagram',
    },
    {
      title: 'Royal Toys Promotion',
      category: 'Brand Collaboration',
      description: 'Toys promotional content',
      type: 'video',
      thumbnail: '/api/placeholder/400/300',
      videoUrl: 'https://www.instagram.com/reel/DPy5EFOATIN/?igsh=Mm9rbTVobDF3ajQ4',
      platform: 'instagram',
    },
  ],
];

const shorts = [
  // Series 1 - Comedy / Light Acting
  'https://www.instagram.com/reel/DNAIwSQh_NQ/?igsh=MWt4NzFsZmFsbXlpZA==',
  'https://www.instagram.com/reel/DNCy9lRBiqF/?igsh=MXdnNzAxOThxdTV2YQ==',
  'https://www.instagram.com/reel/DNFKWh-hTdj/?igsh=MTZ2cXEwejEzbzQxbg==',
  
  // Series 2 - Romantic / Intense Acting
  'https://www.instagram.com/reel/DNNqWeuIekf/?igsh=OGttMGh5dW45NjFs',
  'https://www.instagram.com/reel/DNQYUPNhAbj/?igsh=MXIyMXZuaWl6OHZ6',
  'https://www.instagram.com/reel/DNTIQAChSKc/?igsh=MWRkcHQ0ZHhxMDhobQ==',
  
  // Series 3 - Motivation / Drama
  'https://www.instagram.com/reel/DNTU_gyhtQs/?igsh=MXBocGhrazZ3OTk4NQ==',
  'https://www.instagram.com/reel/DNVmlVbhBWv/?igsh=YXl1bXo2aTJwZ3Bo',
  'https://www.instagram.com/reel/DNX7U2JoyRb/?igsh=bWRyZHNtcmU1azNu',
  'https://www.instagram.com/reel/DNZ-Yghhfr9/?igsh=OHZicG02YjZyM3d4',
  
  // Top Viral Reels
  'https://www.instagram.com/reel/DM3AqO-IRMr/?igsh=MTZhNHl1OTNuN2U0Ng==',
  'https://www.instagram.com/reel/DPy5EFOATIN/?igsh=dXN4ZjI4MDRlYjNu',
  'https://www.instagram.com/reel/DPJe-xygbN7/?igsh=eWdyYnU5NnAxd2Y4',
  'https://www.instagram.com/reel/DMSvNVah8PH/?igsh=c285ODh6MXNoZTFo',
  'https://www.instagram.com/reel/DMPuJJ6hunX/?igsh=MXUxOHdlOGFxYjRxOA==',
  'https://www.instagram.com/reel/DMVHw0hB8QL/?igsh=MXB1aXRnMm0xczY4NA==',
  'https://www.instagram.com/reel/DJ9LqVxhE2c/?igsh=MTR5anhxamcwcWU3bg==',
  'https://www.instagram.com/reel/DKCu_Z1hVTN/?igsh=YTMwMGxwMWw4YnM2',
  'https://www.instagram.com/reel/DKHYAjLhu-L/?igsh=MXAybmVyd3M1c2xyMw==',
  'https://www.instagram.com/reel/DLU9ojAxs1o/?igsh=d2hwOXN4OGl4bzFu',
];

// Animated Portfolio Camera
function AnimatedPortfolioCamera() {
  const cameraRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (cameraRef.current) {
      cameraRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={cameraRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 0.45, 0.45]} />
        <meshStandardMaterial color="#2563EB" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Lens */}
      <mesh position={[0.35, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.14, 24]} />
        <meshStandardMaterial color="#1E40AF" metalness={0.9} />
      </mesh>
      {/* Viewfinder */}
      <mesh position={[-0.3, 0.18, 0]}>
        <boxGeometry args={[0.14, 0.1, 0.05]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.7} />
      </mesh>
      {/* Screen */}
      <mesh position={[-0.25, -0.15, 0.22]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshStandardMaterial color="#60A5FA" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Animated Film Strip
function AnimatedFilmStrip() {
  const filmRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (filmRef.current) {
      filmRef.current.rotation.y += delta * -0.2;
      filmRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group ref={filmRef} position={[-1.8, 0.5, 0]}>
      {/* Film Base */}
      <mesh position={[0, 0, 0]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.03]} />
        <meshStandardMaterial color="#1E40AF" transparent opacity={0.8} />
      </mesh>
      {/* Film Frames */}
      {[-0.25, 0, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.02]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[0.2, 0.3, 0.02]} />
          <meshStandardMaterial color="#3B82F6" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Animated Play Button
function AnimatedPlayButton() {
  const playRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (playRef.current) {
      playRef.current.rotation.y += delta * 0.25;
      playRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group ref={playRef} position={[1.8, -0.5, 0]}>
      {/* Circle Background */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial color="#3B82F6" transparent opacity={0.6} />
      </mesh>
      {/* Play Triangle */}
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[0.2, 0.35, 3, 1]} />
        <meshStandardMaterial color="#2563EB" />
      </mesh>
    </group>
  );
}

// Portfolio Section 3D - Video Camera, Film Strip & Play Button
function PortfolioScene3D() {
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
          <AnimatedPortfolioCamera />
          <AnimatedFilmStrip />
          <AnimatedPlayButton />
        </Center>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Suspense>
    </Canvas>
  );
}

// VideoPlayer Component - Show video previews without autoplay
function VideoPlayer({ item, isInstagramUrl, convertToEmbedUrl }: { item: any, isInstagramUrl: (url: string) => boolean, convertToEmbedUrl: (url: string, loop: boolean) => string }) {
  return (
    <Box w="100%" h="100%">
      {item.videoUrl ? (
        <>
          {item.videoUrl.startsWith('/') || item.videoUrl.endsWith('.mov') || item.videoUrl.endsWith('.mp4') ? (
            <motion.video
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            >
              <source src={item.videoUrl} type="video/mp4" />
              <source src={item.videoUrl} type="video/quicktime" />
            </motion.video>
          ) : (
            <motion.iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
              src={isInstagramUrl(item.videoUrl) ? convertToEmbedUrl(item.videoUrl, false) : convertToEmbedUrl(item.videoUrl, true)}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </>
      ) : (
        <Box
          w="100%"
          h="100%"
          bgGradient="linear(to-br, blue.400, blue.300)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FaVideo size={64} color="rgba(255,255,255,0.8)" />
        </Box>
      )}
    </Box>
  );
}

// Portfolio Carousel Component
function PortfolioCarousel({ items, onVideoClick }: { items: any[], onVideoClick: (url: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(items.length); // Start in middle of duplicated items
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slidePercentage, setSlidePercentage] = useState(33.333);
  const [itemWidth, setItemWidth] = useState('calc(100% - 16px)');
  
  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width < 560) {
        setSlidePercentage(100); // 1 item on mobile
        setItemWidth('calc(100% - 16px)');
      } else if (width < 800) {
        // Gradual transition from 1.2 to 2 items
        // At 560: 1.2 items (83.33%), at 800: 2 items (50%)
        const progress = (width - 560) / (800 - 560); // 0 to 1
        const itemsVisible = 1.2 + progress * 0.8; // 1.2 to 2
        setSlidePercentage(100 / itemsVisible);
        setItemWidth(`calc(${100 / itemsVisible}% - 16px)`);
      } else if (width < 1024) {
        // Gradual transition from 2 to 3 items
        const progress = (width - 800) / (1024 - 800); // 0 to 1
        const itemsVisible = 2 + progress * 1; // 2 to 3
        setSlidePercentage(100 / itemsVisible);
        setItemWidth(`calc(${100 / itemsVisible}% - 16px)`);
      } else {
        setSlidePercentage(33.333); // 3 items on desktop
        setItemWidth('calc(33.333% - 21.33px)');
      }
    };
    
    updateSlidePercentage();
    window.addEventListener('resize', updateSlidePercentage);
    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);

  const isYouTubeUrl = (url: string): boolean => {
    return /youtube\.com|youtu\.be/.test(url);
  };

  const isInstagramUrl = (url: string): boolean => {
    return /instagram\.com/.test(url);
  };

  const getYouTubeVideoId = (url: string): string | null => {
    if (url.startsWith('/')) return null;
    // Handle YouTube Shorts URL: https://youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^&\n?#]+)/);
    if (shortsMatch) {
      return shortsMatch[1];
    }
    // Handle regular YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
  };

  const getInstagramEmbedUrl = (url: string): string => {
    const instagramRegex = /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
    const match = url.match(instagramRegex);
    if (match) {
      return `https://www.instagram.com/p/${match[1]}/embed`;
    }
    return '';
  };

  const convertToEmbedUrl = (url: string, loop: boolean = false): string => {
    if (url.startsWith('/')) return url;
    
    if (isYouTubeUrl(url)) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        const baseUrl = `https://www.youtube.com/embed/${videoId}`;
        if (loop) {
          return `${baseUrl}?playlist=${videoId}&loop=1`;
        }
        return baseUrl;
      }
    }
    
    if (isInstagramUrl(url)) {
      return getInstagramEmbedUrl(url);
    }
    
    return url;
  };

  useEffect(() => {
    // Check if we need to jump back to the beginning (after reaching the end of duplicates)
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(items.length);
        setIsTransitioning(false);
      }, 50);
    }
    // Check if we need to jump to the end (after going below the start)
    if (currentIndex < 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(items.length - 1);
        setIsTransitioning(false);
      }, 50);
    }
  }, [currentIndex, items.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box
      w="100%"
      overflow="hidden"
      position="relative"
      py={1}
    >
      {/* Left Arrow */}
      <Button
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        color="blue.600"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
        _hover={{
          bg: 'blue.50',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-50%) scale(1.1)'
        }}
        transition="all 0.3s"
        onClick={goToPrevious}
        zIndex={10}
        size={{ base: 'md', md: 'lg' }}
      >
        <FaChevronLeft />
      </Button>

      {/* Right Arrow */}
      <Button
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        color="blue.600"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
        _hover={{
          bg: 'blue.50',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-50%) scale(1.1)'
        }}
        transition="all 0.3s"
        onClick={goToNext}
        zIndex={10}
        size={{ base: 'md', md: 'lg' }}
      >
        <FaChevronRight />
      </Button>

      <Box
        ref={carouselRef}
        display="flex"
        gap={{ base: 4, md: 8 }}
        style={{
          transform: `translateX(-${currentIndex * slidePercentage}%)`,
          transition: isTransitioning ? 'none' : 'transform 0.5s ease-in-out',
        }}
        w="100%"
      >
        {[...items, ...items, ...items].map((item, index) => (
          <Box
            key={`${item.title}-${index}`}
            flex={`0 0 ${itemWidth}`}
            maxW={itemWidth}
            position="relative"
            bg="white"
            borderRadius="xl"
            overflow="hidden"
            borderWidth="2px"
            borderColor="blue.200"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
            _hover={{ 
              borderColor: 'blue.500',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
              transform: 'translateY(-4px)'
            }}
            transition="all 0.3s"
            cursor="pointer"
            onClick={() => item.videoUrl && onVideoClick(item.videoUrl)}
          >
            {/* Video Preview */}
            <Box
              h="250px"
              position="relative"
              overflow="hidden"
              bg="gray.200"
            >
              <VideoPlayer item={item} isInstagramUrl={isInstagramUrl} convertToEmbedUrl={convertToEmbedUrl} />
              {/* Play Button Overlay */}
              <Box
                position="absolute"
                inset={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="blackAlpha.400"
                _hover={{ bg: 'blackAlpha.600' }}
                transition="all 0.3s"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPlay size={48} color="rgba(255,255,255,0.9)" />
                </motion.div>
              </Box>
            </Box>

            <VStack p={{ base: 4, md: 5, lg: 6 }} align="stretch" gap={{ base: 2, md: 2 }}>
              <HStack justify="space-between">
                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.900" fontWeight="semibold" fontFamily="var(--font-poppins)">
                  {item.category}
                </Text>
                {item.platform === 'instagram' ? (
                  <FaInstagram size={20} color="#E4405F" />
                ) : (
                  <FaYoutube size={20} color="gray.500" />
                )}
              </HStack>
              <Text fontSize={{ base: 'md', md: 'lg', lg: 'xl' }} fontWeight="bold" color="gray.800" fontFamily="var(--font-poppins)">
                {item.title}
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.700" fontFamily="var(--font-poppins)">
                {item.description}
              </Text>
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// Shorts Carousel Component
function ShortsCarousel({ videos, onVideoClick }: { videos: string[], onVideoClick: (url: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(videos.length); // Start in middle of duplicated items
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slidePercentage, setSlidePercentage] = useState(20);
  const [itemWidth, setItemWidth] = useState('calc(66.667% - 8px)');
  
  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width < 395) {
        setSlidePercentage(100); // 1 item visible on small mobile
        setItemWidth('calc(100% - 8px)');
      } else if (width < 497) {
        setSlidePercentage(66.667); // 1.5 items visible on larger mobile
        setItemWidth('calc(66.667% - 8px)');
      } else if (width < 620) {
        setSlidePercentage(50); // 2 items visible
        setItemWidth('calc(50% - 8px)');
      } else if (width < 768) {
        setSlidePercentage(33.333); // 3 items visible
        setItemWidth('calc(33.333% - 8px)');
      } else if (width < 1024) {
        setSlidePercentage(25); // 4 items visible on tablet
        setItemWidth('calc(25% - 8px)');
      } else {
        setSlidePercentage(20); // 5 items visible on desktop
        setItemWidth('calc(20% - 16px)');
      }
    };
    
    updateSlidePercentage();
    window.addEventListener('resize', updateSlidePercentage);
    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);

  const isInstagramUrl = (url: string): boolean => {
    return /instagram\.com/.test(url);
  };

  const getInstagramEmbedUrl = (url: string): string => {
    // Instagram embed URLs need to be in the format: https://www.instagram.com/p/{POST_ID}/embed
    const instagramRegex = /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
    const match = url.match(instagramRegex);
    if (match) {
      return `https://www.instagram.com/p/${match[1]}/embed`;
    }
    return '';
  };

  const convertToEmbedUrl = (url: string, loop: boolean = false): string => {
    if (url.startsWith('/')) return url;
    
    if (isInstagramUrl(url)) {
      return getInstagramEmbedUrl(url);
    }
    
    return url;
  };

  useEffect(() => {
    // Check if we need to jump back to the beginning (after reaching the end of duplicates)
    if (currentIndex >= videos.length * 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(videos.length);
        setIsTransitioning(false);
      }, 50);
    }
    // Check if we need to jump to the end (after going below the start)
    if (currentIndex < 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(videos.length - 1);
        setIsTransitioning(false);
      }, 50);
    }
  }, [currentIndex, videos.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box
      w="100%"
      overflow="hidden"
      position="relative"
      py={2}
    >
      <Text
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="bold"
        textAlign="center"
        mb={6}
        fontFamily="var(--font-poppins)"
        bgGradient="linear(to-r, blue.600, blue.500, gray.900)"
        bgClip="text"
      >
        Featured Shorts
      </Text>

      {/* Left Arrow */}
      <Button
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        color="blue.600"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
        _hover={{
          bg: 'blue.50',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-50%) scale(1.1)'
        }}
        transition="all 0.3s"
        onClick={goToPrevious}
        zIndex={10}
        size={{ base: 'md', md: 'lg' }}
      >
        <FaChevronLeft />
      </Button>

      {/* Right Arrow */}
      <Button
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="white"
        color="blue.600"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
        _hover={{
          bg: 'blue.50',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-50%) scale(1.1)'
        }}
        transition="all 0.3s"
        onClick={goToNext}
        zIndex={10}
        size={{ base: 'md', md: 'lg' }}
      >
        <FaChevronRight />
      </Button>

      <Box
        ref={carouselRef}
        display="flex"
        gap={{ base: 2, md: 4 }}
        style={{
          transform: `translateX(-${currentIndex * slidePercentage}%)`,
          transition: isTransitioning ? 'none' : 'transform 0.5s ease-in-out',
        }}
        w="100%"
      >
        {[...videos, ...videos, ...videos].map((url, index) => (
          <Box
            key={`${url}-${index}`}
            flex={`0 0 ${itemWidth}`}
            maxW={itemWidth}
            position="relative"
            overflow="hidden"
            borderRadius="xl"
            bg="white"
            borderWidth="2px"
            borderColor="blue.200"
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"
            _hover={{
              borderColor: 'blue.500',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.2)',
              transform: 'translateY(-4px)'
            }}
            transition="all 0.3s"
            cursor="pointer"
            onClick={() => onVideoClick(url)}
          >
            {/* Video Preview */}
            <Box
              position="relative"
              pb="177.78%" // 9:16 aspect ratio for shorts
              overflow="hidden"
              bg="gray.200"
            >
              <motion.iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none'
                }}
                src={convertToEmbedUrl(url, false)}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </Box>
            
            {/* Instagram Badge Below Video */}
            <Box
              p={{ base: 2, md: 3 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderTopWidth="1px"
              borderColor="gray.200"
            >
              <FaInstagram size={20} color="#E4405F" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>('');
  const { setIsVideoPlaying } = useMusicStore();
  
  // Flatten portfolio groups into a single array
  const allPortfolioItems = portfolioGroups.flat();

  const convertToEmbedUrl = (url: string): string => {
    // If it's a local file, return as is
    if (url.startsWith('/')) return url;
    
    // If it's a YouTube Shorts URL, convert to embed URL
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^&\n?#]+)/);
    if (shortsMatch) {
      return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    }
    
    // If it's a YouTube watch URL, convert to embed URL
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // If it's an Instagram URL, convert to embed URL
    const instagramRegex = /instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/;
    const igMatch = url.match(instagramRegex);
    if (igMatch) {
      return `https://www.instagram.com/p/${igMatch[1]}/embed`;
    }
    
    // If it's already an embed URL, return as is
    return url;
  };

  const handleVideoClick = (videoUrl: string) => {
    const embedUrl = convertToEmbedUrl(videoUrl);
    setSelectedVideo(embedUrl);
    setIsOpen(true);
    setIsVideoPlaying(true); // Pause background music
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedVideo('');
    setIsVideoPlaying(false); // Resume background music
  };

  return (
    <Box
      id="portfolio"
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
          <PortfolioScene3D />
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
              Portfolio Videos
            </Text>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              color="gray.700"
              textAlign="center"
              mt={4}
              fontFamily="var(--font-poppins)"
              fontWeight="bold"
            >
              <AnimatedSubtitle>The Work That Speaks</AnimatedSubtitle>
            </Text>
          </motion.div>

          {/* Portfolio Carousel */}
          <PortfolioCarousel items={allPortfolioItems} onVideoClick={handleVideoClick} />

          {/* Shorts Carousel */}
          <ShortsCarousel videos={shorts} onVideoClick={handleVideoClick} />

          {/* Video Modal */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                onClick={handleClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.7)',
                  paddingTop: '170px',
                  paddingBottom: '60px',
                }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  style={{
                    maxWidth: selectedVideo && selectedVideo.includes('instagram.com') ? '400px' : '900px',
                    width: '90%',
                    background: 'white',
                    borderRadius: '12px',
                    position: 'relative',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Button
                    position="absolute"
                    top={-10}
                    right={-10}
                    borderRadius="full"
                    bg="gray.300"
                    _hover={{ bg: 'gray.600' }}
                    onClick={handleClose}
                    zIndex={10}
                    size="sm"
                  >
                    <FaTimes />
                  </Button>
                  {selectedVideo ? (
                    <Box
                      position="relative"
                      pb={selectedVideo.includes('instagram.com') ? '177.78%' : '56.25%'} // 9:16 for Instagram Reels, 16:9 for YouTube
                      h={0}
                      overflow="hidden"
                      borderRadius="xl"
                    >
                      {selectedVideo.startsWith('/') || selectedVideo.endsWith('.mov') || selectedVideo.endsWith('.mp4') ? (
                        <motion.video
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                          controls
                        >
                          <source src={selectedVideo} type="video/mp4" />
                          <source src={selectedVideo} type="video/quicktime" />
                          Your browser does not support the video tag.
                        </motion.video>
                      ) : (
                        <motion.iframe
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                          }}
                          src={selectedVideo}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </Box>
                  ) : (
                    <Box p={8} textAlign="center">
                      <Text color="gray.700" fontFamily="var(--font-poppins)">Video URL will be added here</Text>
                    </Box>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Container>
    </Box>
  );
}

