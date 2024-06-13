import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SettingsPanel = ({ selectedNode, onTextChange }) => {
  const [text, setText] = useState(selectedNode.data.label); // State to manage text input

  // Effect to update text state when selectedNode changes
  useEffect(() => {
    setText(selectedNode.data.label); // Set initial text from selectedNode label
  }, [selectedNode]); // Depend on selectedNode changes

  // Handle text change in input field
  const handleTextChange = (e) => {
    setText(e.target.value); // Update text state with input value
  };

  // Handle blur event (when user clicks away from input)
  const handleTextBlur = () => {
    onTextChange(text); // Call parent component callback to update node label
    toast.success("Text updated"); // Show success toast notification
  };

  // Handle key press event (specifically Enter key)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onTextChange(text); // Call parent component callback to update node label
      toast.success("Text updated"); // Show success toast notification
    }
  };

  return (
    <div className="absolute top-0 right-0 p-4 bg-white border border-gray-300 shadow-lg rounded w-full sm:w-80 z-30">
      <h2 className="text-lg font-semibold mb-2">Settings Panel</h2>
      <div>
        <label className="block mb-1">Text:</label>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          onKeyPress={handleKeyPress}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
