import React, { useMemo } from 'react';
import 'aframe';
import ForceGraphVR from 'react-force-graph-vr';
import * as THREE from 'three';

// Simple utility to generate a random tree similar to https://github.com/vasturiano/force-graph/blob/master/example/random-data.js
function genRandomTree(n = 100) {
  const nodes = [...Array(n).keys()].map(i => ({ id: i }));
  const links = nodes
    .slice(1) // first node is root
    .map(node => ({
      source: Math.floor(Math.random() * node.id),
      target: node.id
    }));
  return { nodes, links };
}

const geometries = [
  () => new THREE.BoxGeometry(Math.random() * 20, Math.random() * 20, Math.random() * 20),
  () => new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20),
  () => new THREE.CylinderGeometry(Math.random() * 10, Math.random() * 10, Math.random() * 20),
  () => new THREE.DodecahedronGeometry(Math.random() * 10),
  () => new THREE.SphereGeometry(Math.random() * 10),
  () => new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2),
  () => new THREE.TorusKnotGeometry(Math.random() * 10, Math.random() * 2)
];

// VRGraph component
// --------------------------------------------------
// Renders an interactive force-directed graph in WebXR/VR.
// Add <VRGraph /> anywhere in your JSX and make sure the canvas
// can take up the full viewport (e.g. via CSS).
export default function ThreeDGraph({ nodeCount = 100 }) {
  const graphData = useMemo(() => genRandomTree(nodeCount), [nodeCount]);

  return (
    <div className="graph-fullscreen">
      <ForceGraphVR
        graphData={graphData}
        nodeThreeObject={({ id }) =>
          new THREE.Mesh(
            geometries[id % geometries.length](),
            new THREE.MeshLambertMaterial({
              color: Math.round(Math.random() * 2 ** 24),
              transparent: true,
              opacity: 0.75
            })
          )
        }
      />
    </div>
  );
}
