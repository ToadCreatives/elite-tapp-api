exports.refresh = async (req, res, next) => {
  try {
    const { user } = req;
  } catch (err) {
    next(err);
  }
};
