import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PaletteConfig } from '../types/theme';

interface EducationalBookCanvasProps {
  palette: PaletteConfig;
  onPageFlip?: () => void;
}

export const EducationalBookCanvas: React.FC<EducationalBookCanvasProps> = ({ palette, onPageFlip }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 3.8, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(4, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const accentGlow = new THREE.PointLight(palette.threeParticlePrimary, 3.5, 12);
    accentGlow.position.set(0, 1.5, 0);
    scene.add(accentGlow);

    // 3. Book Group
    const bookGroup = new THREE.Group();
    bookGroup.rotation.x = 0.45; // Tilt book towards viewer
    scene.add(bookGroup);

    // --- Book Cover Materials ---
    const coverMaterial = new THREE.MeshStandardMaterial({
      color: 0x221c18, // Deep academic leather/cloth
      roughness: 0.6,
      metalness: 0.2,
    });

    const pageBlockMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7, // Parchment ivory
      roughness: 0.8,
      metalness: 0.05,
    });

    const activePageMaterial = new THREE.MeshStandardMaterial({
      color: 0xfffefb,
      roughness: 0.7,
      side: THREE.DoubleSide,
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: palette.threeParticlePrimary,
      roughness: 0.3,
      metalness: 0.8,
    });

    // --- Left Page Block ---
    const leftBlockGeo = new THREE.BoxGeometry(2.1, 0.3, 3.0);
    const leftBlock = new THREE.Mesh(leftBlockGeo, pageBlockMaterial);
    leftBlock.position.set(-1.12, -0.05, 0);
    leftBlock.rotation.z = 0.08;
    bookGroup.add(leftBlock);

    // --- Right Page Block ---
    const rightBlockGeo = new THREE.BoxGeometry(2.1, 0.3, 3.0);
    const rightBlock = new THREE.Mesh(rightBlockGeo, pageBlockMaterial);
    rightBlock.position.set(1.12, -0.05, 0);
    rightBlock.rotation.z = -0.08;
    bookGroup.add(rightBlock);

    // --- Left Cover Plate ---
    const leftCoverGeo = new THREE.BoxGeometry(2.2, 0.06, 3.12);
    const leftCover = new THREE.Mesh(leftCoverGeo, coverMaterial);
    leftCover.position.set(-1.15, -0.22, 0);
    leftCover.rotation.z = 0.08;
    bookGroup.add(leftCover);

    // --- Right Cover Plate ---
    const rightCoverGeo = new THREE.BoxGeometry(2.2, 0.06, 3.12);
    const rightCover = new THREE.Mesh(rightCoverGeo, coverMaterial);
    rightCover.position.set(1.15, -0.22, 0);
    rightCover.rotation.z = -0.08;
    bookGroup.add(rightCover);

    // --- Spine Cylinder ---
    const spineGeo = new THREE.CylinderGeometry(0.24, 0.24, 3.12, 16, 1, false, Math.PI, Math.PI);
    const spine = new THREE.Mesh(spineGeo, coverMaterial);
    spine.rotation.x = Math.PI / 2;
    spine.rotation.z = Math.PI;
    spine.position.set(0, -0.2, 0);
    bookGroup.add(spine);

    // --- Golden Bookmark Ribbon ---
    const ribbonCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.12, -1.5),
      new THREE.Vector3(0.08, 0.22, 0),
      new THREE.Vector3(0.25, 0.08, 1.6),
      new THREE.Vector3(0.35, -0.15, 2.1),
    ]);
    const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 24, 0.04, 8, false);
    const ribbon = new THREE.Mesh(ribbonGeo, goldTrimMaterial);
    bookGroup.add(ribbon);

    // --- Dynamic Turning Pages (Multiple Layered Sheets) ---
    const turningPages: { mesh: THREE.Mesh; baseAngle: number; speed: number; progress: number }[] = [];
    const pageSheetGeo = new THREE.PlaneGeometry(1.95, 2.9, 8, 8);

    for (let i = 0; i < 3; i++) {
      const pageMesh = new THREE.Mesh(pageSheetGeo, activePageMaterial);
      pageMesh.position.set(0, 0.12 + i * 0.02, 0);
      pageMesh.geometry.translate(0.975, 0, 0); // Pivot at spine x=0
      bookGroup.add(pageMesh);

      turningPages.push({
        mesh: pageMesh,
        baseAngle: 0.15 + i * 0.2,
        speed: 0.6 + i * 0.25,
        progress: (i * Math.PI) / 3,
      });
    }

    // 4. Floating Educational Knowledge Glyphs & Particles
    const glyphCanvas = document.createElement('canvas');
    glyphCanvas.width = 64;
    glyphCanvas.height = 64;
    const ctx = glyphCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('∑', 32, 34);
    }
    const glyphTexture = new THREE.CanvasTexture(glyphCanvas);

    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const speedArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Emanating upward from open book spine in a gentle funnel
      posArray[i * 3 + 0] = (Math.random() - 0.5) * 2.5;
      posArray[i * 3 + 1] = Math.random() * 3.5 + 0.2;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      speedArray[i] = 0.008 + Math.random() * 0.015;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: glyphTexture,
      transparent: true,
      opacity: 0.85,
      color: palette.threeParticlePrimary,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    bookGroup.add(particles);

    // 5. Mouse Parallax & Interaction
    let targetRotationY = 0;
    let targetRotationX = 0.45;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.35;
      targetRotationX = 0.45 - y * 0.2;
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      targetRotationY = 0;
      targetRotationX = 0.45;
    };

    const handleClick = () => {
      if (onPageFlip) onPageFlip();
      // Accelerate page turn effect on click
      turningPages.forEach((p) => {
        p.progress += Math.PI * 0.8;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('click', handleClick);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth book tilt parallax
      bookGroup.rotation.y += (targetRotationY - bookGroup.rotation.y) * 0.06;
      bookGroup.rotation.x += (targetRotationX - bookGroup.rotation.x) * 0.06;

      // Gentle floating levitation
      bookGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      // Animate turning pages
      turningPages.forEach((p, idx) => {
        const turnSpeed = isHoveredRef.current ? p.speed * 1.6 : p.speed * 0.7;
        p.progress += turnSpeed * delta;

        // Angle swings from right (flat) to left (flat)
        // Range: 0 to Math.PI
        const cycle = p.progress % (Math.PI * 2);
        let angle = 0;

        if (cycle < Math.PI) {
          // Turning from right (+z) to left (-z)
          angle = -(cycle);
        } else {
          // Resting flat on right
          angle = 0;
        }

        // Apply rotation around spine Y/Z axis
        p.mesh.rotation.y = angle * 0.85;
        p.mesh.rotation.z = Math.sin(cycle) * 0.15; // Realistic page curl curvature
        p.mesh.position.y = 0.1 + Math.sin(cycle) * 0.12 + idx * 0.01;
      });

      // Animate ascending knowledge particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += speedArray[i];
        // Swirl around spine
        positions[i * 3 + 0] += Math.sin(elapsedTime + i) * 0.003;
        positions[i * 3 + 2] += Math.cos(elapsedTime + i) * 0.003;

        // Reset if too high
        if (positions[i * 3 + 1] > 4.2) {
          positions[i * 3 + 1] = 0.2;
          positions[i * 3 + 0] = (Math.random() - 0.5) * 2.0;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Glow pulsation
      accentGlow.intensity = 2.8 + Math.sin(elapsedTime * 2.5) * 0.9;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('click', handleClick);

      renderer.dispose();
      coverMaterial.dispose();
      pageBlockMaterial.dispose();
      activePageMaterial.dispose();
      goldTrimMaterial.dispose();
      leftBlockGeo.dispose();
      rightBlockGeo.dispose();
      leftCoverGeo.dispose();
      rightCoverGeo.dispose();
      spineGeo.dispose();
      pageSheetGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      glyphTexture.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [palette, onPageFlip]);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center cursor-pointer select-none">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
