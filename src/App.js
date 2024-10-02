// src/App.js
import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import UndoRedo from "./components/UndoRedo";
import "./App.css";

const App = () => {
  const [texts, setTexts] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);

  const handleAddText = () => {
    const newText = {
      text: "Enter text here",
      x: 100, // Default X position
      y: 100, // Default Y position
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
    };
    setTexts([...texts, newText]);
    setSelectedTextIndex(texts.length);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        {/* Undo and Redo buttons */}
        <UndoRedo texts={texts} setTexts={setTexts} />
      </header>

      {/* Add Text Button */}
      <button onClick={handleAddText} className="add-text-button">
        Add Text
      </button>

      {/* Toolbar for text formatting */}
      <div className="toolbar-container">
        <Toolbar
          texts={texts}
          setTexts={setTexts}
          selectedTextIndex={selectedTextIndex}
          setSelectedTextIndex={setSelectedTextIndex}
        />
      </div>

      {/* Main canvas area */}
      <Canvas
        texts={texts}
        setTexts={setTexts}
        selectedTextIndex={selectedTextIndex}
        setSelectedTextIndex={setSelectedTextIndex}
      />
    </div>
  );
};

export default App;
