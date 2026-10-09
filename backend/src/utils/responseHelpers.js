export const handleError = (err, res) => {
  if (err.name === "ValidationError") {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([f, e]) => [f, e.message])
    );
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }
  console.log(err);
  res.status(500).json({ success: false, message: "Server error" });
};

export const notFound = (res) =>
  res.status(404).json({ success: false, message: "Movie not found" });
