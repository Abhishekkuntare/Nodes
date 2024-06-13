import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; //  UUID for generating unique IDs
import toast from "react-hot-toast";
const NodesPanel = ({ setNodes, nodes, edges }) => {
  const [text, setText] = useState(""); // State to manage input field text

  // Handler for text input change
  const handleTextChange = (e) => {
    setText(e.target.value); // Update text state with input value
  };

  // Handler for adding a new node
  const handleAddNode = () => {
    if (!text.trim()) {
      // Check if input text is empty or whitespace
      toast.error("Text is required"); // Show error toast notification
      return;
    }
    const id = uuidv4(); // Generate unique ID for the new node
    const newNode = {
      id,
      type: "custom",
      data: { label: text }, // Assign input text as label for the node
      position: { x: Math.random() * 200, y: Math.random() * 200 }, // Random initial position
    };
    setNodes((nds) => [...nds, newNode]); // Update nodes state with new node
    setText(""); // Clear input text field
    toast.success("Node added"); // Show success toast notification
  };

  // Handler for saving the flow
  const handleSave = () => {
    if (nodes.length === 0) {
      // Check if there are no nodes to save
      toast.error("Cannot save flow without nodes"); // Show error toast notification
      return;
    }

    if (nodes.some((node) => !node.data.label.trim())) {
      // Check if any node lacks label text
      toast.error("All nodes must have text"); // Show error toast notification
      return;
    }

    const flow = { nodes, edges }; // Construct flow object with nodes and edges
    localStorage.setItem("chatbot-flow", JSON.stringify(flow)); // Store flow in local storage
    toast.success("Flow saved"); // Show success toast notification
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Nodes Panel</h2>
      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
          placeholder="Enter node text"
        />
        {/* Button to add a new node */}
        <button
          className="bg-teal-400 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded mb-2 w-full"
          onClick={handleAddNode}
        >
          Add Text Node
        </button>
        {/* Button to save the flow */}
        <button
          className="bg-purple-400 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded mb-2 w-full"
          onClick={handleSave}
        >
          Save Flow
        </button>
      </div>
    </div>
  );
};

export default NodesPanel;
