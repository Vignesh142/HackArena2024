import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const FaqBot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleQuery = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/faq", {
        query: query,
        groq_api_key: "YOUR_API_KEY",
      });
      setResponse(res.data.response || "No answer found.");
    } catch (err) {
      setResponse("Error: Could not fetch answer.");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        FAQ Bot
      </Typography>
      <TextField
        fullWidth
        label="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleQuery}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
      {response && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Response:</strong> {response}
        </Typography>
      )}
    </Box>
  );
};

export default FaqBot;
