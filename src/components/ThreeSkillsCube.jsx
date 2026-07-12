import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeSkillsCube() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Helper to generate glowing text face textures
    const createFaceTexture = (text, glowColor) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      // Draw futuristic glassmorphic background
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, "#13112b");
      grad.addColorStop(1, "#070612");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Glowing cyber grid lines on texture
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)";
      ctx.lineWidth = 4;
      for (let i = 0; i < 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      // Neon frame borders
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 16;
      ctx.strokeRect(10, 10, 492, 492);

      // Tech details corner lines
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 6;
      const cornerLen = 60;
      // Top-Left corner
      ctx.beginPath(); ctx.moveTo(25, 25 + cornerLen); ctx.lineTo(25, 25); ctx.lineTo(25 + cornerLen, 25); ctx.stroke();
      // Top-Right corner
      ctx.beginPath(); ctx.moveTo(487 - cornerLen, 25); ctx.lineTo(487, 25); ctx.lineTo(487, 25 + cornerLen); ctx.stroke();
      // Bottom-Left corner
      ctx.beginPath(); ctx.moveTo(25, 487 - cornerLen); ctx.lineTo(25, 487); ctx.lineTo(25 + cornerLen, 487); ctx.stroke();
      // Bottom-Right corner
      ctx.beginPath(); ctx.moveTo(487 - cornerLen, 487); ctx.lineTo(487, 487); ctx.lineTo(487, 487 - cornerLen); ctx.stroke();

      // Main Text with heavy neon drop shadow
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 24;
      ctx.font = "bold 56px Outfit, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 256);

      return new THREE.CanvasTexture(canvas);
    };

    // Textures for 6 sides
    const materials = [
      new THREE.MeshBasicMaterial({ map: createFaceTexture("PYTHON", "#3776ab") }), // Side 1
      new THREE.MeshBasicMaterial({ map: createFaceTexture("REACT", "#61dafb") }),  // Side 2
      new THREE.MeshBasicMaterial({ map: createFaceTexture("FLASK", "#a855f7") }),  // Side 3
      new THREE.MeshBasicMaterial({ map: createFaceTexture("AWS", "#ff9900") }),    // Side 4
      new THREE.MeshBasicMaterial({ map: createFaceTexture("SQL", "#06b6d4") }),    // Side 5
      new THREE.MeshBasicMaterial({ map: createFaceTexture("MONGODB", "#47a248") }) // Side 6
    ];

    // Mesh
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Inner wireframe cube to enhance 3D depth
    const wireframeGeom = new THREE.BoxGeometry(2.05, 2.05, 2.05);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframeCube = new THREE.Mesh(wireframeGeom, wireframeMat);
    scene.add(wireframeCube);

    // Track mouse positioning
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      
      mouseX = (clientX / width - 0.5) * 2;
      mouseY = -(clientY / height - 0.5) * 2;
    };

    const onMouseEnter = () => {
      isHovered = true;
    };

    const onMouseLeave = () => {
      isHovered = false;
      mouseX = 0;
      mouseY = 0;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // Window Resize setup
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    
    // Observer pattern for responsive layout changes
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Auto-rotation speeds
      const rotSpeedX = isHovered ? 0.003 : 0.006;
      const rotSpeedY = isHovered ? 0.003 : 0.008;

      cube.rotation.x += rotSpeedX;
      cube.rotation.y += rotSpeedY;

      // Sync wireframe cube
      wireframeCube.rotation.x = cube.rotation.x;
      wireframeCube.rotation.y = cube.rotation.y;

      // Smooth interpolation for mouse hover tilt
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      cube.rotation.y += targetX * 0.5;
      cube.rotation.x -= targetY * 0.5;

      // Pulse scaling when hovered
      const targetScale = isHovered ? 1.15 : 1.0;
      const scaleDiff = targetScale - cube.scale.x;
      cube.scale.setScalar(cube.scale.x + scaleDiff * 0.1);
      wireframeCube.scale.copy(cube.scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Memory cleanup
      geometry.dispose();
      wireframeGeom.dispose();
      wireframeMat.dispose();
      materials.forEach((mat) => {
        mat.map.dispose();
        mat.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[320px] md:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing bg-transparent"
    />
  );
}
