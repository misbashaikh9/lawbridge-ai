const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const aiResponse = await axios.post("http://localhost:8000/analyze", {
      question,
    });

    res.json(aiResponse.data);
  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI service failed" });
  }
});

module.exports = router;