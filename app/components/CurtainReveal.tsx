'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

function Curtains({ onDone, onFirstDraw }: { onDone: () => void; onFirstDraw: () => void }) {
  const { size, camera } = useThree();
  const { worldWidth, worldHeight } = React.useMemo(() => {
    const ortho = camera as THREE.OrthographicCamera;
    const zoom = ortho?.zoom || 200;
    return {
      worldWidth: size.width / zoom,
      worldHeight: size.height / zoom,
    };
  }, [size, camera]);
  const leftGroupRef = useRef<THREE.Group>(null);
  const rightGroupRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Mesh>(null);
  const startTimeRef = useRef<number | null>(null);
  const STRIP_WIDTH = 0.14; // orthographic units
  const NUM_STRIPS = Math.max(24, Math.ceil((worldWidth / STRIP_WIDTH) + 8));
  const HEIGHT = worldHeight * 1.25;

  const firstDrawRef = useRef(false);
  useFrame((state) => {
    if (!firstDrawRef.current) {
      firstDrawRef.current = true;
      onFirstDraw();
    }
    if (startTimeRef.current === null) startTimeRef.current = state.clock.elapsedTime;
    const t = Math.min(1, (state.clock.elapsedTime - startTimeRef.current) / 1.4);
    // ease in-out
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    // move whole curtain groups outward
    if (leftGroupRef.current && rightGroupRef.current) {
      leftGroupRef.current.position.x = -ease * 3;
      rightGroupRef.current.position.x = ease * 3;
      const sway = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      leftGroupRef.current.position.y = sway;
      rightGroupRef.current.position.y = -sway;
      // add slight per-strip motion
      leftGroupRef.current.children.forEach((child, i) => {
        child.rotation.z = Math.sin(state.clock.elapsedTime * 1.6 + i * 0.3) * 0.03;
      });
      rightGroupRef.current.children.forEach((child, i) => {
        child.rotation.z = -Math.sin(state.clock.elapsedTime * 1.6 + i * 0.3) * 0.03;
      });
    }

    // fade overlay
    if (overlayRef.current) {
      const mat = overlayRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.35 * (1 - ease);
    }

    if (t >= 1) onDone();
  });

  // Build a crisp horizontal gradient texture (white → blue)
  const createGradientTexture = (direction: 'toLeft' | 'toRight') => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 4;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    if (direction === 'toRight') {
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(1, '#3B82F6');
    } else {
      grad.addColorStop(0, '#3B82F6');
      grad.addColorStop(1, '#ffffff');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  };

  const leftGradient = useMemo(() => createGradientTexture('toLeft'), []);
  const rightGradient = useMemo(() => createGradientTexture('toRight'), []);

  return (
    <group>
      {/* dim overlay that fades away as curtains open */}
      <mesh ref={overlayRef} position={[0, 0, -0.1]}
        renderOrder={-1}>
        <planeGeometry args={[worldWidth * 1.6, worldHeight * 1.6, 1, 1]} />
        <meshBasicMaterial color={'#ffffff'} transparent opacity={0.1} />
      </mesh>

      {/* LEFT pleated curtain */}
      <group ref={leftGroupRef} position={[0, 0, 0]}>
        {Array.from({ length: NUM_STRIPS }).map((_, i) => {
          const x = -0.02 - i * STRIP_WIDTH; // start flush at center, extend left
          const rot = (i % 2 === 0 ? 1 : -1) * 0.06; // alternating pleat angle
          return (
            <mesh key={`l-${i}`} position={[x, 0, 0]} rotation={[0, 0, rot]} castShadow>
              <planeGeometry args={[STRIP_WIDTH * 1.12, HEIGHT, 1, 16]} />
              <meshBasicMaterial map={leftGradient || undefined} toneMapped={false} />
            </mesh>
          );
        })}
      </group>

      {/* RIGHT pleated curtain */}
      <group ref={rightGroupRef} position={[0, 0, 0]}>
        {Array.from({ length: NUM_STRIPS }).map((_, i) => {
          const x = 0.02 + i * STRIP_WIDTH; // start flush at center, extend right
          const rot = (i % 2 === 0 ? -1 : 1) * 0.06;
          return (
            <mesh key={`r-${i}`} position={[x, 0, 0]} rotation={[0, 0, rot]} castShadow>
              <planeGeometry args={[STRIP_WIDTH * 1.12, HEIGHT, 1, 16]} />
              <meshBasicMaterial map={rightGradient || undefined} toneMapped={false} />
            </mesh>
          );
        })}
      </group>

      {/* removed top valance to avoid solid blue strip */}

      <ambientLight intensity={0.8} />
      <directionalLight position={[1, 1, 2]} intensity={0.9} />
    </group>
  );
}

export default function CurtainReveal() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Safety timeout in case onDone is not triggered or Three.js fails to initialize
    // Increased timeout to handle slower devices
    const id = setTimeout(() => {
      if (visible) {
        setFading(true);
        setTimeout(() => setVisible(false), 400);
      }
    }, 3000);
    
    // Additional fallback timeout for extreme cases (10 seconds max)
    const fallbackId = setTimeout(() => {
      setVisible(false);
    }, 10000);
    
    return () => {
      clearTimeout(id);
      clearTimeout(fallbackId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'transparent',
        pointerEvents: 'none',
        opacity: fading ? 0 : 1,
        transition: 'opacity 400ms ease',
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        onCreated={() => {
          // Remove pre-curtain when canvas is ready
          const el = document.getElementById('pre-curtain');
          if (el) el.remove();
        }}
      >
        {/* Orthographic camera to make planes fill the screen consistently */}
        <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={200} />
        <Curtains
          onFirstDraw={() => {
            const el = document.getElementById('pre-curtain');
            if (el) el.remove();
          }}
          onDone={() => {
            setFading(true);
            setTimeout(() => setVisible(false), 400);
          }}
        />
      </Canvas>
    </div>
  );
}


