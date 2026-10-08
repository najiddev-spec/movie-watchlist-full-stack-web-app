const OBJECT_ID = /^[0-9a-fA-F]{24}$/;

export default function validateObjectId(req, res, next) {
  if (!OBJECT_ID.test(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid movie ID" });
  }
  next();
}