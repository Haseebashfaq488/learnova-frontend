'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PaletteConfig } from '../types/theme';

interface ThreeBackgroundProps {
  palette: PaletteConfig;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ palette }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    // 3. Renderer with transparency and high pixel ratio
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Geometry: Floating Knowledge Graph Nodes
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const primaryColor = new THREE.Color(palette.threeParticlePrimary);
    const secondaryColor = new THREE.Color(palette.threeParticleSecondary);

    for (let i = 0; i < particleCount; i++) {
      // Spread in 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 70;

      // Color interpolation
      const mixedColor = primaryColor.clone().lerp(secondaryColor, Math.random() * 0.7);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      // Gentle orbital velocities
      velocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material with circular texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 5. Connecting Lines (Graph Edges)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(palette.threeLineColor),
      transparent: true,
      opacity: 0.18,
      blending: THREE.NormalBlending,
    });

    const maxLineSegments = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 6. Interactive Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 15;
      targetY = -y * 15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    const connectionDistance = 34;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0, 0, 0);

      // Rotate group gently
      particles.rotation.y += 0.0006;
      linesMesh.rotation.y += 0.0006;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const currentPositions = posAttr.array as Float32Array;

      // Update positions
      for (let i = 0; i < particleCount; i++) {
        currentPositions[i * 3] += velocities[i].x;
        currentPositions[i * 3 + 1] += velocities[i].y;
        currentPositions[i * 3 + 2] += velocities[i].z;

        // Boundary bounce
        if (Math.abs(currentPositions[i * 3]) > 80) velocities[i].x *= -1;
        if (Math.abs(currentPositions[i * 3 + 1]) > 55) velocities[i].y *= -1;
        if (Math.abs(currentPositions[i * 3 + 2]) > 35) velocities[i].z *= -1;
      }
      posAttr.needsUpdate = true;

      // Update connecting line edges
      let lineVertexIdx = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const currentLinePositions = linePosAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = currentPositions[i * 3] - currentPositions[j * 3];
          const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
          const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            currentLinePositions[lineVertexIdx++] = currentPositions[i * 3];
            currentLinePositions[lineVertexIdx++] = currentPositions[i * 3 + 1];
            currentLinePositions[lineVertexIdx++] = currentPositions[i * 3 + 2];

            currentLinePositions[lineVertexIdx++] = currentPositions[j * 3];
            currentLinePositions[lineVertexIdx++] = currentPositions[j * 3 + 1];
            currentLinePositions[lineVertexIdx++] = currentPositions[j * 3 + 2];
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIdx / 3);
      linePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [palette]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
