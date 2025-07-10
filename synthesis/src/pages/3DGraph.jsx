import React, { useMemo } from 'react';
import 'aframe';
import ForceGraphVR from 'react-force-graph-vr';
import * as THREE from 'three';
import nodes_with_colors from '../../../data-layer/nodes_with_colors_v2.json';
import './3DGraph.css';

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
// Renders an interactive force-directed graph in WebXR/VR using real ingredient data
export default function ThreeDGraph() {
  const graphData = useMemo(() => {
    // Convert our nodes data to the format expected by ForceGraphVR
    const nodes = nodes_with_colors.map(node => ({
      id: node.id,
      name: node.name,
      category: node.category,
      color: node.color,
      transparent: node.transparent,
      opacity: node.opacity,
      is_hub: node.is_hub
    }));

    // Create some basic links between nodes (you can enhance this with actual edge data)
    const links = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      if (Math.random() < 0.1) { // 10% chance of connection
        links.push({
          source: nodes[i].id,
          target: nodes[i + 1].id
        });
      }
    }

    return { nodes, links };
  }, []);

  return (
    <div className="graph-fullscreen">
      <ForceGraphVR
        graphData={graphData}
        linkDistance={25}
        nodeRelSize={6}
        linkStrength={0.1}
        linkDirectionalArrowLength={0}
        linkDirectionalArrowRelPos={1}
        nodeThreeObject={(node) =>
          new THREE.Mesh(
            new THREE.SphereGeometry(node.is_hub ? 6 : 4),
            new THREE.MeshLambertMaterial({
              color: node.color,
              transparent: node.transparent,
              opacity: node.opacity
            })
          )
        }
        nodeLabel={(node) => `${node.name} (${node.category})`}
      />
    </div>
  );
}
