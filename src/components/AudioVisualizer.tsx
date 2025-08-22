// src/components/AudioVisualizer.tsx

"use client";
import { LocalAudioTrack } from "livekit-client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const AGENT_VISUAL_STYLE = {
  glowColor: new THREE.Color(0x2a65b6), // Blue
  breathingSpeed: 0.5,
};

interface CustomAnalyser {
  analyser: AnalyserNode;
  data: Uint8Array;
  getAverageFrequency: () => number;
}

interface AudioVisualizerProps {
  track?: LocalAudioTrack;
  isMicrophoneEnabled: boolean;
  onClick: () => void;
  className?: string;
  minScale?: number;
  maxScale?: number;
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
  const analyserRef = useRef<CustomAnalyser | null>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  const currentStyle = AGENT_VISUAL_STYLE;

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    
    // --- Audio Analysis Setup ---
    const audioListener = new THREE.AudioListener();
    camera.add(audioListener);
    listenerRef.current = audioListener;

    if (track?.mediaStream) {
      const audioContext = audioListener.context;
      const source = audioContext.createMediaStreamSource(track.mediaStream);
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 64;
      
      source.connect(analyserNode);
      
      const customAnalyser: CustomAnalyser = {
        analyser: analyserNode,
        data: new Uint8Array(analyserNode.frequencyBinCount),
        getAverageFrequency: function() {
          // Create a new Uint8Array from this.data to ensure it's not ArrayBufferLike
          const frequencyData = new Uint8Array(this.data);
          this.analyser.getByteFrequencyData(frequencyData);

          let sum = 0;
          for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i];
          }
          return sum / this.data.length;
        }
      };
      
      analyserRef.current = customAnalyser;
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

      ringsRef.current.forEach((ring, index) => {
        const material = ring.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;
        
        if (isMicrophoneEnabled) {
            const breathingEffect = (Math.sin(time * currentStyle.breathingSpeed + index * Math.PI) * 0.5 + 0.5) * 0.25;
            const loudnessEffect = overallLoudness * (maxScale - minScale);
            const scale = minScale + breathingEffect + loudnessEffect;
            ring.scale.setScalar(Math.min(maxScale, Math.max(minScale, scale)));
        } else {
            ring.scale.setScalar(minScale);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // --- Event Listeners & Responsive Scaling ---
    const handleResize = () => {
      if (currentMount && renderer && camera && scene) {
        const { clientWidth, clientHeight } = currentMount;
        const aspect = clientWidth / clientHeight;

        const padding = 1.05; 
        const maxAnimatedRadius = 1.0 * maxScale;
        
        camera.top = maxAnimatedRadius * padding;
        camera.bottom = -maxAnimatedRadius * padding;
        camera.left = -maxAnimatedRadius * aspect * padding;
        camera.right = maxAnimatedRadius * aspect * padding;
        
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);

        ringsRef.current.forEach(ring => {
            scene.remove(ring);
            ring.geometry.dispose();
            (ring.material as THREE.ShaderMaterial).dispose();
        });
        ringsRef.current = [];

        const baseOuterRingRadius = 1.0;
        const ringThickness = baseOuterRingRadius * 0.25; 
        const baseInnerRingRadius = baseOuterRingRadius * 0.5;

        const radiiToCreate = [baseInnerRingRadius, baseOuterRingRadius];
        
        for (const outerR of radiiToCreate) {
          const innerR = Math.max(0, outerR - ringThickness);
          const geometry = new THREE.RingGeometry(innerR, outerR, 128);
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

                  float breathing = sin(time * breathingSpeed) * 0.5 + 0.5;
                  
                  gl_FragColor = vec4(glowColor, alpha * (breathing * 0.5 + 0.5));
              }`,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
          });
          const ring = new THREE.Mesh(geometry, material);
          scene.add(ring);
          ringsRef.current.push(ring);
        }
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
  }, [track, isMicrophoneEnabled, minScale, maxScale, currentStyle.breathingSpeed, currentStyle.glowColor]);

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