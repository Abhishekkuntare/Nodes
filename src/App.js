import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import CustomNode from "./components/CustomNode";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import { Toaster } from "react-hot-toast";
import "tailwindcss/tailwind.css";
const flowKey = "chatbot-flow"; // Key for localStorage to store flow data

const nodeTypes = {
  custom: CustomNode, // Define node types, in this case, only custom node type with CustomNode component
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Effect to load saved flow from localStorage on initial render
  useEffect(() => {
    const savedFlow = JSON.parse(localStorage.getItem(flowKey)); // Retrieve saved flow data from localStorage
    if (savedFlow) {
      setNodes(savedFlow.nodes); // Set nodes state with saved nodes
      setEdges(savedFlow.edges); // Set edges state with saved edges
    }
  }, [setNodes, setEdges]); // Dependency array ensures effect runs only on mount and when setNodes/setEdges change

  // Callback function to handle edge creation between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)), // Add edge to edges state using addEdge function from react-flow-renderer
    [setEdges]
  );

  // Function to handle node selection
  const handleNodeSelect = (node) => {
    setSelectedNode(node); // Set selectedNode state to the clicked node
  };

  // Function to handle text change in selected node
  const handleTextChange = (text) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: text } } // Update label of selected node
          : node
      )
    );
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Toaster /> {/* Toast notifications container from react-hot-toast */}
      <div className="w-full sm:w-1/4 p-4 bg-gray-100">
        <NodesPanel setNodes={setNodes} nodes={nodes} edges={edges} />
      </div>
      <div className="w-full sm:w-3/4 p-4 relative">
        <ReactFlow
          nodes={nodes} // Pass nodes state to ReactFlow component
          edges={edges} // Pass edges state to ReactFlow component
          onNodesChange={onNodesChange} // Callback for node state change
          onEdgesChange={onEdgesChange} // Callback for edge state change
          onConnect={onConnect} // Callback for edge creation
          onNodeClick={(_, node) => handleNodeSelect(node)} // Callback for node selection
          fitView // Automatically fit view to show all nodes
          nodeTypes={nodeTypes} // Define custom node types
        >
          <MiniMap /> {/* Minimap component for navigation */}
          <Controls /> {/* Controls component for zoom and reset */}
          <Background /> {/* Background component */}
        </ReactFlow>
        {selectedNode && (
          <SettingsPanel
            selectedNode={selectedNode} // Pass selected node to SettingsPanel
            onTextChange={handleTextChange} // Callback for text change in SettingsPanel
          />
        )}
      </div>
    </div>
  );
}

export default App;
