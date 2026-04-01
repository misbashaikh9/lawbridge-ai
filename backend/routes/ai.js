const express = require("express");
const router = express.Router();
const axios = require("axios");

const AI_SERVICE_URL = "https://lawbridge-ai-ai-service.onrender.com/predict";
const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestAiAnalysis(question) {
  let lastError;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await axios.post(
        AI_SERVICE_URL,
        { text: question },
        { timeout: 15000 }
      );

      return response.data;
    } catch (error) {
      lastError = error;

      const status = error.response?.status;
      const isRetryable = !status || RETRYABLE_STATUS_CODES.has(status) || error.code === "ECONNABORTED";

      if (!isRetryable || attempt === 1) {
        throw error;
      }

      await delay(1200);
    }
  }

  throw lastError;
}

router.post("/query", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    const aiResponse = await requestAiAnalysis(question.trim());

    res.json(aiResponse);
  } catch (error) {
    const status = error.response?.status;
    const upstreamMessage = error.response?.data?.detail || error.response?.data?.error;

    console.error("AI ERROR:", status || error.code || error.message, upstreamMessage || "");

    if (status === 503 || status === 502 || status === 504 || error.code === "ECONNABORTED") {
      return res.status(503).json({
        error: "AI service is temporarily unavailable",
        code: "AI_TEMPORARILY_UNAVAILABLE",
      });
    }

    return res.status(500).json({
      error: "AI service failed",
      code: "AI_REQUEST_FAILED",
    });
  }
});

module.exports = router;