// src/components/AudioVisualizer.tsx

"use client";
import { LocalAudioTrack } from "livekit-client";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// REMOVED: AgentMode type is no longer needed.
// type AgentMode = 'overall' | 'counsellor' | 'administration';

// CHANGED: Simplified the styles to only include the default 'overall' style.
const AGENT_VISUAL_STYLE = {
  glowColor: new THREE.Color(0x2a65b6), // Blue
  breathingSpeed: 0.5,
};

interface AudioVisualizerProps {
  track?: LocalAudioTrack;
  isMicrophoneEnabled: boolean;
  onClick: () => void;
  className?: string;
  minScale?: number;
  maxScale?: number;
  // REMOVED: The 'mode' prop.
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  track,
  isMicrophoneEnabled,
  onClick,
  className,
  minScale = 1.0,
  maxScale = 1.5,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const listenerRef = useRef<THREE.AudioListener | null>(null);
  const analyserRef = useRef<THREE.AudioAnalyser | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  // REMOVED: The useMemo hook is no longer needed as the style is static.
  // const currentStyle = useMemo(() => {
  //   return AGENT_VISUAL_STYLES[mode] || AGENT_VISUAL_STYLES.overall;
  // }, [mode]);
  const currentStyle = AGENT_VISUAL_STYLE;

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // --- Rings Creation ---
    const rings: THREE.Mesh[] = [];
    const ringThickness = 0.55;
    const outerRingCenterRadius = 2.4;
    const innerRingCenterRadius = outerRingCenterRadius / 2;
    const ringRadii = [innerRingCenterRadius, outerRingCenterRadius];

    for (const centerRadius of ringRadii) {
      const innerRadius = centerRadius - ringThickness / 2;
      const outerRadius = centerRadius + ringThickness / 2;
      const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          glowColor: { value: currentStyle.glowColor },
          breathingSpeed: { value: currentStyle.breathingSpeed },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: `
          uniform float time;
          uniform vec3 glowColor;
          uniform float breathingSpeed;
          varying vec2 vUv;

          void main() {
              vec2 center = vec2(0.5, 0.5);
              float dist = distance(vUv, center);
              
              float inner_edge = 0.35;
              float outer_edge = 0.5;
              float blur = 0.1;
              
              float alpha = smoothstep(inner_edge - blur, inner_edge + blur, dist) - smoothstep(outer_edge - blur, outer_edge + blur, dist);

              // Breathing effect using sine wave for opacity
              float breathing = sin(time * breathingSpeed) * 0.5 + 0.5;
              
              gl_FragColor = vec4(glowColor, alpha * (breathing * 0.5 + 0.5));
          }`,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(geometry, material);
      scene.add(ring);
      rings.push(ring);
    }
    
    // --- Audio Analysis Setup ---
    const audioListener = new THREE.AudioListener();
    camera.add(audioListener);
    listenerRef.current = audioListener;

    if (track?.mediaStream) {
      const audio = new THREE.Audio(audioListener);
      const mediaStreamSource = audioListener.context.createMediaStreamSource(
        track.mediaStream
      );
      audio.setNodeSource(mediaStreamSource);
      analyserRef.current = new THREE.AudioAnalyser(audio, 32);
    }

    // --- Animation Loop ---
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;
      
      let overallLoudness = 0;
      if (analyserRef.current && isMicrophoneEnabled) {
        const data = analyserRef.current.getAverageFrequency();
        overallLoudness = data / 128;
      }

      rings.forEach((ring, index) => {
        const material = ring.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;
        // No need to update glowColor or breathingSpeed as they are now constant
        
        if (isMicrophoneEnabled) {
            const breathingEffect = (Math.sin(time * currentStyle.breathingSpeed + index * Math.PI) * 0.5 + 0.5) * 0.25;
            const loudnessEffect = overallLoudness * (maxScale - minScale);
            const scale = minScale + breathingEffect + loudnessEffect;
            ring.scale.setScalar(Math.max(minScale, scale));
        } else {
            ring.scale.setScalar(minScale);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // --- Event Listeners & Responsive Scaling ---
    const referenceWidth = 500; 

    const handleResize = () => {
      const currentMount = mountRef.current;
      const currentScene = sceneRef.current;

      if (currentMount && renderer && camera && currentScene) {
        const { clientWidth, clientHeight } = currentMount;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
        const scale = clientWidth / referenceWidth;
        currentScene.scale.set(scale, scale, scale);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    // --- Cleanup Function ---
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
      }
    };
    // CHANGED: Removed currentStyle from dependency array as it's now a constant
  }, [track, isMicrophoneEnabled, minScale, maxScale]);

  const handleVisualizerClick = () => {
    if (
      listenerRef.current &&
      listenerRef.current.context.state === "suspended"
    ) {
      listenerRef.current.context.resume();
      console.log("AudioContext resumed on user gesture.");
    }
    onClick();
  };

  return (
    <div
      ref={mountRef}
      onClick={handleVisualizerClick}
      className={className}
      style={{ cursor: "pointer", width: "100%", height: "100%" }}
    />
  );
};