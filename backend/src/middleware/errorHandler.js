export const notFoundRoute = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, message: "Malformed JSON in request body" });
  }
  console.error
  res.status(500).json({ success: false, message: "Server error" });
};
