// src/components/AudioVisualizer.tsx

"use client";
import { LocalAudioTrack } from "livekit-client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

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

    // --- Rings Creation (Fixed Geometry) ---
    // MODIFIED: The rings are now created once with a fixed, normalized size.
    // The camera will be adjusted to make them fit the screen.
    const rings: THREE.Mesh[] = [];
    const outerRingRadius = 1.0;
    const ringThickness = outerRingRadius * 0.25;
    const innerRingRadius = outerRingRadius * 0.5;

    const radiiToCreate = [innerRingRadius, outerRingRadius];

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
      rings.push(ring);
    }
    
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
      
      const customAnalyser = {
        analyser: analyserNode,
        data: new Uint8Array(analyserNode.frequencyBinCount),
        getAverageFrequency: function() {
          this.analyser.getByteFrequencyData(this.data);
          let sum = 0;
          for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i];
          }
          return sum / this.data.length;
        }
      };
      
      analyserRef.current = customAnalyser as any;
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
      if (currentMount && renderer && camera) {
        const { clientWidth, clientHeight } = currentMount;
        const aspect = clientWidth / clientHeight;

        // MODIFIED: This is the core of the fix.
        // We calculate the camera's visible area to be just big enough to contain
        // our geometry (which has a radius of 1.0) when it's at its largest animated scale.
        const padding = 1.05; // 5% padding to avoid clipping at the very edge.
        const maxAnimatedRadius = 1.0 * maxScale;
        
        camera.top = maxAnimatedRadius * padding;
        camera.bottom = -maxAnimatedRadius * padding;
        camera.left = -maxAnimatedRadius * aspect * padding;
        camera.right = maxAnimatedRadius * aspect * padding;
        
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set size correctly

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