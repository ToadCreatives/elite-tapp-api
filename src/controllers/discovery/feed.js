exports.feed = async (req, res, next) => {
  try {
    const { interests } = req.query;
  } catch (err) {
    next(err);
  }
};
