import { NextResponse } from 'next/server';

// Generate dynamic data based on random variation
function generateInsights() {
  // Base values with random variance
  const randomVariance = 0.05; // 5% variation
  const getRandom = () => 1 + (Math.random() - 0.5) * randomVariance;
  
  return {
    reportingPeriod: "1 Oct – 28 Oct 2025",
    lastUpdated: new Date().toLocaleString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    }) + ' (IST)',
    overallMetrics: [
      {
        icon: 'FaEye',
        metric: 'Total Views',
        value: `${Math.floor(964000 * getRandom()).toLocaleString()}K+`,
        growth: `+${Math.floor(198 * getRandom()).toFixed(0)}%`,
        color: 'blue',
      },
      {
        icon: 'FaClock',
        metric: 'Total Watch Time',
        value: `${(1.3 * getRandom()).toFixed(1)}K+ Hours`,
        growth: `+${Math.floor(210 * getRandom())} hrs`,
        color: 'purple',
      },
      {
        icon: 'FaUsers',
        metric: 'New Followers',
        value: `+${Math.floor(1.8 * 1000 * getRandom()).toLocaleString()}`,
        growth: `+${Math.floor(320 * getRandom()).toFixed(0)}%`,
        color: 'green',
      },
      {
        icon: 'FaHeart',
        metric: 'Engagements',
        value: `${Math.floor(25 * 1000 * getRandom()).toLocaleString()}K+`,
        growth: `+${Math.floor(67 * getRandom()).toFixed(0)}%`,
        color: 'pink',
      },
    ],
    platforms: {
      youtube: {
        icon: 'FaYoutube',
        name: 'YouTube',
        color: 'red',
        metrics: {
          views: `${(308.1 * getRandom()).toFixed(1)}K`,
          watchTime: `${(1.3 * getRandom()).toFixed(1)}K hours`,
          subscribers: `+${Math.floor(379 * getRandom())}`,
          growth: `${Math.floor(71.1 * getRandom()).toFixed(1)}K more than usual`,
        },
        description: 'Consistent growth in engagement and retention. High-performing content includes brand promos and creative storytelling shorts.',
      },
      instagram: {
        icon: 'FaInstagram',
        name: 'Instagram',
        color: 'pink',
        metrics: {
          views: `${(593.2 * getRandom()).toFixed(1)}K`,
          interactions: `${(12.8 * getRandom()).toFixed(1)}K`,
          followers: `+${Math.floor(229 * getRandom())}`,
          messages: `${Math.floor(113 * getRandom())}`,
          posts: `${Math.floor(121 * getRandom())}`,
        },
        description: 'Strong reel performance in the food, electronics, and lifestyle niche. Consistent engagement growth from Delhi, Haryana & nearby regions.',
      },
      facebook: {
        icon: 'FaFacebook',
        name: 'Facebook',
        color: 'blue',
        metrics: {
          views: `${Math.floor(46355 * getRandom()).toLocaleString()}`,
          engagementRate: `${(6.2 * getRandom()).toFixed(1)}%`,
          topReels: `${Math.floor(20 * 1000 * getRandom()).toLocaleString()}K+`,
          bestLength: '<15 seconds',
        },
        description: 'Short, fast-paced video ads perform best. Major audience from Haryana, Delhi, and Punjab.',
      },
      snapchat: {
        icon: 'FaSnapchatGhost',
        name: 'Snapchat',
        color: 'yellow',
        metrics: {
          followers: `${Math.floor(1046 * getRandom()).toLocaleString()}`,
          profileViews: `${Math.floor(16299 * getRandom()).toLocaleString()}`,
          spotlightTraffic: `${Math.floor(94 * getRandom()).toFixed(0)}%`,
          growth: `+${Math.floor(1703.4 * getRandom()).toFixed(1)}%`,
        },
        description: 'Snapchat growth has exploded with short creative content — high youth engagement and strong replay rate.',
      },
    },
  };
}

export async function GET() {
  // Generate fresh insights data
  const insights = generateInsights();
  
  return NextResponse.json(insights, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=1800', // Cache for 60s, revalidate in background up to 30min
    },
  });
}

