
import React, { useState } from 'react';

const ModelArchitecture = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (path) => {
    setExpandedSections(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const getColorForDepth = (depth) => {
    const colors = [
      'bg-blue-50',
      'bg-green-50',
      'bg-purple-50',
      'bg-orange-50',
      'bg-pink-50'
    ];
    return colors[depth % colors.length];
  };

  const ArchitectureNode = ({ name, children, path, depth = 0, details }) => {
    const isExpanded = expandedSections[path];
    return (
      <div className={`p-3 rounded-lg ${getColorForDepth(depth)} mb-2`}>
        <div 
          className="font-semibold flex items-center gap-2 cursor-pointer"
          onClick={() => toggleSection(path)}
        >
          <span className="text-gray-600 select-none">
            {children ? (isExpanded ? '▼' : '►') : '•'}
          </span>
          <span>{name}</span>
        </div>
        {details && (
          <div className="ml-6 text-sm text-gray-600">{details}</div>
        )}
        {children && isExpanded && (
          <div className="ml-6 mt-2 border-l-2 border-gray-300 pl-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Architecture data
  const architectureData = {
  "id": 1,
  "name": "ExampleModel",
  "path": "1",
  "children": [
    {
      "id": 2,
      "name": "Conv2d",
      "path": "1/2",
      "children": [],
      "info": {
        "type": "Conv2d",
        "params": {
          "in_channels": 3,
          "out_channels": 64,
          "kernel_size": [
            3,
            3
          ]
        }
      }
    },
    {
      "id": 3,
      "name": "ReLU",
      "path": "1/3",
      "children": [],
      "info": {
        "type": "Activation (ReLU)",
        "params": {}
      }
    },
    {
      "id": 4,
      "name": "Linear",
      "path": "1/4",
      "children": [],
      "info": {
        "type": "Linear",
        "params": {
          "in_features": 64,
          "out_features": 10
        }
      }
    }
  ],
  "info": {
    "type": "ExampleModel",
    "params": {
      "in_channels": 3,
      "out_channels": 64,
      "kernel_size": [
        3,
        3
      ],
      "in_features": 64,
      "out_features": 10
    }
  }
};

  const renderNode = (node, depth = 0) => {
    const details = node.info ? Object.entries(node.info.params)
      .map(([k, v]) => `${k}: ${v}`).join(', ') : null;
    
    return (
      <ArchitectureNode
        key={node.path}
        name={`${node.name}`}
        path={node.path}
        depth={depth}
        details={details}
      >
        {node.children && node.children.map(child => renderNode(child, depth + 1))}
      </ArchitectureNode>
    );
  };

  return (
    <div className="w-full max-w-6xl p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Model Architecture Visualization</h2>
      <div className="space-y-4 overflow-y-auto max-h-[800px]">
        {renderNode(architectureData)}
      </div>
    </div>
  );
};

export default ModelArchitecture;
