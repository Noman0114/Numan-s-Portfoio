"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";
declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const globeEl = useRef<ThreeGlobe>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!globeEl.current) return;

    const globe = globeEl.current;

    // Wait for the globe to be ready
    globe.onGlobeReady(() => {
      setIsLoaded(true);
    });

    // Set up the globe
    globe
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.jpg")
      .polygonCapColor(
        () => globeConfig.polygonColor ?? "rgba(255,255,255,0.7)"
      )
      .polygonSideColor(() => "rgba(255,255,255,0.1)")
      .polygonStrokeColor(() => "#000000")
      .polygonsTransitionDuration(0.5);

    // Only set up arcs if we have data
    if (data && data.length > 0) {
      globe
        .arcColor("color")
        .arcDashLength(() => Math.random())
        .arcDashGap(() => Math.random())
        .arcDashAnimateTime(() => Math.random() * 4000 + 500)
        .arcsTransitionDuration(1000)
        .arcAltitude("arcAlt")
        .arcStroke((d) => 1.5)
        .arcsData(data);
    }

    // Set up atmosphere if enabled
    if (globeConfig.showAtmosphere) {
      globe
        .atmosphereColor(globeConfig.atmosphereColor ?? "#ffffff")
        .atmosphereAltitude(globeConfig.atmosphereAltitude ?? 0.1);
    }

    // Set up points
    globe
      .pointColor("color")
      .pointAltitude("arcAlt")
      .pointRadius(globeConfig.pointSize ?? 0.5)
      .pointsMerge(false)
      .pointsData(data);

    // Set up rings
    globe
      .ringColor("color")
      .ringMaxRadius("arcAlt")
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((d) => (d as any).arcTime / RING_PROPAGATION_SPEED)
      .ringsData(data);

    // Set up materials
    const material = globe.globeMaterial() as any;
    material.color = new Color(globeConfig.globeColor ?? "#062056");
    material.emissive = new Color(globeConfig.emissive ?? "#062056");
    material.emissiveIntensity = globeConfig.emissiveIntensity ?? 0.1;
    material.shininess = globeConfig.shininess ?? 0.9;

    // Set up initial position
    if (globeConfig.initialPosition) {
      globe.setPointOfView({
        lat: globeConfig.initialPosition.lat,
        lng: globeConfig.initialPosition.lng,
        altitude: 2.5,
      } as any);
    }

    return () => {
      globe.hexPolygonsData([]);
      globe.arcsData([]);
      globe.pointsData([]);
      globe.ringsData([]);
    };
  }, [globeConfig, data]);

  if (!isLoaded) {
    return null;
  }

  return <threeGlobe ref={globeEl} />;
}

export function WebGLRendererConfig() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(window.innerWidth, window.innerHeight);
  }, [gl]);
  return null;
}

export function World(props: WorldProps) {
  return (
    <Canvas>
      <WebGLRendererConfig />
      <Globe {...props} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return numbers;
}
