// src/components/Canvas.js
import React, { useState } from "react";

const Canvas = ({
  texts,
  setTexts,
  selectedTextIndex,
  setSelectedTextIndex,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (index, e) => {
    setSelectedTextIndex(index);
    setIsDragging(true);

    const textElement = texts[index];
    setOffset({
      x: e.clientX - textElement.x,
      y: e.clientY - textElement.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedTextIndex !== null) {
      const newTexts = texts.map((text, i) => {
        if (i === selectedTextIndex) {
          return {
            ...text,
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
          };
        }
        return text;
      });
      setTexts(newTexts);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTextChange = (e, index) => {
    const newTexts = texts.map((text, i) => {
      if (i === index) {
        return { ...text, text: e.target.value };
      }
      return text;
    });
    setTexts(newTexts);
  };

  const handleDelete = (index) => {
    const updatedTexts = texts.filter((_, i) => i !== index);
    setTexts(updatedTexts);
    setSelectedTextIndex(null);
  };

  return (
    <div
      className="canvas"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {texts.map((text, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: text.y,
            left: text.x,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Delete Button */}
          {selectedTextIndex === index && (
            <button
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleDelete(index)}
            >
              &times;
            </button>
          )}
          <textarea
            value={text.text}
            style={{
              position: "relative",
              top: 0,
              left: 0,
              fontSize: text.fontSize,
              fontWeight: text.fontWeight,
              fontStyle: text.fontStyle,
              textDecoration: text.textDecoration,
              fontFamily: text.fontFamily || "Arial", // Add this line
              border: selectedTextIndex === index ? "2px dotted #000" : "none",
              background: "transparent",
              cursor:
                isDragging && selectedTextIndex === index ? "grabbing" : "grab",
              resize: "both",
              overflow: "auto",
              padding: "4px",
            }}
            onChange={(e) => handleTextChange(e, index)}
            onMouseDown={(e) => handleMouseDown(index, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
