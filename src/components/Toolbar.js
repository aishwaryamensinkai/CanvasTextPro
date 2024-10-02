// src/components/Toolbar.js
import React from "react";
import {
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const Toolbar = ({
  texts,
  setTexts,
  selectedTextIndex,
  setSelectedTextIndex,
}) => {
  const handleChange = (property, value) => {
    if (selectedTextIndex !== null) {
      const updatedTexts = texts.map((text, index) =>
        index === selectedTextIndex ? { ...text, [property]: value } : text
      );
      setTexts(updatedTexts);
    }
  };

  const handleDelete = () => {
    if (selectedTextIndex !== null) {
      const updatedTexts = texts.filter(
        (_, index) => index !== selectedTextIndex
      );
      setTexts(updatedTexts);
      setSelectedTextIndex(null); // Deselect text after deletion
    }
  };

  return (
    <div className="toolbar">
      <FormControl
        variant="outlined"
        size="small"
        style={{ marginRight: 10, width: 150 }} // Increased width
      >
        <InputLabel>Font Size</InputLabel>
        <Select
          value={
            selectedTextIndex !== null
              ? texts[selectedTextIndex]?.fontSize || 16
              : 16
          }
          onChange={(e) => handleChange("fontSize", e.target.value)}
          label="Font Size"
        >
          {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Font Family Dropdown with increased width */}
      <FormControl
        variant="outlined"
        size="small"
        style={{ marginRight: 10, width: 150 }} // Increased width
      >
        <InputLabel>Font Style</InputLabel>
        <Select
          value={
            selectedTextIndex !== null
              ? texts[selectedTextIndex]?.fontFamily || "Arial"
              : "Arial"
          }
          onChange={(e) => handleChange("fontFamily", e.target.value)}
          label="Font Style"
        >
          {[
            "Arial",
            "Times New Roman",
            "Georgia",
            "Verdana",
            "Courier New",
          ].map((font) => (
            <MenuItem key={font} value={font}>
              {font}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ButtonGroup>
        <Button onClick={() => handleChange("fontWeight", "bold")}>B</Button>
        <Button onClick={() => handleChange("fontStyle", "italic")}>I</Button>
        <Button onClick={() => handleChange("textDecoration", "underline")}>
          U
        </Button>
        <Button onClick={handleDelete} style={{ color: "red" }}>
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Toolbar;
