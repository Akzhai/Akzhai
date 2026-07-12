import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle system configuration
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a spherical/cloud structure
      positions[i] = (Math.random() - 0.5) * 15; // X
      positions[i + 1] = (Math.random() - 0.5) * 15; // Y
      positions[i + 2] = (Math.random() - 0.5) * 15; // Z

      // Save custom speeds
      velocities.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.005,
        z: (Math.random() - 0.5) * 0.005
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle styling
    const material = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x6366f1, // Purple-indigo accent color
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Light setups
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate entire particle cloud based on mouse coordinates
      particles.rotation.y = targetX * 0.4;
      particles.rotation.x = -targetY * 0.4;

      // Spin particles slowly by default
      particles.rotation.z += 0.0005;

      // Animate individual points drifting
      const positionsArray = geometry.attributes.position.array;
      let velIdx = 0;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positionsArray[i] += velocities[velIdx].x;
        positionsArray[i + 1] += velocities[velIdx].y;
        positionsArray[i + 2] += velocities[velIdx].z;

        // Boundary checks to keep particles within a 15-unit sphere
        if (Math.abs(positionsArray[i]) > 8) velocities[velIdx].x *= -1;
        if (Math.abs(positionsArray[i + 1]) > 8) velocities[velIdx].y *= -1;
        if (Math.abs(positionsArray[i + 2]) > 8) velocities[velIdx].z *= -1;

        velIdx++;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Memory cleanup
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-transparent transition-opacity duration-300"
    />
  );
}
