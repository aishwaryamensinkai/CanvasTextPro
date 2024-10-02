// src/components/UndoRedo.js
import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

const UndoRedo = ({ texts, setTexts }) => {
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    if (texts.length > 0) {
      setUndoStack((prev) => [...prev, texts]);
    }
  }, [texts]);

  const handleUndo = () => {
    if (undoStack.length > 1) {
      const newUndoStack = [...undoStack];
      const lastState = newUndoStack.pop();
      setRedoStack((prev) => [...prev, lastState]);
      setTexts(newUndoStack[newUndoStack.length - 1] || []);
      setUndoStack(newUndoStack);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const lastState = newRedoStack.pop();
      setTexts(lastState);
      setUndoStack((prev) => [...prev, lastState]);
      setRedoStack(newRedoStack);
    }
  };

  return (
    <div>
      <IconButton onClick={handleUndo} disabled={undoStack.length <= 1}>
        <UndoIcon />
      </IconButton>
      <IconButton onClick={handleRedo} disabled={redoStack.length === 0}>
        <RedoIcon />
      </IconButton>
    </div>
  );
};

export default UndoRedo;
