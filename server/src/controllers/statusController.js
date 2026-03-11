import mongoose from "mongoose";

export const getHome = (req, res) => {
  res.json({ message: "Welcome to the API", status: "ok" });
};

export const getAbout = (req, res) => {
  res.json({
    message: "This is a simple API built with Express.js",
    status: "ok",
  });
};

export const getHello = (req, res) => {
  res.json({ message: "Hello from the API!", timestamp: Date.now() });
};

export const getHealthCheck = (req, res) => {
  const readyState = mongoose.connection.readyState;
  const dbStatus = readyState === 1 ? "connected" : "disconnected";
  res.json({
    status: "ok",
    database: dbStatus,
  });
};
