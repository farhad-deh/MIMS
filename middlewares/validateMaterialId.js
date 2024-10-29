function validateMaterialId(req, res, next) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "شناسه ماده الزامی است." });
  }
  next();
}

module.exports = validateMaterialId;
