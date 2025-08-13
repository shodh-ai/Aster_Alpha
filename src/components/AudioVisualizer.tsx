"use client";
import { LocalAudioTrack } from "livekit-client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface AudioVisualizerProps {
  track?: LocalAudioTrack;
  isMicrophoneEnabled: boolean;
  onClick: () => void;
  className?: string;
  minScale?: number;
  maxScale?: number;
  breathingSpeed?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  track,
  isMicrophoneEnabled,
  onClick,
  className,
  minScale = 1.0,
  maxScale = 1.5,
  breathingSpeed = 0.5,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const listenerRef = useRef<THREE.AudioListener | null>(null);
  const analyserRef = useRef<THREE.AudioAnalyser | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
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
          glowColor: { value: new THREE.Color(0.3, 0.6, 1.0) },
          breathingSpeed: { value: breathingSpeed },
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
        (ring.material as THREE.ShaderMaterial).uniforms.time.value = time;
        
        if (isMicrophoneEnabled) {
          // Combine breathing effect with microphone input visualization
          const breathingEffect = (Math.sin(time * breathingSpeed + index * Math.PI) * 0.5 + 0.5) * 0.25;
          const loudnessEffect = overallLoudness * (maxScale - minScale);
          const scale = minScale + breathingEffect + loudnessEffect;
          ring.scale.setScalar(Math.max(minScale, scale));
        } else {
          // When microphone is off, set to a static, non-breathing scale
          ring.scale.setScalar(minScale);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.children.forEach((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => material.dispose());
          } else {
            (obj.material as THREE.Material).dispose();
          }
        }
      });
    };
  }, [track, isMicrophoneEnabled, minScale, maxScale, breathingSpeed]);

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
      style={{ cursor: "pointer" }}
    />
  );
};