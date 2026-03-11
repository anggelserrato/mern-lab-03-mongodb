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
