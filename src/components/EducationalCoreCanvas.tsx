import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PaletteConfig } from '../types/theme';

interface EducationalCoreCanvasProps {
  palette: PaletteConfig;
}

export const EducationalCoreCanvas: React.FC<EducationalCoreCanvasProps> = ({ palette }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 45;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold educational core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 4. Central Geometric Knowledge Nucleus (Icosahedron wireframe + solid)
    const primaryColor = new THREE.Color(palette.threeParticlePrimary);
    const secondaryColor = new THREE.Color(palette.threeParticleSecondary);

    const nucleusGeo = new THREE.IcosahedronGeometry(7, 1);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.15,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 5. Orbiting Concept Node Particles
    const nodeCount = 32;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeRadii: number[] = [];
    const nodeSpeeds: number[] = [];
    const nodeAngles: number[] = [];
    const nodeYOffsets: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 12 + Math.random() * 12;
      const speed = (0.008 + Math.random() * 0.012) * (Math.random() > 0.5 ? 1 : -1);
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 14;

      nodeRadii.push(radius);
      nodeSpeeds.push(speed);
      nodeAngles.push(angle);
      nodeYOffsets.push(yOffset);

      nodePositions[i * 3] = Math.cos(angle) * radius;
      nodePositions[i * 3 + 1] = yOffset;
      nodePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    // Circle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const pointTex = new THREE.CanvasTexture(canvas);

    const nodeMat = new THREE.PointsMaterial({
      size: 3.2,
      map: pointTex,
      color: primaryColor,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const nodesMesh = new THREE.Points(nodeGeo, nodeMat);
    coreGroup.add(nodesMesh);

    // 6. Orbital Rings (Knowledge Orbit Tracks)
    const ring1Geo = new THREE.RingGeometry(14.8, 15, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(21.8, 22, 64);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    ring2.rotation.x = -Math.PI / 2.8;
    ring2.rotation.y = Math.PI / 5;
    coreGroup.add(ring2);

    // 7. Dynamic Connecting Knowledge Edges (Lines between nearby nodes)
    const lineMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.22,
    });
    const maxLines = 150;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    coreGroup.add(linesMesh);

    // 8. Mouse Parallax
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.8;
      targetRotX = y * 0.6;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 9. Animation Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth core rotation and mouse dampening
      coreGroup.rotation.y += 0.003;
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.05;
      coreGroup.rotation.z += (targetRotY - coreGroup.rotation.z) * 0.05;

      nucleus.rotation.y += 0.005;
      nucleus.rotation.x += 0.003;

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;

      // Update orbiting concept positions
      const posArr = nodeGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        nodeAngles[i] += nodeSpeeds[i];
        posArr[i * 3] = Math.cos(nodeAngles[i]) * nodeRadii[i];
        posArr[i * 3 + 2] = Math.sin(nodeAngles[i]) * nodeRadii[i];
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Update connecting line edges between close nodes and to center
      let lineIdx = 0;
      const linePosArr = lineGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        // Connect to center if close
        if (nodeRadii[i] < 16 && lineIdx < maxLines * 6 - 6) {
          linePosArr[lineIdx++] = posArr[i * 3];
          linePosArr[lineIdx++] = posArr[i * 3 + 1];
          linePosArr[lineIdx++] = posArr[i * 3 + 2];
          linePosArr[lineIdx++] = 0;
          linePosArr[lineIdx++] = 0;
          linePosArr[lineIdx++] = 0;
        }

        // Connect to neighboring nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 10 && lineIdx < maxLines * 6 - 6) {
            linePosArr[lineIdx++] = posArr[i * 3];
            linePosArr[lineIdx++] = posArr[i * 3 + 1];
            linePosArr[lineIdx++] = posArr[i * 3 + 2];
            linePosArr[lineIdx++] = posArr[j * 3];
            linePosArr[lineIdx++] = posArr[j * 3 + 1];
            linePosArr[lineIdx++] = posArr[j * 3 + 2];
          }
        }
      }

      lineGeo.setDrawRange(0, lineIdx / 3);
      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      nucleusGeo.dispose();
      nucleusMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      pointTex.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ringMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, [palette]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
};
