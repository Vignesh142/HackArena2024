import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const TextClassification = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const classifyText = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/classify", {
        query: text,
        groq_api_key: "YOUR_API_KEY",
      });
      setCategory(res.data.category || "No label found.");
    } catch (err) {
      setCategory("Error: Could not classify text.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Text Classification
      </Typography>
      <TextField
        fullWidth
        label="Enter text to classify"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={classifyText}
        sx={{ mt: 2 }}
      >
        Classify
      </Button>
      {category && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Category:</strong> {category}
        </Typography>
      )}
    </Box>
  );
};

export default TextClassification;
